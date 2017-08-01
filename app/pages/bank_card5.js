import React from 'react'

import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native'
/*绑定银行卡第六步骤的页面
      */
import {
  BasePage,
  NavBar,
  BackNavBar,
  NavigatorUtils,
  } from 'AresComponent'
import {
  COMMON_STYLES,
} from 'AresConstant'

import Setting from 'ares/app/pages/setting'
import Button from 'antd-mobile/lib/button'
import InputItem from 'antd-mobile/lib/input-item'
import { createForm } from 'rc-form'
var full_height = Dimensions.get('window').height

const styles = StyleSheet.create({
  root: {
    backgroundColor:'#fff',
    flex: 1,
    flexDirection: "column",
  },
  success_logo_box:{
    marginTop : 60,
    justifyContent: "center",
    alignItems:'center',
  },

  success_message:{
    color:'#0281E8',
    fontSize:16,
    textAlign:'center',
  },
});

class BankCard5 extends BasePage {
  constructor(props) {
    super(props);
    this.state={
      disabled:true
    };
  }
//按完成的时候调用这个方法 ，返回到我的银行卡页面
  onBack(){
    this.props.navigator.resetTo({id: "Dashboard" ,params: {}})

  }

  render() {

    return(
      <View style={styles.root}>
        <NavBar   backgroundColor="#383838"   rightContent={ <Text style={{fontSize: 16,color:'#fff'}} onPress={()=>{this.onBack()}}>完成</Text>}></NavBar>
        <View style={styles.success_logo_box}>
          <Image source={require('ares/app/assets/image/reset_login_pwd_success.png')} style={{width:100,height:100}}/>
        </View>
        <View style={{marginTop : 50,}}>
          <Text style={styles.success_message}>恭喜您！绑定银行卡成功</Text>
        </View>
      </View>
    )
  }

}

export default BankCard5
