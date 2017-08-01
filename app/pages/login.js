import React from 'react'

import {
  Dimensions,
  Text,
  Image,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native'
import {
  BasePage,
  BackNavBar,
  NavigatorUtils,
  Loading,
  DeviceUtils,
  StringUtils,
} from 'AresComponent'
import {
  EVENT_EMITTER_CONST,
  STORAGE_KEYS,
  VERIFY
} from 'AresConstant'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import Button from 'antd-mobile/lib/button'
import InputItem from 'antd-mobile/lib/input-item'
import { createForm } from 'rc-form'

import AresAPI from 'AresAPI'

var full_height = Dimensions.get('window').height

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
    flex: 1,
  },
  logo_box:{
    height: full_height/3,
    justifyContent: "center",
    alignItems:'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  buttons_box:{
    paddingTop: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  sign_up_btn:{
    marginRight: 10,
    flex: 1,
  },
  sign_in_btn:{
    flex: 1,
  },
  forgetPwd_box:{
    paddingHorizontal:10,
    alignItems:'flex-end',
  },
  forgetPwd:{
    color:'#41C4FE',
    fontSize:15,
  },
  aid_kit_box: {
      flexDirection: "row",
      alignItems: "center",
  },
  aid_kit:{
    fontSize: 16,
    color: '#fff',
  },
});

/**
*  登录页面
*  by fushang318
*/
class Login extends BasePage {


  sign_in() {

    // this.get_loading().show();
    let data = this.props.form.getFieldsValue(["phone", "password"]);
    console.log(data);
    const phone = StringUtils.phoneNumberHuman2Data(data.phone);
    const password = data.password;
    const regexp=VERIFY.PHONE;
    console.log(phone);
    if (phone == '') {
      Alert.alert('错误提示', '请输入手机号', [{ text: '确定'}]);
      return;
    }
    if (regexp.test(phone) === false) {
      Alert.alert('错误提示', '请输入正确的手机号', [{ text: '确定'}]);
      return;
    }
    if (password == '') {
      Alert.alert('错误提示', '请输入密码', [{ text: '确定'}]);
      return;
    }



    if(StringUtils.phoneNumberHuman2Data(data.phone) == ''||data.password == ''){
      Alert.alert('错误提示', '请正确填写登陆信息', [{ text: '确定'}])
      return
    }
    this.get_loading().show()
    let post_data = {
      phone: phone,
      pwd: password,
      classes:'T',
      phonename: DeviceUtils.getPhoneName()
    };
    AresAPI.Auth.signIn(post_data).done((res_data, res)=>{
      if(res_data.retCode == 1){
        console.log(res_data);
        AsyncStorage.setItem(STORAGE_KEYS.SIGN_TOKEN, JSON.stringify(res_data), (error)=>{
          this.get_loading().dismiss()
          //登录成功后更改我的界面
          RCTDeviceEventEmitter.emit(EVENT_EMITTER_CONST.DIDLOGINSUCCESS, 'login');
          //登录成功后钱包首页接口
          RCTDeviceEventEmitter.emit(EVENT_EMITTER_CONST.NEEDWALLETREQUEST, 'changeTaberBar');
          NavigatorUtils.popToRoute(
            this.props.navigator,
            {id: 'Dashboard'}
          )
        })
      }else{
        this.get_loading().dismiss()
        Alert.alert('错误提示', res_data.retMsg, [{ text: '确定'}])
      }
    })
  }

  get_loading() {
    return this.refs['loading']
  }

  render() {
    const { getFieldProps } = this.props.form

    return(
      <View style={styles.root}>
        <BackNavBar
          component={this}

          >登录</BackNavBar>

        <View style={styles.logo_box}>
          <Image style={styles.logo} source={require('ares/app/assets/image/111.png')} />
        </View>

        <View>
          <InputItem
            {...getFieldProps('phone', {
              initialValue: '',
            })}
            type="phone"
            placeholder="手机号"
            maxLength={13}
          >
          账号
          </InputItem>
          <InputItem
            {...getFieldProps('password', {
              initialValue: '',
            })}
            type="password"
            placeholder="请输入密码"
          >
          密码
          </InputItem>
        </View>
        <View style={styles.forgetPwd_box}>
          <Text onPress={()=>this.props.navigator.push({id:'ForgetPwd1',params:{}})} style={styles.forgetPwd}>忘记密码</Text>
        </View>
        <View style={styles.buttons_box}>
          <Button
            style={styles.sign_up_btn}
            type="ghost"
            onClick={e => this.props.navigator.push({id: "SignUpStep1", params: {}})}
          >
            注册
          </Button>

          <Button
            style={styles.sign_in_btn}
            type="primary"
             onClick={e => this.sign_in()}
          >
            登录
          </Button>
        </View>
        <Loading ref={'loading'} />
      </View>
    )
  }
}

export default createForm()(Login)
