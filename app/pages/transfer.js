/**
* by dujh
*/
import React from 'react'

import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  DeviceEventEmitter,
  TextInput,
  TouchableOpacity,
  Alert,
 } from 'react-native'

import {
  BasePage,
  BackNavBar,
  } from 'AresComponent'

import {
  COMMON_STYLES,
} from 'AresConstant'
import WhiteSpace from 'antd-mobile/lib/white-space'
import Icon from 'react-native-vector-icons/FontAwesome'
import dismissKeyboard from 'dismissKeyboard'
import Button from 'antd-mobile/lib/button'
import InputItem from 'antd-mobile/lib/input-item'
import Checkbox from 'antd-mobile/lib/checkbox'
import List from 'antd-mobile/lib/list'
import Modal from 'antd-mobile/lib/modal'
import { createForm } from 'rc-form'
import AresAPI from 'AresAPI'

var full_width = Dimensions.get('window').width
var full_height = Dimensions.get('window').height
class Transfer extends BasePage {
  constructor(props) {
    super(props)
    this.state = {
      name:'',
      cardno:'',
      money:'',
    }
  }

  on_push(){
    if(this.state.name != ''&&this.state.cardno != ''&&this.state.money !=''){
      Alert.alert('错误提示', '连接CSP服务器失败', [{ text: '确定'}])
    }else {
      Alert.alert('错误提示', '请填写正确信息', [{ text: '确定'}])
    }
  }

  render(){
    return(
      <View style={{flex:1,backgroundColor:'#F5F5F9'}}>
        <BackNavBar   component={this}>转账</BackNavBar>
        <WhiteSpace size='md' />
        <View style={{height:100,width:full_width,backgroundColor:'#fff'}}>
          <View style={{paddingLeft:10,flex:1,flexDirection:'row',alignItems:'center',borderColor:'#dddddd',borderTopWidth:1}}>
            <Text>姓名</Text>
            <TextInput
              underlineColorAndroid='transparent'
              style={{flex:1,padding:0,marginLeft:50}}
              placeholder="收款人姓名"
              onChangeText={(name) => this.setState({name})}
              underlineColorAndroid='transparent'
            />
          </View>
          <View style={{paddingLeft:10,flex:1,flexDirection:'row',alignItems:'center',borderColor:'#dddddd',borderTopWidth:1,borderBottomWidth:1}}>
            <Text>卡号</Text>
            <TextInput
              underlineColorAndroid='transparent'
              style={{flex:1,padding:0,marginLeft:50}}
              placeholder="收款人储蓄卡号"
              keyboardType="numeric"
              onChangeText={(cardno) => this.setState({cardno})}
              underlineColorAndroid='transparent'
            />
          </View>
        </View>
        <WhiteSpace size='md' />
        <View style={{height:50,width:full_width,backgroundColor:'#fff'}}>
          <View style={{paddingLeft:10,flex:1,flexDirection:'row',alignItems:'center',borderColor:'#dddddd',borderTopWidth:1,borderBottomWidth:1}}>
            <Text>金额</Text>
            <TextInput
              underlineColorAndroid='transparent'
              style={{flex:1,padding:0,marginLeft:50}}
              placeholder="转账金额"
              keyboardType="numeric"
              onChangeText={(money) => this.setState({money})}
              underlineColorAndroid='transparent'
            />
          </View>
        </View>
        <View style={{flex:1,marginTop:30}}>
          <Button
            type='primary'
            onClick={this.on_push.bind(this)}>
            下一步
          </Button>
        </View>
      </View>
    )
  }
}

export default Transfer
