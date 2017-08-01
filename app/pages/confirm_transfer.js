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
  TextInput,
  ART,
  Alert,
  AsyncStorage,
  ScrollView,
  Platform,
} from 'react-native'
import {
  BackNavBar,
  PushLogin,
  DialogPayment,
  StringUtils,
  BasePage,
} from 'AresComponent'
import {
  EVENT_EMITTER_CONST,
  STORAGE_KEYS,
  COMMON_STYLES,
} from 'AresConstant'
import WhiteSpace from 'antd-mobile/lib/white-space'
import dismissKeyboard from 'dismissKeyboard'
import Button from 'antd-mobile/lib/button'

var full_width = Dimensions.get('window').width
var full_height = Dimensions.get('window').height
const DEFAULT_RED_COLOR = '#f5787c'

class ConfirmTransfer extends BasePage{

  on_push(){

  }

  render() {
    return(
      <View style={{backgroundColor:COMMON_STYLES.MAIN_BACKGROUND_COLOR,flex:1}}>
        <StatusBar hidden={false} barStyle='dark-content' translucent={true} backgroundColor="#ffffff">
        </StatusBar>
        <BackNavBar component={this}>确认转账信息</BackNavBar>
        <View style={{backgroundColor:'#fff',height:200,width:full_width,alignItems:'center'}}>
          <Text style={{fontSize:17,color:'black',marginTop:30}}>杜佳恒</Text>
          <Text style={{fontSize:12,marginTop:10}}>中国工商银行</Text>
          <Text style={{fontSize:30,color:'black',marginTop:15}}>100元</Text>
          <Text style={{fontSize:12,}}>免服务费</Text>
        </View>
        <View style={{borderColor:'#dddddd',borderBottomWidth:1,borderTopWidth:1,flexDirection:'row',backgroundColor:'#fff',height:50,width:full_width,alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:14,color:'orange'}}>2小时内到账</Text>
        </View>
        <WhiteSpace size='md' />
        <View style={{height:50,width:full_width,backgroundColor:'#fff'}}>
          <View style={{paddingLeft:10,flex:1,flexDirection:'row',alignItems:'center',borderColor:'#dddddd',borderTopWidth:1,borderBottomWidth:1}}>
            <Text>备注</Text>
            <TextInput
              underlineColorAndroid='transparent'
              style={{flex:1,padding:0,marginLeft:50}}
              placeholder="选填"
              onChangeText={(money) => this.setState({money})}
              underlineColorAndroid='transparent'
            />
          </View>
        </View>
        <View style={{flex:1,marginTop:30}}>
          <Button
            type='primary'
            onClick={this.on_push.bind(this)}>
            确认转账
          </Button>
        </View>
      </View>
    )
  }
}
export default ConfirmTransfer
