

import React from 'react'

import {
  Dimensions,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ListView,
  TextInput,
  AsyncStorage,
} from 'react-native'
/*绑定银行卡第一步骤的页面
      */
import {
  BasePage,
  Dialog,
  PasswordInput,
  BackNavBar,
  NavigatorUtils,
} from 'AresComponent'

import {
  COMMON_STYLES,
  STORAGE_KEYS,
} from 'AresConstant'

import Icon from 'react-native-vector-icons/FontAwesome'
import  Popup  from 'antd-mobile/lib/popup'
import Toast from 'antd-mobile/lib/toast'
import { createForm } from 'rc-form'
import Button from 'antd-mobile/lib/button'

import AresAPI from 'AresAPI'

wrapProps = {
  onTouchStart: e => e.preventDefault(),
  };
var full_height = Dimensions.get('window').height


const styles = StyleSheet.create({
  root: {
    backgroundColor: COMMON_STYLES.MAIN_BACKGROUND_COLOR,/*页面的布局和颜色*/
    flex: 1,
  },

   card_view:{
    margin:15,
    backgroundColor:'#dae2e6',
    borderRadius:8,
    height:110,
  },


  titl_box: {
    flex:1,
    justifyContent: "center",
    alignItems:'center',
  },

});

class TwoTransfer extends BasePage {
constructor(props){
    super(props);
    this.state = {
      acctno:'',
      paypwd:'',
      amt:'',
    }
  }
//当进入该页面的时候，调用这个方法，通过查询是否绑定卡的接口，查询到是否已经绑定过银行卡，
componentWillMount() {

     AsyncStorage.getItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
      let hash = JSON.parse(value)
      if (!!hash) {
        if(!!hash && !!hash.custNo){
          this.setState({custno:hash.custNo})

      AresAPI.Card.cardFindBind({custNo:this.state.custno}).done((res_json, res)=>{
            if(res_json.retCode === 1){
              this.setState({cardno:res_json.cardNo})

            }else{
               Alert.alert('错误提示1', res_json.retMsg, [{ text: '确定'}])
            }
          })
      AresAPI.Person.getPersonInfoPersonInfo({custno:this.state.custno}).done((res_json, res) => {
                    if(res_json.retCode == 1){
                      this.setState({phone:res_json.phone})

                    }else{
                      Alert.alert('错误提示2', res_json.retMsg, [{ text: '确定'}])
                    }
                  })
       }
      }else{
        Alert.alert(this.state.custNo)
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
onbing(){
  this.refs.dialog.show();
}
/*返回的时候调用这个方法 ，返回到我的账户*/
onBack(){
   NavigatorUtils.popToRoute(
      this.props.navigator,
      {id: 'Dashboard'}

      )
}
oncheng(){
  AresAPI.Phone.tranAcctNonSelf2To2({
    custno:this.state.custno,
    phone:this.state.phone,
    amt:this.state.amt,
    cardno:this.state.cardno,
    paypwd:this.state.paypwd,
    acctno:this.state.acctno,
  }).done((res_json, res) => {
                    if(res_json.retCode == 1){
                      Alert.alert('提示4', '转账成功', [{ text: '确定'}])
                    }else{
                      Alert.alert('错误提示3', res_json.retMsg, [{ text: '确定'}])
                    }
                  })
}


render() {
  const { getFieldProps } = this.props.form


    return(
      <View style={styles.root}>
        <BackNavBar component={this}  >二类转账</BackNavBar>
        <View style={{height:46, flexDirection:'row',backgroundColor:'#fff',borderBottomWidth: 1,borderColor:'#DDDDDD'}}>
          <View style={{flex:1.5,justifyContent: "center",}}>
            <Text style={{fontSize:14,color:'#000',marginHorizontal: 16}}>金额</Text>
          </View>
          <View style={{flex:3.5,}}>
            <TextInput
              style={{borderWidth: 1,backgroundColor:'#fff',flex:1 ,padding:0 }}
              onChangeText={(text) => {this.setState({text});this.setState({amt:text})}}
              onChange={this.on_change.bind(this)}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder=''
              borderColor='#fff'>
            </TextInput>
          </View>
        </View>
        <View style={{height:46, flexDirection:'row',backgroundColor:'#fff',borderBottomWidth: 1,borderColor:'#DDDDDD'}}>
          <View style={{flex:1.5,justifyContent: "center",}}>
            <Text style={{fontSize:14,color:'#000',marginHorizontal: 16}}> 卡号</Text>
          </View>
          <View style={{flex:3.5,}}>
            <TextInput
              style={{borderWidth: 1,backgroundColor:'#fff',flex:1 ,padding:0 }}
              onChangeText={(text) => {this.setState({text});this.setState({acctno:text})}}
              onChange={this.on_change.bind(this)}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder=''
              borderColor='#fff'>
            </TextInput>
          </View>
        </View>
        <View  style={{marginTop:16,marginHorizontal: 16}}>
          <Button
            style={styles.next_btn}
            type="primary"
            onClick={this.onbing.bind(this)}
            >确定
          </Button>
        </View>
        <Dialog
          ref="dialog"
          title="请输入交易密码"
          content={
          <View style={{alignItems:'center'}}>
            <PasswordInput
              maxLength={6}
              onEnd={(pwd)=>{this.setState({paypwd:pwd})}}>
            </PasswordInput>
          </View>
            }
          leftButtonText="取消"
          rightButtonText="好"
          onLeftButonClick={()=>{
            this.setState({text: ""})
            this.refs.dialog.close()

          }}
          onRightButtonClick={()=>{
            this.refs.dialog.close()
           this.oncheng()
          }}
        />
      </View>
    );
  }
  }



export default createForm()(TwoTransfer)
