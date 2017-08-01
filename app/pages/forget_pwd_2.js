import React from 'react'

import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ART,
} from 'react-native'
import {
  BasePage,
  BackNavBar,
} from 'AresComponent'
import {
  VAR_CODE_FLAG,
} from 'AresConstant'
import Button from 'antd-mobile/lib/button'
import InputItem from 'antd-mobile/lib/input-item'
import AresAPI from 'AresAPI'
import dismissKeyboard from 'dismissKeyboard'

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#f5f5f9",
    flex: 1,
    flexDirection: "column",
  },
  message_box:{
    height:65,
    paddingTop:14,
    paddingBottom:14,
    flexDirection: "column",
    alignItems:'center',
    justifyContent:'space-between',
  },
  confirm_btn_box:{
    paddingTop: 15,
    paddingHorizontal: 16,
  },
  btn:{
    height:44,
  },
  tip:{
    fontSize:12,
    color:'#101010',
  },
  tip_checkCode:{
    color:'#108ee9',
  },
  tip_phone:{
    fontSize:13,
    color:'#101010',
  },

});

class ForgetPwd2 extends BasePage {
  constructor(props) {
    super(props);
    this.state={
      disabled:true,
      m:60,
    };
  }

  componentDidMount(){
    AresAPI.ResetLoginPwd.getVarCode({
      phone:this.props.phone,
      flag:VAR_CODE_FLAG.RESETLOGINPWD,
    }).done((res_json, res) => {
      if(res_json.retCode != 1){
        Alert.alert('错误提示', res_json.retMsg, [{ text: '确定'}])
      }
    })
  }

  setEnabled(value){
    this.setState({
      disabled: value.length>0?false:true,
      varCode:value,
    })
  }

  sendVarCode(){
    AresAPI.ResetLoginPwd.getVarCode({
      phone:this.props.phone,
      flag:VAR_CODE_FLAG.RESETLOGINPWD,
    }).done((res_json, res) => {
      if(res_json.retCode != 1){
        Alert.alert('错误提示', res_json.retMsg, [{ text: '确定'}])
      }
    })
    this.daojishi(60);
  }

  daojishi(m){
    if(m>0){
      setTimeout(()=>{
        m=m-1
        this.setState({m:m})
      }, 1000)
    }
  }

  submit(){
    dismissKeyboard()
    AresAPI.ResetLoginPwd.validateVarCode({
      phone:this.props.phone,
      flag:VAR_CODE_FLAG.RESETLOGINPWD,
      varCode:this.state.varCode
    }).done((res_json, res) => {
      if(res_json.retCode == 1){
        this.props.navigator.push({id:'ForgetPwd3',params:{phone:this.props.phone}})
      }else{
        Alert.alert('错误提示', res_json.retMsg, [{ text: '确定'}])
      }
    })
  }

  render() {
    let d;
    let t;
    let varCodeTextStyle;
    if(this.state.m==0){
      d=false;
      t='重发校验码';
      varCodeTextStyle={color:'#108EE9',fontSize:14};
    }else{
      d=true;
      t=this.state.m+'秒后重发校验码';
      varCodeTextStyle={color:'#cccccc',fontSize:14};
      this.daojishi(this.state.m);
    }
    const path = ART.Path();
    path.moveTo(1,1); //将起始点移动到(1,1) 默认(0,0)
    path.lineTo(1,40); //连线到目标点(300,1)
    return(
      <View style={styles.root}>
        <BackNavBar component={this}>重置登录密码</BackNavBar>
        <View style={styles.message_box}>
          <Text style={styles.tip}>
            我们已发送<Text style={styles.tip_checkCode}>校验码</Text>到您的手机
          </Text>
          <Text style={styles.tip_phone}>
            {this.props.phone}
          </Text>
        </View>
        <View style={{height:48, flexDirection:'row',backgroundColor:'#fff',borderWidth: 1,borderColor:'#bbbbbb',paddingHorizontal:16}}>
          <View style={{flex:1.5,justifyContent: 'center'}}>
            <Text style={{fontSize:14,color:'#000'}}>验证码</Text>
          </View>
          <View style={{flex:3,justifyContent: "center"}}>
            <TextInput
              style={{fontSize:14,padding:0}}
              keyboardType='numeric'
              onChangeText={this.setEnabled.bind(this)}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder='输入短信校验码'/>
          </View>
          <View style={{alignSelf:'center'}}>
            <ART.Surface width={1} height={40}>
              <ART.Shape d={path} stroke="#bbbbbb" strokeWidth={1} />
            </ART.Surface>
          </View>
          <View style={{flex:1.6,alignItems:'center',justifyContent: "center",marginLeft:10}}>
            <TouchableOpacity disabled={d} onPress={this.sendVarCode.bind(this)}>
              <Text style={varCodeTextStyle}>{t}</Text>
            </TouchableOpacity>
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
export default ForgetPwd2
