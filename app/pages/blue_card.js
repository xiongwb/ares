import React from 'react'

import {
  Dimensions,
  Text,
  View,
  Image,
  Alert,
   StyleSheet,
   TextInput,
   TouchableOpacity,
   WhiteSpace,
   ART,

} from 'react-native'
/*信用卡还款页面*/
import {
  BasePage,
  BackNavBar,
  DevelopTip,
} from 'AresComponent'
import { createForm } from 'rc-form'
var full_width = Dimensions.get('window').width
/*viewWidth指的是顶部文字view的宽度
  宽度=屏幕宽度-左边距-头像宽度-间距-间距-箭头宽度-右边距
 */
let viewWidth = full_width-15-75-10-10-20-15

let common_color = '#8f8f8f'
let common_fontsize = 13
var full_height = Dimensions.get('window').height
const styles = StyleSheet.create({

  root: {
    backgroundColor:'#fff'
  },
  fun_text: {
    fontSize:9,
    marginTop:10,
    color:'#101010'
  },

});
class BlueCard extends BasePage {
  constructor (props) {
    super(props)
    this.state = {

  }

  }

  goTo(){
    Alert.alert('提示', '连接CSP服务器失败', [{ text: '确定'}])
  }
  render() {
    const { getFieldProps } = this.props.form



    return(
        <View style={{ flex:1,backgroundColor:'#fff'}}>
          <BackNavBar component={this} backText='首页'>信用卡还款</BackNavBar>
          <View style={{ marginTop:15,justifyContent: "center",margin: 6}}>
            <TouchableOpacity onPress={() => this.goTo()}>
              <Image source={require('ares/app/assets/image/tianjiaxyk.png')} style={{height:(full_width-12)/367 * 157,width:full_width - 12}}/>
            </TouchableOpacity>
          </View>
          <View style={{marginTop:10,flex:1}}>
            <View style={{flex:1,flexDirection:'row'}}>
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity onPress={() => this.goTo()}>
                  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Image source={require('ares/app/assets/image/repayment.png')} style={{width:20,height:17}}/>
                    <Text style={styles.fun_text}>信用卡还款</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity onPress={() => this.goTo()}>
                  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Image source={require('ares/app/assets/image/remind.png')} style={{width:20,height:18}}/>
                    <Text style={styles.fun_text}>还款提醒</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity onPress={() => this.goTo()}>
                  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Image source={require('ares/app/assets/image/bill.png')} style={{width:17,height:19}}/>
                    <Text style={styles.fun_text}>账单查询</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity onPress={() => this.goTo()}>
                  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Image source={require('ares/app/assets/image/auto.png')} style={{width:20,height:16}}/>
                    <Text style={styles.fun_text}>自动还款</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

    )
  }
}


export default createForm()(BlueCard)
