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
  BackNavBar,
} from 'AresComponent'

import Icon from 'react-native-vector-icons/FontAwesome'
import Button from 'antd-mobile/lib/button'
import InputItem from 'antd-mobile/lib/input-item'
import { createForm } from 'rc-form'

var full_height = Dimensions.get('window').height

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#F5F5F9",
    flex: 1,
    flexDirection: "column",
  },
  success_logo_box:{
    marginTop : 20,
    height: full_height/3,
    justifyContent: "center",
    alignItems:'center',
  },
  success_message_box:{
    justifyContent: 'center',
    alignItems:'center',
  },
  success_message:{
    color:'#0281E8',
    fontWeight:'bold',
    fontSize:20,
    marginTop : 20,
    textAlign:'center',
  },
});

class TurnOutSuccess extends BasePage {
  constructor(props) {
    super(props);
    this.state={
      disabled:true
    };
  }

 
  render() {

    return(
      <View style={styles.root}>
        <BackNavBar component={this} >转出成功</BackNavBar>
        <View style={styles.success_logo_box}>
          <Image source={require('ares/app/assets/image/reset_login_pwd_success.png')} />
        </View>
        <View>
          <Text style={styles.success_message}>转出成功</Text>
        </View>
      </View>
    )
  }

}

export default TurnOutSuccess