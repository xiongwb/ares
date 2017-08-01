import React from 'react'

import {
  Dimensions,
  Text,
  View,
  ScrollView,
  StyleSheet,
  ART,
  TextInput,
  TouchableOpacity,
  Alert,
  AsyncStorage,
} from 'react-native'
/*更改手机号第二步骤页面
张乐   2016-10-26*/
import {
  BasePage,
  BackNavBar,
  PushLogin,
  DeviceUtils,
} from 'AresComponent'

import {
  COMMON_STYLES,
  STORAGE_KEYS,
  VERIFY,
} from 'AresConstant'

import List from 'antd-mobile/lib/list';
import { createForm } from 'rc-form'
import Button from 'antd-mobile/lib/button'
import InputItem from 'antd-mobile/lib/input-item'
//键盘的收起 需要导入这个组件
import dismissKeyboard from 'dismissKeyboard'
import AresAPI from 'AresAPI'

var full_height = Dimensions.get('window').height
const styles = StyleSheet.create({
  root: {
   backgroundColor: COMMON_STYLES.MAIN_BACKGROUND_COLOR,//页面的布局和颜色
    flex: 1,
  },
   next_btn: {
    marginTop: 22,
   height:46,
   borderWidth: 1,
   backgroundColor:'#fff',
   borderColor:'#DDDDDD'
  },
  confirm_btn_bo:{
     marginTop: 36,
    paddingHorizontal: 16,
  },
});

class PhoneChange1 extends BasePage {
  constructor (props) {
    super(props)
    this.state = {
      form_validate: false,
      varCode:'',
      newPhone:'',
     hash:'',
      m:0,
      disabled:false,
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
  //进入这个画面触发这个事件。获取到手机号和客户号，已便于下面API取值
  componentWillMount() {
   AsyncStorage.getItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
      let hash = JSON.parse(value)
      this.setState({hash:hash})
      if (!!hash) {

        if (!!hash && !!hash.custNo) {
          this.setState({custno:hash.custNo})
          //获取到后台的个人资料，姓名，性别，身份证号，手机号。
          AresAPI.Person.getPersonInfoPersonInfo({custno:hash.custNo}).done((res_json, res) => {
                    if(res_json.retCode == 1){
                      this.setState({phone:res_json.phone})
                    }else{
                      Alert.alert('错误提示', res_json.retMsg, [{ text: '确定'}])
                    }
                  })

        }
      }
    })

  }
  //点击完成按钮触发这个方法，
  on_push() {
    //关闭输入框
    dismissKeyboard()
    const regexp=VERIFY.PHONE;
    if (this.state.newPhone == '') {
      Alert.alert('错误提示', '请输入手机号', [{ text: '确定'}]);
      return;
    }
    if (regexp.test(this.state.newPhone) === false) {
      Alert.alert('错误提示', '请输入正确的手机号', [{ text: '确定'}]);
      return;
    }
    this.setState({disabled:true})
     //验证新手机密码的接口，当返回值为1时进入修改手机号的接口，返回的不是1时，弹出提示信息
      AresAPI.Phone.validateVarCode({
        flag:1,
        brc:this.state.hash.brcNo||'1',
        phoneName:DeviceUtils.getPhoneName(),
        phoneId:DeviceUtils.getPhoneId(),
        phone:this.state.newPhone,
       varCode:this.state.varCode,
       custNo:this.state.custno,
      }).done((res_json, res) => {
        if(res_json.retCode == 1){

           //修改手机号的接口，当返回值为1时进入到phone_change2.js这个里面，返回的不为1时，弹出错误信息
            AresAPI.Phone.settingsModIphone({
              brcno:this.state.hash.brcNo||'1',
              custno:this.state.custno,
              oldphone:this.props.data,
              newphone:this.state.newPhone,
              phonename:DeviceUtils.getPhoneName(),
              classes:'T',
            }).done((res_json, res) => {
              if(res_json.retCode == 1){
                this.props.navigator.push({id: "PhoneChange2", params: {data: this.props.data}})
              }else{
                this.setState({disabled:false})
               Alert.alert('错误提示3', res_json.retMsg, [{ text: '确定'}])
              }
            })
        }else{
          this.setState({disabled:false})
          Alert.alert('错误提示2', res_json.retMsg, [{ text: '确定'}])
        }
      })
  }
  //点击获取验证码按钮 触发这个方法，获取到手机验证码
  on_pushone(){
    AresAPI.Phone.getVarCode({
      phone:this.state.newPhone,
    }).done((res_data_json, res)=>{
       if(res_data_json.retCode == 1){}else{
            Alert.alert('错误提示1', res_json.retMsg, [{ text: '确定'}])
        }
    })
    this.daojishi(60);
  }
  //倒计时验证码，默认为60秒

  daojishi(m){
    if(m>0){
      setTimeout(()=>{
        m=m-1
        this.setState({m:m})
      }, 1000)
    }
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
   const path = ART.Path();
    path.moveTo(1,1); //将起始点移动到(1,1) 默认(0,0)
    path.lineTo(1,40); //连线到目标点(300,1)

    return(
      //导航
      <View style={styles.root}>
        <BackNavBar component={this}>手机号变更</BackNavBar>
        <View  style={styles.next_btn}>
          <TextInput
            style={{borderWidth: 1,backgroundColor:'#fff',marginHorizontal: 16,fontSize:14,flex:1 ,padding:0}}
            onChangeText={(text) => {this.setState({text});this.setState({newPhone:text})}}
            underlineColorAndroid='rgba(0,0,0,0)'
            keyboardType="numeric"
            placeholder='输入新手机号'
            borderColor='#fff'
            maxLength={11}>

          </TextInput>
        </View>
        <View  style={{marginTop: 22,}}>
          <View style={{height:46, flexDirection:'row',backgroundColor:'#fff',borderWidth: 1,borderColor:'#DDDDDD'}}>
            <View style={{flex:1.5,justifyContent: "center",backgroundColor:'#fff'}}>
              <Text style={{fontSize:14,color:'#000',marginHorizontal: 16}}> 验证码</Text>
            </View>
            <View style={{flex:3,justifyContent: "center"}}>
              <TextInput
                style={{borderWidth: 1,backgroundColor:'#fff',flex:1,padding:0}}
                onChangeText={(text) => {this.setState({text});this.setState({varCode:text})}}
                onChange={this.on_change.bind(this)}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder='输入短信验证码'
                borderColor='#fff'>
              </TextInput>
            </View>
            <View style={{alignSelf:'center'}}>
              <ART.Surface width={1} height={40}>
                <ART.Shape d={path} stroke="#bbbbbb" strokeWidth={1} />
              </ART.Surface>
            </View>
            <View style={{flex:1.5,backgroundColor:'#fff',justifyContent: "center",marginHorizontal: 8}}>
              <TouchableOpacity disabled={d} onPress={this.on_pushone.bind(this)}>
                <Text style={varCodeTextStyle}>{t}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.confirm_btn_bo}>
          <Button
            type="primary"      
            onClick={this.on_push.bind(this)}
            disabled={this.state.disabled}
            >完成
          </Button>
        </View>
      </View>
    )
  }
}


export default createForm()(PhoneChange1)
