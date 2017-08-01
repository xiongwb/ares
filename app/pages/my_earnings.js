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

class MyEarnings extends BasePage{
  render() {
    return(
      <View style={{backgroundColor:COMMON_STYLES.MAIN_BACKGROUND_COLOR,flex:1}}>
        <StatusBar hidden={false} barStyle='dark-content' translucent={true} backgroundColor="#ffffff">
        </StatusBar>
        <BackNavBar component={this}  backgroundColor={'red'} backTextColor="#FFFFFF" titleColor="#FFFFFF">我的收益</BackNavBar>
        <View style={{backgroundColor:'red',height:200,width:full_width,alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:14,color:'#fff'}}>昨日收益(元)</Text>
          <Text style={{fontSize:40,color:'#fff'}}>暂无收益</Text>
        </View>
        <View style={{flexDirection:'row',backgroundColor:'red',height:50,width:full_width,alignItems:'center',justifyContent:'center'}}>
          <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:12,color:'#fff'}}>总金额(元)</Text>
            <Text style={{fontSize:14,color:'#fff'}}>100</Text>
          </View>
          <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:12,color:'#fff'}}>七日年化(%)</Text>
            <Text style={{fontSize:14,color:'#fff'}}>6.2</Text>
          </View>
        </View>
        <View style={{height:150,width:full_width}}>
          <View style={{height:50,width:full_width,borderColor:'#DDDDDD',borderBottomWidth:1,justifyContent:'center'}}>
            <Text style={{fontSize:14,marginLeft:20}}>投资推荐</Text>
          </View>
          <View style={{height:80,width:full_width,flexDirection:'row',alignItems:'center',paddingHorizontal:20}}>
            <View style={{flex:1}}>
              <Text style={{fontSize:15,color:'black'}}>存金宝</Text>
              <Text style={{fontSize:12,marginTop:0}}>黄金投资利器</Text>
            </View>
            <View style={{flex:1}}>
              <Text style={{fontSize:30,color:'red'}}>+10.97%</Text>
              <Text style={{fontSize:12,marginTop:-5}}>近一年涨幅(04.14)</Text>
            </View>
          </View>
          <View style={{height:80,width:full_width,flexDirection:'row',alignItems:'center',paddingHorizontal:20}}>
            <View style={{flex:1}}>
              <Text style={{fontSize:15,color:'black'}}>月盈宝</Text>
              <Text style={{fontSize:12,marginTop:0}}>稳定收益，月月盈利</Text>
            </View>
            <View style={{flex:1}}>
              <Text style={{fontSize:30,color:'red'}}>+4.97%</Text>
              <Text style={{fontSize:12,marginTop:-5}}>近一年涨幅(01.03)</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
export default MyEarnings
