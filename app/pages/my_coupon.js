/**
* by dujh
*/

import React from 'react'

import {
  Text,
  StatusBar,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ART,
  Alert,
  AsyncStorage,
  ScrollView,
  Platform,
} from 'react-native'
import {
  BackNavBar,
  PushLogin,
  StringUtils,
  BasePage,
} from 'AresComponent'
import {
  EVENT_EMITTER_CONST,
  STORAGE_KEYS,
  COMMON_STYLES,
} from 'AresConstant'


var full_width = Dimensions.get('window').width
var full_height = Dimensions.get('window').height
const DEFAULT_RED_COLOR = '#f5787c'

class MyCoupon extends BasePage {
  render(){
    return(
      <View style={{flex:1,backgroundColor:'#F5F5F9'}}>
        <StatusBar hidden={false} barStyle='dark-content' translucent={true} backgroundColor="#ffffff">
        </StatusBar>
        <BackNavBar component={this}  backgroundColor={COMMON_STYLES.NAVIBAR_COLOR} backTextColor="#FFFFFF" titleColor="#FFFFFF">我的优惠劵</BackNavBar>
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:20}}>对不起，您目前没有优惠劵
          </Text>
        </View>
      </View>
    )
  }
}
export default MyCoupon
