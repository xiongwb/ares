import React from 'react'

import {

  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
  TextInput,
   Alert,
} from 'react-native'

import { createForm } from 'rc-form'
import Icon from 'react-native-vector-icons/FontAwesome'

import List from 'antd-mobile/lib/list'
import InputItem from 'antd-mobile/lib/input-item'
import Button from 'antd-mobile/lib/button'
import Popup from 'antd-mobile/lib/popup'
import Modal from 'antd-mobile/lib/modal'

import {
  PopupNavbar,
  BackNavBar,
  DevelopTip,
  BasePage,
  Dialog,
  PasswordInput,
  AresTextInput,
} from 'AresComponent'


var money=500
var account="三类账户"


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

class Type2Account1 extends BasePage  {
   constructor (props) {
    super(props);
    this.state = {

      sign_up_params_validate: false,
   }
  }
   on_change(text) {
      if(text.length == 0){
          this.setState({sign_up_params_validate: false})
        }else{
          this.setState({sign_up_params_validate: true})
        }
  }


 on_Click(){
   this.refs.dialog.show();
  }

  render(){
     const { getFieldProps } = this.props.form;
  return(
       <View style={styles.root}>
        <BackNavBar component={this}>转入</BackNavBar>
          <View style={{alignItems:'center',marginTop:12}} >
            <Text style={{ fontSize:12,color:'#D3D3D3'}}>Ⅲ类转入到Ⅱ类账户</Text>
          </View> 
          <View style={{marginTop:12,marginBottom:33}}>         
            <AresTextInput editable={false} placeholderTextColor="#101010" placeholder={account} title="银行" borderTopWidth={0.5} borderBottomWidth={0.5}  />  
           </View>    
            <AresTextInput  borderWidth={0.5} title="金额" onChangeText={this.on_change.bind(this)} />        
          <View style={styles.button_box}>
            <Button type="primary"
             disabled={!this.state.sign_up_params_validate}
             onClick={this.on_Click.bind(this)}>确认转入</Button>
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
            this.props.navigator.push({id:'TurnToSuccess',params:{}})
          }}
        />
     </View>
    )
  }
}

export default createForm()(Type2Account1)
