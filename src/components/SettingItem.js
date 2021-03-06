import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/components/_SettingItem';
import colors from '../styles/common/_colors';

export default class SettingItem extends Component {
  render() {
    let { text, style, indicator, avatar } = this.props;

    return (
      <TouchableHighlight
        underlayColor={colors.underlay}
        onPress={this.props.onPress}>
        <View style={[styles.item, style]}>
          <Text style={styles.info}>{text}</Text>
          {!!avatar &&
            <View style={styles.avatarWapper}>
              <Image
                style={styles.avatar}
                source={{ uri: avatar }} />
              <Text style={styles.avatarIndicator}>></Text>
            </View>
            ||
            <Text style={styles.indicator}>
              {!!indicator ? indicator : '>'}
            </Text>
          }
        </View>
      </TouchableHighlight>
    );
  }
}
