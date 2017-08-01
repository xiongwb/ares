

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
  STORAGE_KEYS,
  COMMON_STYLES,
} from 'AresConstant'
import Icon from 'react-native-vector-icons/FontAwesome'
import  Popup  from 'antd-mobile/lib/popup'
import Toast from 'antd-mobile/lib/toast'
import { createForm } from 'rc-form'
import Button from 'antd-mobile/lib/button'
//键盘的收起需要导入这个组件
import dismissKeyboard from 'dismissKeyboard'
import Card from 'antd-mobile/lib/card'
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

class BankCard extends BasePage {
constructor(props){
    super(props);
    this.state = {
      cardno:'',
      is_bankcard : false,
      cardType:'',
      password:'',
      bal:'',
      account:'',
      phone:'',
      index:'',
      cardNo:'',
      data2:'',
      data3:'',
      hash:'',
    }
  }
//当进入该页面的时候，调用这个方法，通过查询是否绑定卡的接口，查询到是否已经绑定过银行卡，
componentWillMount() {
     AsyncStorage.getItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
      let hash = JSON.parse(value)
      console.log(hash);
      if (!!hash) {
        this.setState({hash:hash})
        if(!!hash && !!hash.custNo){
          console.log(hash.custNo);
          this.setState({custno:hash.custNo})
          AresAPI.FindAcct.findacctacct2List({
           custno:hash.custNo
          }).done((res_json,res) => {
            for(let i = 0;i<res_json.findAcctList.length;i++){
              if(res_json.findAcctList[i] != ''){
                this.setState({data2:res_json.findAcctList[i].acctno})
              }
            }
            console.log(res_json.findAcctList);
         })
         AresAPI.FindAcct.findacctacct3List({
          custno:hash.custNo
         }).done((res_json,res) => {
           for(let i = 0;i<res_json.findAcctList.length;i++){
             if(res_json.findAcctList[i] != ''){
               this.setState({data3:res_json.findAcctList[i].acctno})
             }
           }
           console.log(res_json.findAcctList[0].acctno);
        })
          AresAPI.Card.cardFindBind({custNo:hash.custNo}).done((res_json, res)=>{
            if(res_json.retCode === 1){
              this.setState({cardno:res_json.cardNo})
              //绑定了银行卡，通过该属性显示
              this.setState({is_bankcard:true})
              AresAPI.Card.cardFindCardType({cardNo:this.state.cardno}).done((res_data_json, res)=>{
                if(res_data_json.retCode === 1 && res_data_json.bindFlag === '1'){
                  this.setState({cardType:res_data_json.cardName})
                }
              })
            }
          })
        }
      }else{
        //没有绑定的  显示添加银行卡
        this.setState({is_bankcard:false})
      }
    })
}

//删除银行卡调用的方法，目前没有接口。
onClick() {
    Popup.show(
      <View>
        <Button onClick={this.onbing.bind(this) }>删除</Button>
        <Button onClick={ this.onClose.bind(this)}>取消</Button>
      </View>
    , { animationType: 'slide-up', wrapProps});
  }

//删除银行卡调用的方法，目前没有接口。
onbing(){
  this.refs.dialog.show();
  this.onClose();
}

//返回的时候调用这个方法 ，返回到我的账户
onBack(){
   NavigatorUtils.popToRoute(
      this.props.navigator,
      {id: 'Dashboard'}
      )
}
//删除银行卡调用的方法，目前没有接口。
   onClose() {
    this.setState({ sel:"cancel" });
    Popup.hide();
  }

  bindCard(){
    if(!!this.state.is_bankcard){
      Alert.alert('错误提示','对不起，您已绑定一张银行卡，无法再次绑定', [{ text: '确定'}])
    }else {
      this.props.navigator.push({id:'BankCard1',params:{}})
    }
  }


onRight_ButtonClick(){
  this.refs.dialog.close();
  AresAPI.DestroyAcctController.acct2Close({
    brcno:this.state.hash.brcNo||'1',
    classes:'T',
    acctno:this.state.data2,
    passwd:this.state.password.toString(),
  }).done((res_json, res)=>{
    if(res_json.retCode === 1){
      AresAPI.DestroyAcctController.acct3Close({
        brcno:this.state.hash.brcNo||'1',
        classes:'T',
        acctno:this.state.data3,
        passwd:this.state.password.toString(),
      }).done((res_json, res)=>{
        if(res_json.retCode === 1){
          AresAPI.Card.canclBind({brcno:this.state.hash.brcNo||'1',cardno:this.state.cardno}).done((res_json,res)=>{
            if(res_json.retCode === 1){
              this.props.navigator.replace({id:'BankCard'})
            }else {
              Alert.alert('错误提示', res_json.retMsg, [{ text: '确定'}])
            }
          })
        }else {
          Alert.alert('错误提示', res_json.retMsg, [{ text: '确定'}])
        }
      })
  }else {
    Alert.alert('错误提示', res_json.retMsg, [{ text: '确定'}])
  }
})

}

render() {
  const { getFieldProps } = this.props.form

    //当没有绑定银行卡的时候
  if(this.state.is_bankcard === false){
    return(
      <View style={styles.root}>
        <BackNavBar  backgroundColor={COMMON_STYLES.NAVIBAR_COLOR} component={this} rightContent={ <Icon name='plus' size={22} onPress={()=>{this.props.navigator.push({id:'BankCard1',params:{}})}}/> }>我的银行卡</BackNavBar>
          <View style={styles.titl_box}>
          <Text >亲还没绑定银行卡，请点击右上角的＋号</Text>
        </View>
      </View>
      );
    }
   /*
    绑定了银行卡
   */
    else{
    return(
      <View style={styles.root}>
        <BackNavBar  backgroundColor={COMMON_STYLES.NAVIBAR_COLOR} component={this}  rightContent={ <Icon name='plus' size={22} onPress={()=>this.bindCard()}/> }>我的银行卡</BackNavBar>
        <View>
          <TouchableOpacity onPress={this.onClick.bind(this)}>
            <View style={styles.card_view}>
              <View style={{flexDirection:'row',marginTop:20}}>
                <View style={{height:55,width:55,borderRadius:55/2,marginLeft:10,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
                  <Image source={require('ares/app/assets/image/banklogo.png')} style={{width:37,height:35}}/>
                </View>
                <View>
                  <Text style={{fontSize:16,marginLeft:10,marginTop:5}}>{this.state.cardType}</Text>
                  <Text style={{fontSize:15,marginLeft:10,marginTop:15}}>{this.state.cardno}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <Dialog
            ref="dialog"
            title="请输入交易密码"
            content={
              <View style={{alignItems:'center'}}>
                <PasswordInput
                  maxLength={6}
                  onEnd={(pwd)=>{this.setState({password:pwd})}}
                ></PasswordInput>
              </View>
            }
          leftButtonText="取消"
          rightButtonText="好"
          onLeftButonClick={()=>{
            this.setState({password: ""})
            this.refs.dialog.close()
            this.onClose()
          }}
          onRightButtonClick={()=>{this.onRight_ButtonClick()}}
        />
      </View>
    );
  }
  }
}


export default createForm()(BankCard)
