import React from 'react'

import {
  Alert,
  Text,
  TextInput,
  View,
  StyleSheet,
  AsyncStorage,
} from 'react-native'

import {
  BasePage,
  BackNavBar,
  NavigatorUtils,
} from 'AresComponent'

import {
  STORAGE_KEYS,
  QRCODE_METHOD,
  VERIFY,
} from 'AresConstant'

import Button from 'antd-mobile/lib/button'
import AresAPI from 'AresAPI'
import dismissKeyboard from 'dismissKeyboard'

const styles = StyleSheet.create({
  root: {
    backgroundColor:'#f5f5f9',
    flex: 1,
  },

});

const barCodeContent='';
const qrCodeContent='';


class SetMoneyCollection extends BasePage {
  constructor(props) {
    super(props);
    this.state={
      disabled:true,
      data2:'',
    };
  }

  componentWillMount(){
    AsyncStorage.getItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
     let hash = JSON.parse(value)
     if (!!hash) {
       if(!!hash && !!hash.custNo){
         this.setState({custno:hash.custNo})
         AresAPI.FindAcct.findacctacct2List({
          custno:hash.custNo
         }).done((res_json,res) => {
           for(let i = 0;i<res_json.findAcctList.length;i++){
             if(res_json.findAcctList[i] != ''){
               this.setState({data2:res_json.findAcctList[i].acctno})
             }
           }
           console.log(res_json.findAcctList);
        })
  }
}
})
}

  on_change(value){
    this.setState({disabled: value.length>0?false:true,money:value})
  }

  set_money(){
    dismissKeyboard()
    const regexp=VERIFY.MONEY;
    if (regexp.test(this.state.money) === false) {
      Alert.alert('提示', '对不起，金额只支持亿元以内精确到两位小数的纯数字', [{ text: '确定'}]);
      return;
    }
    AsyncStorage.getItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
      let hash = JSON.parse(value)
      if(!!hash){
        //登录状态

        AresAPI.QRCode.generateCode({
          brcno:hash.brcNo||'1',
          acct2:this.state.data2,
          method:QRCODE_METHOD.COLLECTION,
          amt:this.state.money==null||this.state.money==0?0:this.state.money,
          //custno:hash.custNo,
        }).done((res_json, res) => {
          if(res_json.retCode == 1){
            this.props.qrCode.flag='2'
            NavigatorUtils.popToRoute(this.props.navigator,{id:'CollectionCode',params:{arrayQRcode:res_json.arrayQRcode,money:this.state.money==null||this.state.money==0?0:this.state.money}})
          }else{
            Alert.alert('错误提示', res_json.retMsg, [{ text: '确定'}])
          }
        })
      }
    })
  }

  render() {
    return (
      <View style={styles.root}>
        <BackNavBar component={this} backText='取消'>设置金额</BackNavBar>
        <View style={{flexDirection:'row',height:48,marginTop: 16,backgroundColor:'#fff',marginBottom:10,borderWidth: 1,borderColor:'#bbbbbb',paddingHorizontal:16}}>
          <View style={{flex:1,justifyContent: 'center'}}>
            <Text style={{fontSize:14,color:'#000'}}>金额(元)</Text>
          </View>
          <View style={{flex:3,justifyContent: "center"}}>
            <TextInput
                style={{fontSize:14,padding:0,flex:1}}
                onChangeText={this.on_change.bind(this)}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder='请填写金额'
                keyboardType='numeric'
                maxLength={11}
                />
          </View>
        </View>
        <View style={{marginTop: 13,marginHorizontal:16}}>
          <Button
            style={{height:44}}
            type='primary'
            disabled={this.state.disabled}
            onClick={this.set_money.bind(this)}>
           确定
          </Button>
        </View>
      </View>
    )
  }
}

export default SetMoneyCollection
