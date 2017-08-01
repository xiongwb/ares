

import React from 'react'

import {
  Dimensions,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,

} from 'react-native'
/*绑定银行卡第二步骤的页面
      */
import {
  BasePage,
  AresTextInput,
  BackNavBar
} from 'AresComponent'
import {
  COMMON_STYLES,
} from 'AresConstant'
import AresAPI from 'AresAPI'
import List from 'antd-mobile/lib/list';
import Icon from 'react-native-vector-icons/FontAwesome'
import ActionSheet from 'antd-mobile/lib/action-sheet'
import { createForm } from 'rc-form'
import Button from 'antd-mobile/lib/button'
//键盘的收起需要导入这个组件
import dismissKeyboard from 'dismissKeyboard'
import InputItem from 'antd-mobile/lib/input-item'
var full_height = Dimensions.get('window').height
const styles = StyleSheet.create({
  root: {
    backgroundColor: COMMON_STYLES.MAIN_BACKGROUND_COLOR,//页面的布局和颜色
    flex: 1,
  },

  confirm_btn_box:{
    paddingTop: 46,
    paddingHorizontal: 16,
  },
  input_box:{
    backgroundColor: "#fff",

  },
});
class BankCard1 extends BasePage {
  constructor (props) {
    super(props)
    this.state = {
      form_validate: false,
      acctname:'',
      cardno:'',
    }
  }
  on_change() {
    setTimeout(()=>{
      this.props.form.validateFields((error, value) => {
        if(error == null){
          this.setState({form_validate: true})
        }else{
          this.setState({form_validate: false})
        }
      });
    },0)
  }
  //当点击下一步的时候，调用这个方法，
 on_push() {
  //当点击下一步的时候，调用这个方法，关闭键盘
  dismissKeyboard()
  if (this.state.acctname.length == 0) {
    Alert.alert('提示', '请输入持卡人姓名', [{ text: '确定'}])
    return
  }
  if (this.state.cardno.length == 0) {
    Alert.alert('提示', '请输入卡号', [{ text: '确定'}])
    return
  }
  AresAPI.Card.cardFindCardType({cardNo:this.state.cardno}).done((res_data_json, res)=>{
    if(res_data_json.retCode === 1 && res_data_json.bindFlag === '1'){
      let input_data = {
        acctname:this.state.acctname,
        cardno:this.state.cardno,
      }
      this.props.navigator.push({
      id: "BankCard2",
      params: {data:input_data}
    })
      this.setState({cardType:res_data_json.cardType,cardName:res_data_json.cardName})
    }else{

      Alert.alert('提示', '对不起您输入的卡号有误，或者为不支持的卡类型', [{ text: '确定'}])
    }
  })
 }
  render() {
    const { getFieldProps } = this.props.form

    return(
      <View style={styles.root}>
        <BackNavBar  component={this}  rightContent={ <Image source={require('ares/app/assets/image/wenhao.png')} style={{width:22,height:22}} />} >添加银行卡</BackNavBar>
        <View style={{ height: 36,justifyContent: "center"}}>
          <Text style={{fontSize:13,marginLeft:10,marginTop:11}}>
            请绑定持卡人本人的银行卡
          </Text>
        </View>
        <View style={styles.input_box}>
          <View style={{height:46, flexDirection:'row',backgroundColor:'#fff',borderTopWidth: 1,borderBottomWidth: 1,borderColor:'#DDDDDD'}}>
            <View style={{flex:1.5,justifyContent: "center",}}>
              <Text style={{fontSize:14,color:'#000',marginHorizontal: 16}}> 持卡人</Text>
            </View>
            <View style={{flex:3,}}>
              <TextInput
                style={{borderWidth: 1,backgroundColor:'#fff',flex:1,padding:0 }}
                onChangeText={(text) => {this.setState({text});this.setState({acctname:text})}}
                onChange={this.on_change.bind(this)}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder=''
                borderColor='#fff'>
              </TextInput>
            </View>
            <TouchableOpacity>
              <View style={{flex:0.5,justifyContent: "center",marginHorizontal:10}}>
                <Icon name='info-circle'  size={25} color='#47bae4' />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{height:46, flexDirection:'row',backgroundColor:'#fff',borderBottomWidth: 1,borderColor:'#DDDDDD'}}>
          <View style={{flex:1.5,justifyContent: "center",}}>
            <Text style={{fontSize:14,color:'#000',marginHorizontal: 16}}> 卡号</Text>
          </View>
          <View style={{flex:3.5,}}>
            <TextInput
              style={{borderWidth: 1,backgroundColor:'#fff',flex:1 ,padding:0 }}
              onChangeText={(text) => {this.setState({text});this.setState({cardno:text})}}
              onChange={this.on_change.bind(this)}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder=''
              keyboardType="numeric"
              borderColor='#fff'>
            </TextInput>
          </View>
        </View>
        <View style={styles.confirm_btn_box}>
          <Button
            type='primary'
            disabled={!this.state.form_validate}
            onClick={this.on_push.bind(this)}>
            下一步
          </Button>
        </View>
      </View>

    )
  }
}


export default createForm()(BankCard1)
