import React from 'react'

import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ART,
  ScrollView,
  Alert,
  AsyncStorage
} from 'react-native'

// @陈耀霆，三类账户详情页面
import List from 'antd-mobile/lib/list'
import Radio from 'antd-mobile/lib/radio'
import { createForm } from 'rc-form'
import Icon from 'react-native-vector-icons/FontAwesome'

import AresAPI from 'AresAPI'

import {
  Navbar,
  BackNavBar,
  DevelopTip,
  BasePage,
  ListItems,
  StringUtils,
  Dialog,
  PasswordInput,
} from 'AresComponent'

import {
  COMMON_STYLES,
  STORAGE_KEYS,
} from 'AresConstant'

const RadioItem = Radio.RadioItem;
const styles = StyleSheet.create({
  root: {
    backgroundColor: COMMON_STYLES.MAIN_BACKGROUND_COLOR,
    flex: 1,

  },
  icon_opts: {
    backgroundColor: "#ffffff",
    height:160,
  },
  text_box:{
  fontSize:16,
  color:"#fab35c",
  },
  text_margin:{
  marginTop:32,
  height:25,
  flex:1,
  alignItems:'center',

  },
  text1_box:{
  fontSize:60,
  color:"#fab35c",
  },
  text1_margin:{

  height:103,
  alignItems:'center',

  }
});

class Type2Account extends BasePage {
   constructor () {
    super();
    this.state = {
      password:'',
      quota:'已关闭',

  }
 }
 onRight_ButtonClick(){
   this.refs.dialog.close()
   AresAPI.Settings.settingsValidatePayPwd({
   pwd:this.state.password,
   acctno:this.props.account3
   }).done((res_json,res) => {
     if(res_json.retCode==1){
      this.setState({password:""})
      this.props.navigator.push({id:"Type3Account3", params:{type3_account:this,account3:this.props.account3}})

     }else{
       Alert.alert('错误提示', res_json.retMsg, [{ text: '确定'}])

     }
    })
  }
  on_Click(){

      this.refs.dialog.show()

}
  componentWillMount(){

      AresAPI.Settings.settingsGetLimFlag({acctno:this.props.account3}).done((res_json,res) => {
          if(res_json.noflag==1){
          this.setState({quota:res_json.eachlim+'元/笔'})
          }
      })

}


  render(){
     const path = ART.Path();
    path.moveTo(1,1); //将起始点移动到(1,1) 默认(0,0)
    path.lineTo(1,40); //连线到目标点(300,1)
    let total_assets = StringUtils.moneyFormatData2Money(this.props.bal)
  return(
    <View style={styles.root}>
      <BackNavBar component={this} backText="钱包" backgroundColor={COMMON_STYLES.NAVIBAR_COLOR} backTextColor="#FFFFFF" titleColor="#FFFFFF">余额</BackNavBar>
        <View style={styles.icon_opts}>
          <View style={styles.text_margin}>
            <Text style={styles.text_box}> 余额三类账户(元)</Text>
          </View>
          <View style={styles.text1_margin}>
            <Text style={styles.text1_box}>{total_assets }</Text>
          </View>
        </View>
        <View style={{height:70,marginTop:30, backgroundColor: "#ffffff",borderColor:'#DDDDDD'}}>
          <View style={{flex:1,flexDirection:'row'}}>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
              <TouchableOpacity onPress={() => this.props.navigator.push({id: "Type3Recharge", params: {account3:this.props.account3}})}>
                <Image source={require('ares/app/assets/image/chongzhi.png')} style={{width:24,height:20,marginLeft:1.5}}/>
                <Text style={styles.fun_text}>充值</Text>
              </TouchableOpacity>
            </View>
            <View style={{alignSelf:'center'}}>
              <ART.Surface width={1} height={40}>
                <ART.Shape d={path} stroke="#dddddd" strokeWidth={1} />
              </ART.Surface>
            </View>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
             <TouchableOpacity onPress={() => this.props.navigator.push({id: "Type3Withdrawals", params: {account3:this.props.account3}})}>
              <Image source={require('ares/app/assets/image/tixian.png')} style={{width:20,height:20,marginLeft:4}}/>
                <Text style={styles.fun_text}>提现</Text>
              </TouchableOpacity>
            </View>
          </View >
        </View >
         <View>
           <Dialog
                ref="dialog"
                title="请输入交易密码"
                content={
                  <View style={{alignItems:'center'}}>
                        <PasswordInput
                           onEnd={(pwd)=>{
                                this.setState({password:pwd})
                             }}
                        maxLength={6}
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
    </View>
    )
}
  }


export default Type2Account
