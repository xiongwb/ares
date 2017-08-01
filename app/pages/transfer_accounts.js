import React from 'react'

import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
   TextInput,
   Alert
} from 'react-native'

import {
  BasePage,
  BackNavBar,
  PopupNavbar,
  DevelopTip,
  PasswordInput,
  AresTextInput,
  Dialog,
} from 'AresComponent'

import List from 'antd-mobile/lib/list'
import InputItem from 'antd-mobile/lib/input-item'
import { createForm } from 'rc-form'
import Button from 'antd-mobile/lib/button' 
import Popup from 'antd-mobile/lib/popup'
import Icon from 'react-native-vector-icons/FontAwesome'
import Modal from 'antd-mobile/lib/modal'

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#F5F5F9",
    flex: 1,
  },
  button_box: {
   marginTop:30,
   marginHorizontal:15,
  },
  text_fontSize: {
  fontSize:16,
  }
});
class TransferAccounts extends BasePage  {
   constructor (props) {
    super(props);
    this.state = {     
      sign_up_params_validate: false,
      name:0,
      acct:0,
      money:0,
   }
  }


on_Click(){
    this.refs.dialog.show();
}

on_Change_name(text){
     this.setState({name:text})
   
    if(text==0||this.state.acct==0||this.state.money==0){
      this.setState({sign_up_params_validate: false})
    }else{
      this.setState({sign_up_params_validate: true})
    }
 }
 on_Change_acct(text){
    this.setState({acct:text})
    if(this.state.name==0||text==0||this.state.money==0){
      this.setState({sign_up_params_validate: false})
    }else{
      this.setState({sign_up_params_validate: true})
    }
 } 
 on_Change_money(text){
    this.setState({money:text})
    if(this.state.name==0||this.state.acct==0||text==0){
      this.setState({sign_up_params_validate: false})
    }else{
      this.setState({sign_up_params_validate: true})
    }
 }  
  render(){
    const { getFieldProps } = this.props.form;

  return(
      <View style={styles.root}>
        <BackNavBar component={this}>转账</BackNavBar>
           <View style={{marginTop:16}}>
              <AresTextInput placeholder="收款人姓名" title="姓名" borderTopWidth={0.5}  onChangeText={this.on_Change_name.bind(this)} />
              <AresTextInput placeholder="收款人储蓄卡号" title="卡号" borderTopWidth={0.5} onChangeText={this.on_Change_acct.bind(this)} />
             <AresTextInput editable={false} placeholderTextColor="#101010" placeholder="xxx银行" title="银行" borderTopWidth={0.5} borderBottomWidth={0.5}  />
            </View>
            <View style={{marginTop:20}}>
              <AresTextInput  borderWidth={0.5} title="金额" onChangeText={this.on_Change_money.bind(this)} /> 
           </View>
          <View style={styles.button_box}>
            <Button type="primary" 
            disabled={!this.state.sign_up_params_validate} 
            onClick={this.on_Click.bind(this)}>下一步</Button>
          </View>
        <Dialog
          ref="dialog"
          title="请输入交易密码"

          content={
            <View style={{alignItems:'center'}}>
              <PasswordInput maxLength={6}></PasswordInput>
            </View>
          }
          leftButtonText="取消"
          rightButtonText="好的"
          onLeftButonClick={()=>{
            this.setState({text: ""})
            this.refs.dialog.close()
       
          }}
          onRightButtonClick={()=>{
            this.refs.dialog.close()
         
            this.props.navigator.push({id:'TransferSuccess',params:{}})
          }}
        />
     </View>
    )
  }
}

export default createForm()(TransferAccounts)



