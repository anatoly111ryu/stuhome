import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  ScrollView,
  AlertIOS,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import mainStyles from '../../styles/components/_Main';
import modalStyles from '../../styles/common/_Modal';
import styles from '../../styles/components/modal/_PublishModal';
import colors from '../../styles/common/_colors';
import Header from '../Header';
import Picker from '../Picker';
import ImageUploader from '../ImageUploader';
import MessageBar from '../../services/MessageBar';
import api from '../../services/api';

export default class PublishModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typeId: null,
      title: '',
      content: '',
      isPickerOpen: false,
      images: [],
      isUploading: false
    };
    this.title = this.props.title || '发表新主题';
  }

  componentWillReceiveProps(nextProps) {
    const publish = nextProps.publish;
    if (publish.response) {
      if (publish.response.rs) {
        this.cancel();
        this.props.invalidateTopicList({
          boardId: 'all',
          sortType: 'publish'
        });
        // The boolean here is to tell router we need to replace
        // with home page by force to bypass same route check if
        // we publish topic from home page.
        this.props.router.toHome(true);
        MessageBar.show({
          message: '发布成功',
          type: 'success'
        });
      } else if (publish.response.errcode) {
        AlertIOS.alert('提示', publish.response.errcode);
      }
      this.props.resetPublish();
    }
  }

  cancel() {
    this.props.closePublishModal();
  }

  handleCancel() {
    let { title, content, images } = this.state;
    if (title.length || content.length || images.length) {
      AlertIOS.alert(
        '提示',
        '信息尚未发送，放弃会丢失信息。',
        [
          { text: '继续', style: 'cancel' },
          { text: '放弃', onPress: () => this.cancel() },
        ],
      );
      return;
    }

    this.cancel();
  }

  _isFormValid() {
    let { typeId, title, content } = this.state;
    let { types } = this.props;

    let hasNoTopicTypes = types.length === 0;
    let hasTypeId = hasNoTopicTypes && true || (typeId !== null);

    return hasTypeId
        && title.length
        && content.length;
  }

  _handlePublish(topic) {
    this.titleInput.blur();
    this.contentInput.blur();

    this.setState({ isUploading: true });
    api.uploadImages(this.state.images).then(data => {
      this.setState({ isUploading: false });

      if (data) {
        topic.images = data;
      }

      this.props.handlePublish(topic);
    });
  }

  togglePicker(visible) {
    this.setState({
      isPickerOpen: visible
    });
  }

  addImages(images) {
    this.setState({
      images: this.state.images.concat(images)
    });
  }

  removeImage(imageIndex) {
    this.setState({
      images: this.state.images.filter((image, index) => index !== imageIndex)
    });
  }

  getNormalizedTopicTypesForPicker(types) {
    return types.map(type => {
      return {
        id: type.typeId,
        name: type.typeName
      };
    });
  }

  render() {
    let { typeId, title, content, isPickerOpen, images } = this.state;
    let { publish, types } = this.props;

    let isPublishing = this.state.isUploading || publish.isPublishing;

    return (
      <Modal
        animationType='slide'
        transparent={false}
        style={modalStyles.container}
        visible={this.props.visible}>
        <View style={mainStyles.container}>
          {isPickerOpen &&
            <Picker
              list={this.getNormalizedTopicTypesForPicker(types)}
              selectedId={typeId}
              visible={isPickerOpen}
              closePicker={() => this.togglePicker(false)}
              setSelection={typeId => this.setState({ typeId })} />
          }
          <Header title={this.title}>
            <Text
              style={modalStyles.button}
              onPress={() => this.handleCancel()}>
              取消
            </Text>
            {this._isFormValid() &&
              (isPublishing &&
                <ActivityIndicator color='white' />
                ||
                <Text
                  style={modalStyles.button}
                  onPress={() => this._handlePublish({
                    typeId,
                    title,
                    content
                  })}>
                  发布
                </Text>
              )
              ||
              <Text
                style={[modalStyles.button, modalStyles.disabled]}>
                发布
              </Text>
            }
          </Header>
          <KeyboardAwareScrollView style={[styles.form, isPublishing && styles.disabledForm]}>
            {types.length > 0 &&
              <TouchableHighlight
                underlayColor={colors.underlay}
                onPress={() => {
                  if (!isPublishing) {
                    this.togglePicker(true);
                  }
                }}>
                <View style={styles.formItem}>
                  <Text
                    style={styles.topicType}>
                    {typeId && types.find(type => type.typeId === typeId).typeName || '请选择分类'}
                  </Text>
                  <Icon
                    style={styles.topicTypeIcon}
                    name='angle-right'
                    size={18} />
                </View>
              </TouchableHighlight>
            }
            <View style={styles.formItem}>
              <TextInput
                ref={component => this.titleInput = component}
                style={styles.topicTitle}
                onChangeText={text => this.setState({ title: text })}
                editable={!isPublishing}
                returnKeyType='next'
                onSubmitEditing={() => this.contentInput.focus()}
                enablesReturnKeyAutomatically={true}
                placeholder='请输入标题' />
            </View>
            <View style={styles.formItem}>
              <TextInput
                ref={component => this.contentInput = component}
                style={styles.topicContent}
                onChangeText={text => this.setState({ content: text })}
                multiline={true}
                editable={!isPublishing}
                placeholder='请输入正文' />
            </View>
            <View style={styles.upload}>
              <ImageUploader
                disabled={isPublishing}
                images={this.state.images}
                addImages={images => this.addImages(images)}
                removeImage={imageIndex => this.removeImage(imageIndex)} />
            </View>
          </KeyboardAwareScrollView>
        </View>
      </Modal>
    );
  }
}
