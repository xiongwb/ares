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
var FingerPrintManager = NativeModules.FingerPrintManager;

class FingerPrint extends BasePage {
  constructor(props) {
    super(props);
    this.state = {
      fingerLockSwitchIsOn: false,
      paySwitchIsOn: false,
    }
  }
  /*
  调用原生指纹验证方法 
  这里需要判断设备的类型
  下面是iOS处理方法
  */
  finger_verification(value) {
    this.setState({fingerLockSwitchIsOn: value});
    if (value == true) {
      if (Platform.OS === 'android') {
        
      }
      if (Platform.OS === 'ios') {
        FingerPrintManager.authenticateUser('指纹解锁',(error,events) => {
          if (error) {
          } else {
              let fingerMessage = events[0];
              if (fingerMessage == '验证成功') {
              /*验证成功代码*/

              }else {
                if (fingerMessage == '验证失败') {
              /*验证成功代码
                将开关按钮置回
              */    
                  this.setState({fingerLockSwitchIsOn: false});
                };
              };
            }
        });
      }
    };
  }

  finger_pay(value) {
    this.setState({paySwitchIsOn: value});
    if (value == true) {
      if (Platform.OS === 'android') {
        
      }
      if (Platform.OS === 'ios') {
        FingerPrintManager.authenticateUser('指纹支付',(error,events) => {
          if (error) {
          } else {
              let fingerMessage = events[0];
              if (fingerMessage == '验证成功') {
              /*验证成功代码*/

              }else {
                if (fingerMessage == '验证失败') {
              /*验证成功代码
                将开关按钮置回
              */    
                  this.setState({paySwitchIsOn: false});
                };
              };
          }
        });
      }
    };
  }

  render() {
      return (
          <View style={styles.root}>
            <BackNavBar component={this}>指纹</BackNavBar>
            <View style={styles.imageView}> 
              <Image source={require('ares/app/assets/image/fingerprint.png')}
                  style={styles.imageStyles} />
            </View>
            <View style={styles.textView}>
              <Text style={styles.textStyles}>指纹密码只对本地有效</Text>
              <Text style={styles.textStyles}>开通即视为同意<Text style={styles.textClick} onPress={()=>
                {
                  Alert.alert('提示', "该功能尚未开发完成", [
                    { text: '确定'}
                  ])
                }
              }>《指纹相关协议》</Text></Text>
            </View>
            <View style={styles.whiteView}>
            </View>
            <View>
              <List>
                <List.Item 
                  extra={
                    <Switch
                      value={this.state.fingerLockSwitchIsOn} 
                      onValueChange = {this.finger_verification.bind(this)} />
                  }
                >指纹解锁
                </List.Item>
                <List.Item
                  extra={
                    <Switch
                      value={this.state.paySwitchIsOn} 
                      onValueChange={this.finger_pay.bind(this)} />
                  }
                >指纹支付</List.Item>
              </List>
            </View>
          </View>
      )
  }

}

var styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F5F5F9',
  },
  imageView: {
    height:180,
    backgroundColor: '#F5F5F9',
    justifyContent: 'center',
    alignItems:'center',
  },
  imageStyles: {
    height:130,
    resizeMode:Image.resizeMode.contain,
  },
  textView:{
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: '#F5F5F9',
  },
  textStyles:{
    fontSize: 15,
    color: "#000",
  },
  textClick:{
    fontSize:15,
    color:'#3d90fa',
  },
  whiteView:{
    backgroundColor: '#F5F5F9',
    height:20,
  }
})
export default FingerPrint