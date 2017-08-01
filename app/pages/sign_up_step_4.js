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
} from 'AresComponent'

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "column",
  },
  success_logo_box:{
    marginTop : 60,
    justifyContent: "center",
    alignItems:'center',
  },
  content_text: {
    fontSize: 16,
    color: "#108EE9",
    textAlign:'center',
  },
});

/**
*  注册流程页面 -> 注册成功的那一页
*  by fushang318
*/
class SignUpStep4 extends BasePage {
  onBack() {
    return this.props.navigator.popN(4)
  }

  render() {
    return(
      <View style={styles.root}>
        <BackNavBar component={this} backText='返回登录页' >注册成功</BackNavBar>
        <View style={styles.success_logo_box}>
          <Image source={require('ares/app/assets/image/reset_login_pwd_success.png')} style={{width:100,height:100}}/>
        </View>
        <View style={{marginTop : 50,}}>
          <Text style={styles.content_text}>恭喜您！注册成功</Text>
        </View>
      </View>
    )
  }
}

export default SignUpStep4
