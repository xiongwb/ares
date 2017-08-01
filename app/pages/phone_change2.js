import React from 'react'

import {
 Text,
  View,
  StyleSheet,
  AsyncStorage,
  Image,
  Dimensions,
} from 'react-native'
/*更改手机成功页面
张乐   2016-10-26*/
import {
  BasePage,
  BackNavBar,
  NavigatorUtils,
} from 'AresComponent'
import {
  STORAGE_KEYS,
  COMMON_STYLES,
  EVENT_EMITTER_CONST,
} from 'AresConstant'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import Icon from 'antd-mobile/lib/icon'
import ImagePicker from 'antd-mobile/lib/image-picker'

var full_height = Dimensions.get('window').height
const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: "column",
  },
  success_logo_box:{
    marginTop : 60,
    justifyContent: "center",
    alignItems:'center',
  },

  success_message:{
    color:'#0281E8',
    fontSize:16,
    textAlign:'center',
  },
});

class PhoneChange2 extends BasePage {
  onBack() {
    AsyncStorage.removeItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
      RCTDeviceEventEmitter.emit(EVENT_EMITTER_CONST.DIDLOGOUTSUCCESS, 'logout');
      this.props.navigator.popToTop()
    })
  }
  render() {
    return(
      <View style={styles.root}>
        <BackNavBar component={this} backText='返回设置'></BackNavBar>
        <View style={styles.success_logo_box}>
          <Image source={require('ares/app/assets/image/reset_login_pwd_success.png')} style={{width:100,height:100}}/>
        </View>
        <View style={{marginTop : 50,}}>
          <Text style={styles.success_message}>恭喜您！手机号变更成功</Text>
        </View>
      </View>
    )
  }
}

export default PhoneChange2
