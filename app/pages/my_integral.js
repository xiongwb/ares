/**
* by liul
*/
import React from 'react'

import {
    AppRegistry,
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

class MyIntegral extends BasePage{
  render() {
    return(
        <View style={{backgroundColor:'#fff',flex:1}}>
          <StatusBar hidden={false} barStyle='dark-content' translucent={true} backgroundColor="#ffffff">
          </StatusBar>
          <BackNavBar   component={this} backgroundColor={'#6495ED'}>我的积分</BackNavBar>
          <View style={{backgroundColor:'#6495ED',height:150,width:full_width,alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:14,color:'#fff'}}>当前积分</Text>
            <Text style={{fontSize:40,color:'#fff'}}>5,000</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{flex:1}}>
              <View style={{height:50,width:full_width,borderColor:'#DDDDDD',borderBottomWidth:1,justifyContent:'center'}}>
                <Text style={{fontSize:14,marginLeft:20}}>日常任务每日最多可获300积分，今日已获0积分</Text>
              </View>
              <View style={{height:80,width:full_width,flexDirection:'row',alignItems:'center',paddingHorizontal:20,borderColor:'#DDDDDD',borderBottomWidth:1}}>
                <View style={{flex:1}}>
                  <Text style={{fontSize:15,color:'black'}}>财富奖励积分</Text>
                  <Text style={{fontSize:12,marginTop:8}}>余额宝、定期、聚宝基金</Text>
                </View>
                <View style={{flex:-1}}>
                  <Text style={{fontSize:15,color:'#ADADAD'}}>阶梯积分</Text>
                </View>
              </View>
              <View style={{height:80,width:full_width,flexDirection:'row',alignItems:'center',paddingHorizontal:20,borderColor:'#DDDDDD',borderBottomWidth:1}}>
                <View style={{flex:1}}>
                  <Text style={{fontSize:15,color:'black'}}>打车出行</Text>
                  <Text style={{fontSize:12,marginTop:8}}>用车随叫随到</Text>
                </View>
                <View style={{flex:-1}}>
                  <Text style={{fontSize:15,color:'#ADADAD'}}>10元/积分</Text>
                </View>
              </View>
              <View style={{height:80,width:full_width,flexDirection:'row',alignItems:'center',paddingHorizontal:20,borderColor:'#DDDDDD',borderBottomWidth:1}}>
                <View style={{flex:1}}>
                  <Text style={{fontSize:15,color:'black'}}>手机话费充值</Text>
                  <Text style={{fontSize:12,marginTop:8}}>10分钟内到账</Text>
                </View>
                <View style={{flex:-1}}>
                  <Text style={{fontSize:15,color:'#ADADAD'}}>+10</Text>
                </View>
              </View>
              <View style={{height:80,width:full_width,flexDirection:'row',alignItems:'center',paddingHorizontal:20,borderColor:'#DDDDDD',borderBottomWidth:1}}>
                <View style={{flex:1}}>
                  <Text style={{fontSize:15,color:'black'}}>信用卡还款</Text>
                  <Text style={{fontSize:12,marginTop:8}}>部分银行支持账单同步</Text>
                </View>
                <View style={{flex:-1}}>
                  <Text style={{fontSize:15,color:'#ADADAD'}}>+10</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
    )
  }
}
export default MyIntegral
