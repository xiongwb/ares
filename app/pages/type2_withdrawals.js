import React from 'react'

import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableHighlight,
  TextInput,
   Alert,
   AsyncStorage
} from 'react-native'

// @陈耀霆，2转1提现页面
import { createForm } from 'rc-form'
import Icon from 'react-native-vector-icons/FontAwesome'
import AresAPI from 'AresAPI'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import Button from 'antd-mobile/lib/button'

import {
  BackNavBar,
  BasePage,
  Dialog,
  PasswordInput,
  AresTextInput,
} from 'AresComponent'

import {
  EVENT_EMITTER_CONST,
  STORAGE_KEYS,
  VERIFY,
} from 'AresConstant'

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

class Type2Withdrawals extends BasePage  {
   constructor (props) {
    super(props);
    this.state = {
      sign_up_params_validate: false,
      password:'',
      bal:'',
      account:'',
      phone:''
   }
  }
  onRight_ButtonClick(){
    this.refs.dialog.close()
        AresAPI.TranAcctSelf.tranAcctSelf2To1({
        phone:this.state.phone,
        custno:this.state.custno,
        acctno2:this.props.account2,
        paypwd:this.state.password,
        amt:this.state.bal
    }).done((res_json,res) => {
       if(res_json.retCode==1){
        this.setState({phone:''})
        this.setState({bal:''})
        this.setState({password:''})
        RCTDeviceEventEmitter.emit(EVENT_EMITTER_CONST.NEEDWALLETREQUEST, 'changeTaberBar');

        this.props.navigator.push({id:'WithdrawalsSuccess',params:{data:'提现'}})
         }else{

          Alert.alert('错误提示', res_json.retMsg,[{ text: '确定'}])
         }
       })
     }
  componentWillMount(){
  AsyncStorage.getItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
      let hash = JSON.parse(value)
      if (!!hash) {
        if (!!hash && !!hash.tokenModel) {
          this.setState({phone:hash.phone})
        }
        if (!!hash && !!hash.custNo) {
          this.setState({custno:hash.custNo})
          AresAPI.Card.cardFindBind({
              custNo:hash.custNo
            }).done((res_json, res) => {
               this.setState({cardNo:res_json.cardNo})
                AresAPI.Card.cardFindCardType({
                     cardNo:res_json.cardNo
                }).done((res_json, res) => {
                   this.setState({account:res_json.cardName})
              })
          })
        }
      }
    })
   }
  on_change(text) {
     this.setState({bal:text})
     if(text.length == 0){
          this.setState({sign_up_params_validate: false})
        }else{
          this.setState({sign_up_params_validate: true})
        }

  }


 on_Click(){
  // Keyboard.dismiss();
  const regexp=VERIFY.MONEY;
  if (regexp.test(this.state.bal) === false) {
    Alert.alert('提示', '对不起，金额只支持亿元以内精确到两位小数的纯数字', [{ text: '确定'}]);
    return;
  }
   this.refs.dialog.show();
  }

  render(){
     const { getFieldProps } = this.props.form;
  return(
       <View style={styles.root}>
        <BackNavBar component={this}>提现</BackNavBar>
          <View style={{alignItems:'center',marginTop:12}} >
            <Text style={{ fontSize:12,color:'#D3D3D3'}}>Ⅱ转入到银行卡类账户</Text>
          </View>
          <View style={{marginTop:12,marginBottom:33}}>
            <AresTextInput editable={false} maxLength={11} placeholderTextColor="#101010" placeholder={this.state.account} title="银行" borderTopWidth={0.5} borderBottomWidth={0.5}  />
          </View>
            <AresTextInput  borderWidth={0.5} title="金额" onChangeText={this.on_change.bind(this)} />
          <View style={styles.button_box}>
            <Button type="primary"
             disabled={!this.state.sign_up_params_validate}
             onClick={this.on_Click.bind(this)}>确认提现</Button>
          </View>
          <Dialog
            ref="dialog"
            title="请输入交易密码"
            content={
            <View style={{alignItems:'center'}}>
              <PasswordInput maxLength={6}
                 onEnd={(pwd)=>{this.setState({password:pwd})}}
              ></PasswordInput>
            </View>
          }
          leftButtonText="取消"
          rightButtonText="好的"
          onLeftButonClick={()=>{
            this.setState({password:""})
            this.refs.dialog.close()
          }}
          onRightButtonClick={()=>{this.onRight_ButtonClick()}}
        />
     </View>
    )
  }
}

export default createForm()(Type2Withdrawals)
