/**
*  dujh
*/


import React from 'react'
import {
 Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native'

import Icon        from 'antd-mobile/lib/icon'
import ImagePicker from 'antd-mobile/lib/image-picker'

import {
  BasePage,
  BackNavBar,
  NavigatorUtils,
} from 'AresComponent'
import {
  COMMON_STYLES,
} from 'AresConstant'

var full_height = Dimensions.get('window').height
const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
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

class Success extends BasePage {

  onBack(){
    NavigatorUtils.popToRoute(
      this.props.navigator,
      {id: 'Dashboard'}
    )

  }

  render() {
    return(
      <View style={styles.root}>
       <BackNavBar component={this} backText='钱包'></BackNavBar>
       <View style={styles.success_logo_box}>
          <Image source={require('ares/app/assets/image/reset_login_pwd_success.png')} style={{width:100,height:100}}/>
        </View>
        <View style={{marginTop : 50,}}>
          <Text style={styles.success_message}>{this.props.data}成功</Text>
        </View>
      </View>
    )
  }
}

export default Success
