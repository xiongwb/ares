import React from 'react'

import {
  Text,
  View,
  Alert,
  TextInput,
  StyleSheet,
} from 'react-native'
import {
  BasePage,
  BackNavBar,
} from 'AresComponent'
import {
  COMMON_STYLES,
  STORAGE_KEYS,
  VERIFY,
  EVENT_EMITTER_CONST,
} from 'AresConstant'
import Button from 'antd-mobile/lib/button'
import InputItem from 'antd-mobile/lib/input-item'
import dismissKeyboard from 'dismissKeyboard'
import AresAPI from 'AresAPI'
const styles = StyleSheet.create({
  root: {
    backgroundColor: "#f5f5f9",
    flex: 1,
  },
  confirm_btn_box:{
    marginTop: 13,
    marginHorizontal:16,
  },
  btn:{
    height:44,
  },
});

class ForgetPwd1 extends BasePage {
  constructor(props) {
    super(props);
    this.state={
      disabled:true,
      phone:'',
    };
  }

  on_change(value){
    this.setState({disabled: value.length==11?false:true,phone:value})
  }

  submit(){
    dismissKeyboard()

    const regexp=VERIFY.PHONE;

    if (this.state.phone == '') {
      Alert.alert('错误提示', '请输入手机号', [{ text: '确定'}]);
      return;
    }
    if (regexp.test(this.state.phone) === false) {
      Alert.alert('错误提示', '请输入正确的手机号', [{ text: '确定'}]);
      return;
    }
    AresAPI.PhoneVailidController.phoneVaild({
     phone:this.state.phone,
     classes:'T',
    }).done((res_json,res) => {
      console.log(res_json);
      if(res_json.retCode === 1){
        this.props.navigator.push({id:'ForgetPwd2',params:{phone:this.state.phone}})
      }else {
        Alert.alert('错误提示', '对不起，没有查询到您的手机号，请核对号码后再次尝试', [{ text: '确定'}]);
      }
   })
  }

  render() {

    return(
      <View style={styles.root}>
        <BackNavBar component={this}>重置登录密码</BackNavBar>
        <View style={{flexDirection:'row',height:48,marginTop: 16,backgroundColor:'#fff',marginBottom:10,borderWidth: 1,borderColor:'#bbbbbb',paddingHorizontal:16}}>
          <View style={{flex:1,justifyContent: 'center'}}>
            <Text style={{fontSize:14,color:'#000'}}>账号</Text>
          </View>
          <View style={{flex:5,justifyContent: "center"}}>
            <TextInput
                style={{fontSize:14,padding:0}}
                onChangeText={this.on_change.bind(this)}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder='输入手机号'
                keyboardType='numeric'
                maxLength={11} 
                secureTextEntry={this.state.ifPwd}/>
          </View>
        </View>
        <View style={styles.confirm_btn_box}>
          <Button
            style={styles.btn}
            type='primary'
            disabled={this.state.disabled}
            onClick={this.submit.bind(this)}>
           下一步
           </Button>
         </View>
      </View>
    )
  }

}
export default ForgetPwd1
