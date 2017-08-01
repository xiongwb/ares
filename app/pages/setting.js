import React from 'react'

import {
  Text,
  View,
  StyleSheet,
  AsyncStorage,
} from 'react-native'

import {
  BasePage,
  BackNavBar,
  DevelopTip,
  PushLogin,
  LoginTextInput,
} from 'AresComponent'

import {
  COMMON_STYLES,
  STORAGE_KEYS,
  EVENT_EMITTER_CONST,
} from 'AresConstant'

import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import List from 'antd-mobile/lib/list'
import Button from 'antd-mobile/lib/button'

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#F5F5F9",
    flex: 1,
    flexDirection: "column",
  },
  bottom_box: {
    flex: 1,
    justifyContent: "flex-end",
  },
  sign_out_btn: {
    marginHorizontal: 5,
    marginBottom: 5,
  },
  content_text:{
    fontSize:16,
    color:"#101010",
  },
});

/**
*  设置页面
*  by fushang318
*/
class Setting extends BasePage {
  constructor(props) {
    super(props)
  }

  remove_data() {
    AsyncStorage.removeItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
      RCTDeviceEventEmitter.emit(EVENT_EMITTER_CONST.DIDLOGOUTSUCCESS, 'logout');
      this.props.navigator.pop()
    })
  }

  to_reset_login_pwd(){
    AsyncStorage.getItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
      let hash = JSON.parse(value)
      console.log("wdjdw",hash);
      console.log(hash);
      if(!!hash){
        //登录状态
        this.props.navigator.push({id: 'ResetLoginPwd1', params: {user_info:hash}})
      }else{
        this.props.navigator.push({id: "Login", params: {}})
      }
    })
  }

  to_reset_pay_pwd(){
    AsyncStorage.getItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
      let hash = JSON.parse(value)
      console.log(hash);
      if(!!hash){
        //登录状态
        this.props.navigator.push({id: 'ResetPayPwd1', params: {user_info:hash}})
      }else{
        this.props.navigator.push({id: "Login", params: {}})
      }
    })
  }

  render_list() {
    return(
      <List>
        <List.Item
          onClick={this.to_reset_login_pwd.bind(this)}
          arrow="horizontal"
        ><Text style={styles.content_text}>登录密码重置</Text></List.Item>

        <List.Item
          onClick={this.to_reset_pay_pwd.bind(this)}
          arrow="horizontal"
        ><Text style={styles.content_text}>支付密码重置</Text></List.Item>

        <List.Item
          onClick={()=> PushLogin.push_login_destination("PhoneChange",this.props.navigator)}
          arrow="horizontal"
        ><Text style={styles.content_text}>手机号变更</Text></List.Item>
      </List>
    )
  }

  render() {
    return(
      <View style={styles.root}>

        <BackNavBar component={this}>设置</BackNavBar>

        {this.render_list()}

        <View style={styles.bottom_box}>

          <Button
            style={styles.sign_out_btn}
            type="default"
            onClick={()=> {this.remove_data()}}
          >
            退出登录
          </Button>
        </View>

      </View>
    )
  }

}

export default Setting
