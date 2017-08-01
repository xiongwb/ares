import React from 'react'

import {
  Dimensions,
  Text,
  View,
  Alert,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native'

import {
  BasePage,
  BackNavBar,
  StringUtils,
} from 'AresComponent'

import {
  VERIFY
} from 'AresConstant'

import { createForm } from 'rc-form'
import Button from 'antd-mobile/lib/button'
import InputItem from 'antd-mobile/lib/input-item'
import Modal from 'antd-mobile/lib/modal'
import List from  'antd-mobile/lib/list'

import AresAPI from 'AresAPI'

//var { NativeModules } = require('react-native');

var full_height = Dimensions.get('window').height

console.disableYellowBox = true;
const Item = List.Item;

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
    flex: 1,
  },
  title_box: {
    height:100,
    justifyContent: "center",
    alignItems:'center',
  },
  title_text: {
    fontSize: 30,
    color:"#333333",
    marginTop:50,
  },
  sign_up_btn: {
    marginTop: 24,
    marginHorizontal: 15,
  },
  input_text: {
    fontSize: 14,
    color: "#3d4245",
  },
  check:{
    position: "absolute",
    right: 5,
    top: 0,
    bottom: 0,
    justifyContent: "center",

  }
});
var full_width = Dimensions.get('window').width
/**
*  注册流程页面 -> 填写手机号和密码的那一页
*  by fushang318
*/
class SignUpStep1 extends BasePage {
  constructor (props) {
    super(props)
    this.state = {
      sign_up_params_validate: false,
      //add  by rtt
      show_invitation_code:false
    }
  }

  on_change() {
    setTimeout(()=>{
      this.props.form.validateFields((error, value) => {
        if(error == null){
          this.setState({sign_up_params_validate: true})
        }else{
          this.setState({sign_up_params_validate: false})
        }
      });
    },0)
  }

  //add by rtt 第一次输入登录密码时调用
  on_change_Login_password() {
    setTimeout(()=>{
      this.props.form.validateFields((error, value) => {
        if(error == null){
          this.setState({sign_up_params_validate: true})
        }else{
          this.setState({sign_up_params_validate: false})
        }
      });
    },0)
    //add
    this.setState({show_invitation_code:true});
  }

  on_submit() {
    let form_data = this.props.form.getFieldsValue(["phone", "password", "invitation_code"]);

    let data_phone = StringUtils.phoneNumberHuman2Data(form_data.phone);
    let show_phone = StringUtils.phoneNumberData2Human(form_data.phone);

    const regexp=VERIFY.PHONE;
    const regexPWD = VERIFY.PWD;

    if (data_phone == '') {
      Alert.alert('错误提示', '请输入手机号', [{ text: '确定'}]);
      return;
    }
    if (regexp.test(data_phone) === false) {
      Alert.alert('错误提示', '请输入正确的手机号', [{ text: '确定'}]);
      return;
    }
    if (form_data.password == '') {
      Alert.alert('错误提示', '请输入密码', [{ text: '确定'}]);
      return;
    }
    if(regexPWD.test(form_data.password) === false){
      Alert.alert('错误提示', '密码必须为6-18位数字与字母组合', [{ text: '确定'}]);
      return
    }

    Alert.alert('确认手机号', `短信验证码将发送到你的手机\n+86 ${show_phone}`, [
      { text: '取消'},
      { text: '好的', onPress: () => {
          let params_data = {
            phone: data_phone,
            password: form_data.password,
            invitation_code: form_data.invitation_code,
          }
          AresAPI.Register.getVarCode({phone: data_phone,flag:3}).done((res_data_json, res)=>{
              if(res_data_json.retCode === 1){
                 this.props.navigator.push({id: "SignUpStep2", params: {data: params_data}})
              }else{
                  Alert.alert('错误提示', res_data_json.retMsg, [{ text: '确定'}]);
              }
            })
        }
      },
    ])
  }

  render() {
    const { getFieldProps } = this.props.form
    //add if-else by rtt
    if(this.state.show_invitation_code){
      return(
      <View style={styles.root}>
        <BackNavBar component={this} >登录</BackNavBar>

        <View style={styles.title_box}>
          <Text style={styles.title_text}>手机号注册</Text>
        </View>

        <View>
           <InputItem
            {...getFieldProps('phone', {
              initialValue: '',
              onChange: this.on_change.bind(this),
            })}
            placeholder="手机号"
            maxLength={13}
            labelNumber={5}
            type="phone"
          >
          手机号码
          </InputItem>

          <InputItem
            {...getFieldProps('password', {
              initialValue: '',
              onChange: this.on_change.bind(this),

            })}
            type="password"
            placeholder="请输入登录密码"
            labelNumber={5}

          >
          登录密码
          </InputItem>
          <InputItem
            {...getFieldProps('invitation_code', {
              initialValue: '',
              onChange: this.on_change.bind(this)
            })}
            placeholder="输入推荐码（非必填项）"
            labelNumber={5}
          >
          推荐码
          </InputItem>
        </View>

        <Button
          style={styles.sign_up_btn}
          type="primary"
          disabled={!this.state.sign_up_params_validate}
          onClick={this.on_submit.bind(this)}
        >
          注册
        </Button>

      </View>
    )

    }else{
      return(
      <View style={styles.root}>
        <BackNavBar component={this} >注册</BackNavBar>

        <View style={styles.title_box}>
          <Text style={styles.title_text}>手机号注册</Text>
        </View>

        <View>
           <InputItem
            {...getFieldProps('phone', {
              initialValue: '',
              onChange: this.on_change.bind(this),

            })}
            type="phone"
            placeholder="请输入手机号"
            maxLength={13}
            labelNumber={5}
          >
          手机号码
          </InputItem>

            <InputItem
              {...getFieldProps('password', {
                initialValue: '',
                onChange: this.on_change_Login_password.bind(this),

              })}
              type="password"
              placeholder="请输入登录密码"
              labelNumber={5}
              >
            登录密码
            </InputItem>
        </View>
        <TouchableOpacity>
        <Button
          style={styles.sign_up_btn}
          type="primary"
          disabled={!this.state.sign_up_params_validate}
          onClick={this.on_submit.bind(this)}
        >
          注册
        </Button>
        </TouchableOpacity>

      </View>
    )
    }
  }
}

export default createForm()(SignUpStep1)
