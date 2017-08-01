import React from 'react'

import {
  Alert,
  Text,
  TextInput,
  View,
  StyleSheet,
} from 'react-native'
import {
  BasePage,
  BackNavBar,
} from 'AresComponent'
import {
  VERIFY
} from 'AresConstant'

import Button from 'antd-mobile/lib/button'
import InputItem from 'antd-mobile/lib/input-item'
import Checkbox from 'antd-mobile/lib/checkbox'
import AresAPI from 'AresAPI'
import dismissKeyboard from 'dismissKeyboard'

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#f5f5f9",
    flex: 1,
    flexDirection: "column",
  },
  message_box:{
    paddingTop:15,
    paddingBottom:15,
    marginHorizontal:16,
    flexDirection: "column",
    alignItems:'flex-start',
    justifyContent:'center',
  },
  tip:{
    fontSize:12,
    color:'#101010',
    marginBottom:5,
  },
  phone:{
    fontSize:14,
    color:'#101010',
  },
  confirm_btn_box:{
    paddingTop: 15,
    paddingHorizontal: 16,
  },
  btn:{
    height:44,
  },
  pwd_tip_box:{
    marginHorizontal:16,
  },
  pwd_tip:{
    fontSize:12,
  },
  checkbox_title:{
    fontSize:14,
    color:'#101010',
  },

});

class ForgetPwd3 extends BasePage {
  constructor(props) {
    super(props);
    this.state={
      disabled:true,
      ifPwd:true,
      checkbox:false,
    };
  }

  setEnabled(value){
    let b = value.length>0?false:true;
    this.setState({disabled: b, pwd:value});
  }

  setInputType(checked){
    check=this.state.checkbox
    this.setState({
      ifPwd:checked===true?false:true,
      checkbox: checked,
    })
  }

  submit(){
    dismissKeyboard()
    const regexPWD = VERIFY.PWD;
    if(regexPWD.test(this.state.pwd) === false){
      Alert.alert('错误提示', '新密码必须为6-18位数字与字母组合', [{ text: '确定'}]);
      return
    }
    AresAPI.ResetLoginPwd.forgetLoginPwd({
        phone:this.props.phone,
        pwd:this.state.pwd,
        classes:'T'
      }).done((res_json, res) => {
        if(res_json.retCode == 1){
          this.props.navigator.push({id:'ForgetPwd4',params:{}})
        }else{
          Alert.alert('错误提示', res_json.retMsg, [{ text: '确定'}])
        }
      })
  }

  render() {
    return(
      <View style={styles.root}>
        <BackNavBar component={this}>重置登录密码</BackNavBar>
        <View style={styles.message_box}>
          <Text style={styles.tip}>
            新登录密码仅用于账户登录
          </Text>
          <Text style={styles.phone}>
            账户  {this.props.phone}
          </Text>
        </View>
        <View style={{height:48,backgroundColor:'#fff',marginBottom:10,borderWidth: 1,borderColor:'#bbbbbb',paddingHorizontal:16,justifyContent: "center"}}>
          <TextInput
              style={{fontSize:14,padding:0}}
              onChangeText={this.setEnabled.bind(this)}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder='新密码'
              secureTextEntry={true}
              maxLength={18}
              />
        </View>
        <View style={styles.pwd_tip_box}>
          <Text style={styles.pwd_tip}>
            密码由6-18位英文字母，数字或者符号组成
          </Text>
        </View>

        <View style={styles.confirm_btn_box}>
          <Button
            style={styles.btn}
            type='primary'
            disabled={this.state.disabled}
            onClick={this.submit.bind(this)}>
           完成
           </Button>
         </View>
      </View>
    )
  }

}
export default ForgetPwd3
