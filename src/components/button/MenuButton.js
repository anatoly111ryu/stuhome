import React, { Component } from 'react';
import {
  View,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AlertCount from '../AlertCount';
import styles from '../../styles/components/button/_MenuButton';

export default class MenuButton extends Component {
  render() {
    let alertCount = this.props.alertCount;

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.props.updateMenuState(true)}>
        <View style={styles.view}>
          <Icon
            style={styles.menu}
            name='reorder'
            size={18} />
          {!!alertCount && <AlertCount style={styles.alert} doNotShowCount={true} />}
        </View>
      </TouchableOpacity>
    );
  }
}
