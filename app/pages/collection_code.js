import React from 'react'

import {
  Alert,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Navigator,
  AsyncStorage,
} from 'react-native'
import {
  BasePage,
  BackNavBar,
  QRComponent,

} from 'AresComponent'
import {
  EVENT_EMITTER_CONST,
  STORAGE_KEYS,
  QRCODE_METHOD
} from 'AresConstant'
import QRCode from 'react-native-qrcode'
import KsiBarcode from "react-native-ksi-barcode"
import AresAPI from 'AresAPI'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'

const styles = StyleSheet.create({
  root: {
    backgroundColor:'#f5f5f9',
    flex: 1,
  },
  barCode_box:{
    backgroundColor:'#fff',
    height:125,
    paddingTop:10,
    paddingBottom:10,
    marginTop:20,
    marginBottom:10,
    marginHorizontal:20,
    justifyContent: 'center',
    alignItems:'center',
  },
  qrCode_box:{
    backgroundColor:'#fff',
    height:262,
    paddingTop:10,
    paddingBottom:10,
    marginTop:20,
    marginBottom:20,
    marginHorizontal:20,
    justifyContent: "space-around",
    alignItems:'center',
  },

});

class CollectionCode extends BasePage {
  constructor(props) {
    super(props);
    this.state={
      arrayQRcode:this.props.arrayQRcode,
      data2:'',
    };
    this.flag='1'
  }

  componentDidMount(){
    console.log('1111111111111');
    this.interval = setInterval(this.reset_qrCode.bind(this),1000*60);
  }

  componentDidUpdate(){
    console.log('1111111111111');
    if(this.flag=='2'){
      this.flag='1'
      clearInterval(this.interval);
      this.interval = setTimeout(this.reset_qrCode.bind(this),0);
    }else{
      clearInterval(this.interval);
      this.interval = setInterval(this.reset_qrCode.bind(this),1000*60);
    }
  }


  componentDidUnmount(){
    //clearTimeout(this.interval);
  }
/**
  onBack(){
    clearInterval(this.interval);
    RCTDeviceEventEmitter.emit(EVENT_EMITTER_CONST.NEEDWALLETREQUEST, 'changeTaberBar');
    return this.props.navigator.popN(2);
  }
*/
  reset_qrCode(){
    console.log('1111111111111');
    AsyncStorage.getItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
      let hash = JSON.parse(value)
      let data2 = ''
      if(!!hash){
        AresAPI.FindAcct.findacctacct2List({
         custno:hash.custNo
        }).done((res_json,res) => {
          console.log("2222222222222");
          if(res_json.retCode == 1){
            for(let i = 0;i<res_json.findAcctList.length;i++){
              if(res_json.findAcctList[i] != ''){
                 data2 = res_json.findAcctList[i].acctno;
              }
            }
            console.log(data2);
            AresAPI.QRCode.generateCode({
              brcno:hash.brcNo||'1',
              acct2:data2,
              method:QRCODE_METHOD.COLLECTION,
              amt:this.props.money==null||this.props.money==0?0:this.props.money,
              //custno:hash.custNo,
            }).done((res_json, res) => {
              if(res_json.retCode == 1){
                this.setState({arrayQRcode:res_json.arrayQRcode})
              }else{
                Alert.alert('错误提示', res_json.retMsg, [{ text: '确定'}])
              }
            })
          }else {
            Alert.alert('错误提示', res_json.retMsg, [{ text: '确定'}])
          }
        })
      }
    })
  }

  render() {
    if(Platform.OS === 'android'){
      return(
        <View style={styles.root}>
          <BackNavBar
            component={this}
            rightContent={<TouchableOpacity onPress={()=>{this.props.navigator.push({id:'SetMoneyCollection',config_scene_type:Navigator.SceneConfigs.FloatFromBottom,params:{money:this.props.money,qrCode:this}})}}>
                            <Text style={{fontSize:16,color:'#fff'}}>设置金额</Text>
                          </TouchableOpacity>}
          >
            收款
          </BackNavBar>

          <View style={styles.qrCode_box}>
            <QRCode
              value={this.state.arrayQRcode}
              size={180}
              bgColor='black'
              fgColor='white' />
              <Text>每分钟自动更新，限当面使用</Text>
          </View>
        </View>
      )
    }else if(Platform.OS === 'ios'){
      return(
        <View style={styles.root}>
          <BackNavBar
            component={this}
            rightContent={<TouchableOpacity onPress={()=>this.props.navigator.push({id:'SetMoneyCollection',config_scene_type:Navigator.SceneConfigs.FloatFromBottom,params:{money:this.props.money,qrCode:this}})}>
                            <Text style={{fontSize:16,color:'#fff'}}>设置金额</Text>
                          </TouchableOpacity>}
          >
            收款
          </BackNavBar>
          <QRComponent message={this.state.arrayQRcode} />
        </View>
      )
    }

  }
}

export default CollectionCode
