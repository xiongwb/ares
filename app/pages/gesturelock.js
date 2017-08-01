import React from 'react'

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  BackAndroid,
  Platform,
  Image,
  Switch,
  NativeModules,
  Alert,
} from 'react-native'
import {
  BasePage,
  BackNavBar,
  DevelopTip,
} from 'AresComponent'
import List from 'antd-mobile/lib/list';
/*react-native组件修改在目录下*/
import PasswordGesture from '../gesture-password/source/index';
var Password1 = '';

class GestureLock extends BasePage {
  constructor(props) {
    super(props);
    this.state = {
      message: '绘制解锁图案',
      status: 'normal'
    }
  }

  onEnd(password) {
      if ( Password1 === '' ) {
          /* The first password */
          Password1 = password;
          this.setState({
              status: 'normal',
              message: '请再次绘制密码'
          });
      } else {
          /* The second password */
          if ( password === Password1 ) {
              Password1 = '';
              if(this.props.navigator.getCurrentRoutes().length != 1){
                this.props.navigator.pop()
                    Alert.alert('提示', "绘制密码" + password, [
                      { text: '确定'}
                    ])

              }
          } else {
              this.setState({
                  status: 'wrong',
                  message:  '两次绘制图案不同，请重新绘制'
              });
          }
      }
  }
  onStart() {
      if ( Password1 === '') {
          this.setState({
              message: '绘制解锁图案',
              status: 'normal'
          });
      } else {
          this.setState({
              message: '请再次绘制图案',
              status: 'normal'
          });
      }
  }

  render() {
      return (
          <View style={styles.root}>
          <BackNavBar component={this}>设置手势密码</BackNavBar>
          <PasswordGesture
              ref='pg'
              status={this.state.status}
              message={this.state.message}
              onStart={() => this.onStart()}
              onEnd={(password) => this.onEnd(password)}
          />
          </View>
      )
  }

}

var styles = StyleSheet.create({
  root: {
    flex: 1,
  },

})
export default GestureLock