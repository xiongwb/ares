import React from 'react'

import {
  Alert,
  TextInput,
  Text,
  View,
  StyleSheet,
} from 'react-native'

import {
  VERIFY
} from 'AresConstant'

import {
  BasePage,
  BackNavBar,
} from 'AresComponent'

import Button from 'antd-mobile/lib/button'
import InputItem from 'antd-mobile/lib/input-item'
import Checkbox from 'antd-mobile/lib/checkbox'
import AresAPI from 'AresAPI'
import dismissKeyboard from 'dismissKeyboard'

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#f5f5f9",
    flex: 1,
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
  },
  input_box:{
    backgroundColor:'#fff',
    marginBottom:10,
    borderWidth: 1,
    borderColor:'#bbbbbb',
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
  confirm_btn_box:{
    paddingTop: 15,
    marginHorizontal:16,
  },
  btn:{
    height:44,
  },
});

class ResetLoginPwd2 extends BasePage {
  constructor(props) {
    super(props);
    this.state={
      oldPwd:null,
      newPwd:null,
      disabled:true,
      ifPwd:true,
      checkbox:false,
    };
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
    if(regexPWD.test(this.state.newPwd) === false){
      Alert.alert('错误提示', '新密码必须为6-18位数字与字母组合', [{ text: '确定'}]);
      return
    }
    let userInfo = this.props.user_info;
    console.log(userInfo);
    if(userInfo){
      AresAPI.ResetLoginPwd.resetLoginPwd({
        brcno:userInfo.brcNo||'1',
        phone:userInfo!=null?userInfo.phone:null,
        custno:userInfo.custNo,
        oldpwd:this.state.oldPwd,
        newpwd:this.state.newPwd,
        flag:'1',
        classes:'T',
      }).done((res_json, res) => {
        if(res_json.retCode == 1){
          this.props.navigator.push({id:'ResetLoginPwd3',params:{}})
        }else{
          Alert.alert('错误提示', res_json.retMsg, [{ text: '确定'}])
        }
      })
    }else{
      Alert.alert('错误提示', '尚未登录', [{ text: '确定'}])
    }
  }

  render() {
    let disabled = true;
    if(this.state.oldPwd!=null&&this.state.oldPwd.length>0&&this.state.newPwd!=null&&this.state.newPwd.length>0){
      disabled = false;
    }
    return(
      <View style={styles.root}>
        <BackNavBar component={this}>登录密码重置</BackNavBar>
        <View style={styles.message_box}>
          <Text style={styles.tip}>
            新登录密码仅用于账户登录
          </Text>
        </View>
        <View style={{height:48,backgroundColor:'#fff',marginBottom:10,borderWidth: 1,borderColor:'#bbbbbb',paddingHorizontal:16,justifyContent: "center"}}>
          <TextInput
              style={{fontSize:14,padding:0}}
              onChangeText={(value)=>this.setState({oldPwd: value})}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder='旧密码'
              secureTextEntry={true}
              />
        </View>
        <View style={{height:48,backgroundColor:'#fff',marginBottom:10,borderWidth: 1,borderColor:'#bbbbbb',paddingHorizontal:16,justifyContent: "center"}}>
          <TextInput
              style={{fontSize:14,padding:0}}
              onChangeText={(value)=>this.setState({newPwd: value})}
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
            disabled={disabled}
            onClick={this.submit.bind(this)}>
           完成
           </Button>
         </View>
      </View>
    )
  }

}

export default ResetLoginPwd2
