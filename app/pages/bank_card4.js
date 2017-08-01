import React from 'react'

import {
  Text,
  View,
  StyleSheet,
  TextInput,
  AsyncStorage,
  Alert,
} from 'react-native'
/*绑定银行卡第五步骤的页面
    输入支付密码页面  */
 import {
  BasePage,
  BackNavBar,
  } from 'AresComponent'
 import {
  STORAGE_KEYS,
  COMMON_STYLES,
} from 'AresConstant'
import dismissKeyboard from 'dismissKeyboard'
import Button from 'antd-mobile/lib/button'
import InputItem from 'antd-mobile/lib/input-item'
import Checkbox from 'antd-mobile/lib/checkbox'
import { createForm } from 'rc-form'
import AresAPI from 'AresAPI'
const styles = StyleSheet.create({
  root: {
    backgroundColor: COMMON_STYLES.MAIN_BACKGROUND_COLOR,
    flex: 1,
    flexDirection: "column",
  },
  confirm_btn_box:{
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  checkbox_title:{
    fontSize:14,
    color:'#101010',
  },
  next_btn: {

   height:46,
   borderWidth: 1,
   backgroundColor:'#fff',
   borderColor:'#DDDDDD'
  },
});


class BankCard4 extends BasePage {
 constructor (props) {
    super(props)
    this.state = {
      fdisabled:true,
      inputType:'password',
      checkbox: false,
      paypwd:'',
      ifPwd:true,
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

 setEnabled(value){
    let b = value.length>0?false:true;
    this.setState({disabled: b});
  }

  setInputType(checked){
    console.log(checked);
    this.setState({
      ifPwd:!checked,
      checkbox: checked,
    })
  }
//当进入该页面的时候，调用这个方法，
componentWillMount() {
  let reg_data = this.props.data
   AsyncStorage.getItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{

      let hash = JSON.parse(value)
      if (!!hash) {
        if (!!hash && !!hash.custNo) {
          reg_data["custno"] = hash.custNo
          //获取到后台的个人资料手机号。
          AresAPI.Person.getPersonInfoPersonInfo({custno:hash.custNo}).done((res_json, res) => {
                    if(res_json.retCode == 1){
                      this.setState({phone:res_json.phone})
                    }else{
                      Alert.alert('错误提示', res_json.retMsg, [{ text: '确定'}])
                    }
                  })

        }
      }
    })

  }
  //当点击下一步的时候，调用这个方法，
on_push() {
    dismissKeyboard()
    this.setState({disabled:true})
//把值全部放入到reg_data里面，
   let reg_data = this.props.data
    reg_data["paypwd"] = this.state.paypwd
    reg_data["phone"] = this.state.phone
    //调用绑定银行卡的接口，当返回值为已1的时候跳转到下一页面。或者提示出错信息
    AresAPI.Card.cardOpenAcct(reg_data).done((res_json, res) => {
      if(res_json.retCode == 1){
        //这个方法把获取到的二三类账号存储到本地，
           AsyncStorage.getItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
              let hash = JSON.parse(value)
              if (!!hash) {
                  hash['acctNo2'] = res_json.acct2
                  hash['acctNo3'] = res_json.acct3
              }
             AsyncStorage.setItem(STORAGE_KEYS.SIGN_TOKEN, JSON.stringify(hash), (error)=>{})
           })

        this.props.navigator.push({id: "BankCard5", params: {data: this.props.data}})
      }else{
        Alert.alert('提示5', res_json.retMsg, [{ text: '确定',onPress:()=>{this.setState({disabled:false})}}])
      }
    })
 }
  render() {
    const { getFieldProps } = this.props.form

    return(
      <View style={styles.root}>
        <BackNavBar component={this}   >设定支付密码</BackNavBar>
        <View style={{ paddingTop: 26,}}>
          <View  style={styles.next_btn}>
            <TextInput
              style={{backgroundColor:'#fff',marginHorizontal: 16,flex:1,padding:0}}
              onChangeText={(text) => {this.setState({text});this.setState({paypwd:text})}}
              underlineColorAndroid='rgba(0,0,0,0)'
              keyboardType='numeric'
              placeholder='创建支付密码'
              secureTextEntry={true}
              maxLength={6}
            />
          </View>
        </View>
        <View style={{paddingTop: 4,marginHorizontal: 16,}}>
          <Text style={{fontSize:12,color:'#b3b3b3',}}>
            密码由6位纯数字组成
          </Text>
        </View>
        <View style={styles.confirm_btn_box}>
          <Button
            type='primary'
            disabled={this.state.disabled}
            onClick={this.on_push.bind(this)}>
           下一步
          </Button>
        </View>
      </View>
    )
  }

}

export default createForm()(BankCard4)
