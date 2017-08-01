import React from 'react'

import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  Alert,
  Image,
  //NativeModules,
} from 'react-native'

import {
  BasePage,
  BackNavBar,
  StringUtils,
  Loading,
} from 'AresComponent'

import { createForm } from 'rc-form'
import Button from 'antd-mobile/lib/button'
import InputItem from 'antd-mobile/lib/input-item'

import AresAPI from 'AresAPI'

var full_height = Dimensions.get('window').height

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
    flex: 1,
  },
  title_box: {
    height:100,
    justifyContent: "center",
    alignItems:'center',
    marginTop:50,
  },
  title_text: {
    fontSize: 30,
    color: "#333333",
  },
  country_code_text:{
    fontSize:16,
    color: "#101010",
  },
  phone_text: {
    fontSize: 22,
    color: "#101010",
  },
  check_code:{
    marginTop: 41,
  },
  next_btn: {
    marginTop: 60,
    marginHorizontal: 15,
  }
});

/**
*  注册流程页面 -> 填写手机验证码的那一页
*  by fushang318
*/
class SignUpStep2 extends BasePage {
  constructor (props) {
    super(props)
    this.state = {
      form_validate: false,
      fullMessage:null
    }
  }

  on_change() {
    setTimeout(()=>{
      this.props.form.validateFields((error, value) => {
        if(error == null){
          this.setState({form_validate: true})
        }else{
          this.setState({form_validate: false})
        }
      });
    },0)
  }

  on_submit() {
    let input_var_code   = this.props.form.getFieldsValue(["verify_code"]).verify_code
    if(input_var_code == null){
      return true
    }

    // this.get_loading().show()

    AresAPI.Register.validateVarCode({
      phone: this.props.data.phone,
      varCode: input_var_code,
      flag:3,
    }).done((res_json, res) => {
      if(res_json.retCode == 1){
        this.props.data.var_code = input_var_code
        this.props.navigator.push({id: "SignUpStep3", params: {data: this.props.data}})
      }else{
        Alert.alert('错误提示', res_json.retMsg, [{ text: '确定'}])
      }
    })

  }

  render() {
    const { getFieldProps } = this.props.form
    let show_phone = StringUtils.phoneNumberData2Human( this.props.data.phone)

    return(
      <View style={styles.root}>

        <BackNavBar component={this} >填写验证码</BackNavBar>

        <View style={styles.title_box}>
          <Text style={styles.title_text}>短信校验码已发送</Text>
          <Text style={styles.phone_text} >
            <Text style={styles.country_code_text}>+86</Text>
            {show_phone}
          </Text>
        </View>

        <View  style={styles.check_code}>
          <InputItem
            {...getFieldProps('verify_code', {
              initialValue: '',
              onChange: this. on_change.bind(this),
              rules: [{required: true}]
            })}
            placeholder="请填写校验码"
          >
          校验码
          </InputItem>
        </View>

        <Button
          style={styles.next_btn}
          type="primary"
          disabled={!this.state.form_validate}
          onClick={this.on_submit.bind(this)}
        >
          下一步
        </Button>
      </View>
    )
  }
}

export default createForm()(SignUpStep2)
