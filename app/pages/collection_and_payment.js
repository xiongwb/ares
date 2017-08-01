import React from 'react'

import {
  Alert,
  Dimensions,
  Text,
  Image,
  Platform,
  View,
  TouchableOpacity,
  StyleSheet,
  Navigator,
  AsyncStorage,
} from 'react-native'
import {
  BasePage,
  BackNavBar,
} from 'AresComponent'
import {
  STORAGE_KEYS,
  QRCODE_METHOD,
} from 'AresConstant'

import AresAPI from 'AresAPI'

var full_height = Dimensions.get('window').height

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#f5f5f9",
    flex: 1,
    height:full_height,
  },
  collection_box:{
    backgroundColor:'#fff',
    height:full_height/3,
    marginTop:33,

    marginHorizontal:10,
    justifyContent: "center",
    alignItems:'center',
  },
  payment_box:{
    backgroundColor:'#fff',
    height:full_height/3,
    marginTop:14,

    marginHorizontal:10,
    justifyContent: "center",
    alignItems:'center',
  },
  msg_box:{

    justifyContent: "center",
    alignItems:'center',
  },
  msg_title:{
    fontSize:18,
    marginTop:30,
  },
  back_name:{
    fontSize:15,
    color:'#fff',
  },
  back_box:{
    flexDirection: "row",
    alignItems:'center',
  },

});

class CollectionAndPayment extends BasePage {
  constructor(props) {
    super(props);
    this.state={
      data2:'',
    };
  }

  to_collection(){
    AsyncStorage.getItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
      let hash = JSON.parse(value)
      if(!!hash){
        AresAPI.FindAcct.findacctacct2List({
         custno:hash.custNo
        }).done((res_json,res) => {
          for(let i = 0;i<res_json.findAcctList.length;i++){
            if(res_json.findAcctList[i] != ''){
              AresAPI.QRCode.generateCode({
                brcno:hash.brcNo||'1',
                acct2:res_json.findAcctList[i].acctno,
                method:QRCODE_METHOD.COLLECTION,
                amt:0.00,
                //custno:hash.custNo
              }).done((res_json, res) => {
                if(res_json.retCode == 1){
                  this.props.navigator.push({id:'CollectionCode',params:{arrayQRcode:res_json.arrayQRcode,money:0}})
                }else{
                  Alert.alert('错误提示', res_json.retMsg, [{ text: '确定'}])
                }
              })
            }
          }
       })
      }else{
        this.props.navigator.push({id: "Login", params: {}})
      }
    })
  }

  to_payment(){
    AsyncStorage.getItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
      let hash = JSON.parse(value)
      if(!!hash){
        //登录状态
        AresAPI.QRCode.generateCode({
          brcno:hash.brcNo||'1',
          acct2:hash.acctNo2,
          method:QRCODE_METHOD.PAYMENT,
          amt:0.00,
          //custno:hash.custNo,
        }).done((res_json, res) => {
          if(res_json.retCode == 1){
            this.props.navigator.push({id:'PaymentCode',params:{arrayQRcode:res_json.arrayQRcode,money:0}})
          }else{
            s.alert('错误提示', res_json.retMsg, [{ text: '确定'}])
          }
        })
      }else{
        this.props.navigator.push({id: "Login", params: {}})
      }
    })
  }

  startScan() {
    if (Platform.OS === 'android') {
      this.props.navigator.push({id: "QRCodeScan", config_scene_type: Navigator.SceneConfigs.FadeAndroid})
    }
    if (Platform.OS === 'ios') {
  /*var message = {
        brano:'1',
        custno:'930000001200000242',
        time:'2014',
        way:'pay',
        count:'100',
        randomcode:'skd31b',
      }
      this.props.navigator.push({id: "ScanFinish", params: {message:message}})
    */
     ScanCodeManager.scanStart('调用摄像头');
    }
  }


  render() {
    return(
      <View style={styles.root}>
        <BackNavBar component={this} backText='返回'>收付款</BackNavBar>
        <View style={styles.collection_box}>
          <TouchableOpacity onPress={this.to_collection.bind(this)}>
            <View style={styles.msg_box}>
              <Image source={require('ares/app/assets/image/shou.png')} />
              <Text style={styles.msg_title}>我要收款</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.payment_box}>
          <TouchableOpacity onPress={this.startScan.bind(this)}>
            <View style={styles.msg_box}>
              <Image source={require('ares/app/assets/image/fu.png')} />
              <Text style={styles.msg_title}>我要付款</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default CollectionAndPayment
