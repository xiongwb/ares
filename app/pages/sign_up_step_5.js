import React from 'react'

import {
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native'

import {
  BasePage,
  BackNavBar,
  StringUtils,
} from 'AresComponent'

import Button from 'antd-mobile/lib/button'

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "column",
  },
  sign_up_btn: {
    marginTop: 24,
    marginHorizontal: 15,
  },
  phone_text:{
    fontSize:30,
    color:"#101010",
    textAlign:'center',
    marginTop: 20,
    marginBottom:0,
    paddingBottom:0,
  },
  content_text:{
    marginTop: 98,
    fontSize:16,
    color:"#101010",
    textAlign:'center',
    marginBottom: 65,

  },
});

/**
*  注册流程页面 -> 手机号被注册的那一页
*  by rtt
*/
class SignUpStep5 extends BasePage {

  render() {
    let show_phone = StringUtils.phoneNumberData2Human( this.props.data.phone)
    return(
      <View style={styles.root}>
        <BackNavBar component={this} backText='返回' >确认手机号</BackNavBar>
        <Text style={styles.phone_text}>{show_phone}</Text>
        <Text style={styles.content_text}>本手机号已经被注册，请确认是否您的手机号</Text>
        <Button
          style={styles.sign_up_btn}
          type="primary"
          onClick={e => this.props.navigator.push({id:"Login",params:{}})}
          >
          是我的，立即登录
        </Button>
        <Button
          style={styles.sign_up_btn}
          type="ghost"
          onClick={e => this.props.navigator.push({id:"SignUpStep1",params:{}})}
        >
        换个号码，继续注册
        </Button>
      </View>
    )
  }
}

export default SignUpStep5
