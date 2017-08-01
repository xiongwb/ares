/**
*  dujh
*/


import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Alert,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native'
import {
  BasePage,
  NavigatorUtils,
} from 'AresComponent'

import Icon from 'react-native-vector-icons/FontAwesome'
import AresAPI from 'AresAPI'

const full_width = Dimensions.get('window').width
const full_height = Dimensions.get('window').height
const DEFAULT_RED_COLOR = '#f5787c'


const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    flex:1,
  },
  head_img:{
    ...Platform.select({
      android:{
        height: (Platform.Version >= 21)?140:108,
        paddingTop:(Platform.Version >= 21)?5:0,
      },
      ios:{
        height: 128,
      }
    })
  },

})

class ShoppingSuccess extends BasePage {
  constructor(props) {
    super(props)
  }

  goToShopping(){
    NavigatorUtils.popToRoute(
      this.props.navigator,
      {id: 'Dashboard'}
    )
  }

  onBack(){
    NavigatorUtils.popToRoute(
      this.props.navigator,
      {id: 'Dashboard'}
    )

  }

  createHeader(){
    return(
      <View style={[styles.head_img,{width:full_width,backgroundColor:'#fff',flexDirection:'row',justifyContent:'center',alignItems:'flex-end'}]}>
        <Icon name="check-square-o" size={30} color='orange'/>
        <Text style={{marginLeft:10,fontSize:25,color:'orange',fontWeight:'900'}}>
          恭喜你，成功支付
        </Text>
      </View>
    )
  }

  createBody(){
    return(
      <View style={{width:full_width,height:260,backgroundColor:'#fff'}}>
        <View style={{width:full_width,height:50,backgroundColor:'#fff',marginTop:30,flexDirection:'row',justifyContent:'center'}}>
          <View style={{flex:1,backgroundColor:'#fff',alignItems:'center',justifyContent:'flex-end',flexDirection:'row'}}>
            <Text>
              您的支付方式：
            </Text>
          </View>
          <View style={{paddingLeft:8,flex:1,backgroundColor:'#fff',alignItems:'center',flexDirection:'row'}}>
            <Text>
                 {this.props.acctno}
            </Text>
          </View>
        </View>
        <View style={{width:full_width,height:50,backgroundColor:'#fff',flexDirection:'row',justifyContent:'center'}}>
          <View style={{flex:1,backgroundColor:'#fff',alignItems:'center',justifyContent:'flex-end',flexDirection:'row'}}>
            <Text>
              您的订单号：
            </Text>
          </View>
          <View style={{paddingLeft:8,flex:1,backgroundColor:'#fff',alignItems:'center',flexDirection:'row'}}>
            <Text>
              {this.props.orderNo}
            </Text>
          </View>
        </View>
        <View style={{width:full_width,height:50,backgroundColor:'#234567',flexDirection:'row',justifyContent:'center'}}>
          <View style={{flex:1,backgroundColor:'#fff',alignItems:'center',justifyContent:'flex-end',flexDirection:'row'}}>
            <Text>
              您的账号：
            </Text>
          </View>
          <View style={{paddingLeft:8,flex:1,backgroundColor:'#fff',alignItems:'center',flexDirection:'row'}}>
            <Text>
              {this.props.phone}
            </Text>
          </View>
        </View>
        <View style={{width:full_width,height:50,backgroundColor:'#234567',flexDirection:'row',justifyContent:'center'}}>
          <View style={{flex:1,backgroundColor:'#fff',alignItems:'center',justifyContent:'flex-end',flexDirection:'row'}}>
            <Text>
              您的支付金额：
            </Text>
          </View>
          <View style={{paddingLeft:8,flex:1,backgroundColor:'#fff',alignItems:'center',flexDirection:'row'}}>
            <Text>
              {this.props.amt.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
    )
  }

  createFoot(){
    return(
      <View style={{height:70,width:full_width,backgroundColor:'#fff'}}>
        <View style={{width:full_width,height:50,backgroundColor:'#fff',flexDirection:'row',}}>

            <View style={{flex:1,height:40,flexDirection:'row',justifyContent:'flex-end',backgroundColor:'#fff',alignItems:'center'}}>
              <TouchableOpacity onPress={() => this.props.navigator.resetTo({id: "Dashboard", params: {}})}>
                <View style={{backgroundColor:'red',
                  height:40,width:120,marginRight:15,
                  flexDirection:'row',alignItems:'center'
                  ,justifyContent:'center',borderRadius:7,
                  borderColor:DEFAULT_RED_COLOR,
                  backgroundColor:DEFAULT_RED_COLOR,
                  borderWidth:1,}}>
                  <Text style={{fontSize:17,color:'#fff'}}>
                    &lt;&lt;返回首页
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{flex:1,height:40,flexDirection:'row',justifyContent:'flex-start',backgroundColor:'#fff',alignItems:'center'}}>
              <TouchableOpacity onPress={()=>this.props.navigator.push({id:'MyOrder'})}>
                <View style={{backgroundColor:'blue',
                  height:40,width:120,marginLeft:15,
                  flexDirection:'row',alignItems:'center',
                  justifyContent:'center',borderRadius:7,
                  borderColor:DEFAULT_RED_COLOR,
                  backgroundColor:'#fff',
                  borderWidth:1,}}>
                  <Text style={{fontSize:17,color:DEFAULT_RED_COLOR}}>
                    订单详情
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
        </View>
      </View>
    )
  }

  render(){
      console.log(this.props.phone);
      return(
      <View style={styles.root}>
        <StatusBar hidden={false} barStyle='dark-content' translucent={true} backgroundColor="#ffffff">
        </StatusBar>
        {this.createHeader()}
        {this.createBody()}
        {this.createFoot()}
      </View>
    )
  }
}

export default ShoppingSuccess
