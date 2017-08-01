import React from 'react'

import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ART,
   AsyncStorage
} from 'react-native'

// @陈耀霆，二类账户详情页面
import { createForm } from 'rc-form'

import List from 'antd-mobile/lib/list'
import Icon from 'react-native-vector-icons/FontAwesome'

import {
  Navbar,
  BackNavBar,
  DevelopTip,
  BasePage,
  ListItems,
  StringUtils,
} from 'AresComponent'
import {
  COMMON_STYLES,
} from 'AresConstant'


const styles = StyleSheet.create({
  root: {
    backgroundColor: COMMON_STYLES.MAIN_BACKGROUND_COLOR,
    flex: 1,
  },
  icon_opts: {
    backgroundColor: "#ffffff",
    height:200,
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
  alignItems:'center'
  },
  text1_margin:{
  justifyContent:'center',
  height:150,
  alignItems:'center',

  }
});

class Type2Account extends BasePage {
   constructor () {
    super();
    this.state = {

  }
 }

  render(){
    const path = ART.Path();
    path.moveTo(1,1); //将起始点移动到(1,1) 默认(0,0)
    path.lineTo(1,70); //连线到目标点(300,1)
    let total_assets = StringUtils.moneyFormatData2Money(this.props.bal)
    return(
      <View style={styles.root}>
        <BackNavBar component={this} backText="钱包" backgroundColor={COMMON_STYLES.NAVIBAR_COLOR} backTextColor="#FFFFFF" titleColor="#FFFFFF">余额</BackNavBar>
        <View style={styles.icon_opts}>
          <View style={styles.text_margin}>
            <Text style={styles.text_box}> 余额二类账户(元)</Text>
          </View>
          <View style={styles.text1_margin}>
            <Text style={styles.text1_box}>{total_assets }</Text>
          </View>
        </View>
        <View style={{height:70,marginTop:30, backgroundColor: "#ffffff"}}>
          <View style={{flex:1,flexDirection:'row'}}>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
              <TouchableOpacity onPress={() => this.props.navigator.push({id: "Type2Recharge", params: {account2:this.props.account2}})}>
                <Image source={require('ares/app/assets/image/chongzhi.png')} style={{width:24,height:20,marginLeft:1.5}}/>
                <Text style={styles.fun_text}>充值</Text>
              </TouchableOpacity>
            </View>
            <View style={{alignSelf:'center'}}>
              <ART.Surface width={1} height={70}>
                <ART.Shape d={path} stroke="#dddddd" strokeWidth={1} />
              </ART.Surface>
            </View>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
              <TouchableOpacity onPress={() => this.props.navigator.push({id: "Type2Withdrawals", params: {account2:this.props.account2}})}>
                <Image source={require('ares/app/assets/image/tixian.png')} style={{width:20,height:20,marginLeft:4}}/>
                <Text style={styles.fun_text}>提现</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Type2Account
