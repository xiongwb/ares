import React from 'react'

import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native'

import {
  BasePage,
  BackNavBar,
} from 'AresComponent'

import Button from 'antd-mobile/lib/button'
import InputItem from 'antd-mobile/lib/input-item'
import { createForm } from 'rc-form'

var full_height = Dimensions.get('window').height

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "column",
  },
  success_logo_box:{
    marginTop : 68,
    justifyContent: "center",
    alignItems:'center',
  },
  success_logo:{
    height:100,
    width:100,
  },
  success_message_box:{
    justifyContent: 'center',
    alignItems:'center',
  },
  success_message:{
    color:'#108ee9',
    fontSize:16,
    marginTop : 50,
    textAlign:'center',
  },
});

class ResetLoginPwd3 extends BasePage {
  constructor(props) {
    super(props);
    this.state={
      disabled:true
    };
  }

  onBack(){
    return this.props.navigator.popN(3);
  }

  render() {

    return(
      <View style={styles.root}>
        <BackNavBar component={this} backText='返回设置' ></BackNavBar>
        <View style={styles.success_logo_box}>
          <Image style={styles.success_logo} source={require('ares/app/assets/image/reset_login_pwd_success.png')} />
        </View>
        <View>
          <Text style={styles.success_message}>恭喜您！重置密码成功</Text>
        </View>
      </View>
    )
  }

}

export default ResetLoginPwd3
