import React from 'react'

import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native'
/*绑定银行卡第四步骤的页面
      */
import {
  BasePage,
  BackNavBar,
  } from 'AresComponent'
 import {
  COMMON_STYLES,
} from 'AresConstant'
import List from 'antd-mobile/lib/list';
import { createForm } from 'rc-form'
import Button from 'antd-mobile/lib/button'
import InputItem from 'antd-mobile/lib/input-item'
//键盘的收起需要导入这个组件
import dismissKeyboard from 'dismissKeyboard'
import AresAPI from 'AresAPI'

var full_height = Dimensions.get('window').height


const styles = StyleSheet.create({
  root: {
   backgroundColor: COMMON_STYLES.MAIN_BACKGROUND_COLOR,/*页面的布局和颜色*/
    flex: 1,
  },
  title_box: {
    height: full_height/4,
    justifyContent: "center",
    alignItems:'center',
  },
  title_text: {
    fontSize: 36,
    color: "#000",
  },
  phone_text: {
    fontSize: 30,
    color: "#000",
  },
  next_btn: {
    marginTop: 20,
    marginHorizontal: 10,

  },
  input_box:{
  },
});

class BankCard3 extends BasePage {
  constructor (props) {
    super(props)
    this.state = {
      form_validate: false,
      varCode:'',
      m:60,
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


   //按钮的时候调用该方法
 on_push() {
  //关闭键盘，
    dismissKeyboard()
    //调用验证验证码的接口，当返回值为1的时候跳转到下一个页面
    AresAPI.Register.validateVarCode({
      phone: this.props.data.phoneprior,
      varCode: this.state.varCode,
      flag:2,
    }).done((res_json, res) => {
      if(res_json.retCode == 1){
        this.props.navigator.push({id: "BankCard4", params: {data: this.props.data}})
      }else{
        Alert.alert('错误提示', res_json.retMsg, [{ text: '确定'}])
      }
    })
 }
 //验证码按钮倒计时的方法，
 daojishi(m){
    if(m>0){
      setTimeout(()=>{
        m=m-1
        this.setState({m:m})
      }, 1000)
    }
  }
  //当进入该页面的时候，调用这个方法，调用发送验证码的接口
componentWillMount() {
  AresAPI.Register.getVarCode({phone: this.props.data.phoneprior,flag:2}).done((res_data_json, res)=>{
        if(res_data_json.retCode === 1){
        }else if(res_data_json.retCode === 0){
          console.log(res_data_json);
            Alert.alert('错误提示', res_data_json.retMsg, [{ text: '确定'}])
        }
    })
     this.daojishi(60);
}
  render() {
    let d;
    let t;
    let varCodeTextStyle;
    if(this.state.m==0){
      d=false;
      t='发送校验码';
      varCodeTextStyle={color:'#108EE9',fontSize:14};
    }else{
      d=true;
      t=this.state.m+'秒后重发校验码';
      varCodeTextStyle={color:'#cccccc',fontSize:14};
      this.daojishi(this.state.m);
    }
    const { getFieldProps } = this.props.form

    return(
      <View style={styles.root}>
        <BackNavBar   component={this}>填写校验码</BackNavBar>
        <View style={{ height: 50,justifyContent: "center",paddingHorizontal: 10}}>
          <Text style={{fontSize:13,marginHorizontal: 16,}}>请输入手机{this.props.data.phoneprior}接受到的短信验证码</Text>
        </View>
        <View style={{height:46, flexDirection:'row',paddingHorizontal: 8,}}>
          <View  style={{flex:1.5, marginHorizontal: 10,}}>
            <TextInput
              style={{ flex:1,borderWidth: 1,borderRadius:5,backgroundColor:'#fff' ,}}
              onChangeText={(text) => {this.setState({text});this.setState({varCode:text})}}
              onChange={this.on_change.bind(this)}
              clear
              keyboardType="numeric"
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder='短信验证码'
              borderColor='#DDDDDD'
            />
          </View>
          <TouchableOpacity disabled={d} onPress={this.componentWillMount.bind(this)}>
            <View style={{flex:1,justifyContent: "center",alignItems: "center",borderColor:'#DDDDDD',borderWidth: 1,borderRadius:5,}}>
              <Text style={varCodeTextStyle}>{t}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View  style={{ paddingTop: 20,paddingHorizontal: 16,}}>
          <Button
            style={styles.next_btn}
            type="primary"
            disabled={!this.state.form_validate}
            onClick={this.on_push.bind(this)}>
            下一步
          </Button>
        </View>
      </View>
    )
  }
}


export default createForm()(BankCard3)
