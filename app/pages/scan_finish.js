import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  ART,
  Dimensions,
  TextInput,
  AsyncStorage,
} from 'react-native'

import {
  BasePage,
  BackNavBar,
  StringUtils,
  PasswordInput,
  Dialog,
} from 'AresComponent'

import {
  STORAGE_KEYS,
  EVENT_EMITTER_CONST,
} from 'AresConstant'

import Icon from 'react-native-vector-icons/FontAwesome'
import Button from 'antd-mobile/lib/button'
import AresAPI from 'AresAPI'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'

var full_width = Dimensions.get('window').width

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header : {
    backgroundColor: '#F5F5F5',
    height:30,
    justifyContent:'center',
  },
  row:{
    flex:1,
    backgroundColor:'#ffffff',
    flexDirection:'row',
    height:40,
    alignItems:'center',
    marginLeft:15,
  }
});

class ScanFinish extends BasePage {
  constructor(){
    super();
    this.state = {
      paypwd:'',//支付密码
      opacctno:'',//对方二类卡帐号
      custno:'',//本人客户号
      phone:'',//本人手机号
      acctno2:'',//本人二类卡帐号
      hash:'',
      data2:'',
    }
  }


  componentWillMount(){
    console.log('1111111111111');
    AsyncStorage.getItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
     let hash = JSON.parse(value)
     if (!!hash) {
       if(!!hash && !!hash.custNo){
         this.setState({phone:hash.phone})
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

  on_submit(){
    console.log(this.props.message);
    console.log(this.state.hash.brcNo);
    console.log(this.state.custno);
    console.log(this.state.phone);
    console.log(this.props.message.count);
    console.log(this.state.data2);
    console.log(this.state.paypwd);
    console.log(this.props.message.custno);
  AresAPI.Phone.tranAcctNonSelf2To2({
    classes:'T',
    brcno:this.state.hash.brcNo||'1',
    custno:this.state.custno,
    phone:this.state.phone,
    amt:this.props.message.count,
    acctno2:this.state.data2,
    paypwd:this.state.paypwd,
    opacctno:this.props.message.custno,
  }).done((res_json, res) => {
                    if(res_json.retCode == 1){
                      this.props.navigator.push({id:'PaymentSuccess',params:{}})
                      RCTDeviceEventEmitter.emit(EVENT_EMITTER_CONST.NEEDWALLETREQUEST, 'changeTaberBar');
                      Alert.alert('提示', '转账成功', [{ text: '确定'}])
                    }else{
                      Alert.alert('错误提示', res_json.retMsg, [{ text: '确定'}])
                    }
                  })
  }


  onbing(){
    this.refs.dialog.show()
  }
  render() {
    let total_assets = StringUtils.moneyFormatData2Money(this.props.message.count)
    return (
    <View style={styles.root}>
      <BackNavBar component={this}>扫描完成</BackNavBar>
      <View style={{ marginTop : 60,justifyContent: "center",alignItems:'center',}}>
          <Image source={require('ares/app/assets/image/head.png')} style={{width:100,height:100}}/>
        </View>
        <View style={{marginTop : 20,height:46, flexDirection:'row',backgroundColor:'#fff',justifyContent: "center",}}>
            <View style={{justifyContent: "center",}}>
              <Text style={{fontSize:16,color:"#fab35c",marginHorizontal: 16}}>金额:</Text>
            </View>
            <View style={{justifyContent: "flex-end",}}>
              <Text style={{fontSize:40,color:"#fab35c",}}>{total_assets }</Text>
            </View>
            <View style={{justifyContent: "center",}}>
              <Text style={{fontSize:16,color:"#fab35c",marginHorizontal: 16}}>元</Text>
            </View>
          </View>
          <View  style={{marginTop:40,marginHorizontal: 16}}>
            <Button
            type="primary"
            onClick={this.onbing.bind(this)}
            >确认交易金额</Button>
          </View>
          <Dialog
            ref="dialog"
            title="请输入交易密码"
            content={
              <View style={{alignItems:'center'}}>
                    <PasswordInput  onEnd={(pwd)=>{
                                this.setState({paypwd:pwd})
                             }}
                    maxLength={6}
                  ></PasswordInput>
               </View>
            }
          leftButtonText="取消"
          rightButtonText="好"
          onLeftButonClick={()=>{
            this.setState({text: ""})
            this.refs.dialog.close()

          }}
          onRightButtonClick={()=>{
            this.on_submit()
            this.refs.dialog.close()
          }}
        />
    </View>
    );
  }
}
export default ScanFinish
