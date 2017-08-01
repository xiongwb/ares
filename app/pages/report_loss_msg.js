import React from 'react'

import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  ART,
} from 'react-native'

import {
  BasePage,
  BackNavBar,
} from 'AresComponent'

import Icon from 'react-native-vector-icons/FontAwesome'
import Button from 'antd-mobile/lib/button'
import InputItem from 'antd-mobile/lib/input-item'
import Popup from 'antd-mobile/lib/popup'
import { createForm } from 'rc-form'

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#f5f5f9",
    flex: 1,
    flexDirection: "column",
  },
  message_box:{
    height:65,
    paddingTop:16,
    paddingBottom:16,
    flexDirection: "column",
    alignItems:'center',
    justifyContent:'space-between',
  },
  confirm_btn_box:{
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  dialog_root:{
    height:277,
    flex: 1,
  },
  confirm_close_box:{
    paddingHorizontal: 10,
    justifyContent:'flex-end',
    alignItems:'flex-start',
  },
  confirm_msg_box:{
    marginTop:63,
    alignItems:'center',
    marginHorizontal:16,
  },
  confirm_msg:{
    fontSize:16,
  },
  dialog_btn_box:{
    paddingHorizontal: 65,
    marginTop:74,
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
  resendMsg_box:{
    marginTop:10,
    alignItems:'center',
    justifyContent:'center',
  },
  resendMsg:{
    fontSize:15,
    color:'#108ee9',
  },
  
});

class ReportLossMsg extends BasePage {
  constructor(props) {
    super(props);
    this.state={
      disabled: true
    };
  }

  setEnabled(value){
    this.setState({disabled: value.length>0?false:true})
  }

  confirm(){
    Popup.show(<View style={styles.dialog_root}>
                  <View style={styles.confirm_close_box}> 
                      <TouchableOpacity onPress={() => Popup.hide()}>
                        <Icon name='times' size={25} color="#A9A9A9" />
                      </TouchableOpacity>
                  </View>
                  <View style={styles.confirm_msg_box}>
                    <Text style={styles.confirm_msg}>冻结后帐号无法登录，只有解冻后方可正常登录</Text>
                  </View>
                  <View style={styles.dialog_btn_box}>
                    <Button type='primary' onClick={this.success.bind(this)}>确认冻结</Button>
                  </View>
              </View>,{maskClosable:true,animationType:'slide-up'})
  }

  success(){
    Popup.hide()
    this.props.navigator.push({id:'ReportLossSuccess',params:{}})
  }

  render() {
    const { getFieldProps } = this.props.form
    const path = ART.Path();
    path.moveTo(1,1); //将起始点移动到(1,1) 默认(0,0)
    path.lineTo(1,40); //连线到目标点(300,1)
    return(
      <View style={styles.root}>
        <BackNavBar component={this}>验证手机号</BackNavBar>
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
            <TouchableOpacity >
              <Text style={{color:'#108EE9',fontSize:14}}>重发校验码</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.confirm_btn_box}>
          <Button
            type='primary'
            disabled={this.state.disabled}
            onClick={this.confirm.bind(this)}>
           下一步
           </Button>
         </View>
      </View>
    )
  }

}
export default createForm()(ReportLossMsg)