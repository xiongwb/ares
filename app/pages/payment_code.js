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

import QRCode from 'react-native-qrcode'
import AresAPI from 'AresAPI'
import KsiBarcode from "react-native-ksi-barcode"

import {
  QRCODE_METHOD,
  STORAGE_KEYS,
} from 'AresConstant'

import {
  BasePage,
  BackNavBar,
  QRComponent,
} from 'AresComponent'

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

class PaymentCode extends BasePage {
  constructor(props) {
    super(props);
    this.state={
      arrayQRcode:this.props.arrayQRcode,
    };
    this.flag='1'
  }

  componentDidMount(){
    this.interval = setInterval(this.reset_qrCode.bind(this),1000*60);
  }

  componentDidUpdate(){
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

  onBack(){
    clearInterval(this.interval);
    return this.props.navigator.popN(2);
  }

  reset_qrCode(){
    AsyncStorage.getItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
      let hash = JSON.parse(value)
      console.log(hash);
      console.log(hash.acctNo2);
      if(!!hash){
        AresAPI.QRCode.generateCode({
          brcno:hash.brcNo||'1',
          acct2:hash.acctNo2,
          method:QRCODE_METHOD.PAYMENT,
          amt:this.props.money==null||this.props.money==0?0:this.props.money,
          //custno:hash.custNo,
        }).done((res_json, res) => {
          if(res_json.retCode == 1){
            this.setState({arrayQRcode:res_json.arrayQRcode})
          }else{
            Alert.alert('错误提示', res_json.retMsg, [{ text: '确定'}])
          }
        })
      }
    })
  }

  render() {
    console.log(this.state.arrayQRcode);
    if(Platform.OS === 'android'){
      return(
        <View style={styles.root}>
          <BackNavBar
            component={this}
            rightContent={<TouchableOpacity onPress={()=>{this.props.navigator.push({id:'SetMoneyPayment',config_scene_type:Navigator.SceneConfigs.FloatFromBottom,params:{money:this.props.money,qrCode:this}})}}>
                            <Text style={{fontSize:16,color:'#fff'}}>设置金额</Text>
                          </TouchableOpacity>}
          >
            付款
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
            rightContent={<TouchableOpacity onPress={()=>this.props.navigator.push({id:'SetMoneyPayment',config_scene_type:Navigator.SceneConfigs.FloatFromBottom,params:{money:this.props.money,qrCode:this}})}>
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

export default PaymentCode
