import React from 'react'

import {
  Text,
  View,
  StyleSheet,
  DeviceEventEmitter,
  TextInput,
  TouchableOpacity,
  Alert,
 } from 'react-native'
/*绑定银行卡第三步骤的页面
      */
import {
  BasePage,
  BackNavBar,
  } from 'AresComponent'
import {
  COMMON_STYLES,
  VERIFY,
} from 'AresConstant'

import Icon from 'react-native-vector-icons/FontAwesome'
import dismissKeyboard from 'dismissKeyboard'
import Button from 'antd-mobile/lib/button'
import InputItem from 'antd-mobile/lib/input-item'
import Checkbox from 'antd-mobile/lib/checkbox'
import List from 'antd-mobile/lib/list'
import Modal from 'antd-mobile/lib/modal'
import { createForm } from 'rc-form'
import AresAPI from 'AresAPI'

const styles = StyleSheet.create({
  root: {
    backgroundColor: COMMON_STYLES.MAIN_BACKGROUND_COLOR,
    flex: 1,
    flexDirection: "column",
  },
  confirm_btn_box:{
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  input_box:{

   paddingTop: 20,
  },
});
const CheckboxItem = Checkbox.CheckboxItem;

class BankCard2 extends BasePage {
 constructor (props) {
    super(props)
    this.state = {
      form_validate: false,
      cardType:'',
      phoneprior:'',
      cardName:'',
    }
  }
//刚进入这个页面的时候，调用这个方法，调用查询卡类型的接口，通过接受到的卡号查出卡类型，反显在页面，
  componentWillMount() {
      AresAPI.Card.cardFindCardType({cardNo:this.props.data.cardno}).done((res_data_json, res)=>{
        if(res_data_json.retCode === 1 && res_data_json.bindFlag === '1'){
          console.log(res_data_json.cardType);
          console.log(res_data_json.cardName);
          this.setState({cardType:res_data_json.cardType,cardName:res_data_json.cardName})
        }else if (res_data_json.retCode === 1 && (res_data_json.bindFlag === '2' || res_data_json.bindFlag === '0')) {
          console.log(res_data_json.cardType);
          console.log(res_data_json.cardName);
          Alert.alert('提示', '不可以开卡', [{ text: '确定'}])
          this.props.navigator.pop()
        }else{

        }
      })
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
  //当点击下一步的时候，调用这个方法，当手机号没有输入的时候弹出提示框，当为1位手机号的时候，关闭键盘，把值传入到下一页。
on_push() {
  const regexp=VERIFY.PHONE;
  if (this.state.phoneprior == '') {
    Alert.alert('错误提示', '请输入手机号', [{ text: '确定'}]);
    return;
  }
  if (regexp.test(this.state.phoneprior) === false) {
    Alert.alert('错误提示', '请输入正确的手机号', [{ text: '确定'}]);
    return;
  }
        dismissKeyboard()
        let reg_data = this.props.data
        reg_data["phoneprior"] = this.state.phoneprior
        reg_data["cardtype"] = this.state.cardType

        Alert.alert('确认手机号', `短信验证码将发送到你的手机\n+86 ${this.state.phoneprior}`, [
          { text: '取消'},
          { text: '好的', onPress: () => {
                    this.props.navigator.push({id: "BankCard3", params: {data:reg_data}})
            }
          },
        ])
}//当点击提示的时候，调用这个方法，
  on_submit() {
    Alert.alert('手机号说明' , `银行卡预留的手机号码是办理该银行\n卡时所填写的手机号码。没有预\n留，手机号忘记或者已停用。请联\n系银行客服更新处理。大陆手机号\n为11位数字，非大陆手机号为“国家\n代码+手机号码”形式。 `, [
      { text: '知道了'},

    ])
  }
  render() {
    const { getFieldProps } = this.props.form

    let disabled = this.state.oldPwdLength==0||this.state.newPwdLength==0
    return(
      <View style={styles.root}>
        <BackNavBar   component={this}>填写银行卡信息</BackNavBar>
        <View style={{ height: 36,justifyContent: "center",}}>
          <Text style={{fontSize:13,marginLeft:10,marginTop:11}}>
            信息加密处理，仅限于银行验证
          </Text>
        </View>
        <View style={{height:46, flexDirection:'row',backgroundColor:'#fff',borderWidth: 1,borderColor:'#DDDDDD'}}>
          <View style={{flex:1.5,justifyContent: "center",}}>
            <Text style={{fontSize:14,color:'#000',marginHorizontal: 16}}> 卡类型</Text>
          </View>
          <View style={{flex:3.5,justifyContent: "center"}}>
            <Text
              style={{fontSize:16,color:'#000',textAlign:'left'}}
            >{this.state.cardName}</Text>
          </View>
        </View>
        <View style={styles.input_box}>
          <View style={{height:46, flexDirection:'row',backgroundColor:'#fff',borderWidth: 1,borderColor:'#DDDDDD'}}>
            <View style={{flex:1.5,justifyContent: "center",}}>
              <Text style={{fontSize:14,color:'#000',marginHorizontal: 16,}}> 手机号</Text>
            </View>
            <View style={{flex:3,}}>
              <TextInput
                keyboardType="numeric"
                style={{borderWidth: 1,backgroundColor:'#fff',flex:1,padding:0 }}
                onChangeText={(text) => {this.setState({text});this.setState({phoneprior:text})}}
                onChange={this.on_change.bind(this)}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder='银行卡预留手机号'
                borderColor='#fff'
                maxLength={11}>
              </TextInput>
            </View>
            <TouchableOpacity onPress={this.on_submit.bind(this)}>
              <View style={{flex:0.5,justifyContent: "center",marginHorizontal:10}}>
                <Icon name='info-circle'  size={25} color='#47bae4' />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View  style={{ paddingTop: 26,paddingHorizontal: 16,}}>
          <Text >同意<Text style={{color: '#47bae4',}}>《服务协议》</Text></Text>
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

export default createForm()(BankCard2)
