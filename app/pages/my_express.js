import React from 'react'

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,

  Alert,
  AsyncStorage,
} from 'react-native'

// 我的快递的功能页面
import { createForm } from 'rc-form'
import Icon from 'react-native-vector-icons/FontAwesome'

import {
  BasePage,
  BackNavBar,
  DevelopTip,
} from 'AresComponent'
import {
  COMMON_STYLES,
} from 'AresConstant'

const styles = StyleSheet.create({
  root: {
    backgroundColor: COMMON_STYLES.MAIN_BACKGROUND_COLOR,
    flex: 1,
  },
  fun_text: {
    fontSize:15,
    marginTop:10,
    color:'#ffffff'
  },

});
class MyExpress extends BasePage  {
  constructor(props) {
    super(props)
    this.state={

    }
  }
  render() {
   const { getFieldProps } = this.props.form
    return(
      <View style={styles.root}>
        <BackNavBar   component={this} backText='首页' >我的快递</BackNavBar>
        <View style={{backgroundColor:'#6c9ad8',height:120}}>
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <View style={{flex:1,flexDirection:'row'}}>
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity  onPress={() =>this.props.navigator.push({id:'ExpressCheck'})}>
                  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Image source={require('ares/app/assets/image/Express_delivery.png')} style={{width:35,height:30}}/>
                    <Text style={styles.fun_text}>查快递</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity onPress={() => this.props.navigator.push({id:'ExpressDelivery'})}>
                  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Image source={require('ares/app/assets/image/send.png')} style={{width:35,height:28}}/>
                    <Text style={styles.fun_text}>寄快递</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity onPress={() =>this.props.navigator.push({id:'PaymentExpressQuery'})}>
                  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Image source={require('ares/app/assets/image/payment.png')} style={{width:35,height:28}}/>
                    <Text style={styles.fun_text}>付款</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={{marginTop : 70,justifyContent:'center',alignItems:'center'}}>
          <Image source={require('ares/app/assets/image/none.png')} style={{width:122,height:134}}/>
        </View>
        <View style={{marginTop : 16,}}>
          <Text style={{textAlign:'center',fontSize:16,color:'#101010'}}>暂无新的物流信息</Text>
        </View>
      </View>
    )
  }

}

export default createForm()(MyExpress)
