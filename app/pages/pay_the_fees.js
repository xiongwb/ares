/**
* by dujh
*/

import React from 'react'
import AresAPI from 'AresAPI'
import {
  Text,
  View,
  ART,
  StyleSheet,
  Image,
  Alert,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native'
import {
  Navbar,
  BackNavBar,
  BasePage,
  Dialog,
  PasswordInput
} from 'AresComponent'
import {
  COMMON_STYLES,
  EVENT_EMITTER_CONST,
  STORAGE_KEYS,
} from 'AresConstant'

import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
// @陈耀霆，支付页面
import Icon from 'react-native-vector-icons/FontAwesome'
import Button from 'antd-mobile/lib/button'
var full_width = Dimensions.get('window').width
var full_height = Dimensions.get('window').height


function PaymentMethod (props) {
  return (
      <View style={{borderColor:'#e5e5e5',borderBottomWidth:props.borderBottomWidth,borderTopWidth:props.borderTopWidth,marginTop:props.marginTop,height:60,alignItems:'center', backgroundColor:'white',flexDirection:'row'}}>
        <View>
          <Image source={props.source} style={{marginLeft:25}} />
        </View>
          <View >
          <Text style={{marginLeft:15,color:"#101010",fontSize:14}}>{props.text.text1}</Text>
          <Text style={{marginLeft:15,color:"#808080",fontSize:10}}>{props.text.text2}</Text>
        </View>
        <View style={{marginBottom:18,flex:1}}>
          <TouchableOpacity onPress={props.onPress} style={{position:'absolute',right:13}}>
            <Image source={props.sourceRadio}  />
          </TouchableOpacity>
        </View>
      </View>
  );
}
const styles = StyleSheet.create({
  root: {
    backgroundColor: COMMON_STYLES.MAIN_BACKGROUND_COLOR,
    flex: 1,

  }
});

class PayTheFees extends BasePage {
  constructor(){
    super();
    this.state = {
      password:'',
      bal:'',
      account:'',
      phone:'',
      index:1,
      custno:'',
      cardNo:'',
      data2:'',
      data3:'',
     text:'二类账户',
     isShow:false,
     icon:require('ares/app/assets/image/alipay.png'),
     isSelected1:require('ares/app/assets/image/red_check.png'),
     isSelected2:require('ares/app/assets/image/unchosen.png'),
     isSelected3:require('ares/app/assets/image/unchosen.png'),
     isSelected4:require('ares/app/assets/image/unchosen.png')
  }
 }
 alipaytopay(index){
    this.setState({
     isSelected1:require('ares/app/assets/image/unchosen.png'),
     isSelected2:require('ares/app/assets/image/unchosen.png'),
     isSelected3:require('ares/app/assets/image/unchosen.png'),
     isSelected4:require('ares/app/assets/image/unchosen.png'),
     index:index
   })
    if(index==3){
      this.setState({
     isSelected3:require('ares/app/assets/image/red_check.png'),
     icon:require('ares/app/assets/image/alipay.png'),
     text:'支付宝支付'
   })
  }
  if(index==4){
      this.setState({
     isSelected4:require('ares/app/assets/image/red_check.png'),
     icon:require('ares/app/assets/image/wechat.png'),
     text:'微信支付'
   })
  }
  if(index==1){
      this.setState({
     isSelected1:require('ares/app/assets/image/red_check.png'),
     icon:require('ares/app/assets/image/two_accounts.png'),
     text:'二类账户(7890)'
   })
  }
  if(index==2){
      this.setState({
     isSelected2:require('ares/app/assets/image/red_check.png'),
     icon:require('ares/app/assets/image/three_accounts.png'),
     text:'三类账户(7890)'
   })
  }
}

componentWillMount(){
AsyncStorage.getItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
    let hash = JSON.parse(value)
    console.log(hash);
    if (!!hash) {
      if (!!hash && !!hash.tokenModel) {
        console.log(hash.phone);
        this.setState({phone:hash.phone})
      }
      if (!!hash && !!hash.custNo) {
        this.setState({custno:hash.custNo})
        AresAPI.FindAcct.findacctacct2List({
         custno:hash.custNo
        }).done((res_json,res) => {

            this.setState({data2:res_json.findAcctList})

       })
       AresAPI.FindAcct.findacctacct3List({
        custno:hash.custNo
       }).done((res_json,res) => {

           this.setState({data3:res_json.findAcctList})

      })
        AresAPI.Card.cardFindBind({
            custNo:hash.custNo
          }).done((res_json, res) => {
             this.setState({cardNo:res_json.cardNo})

        })
      }
    }
  })
 }

onRight_ButtonClick(){
  if(this.state.index == 1){
    this.refs.dialog.close()
        AresAPI.TranAcctSelf.tranAcctSelf2To1({
        phone:this.state.phone,
        custno:this.state.custno,
        acctno2:this.state.data2[0].acctno,
        paypwd:this.state.password,
        amt:this.props.price,
    }).done((res_json,res) => {
       if(res_json.retCode==1){
        this.setState({phone:''})
        this.setState({bal:''})
        this.setState({password:''})
        RCTDeviceEventEmitter.emit(EVENT_EMITTER_CONST.NEEDWALLETREQUEST, 'changeTaberBar');

        this.props.navigator.push({id:'WithdrawalsSuccess',params:{data:'缴费'}})
         }else{

          Alert.alert('错误提示', res_json.retMsg, [{ text: '确定'}])
         }
       })
  }else if(this.state.index == 2){
    this.refs.dialog.close()
        AresAPI.TranAcctSelf.tranAcctSelf3To1({
        phone:this.state.phone,
        custno:this.state.custno,
        acctno3:this.state.data3[0].acctno,
        paypwd:this.state.password,
        amt:this.props.price,
    }).done((res_json,res) => {
       if(res_json.retCode==1){
        this.setState({phone:''})
        this.setState({bal:''})
        this.setState({password:''})
        RCTDeviceEventEmitter.emit(EVENT_EMITTER_CONST.NEEDWALLETREQUEST, 'changeTaberBar');

        this.props.navigator.push({id:'WithdrawalsSuccess',params:{data:'缴费'}})
         }else{

          Alert.alert('错误提示', res_json.retMsg, [{ text: '确定'}])

         }
       })
  }else if(this.state.index == 3){
    Alert.alert('错误提示', "目前只支持二三类账户支付", [{ text: '确定'}])
  }else if (this.state.index == 4) {
    Alert.alert('错误提示', "目前只支持二三类账户支付", [{ text: '确定'}])
  }

   }

shopping_Success(){

  this.refs.dialog.close()
  this.props.navigator.push({id:'ShoppingSuccess',params:{}})
}
 on_Click(){

   this.refs.dialog.show();

  }
render(){
  const path = ART.Path();
  path.moveTo(16,1);
  path.lineTo(full_width,1);
  if(this.state.isShow==true){
    return(
       <View style={styles.root}>
         <BackNavBar component={this}  backgroundColor={COMMON_STYLES.NAVIBAR_COLOR} backTextColor="#FFFFFF" titleColor="#FFFFFF">缴费</BackNavBar>
         <View style={{borderColor:'#e5e5e5',marginTop:10,height:120,backgroundColor:'#fff'}}>
           <View style={{marginTop:11,flexDirection:'row',backgroundColor:'#fff',justifyContent:'space-between'}}>
             <Text style={{fontSize:16,color:"#101010",marginLeft: 16}}>缴费金额</Text>
             <Text style={{fontSize:16,color:"#f29836",marginRight:13}}>￥{this.props.price}</Text>
           </View>
           <View style={{marginTop:13,flexDirection:'row',backgroundColor:'#fff',justifyContent:'space-between'}}>
             <Text style={{fontSize:16,color:"#101010",marginLeft: 16}}>已优惠：</Text>
             <Text style={{fontSize:16,color:"#f29836",marginRight:13}}>￥0</Text>
           </View>
           <ART.Surface width={full_width} height={1}>
             <ART.Shape d={path} stroke="#e5e5e5" strokeWidth={2} />
           </ART.Surface>
           <View style={{marginTop:15,marginBottom:5,flexDirection:'row',backgroundColor:'#fff',justifyContent:'flex-end'}}>
             <Text style={{fontSize:16,color:'#101010'}}>总计：</Text>
             <Text style={{fontSize:16,color:'#f29836',marginRight:13}}>￥{this.props.price}</Text>
           </View>
        </View>
        <PaymentMethod onPress={()=>{this.alipaytopay(1)}}   borderTopWidth={1} marginTop={10} text={{text1:'二类账户支付',text2:'推荐有二类账号的用户使用'}} source={require('ares/app/assets/image/two_accounts.png')}  sourceRadio={this.state.isSelected1} />
        <PaymentMethod onPress={()=>{this.alipaytopay(2)}}   borderTopWidth={1}  text={{text1:'三类账户支付',text2:'推荐有三类账号的用户使用'}} source={require('ares/app/assets/image/three_accounts.png')}  sourceRadio={this.state.isSelected2} />
         <PaymentMethod onPress={()=>{this.alipaytopay(3)}}   borderTopWidth={1}  text={{text1:'支付宝支付',text2:'推荐有支付宝账号的用户使用'}} source={require('ares/app/assets/image/alipay.png')}  sourceRadio={this.state.isSelected3} />
         <PaymentMethod onPress={()=>{this.alipaytopay(4)}}   borderTopWidth={1} borderBottomWidth={1} text={{text1:'微信支付',text2:'推荐安装微信5.0即以上版本的用户使用'}} source={require('ares/app/assets/image/wechat.png')} sourceRadio={this.state.isSelected4} />
         <TouchableOpacity onPress={this.on_Click.bind(this)}>
            <View style={{alignItems:'center',justifyContent: "center",borderRadius:8,marginHorizontal:26,height:41,marginTop:21,backgroundColor:"#f5787c",fontSize:18}}><Text style={{color:"#ffffff",fontSize:16}}>确认支付方式 </Text></View>
         </TouchableOpacity>
         <Dialog
           ref="dialog"
           title="请输入交易密码"
             content={
           <View style={{alignItems:'center'}}>
             <PasswordInput maxLength={6}
                onEnd={(pwd)=>{this.setState({password:pwd})}}
             ></PasswordInput>
           </View>
         }
         leftButtonText="取消"
         rightButtonText="好的"
         onLeftButonClick={()=>{
           this.setState({password:""})
           this.refs.dialog.close()
         }}
         onRightButtonClick={()=>{this.onRight_ButtonClick()}}
       />
       </View>
    )
       }
    return(
       <View style={styles.root}>
          <BackNavBar component={this}  backgroundColor={COMMON_STYLES.NAVIBAR_COLOR} backTextColor="#FFFFFF" titleColor="#FFFFFF">支付订单</BackNavBar>
          <View style={{borderColor:'#e5e5e5',marginTop:10,height:120,backgroundColor:'#fff'}}>
            <View style={{marginTop:11,flexDirection:'row',backgroundColor:'#fff',justifyContent:'space-between'}}>
              <Text style={{fontSize:16,color:"#101010",marginLeft: 16}}>缴费金额</Text>
              <Text style={{fontSize:16,color:"#f29836",marginRight:13}}>￥{this.props.price}</Text>
            </View>
            <View style={{marginTop:13,flexDirection:'row',backgroundColor:'#fff',justifyContent:'space-between'}}>
              <Text style={{fontSize:16,color:"#101010",marginLeft: 16}}>已优惠：</Text>
              <Text style={{fontSize:16,color:"#f29836",marginRight:13}}>￥0</Text>
            </View>
            <ART.Surface width={full_width} height={1}>
              <ART.Shape d={path} stroke="#e5e5e5" strokeWidth={2} />
            </ART.Surface>
            <View style={{marginTop:15,marginBottom:5,flexDirection:'row',backgroundColor:'#fff',justifyContent:'flex-end'}}>
              <Text style={{fontSize:16,color:'#101010'}}>总计：</Text>
              <Text style={{fontSize:16,color:'#f29836',marginRight:13}}>￥{this.props.price}</Text>
            </View>
         </View>
         <PaymentMethod onPress={()=>{this.alipaytopay(1)}}   borderTopWidth={1} marginTop={10} text={{text1:'二类账户支付',text2:'推荐有二类账号的用户使用'}} source={require('ares/app/assets/image/two_accounts.png')}  sourceRadio={this.state.isSelected1} />
         <PaymentMethod onPress={()=>{this.alipaytopay(2)}}   borderTopWidth={1}  text={{text1:'三类账户支付',text2:'推荐有三类账号的用户使用'}} source={require('ares/app/assets/image/three_accounts.png')}  sourceRadio={this.state.isSelected2} />
          <TouchableOpacity onPress={()=>this.setState({isShow:true})}>
            <View style={{justifyContent:'center',borderColor:'#e5e5e5',borderBottomWidth:1,borderTopWidth:1,height:60,alignItems:'center', backgroundColor:'white',flexDirection:'row'}}>
              <Text style={{marginLeft:15,color:"#808080",fontSize:14}}>更多支付方式</Text>
              <Icon style={{marginTop:3,marginLeft:1}} name="angle-down" size={24} color='#808080'/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.on_Click.bind(this)}>
            <View style={{alignItems:'center',justifyContent: "center",borderRadius:8,marginHorizontal:26,height:41,marginTop:15,backgroundColor:"#f5787c"}}><Text style={{color:"#ffffff",fontSize:16}}>确认支付方式 </Text></View>
          </TouchableOpacity>
          <Dialog
            ref="dialog"
            title="请输入交易密码"
            content={
            <View style={{alignItems:'center'}}>
              <PasswordInput maxLength={6}
                 onEnd={(pwd)=>{this.setState({password:pwd})}}
              ></PasswordInput>
            </View>
          }
          leftButtonText="取消"
          rightButtonText="好的"
          onLeftButonClick={()=>{
            this.setState({password:""})
            this.refs.dialog.close()
          }}
          onRightButtonClick={()=>{this.onRight_ButtonClick()}}
        />
         </View>
    )
  }
}
export default PayTheFees
