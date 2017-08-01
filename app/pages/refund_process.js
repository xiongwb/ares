import React from 'react'
import {
 Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Picker,
  TouchableHighlight,
  TouchableOpacity,
  ART,
  Alert,
  Platform,
  StatusBar,
} from 'react-native'

import {
  BasePage,
  BackNavBar,
  NavigatorUtils,
  ReasonTextInput,
  DialogPicker
} from 'AresComponent'
import {
  COMMON_STYLES,
} from 'AresConstant'
// @陈耀霆，退款流程页面
import Icon from 'antd-mobile/lib/icon'
import ImagePicker from 'antd-mobile/lib/image-picker'
var full_height = Dimensions.get('window').height
var full_width = Dimensions.get('window').width
const styles = StyleSheet.create({
  root: {
    backgroundColor: '#ffffff',
    flex: 1,
    flexDirection: "column",
  },
  success_logo_box:{
    marginTop : 60,

    justifyContent: "center",
    alignItems:'center',
  },

  success_message:{
    color:'#0281E8',

    fontSize:16,

    textAlign:'center',
  },
});
const reason =[
'订单不能按预计时间送达',
'买错了，重新购买',
'商品信息与实物不符',
'发票信息有误',
'商品有问题',
'配置信息有误',
]
const express =[
  '顺丰',
  '圆通',
  '韵达',
  '天天快递',
  '中通',
  '申通',
  '邮政',



]

var sign
var full_width = Dimensions.get('window').width
var full_height = Dimensions.get('window').height
const h_line_1 = ART.Path();
    h_line_1.moveTo(16,1);
    h_line_1.lineTo(full_width,1)
 const path = ART.Path();
    path.moveTo(1,1);
    path.lineTo(full_width,1);
class RefundProcess extends BasePage {

  constructor (props) {
    super(props)
    this.state = {
      color:"#7f7f7f",
      reason:'请选择退款原因',
      express:'请选择快递公司',
      isdamage:1,
      alreadydamaged_color:'#dddddd',
      unbroken_color:'#f29836',
      isShow:0,
      orderNo:'',

    }
  }

    tiJiao(){
      if(this.state.reason =='请选择退款原因'){
        Alert.alert('错误提示','请选择退款原因',[{text:'确定'}])
        return
      }else if (this.state.express=='请选择快递公司') {
        Alert.alert('错误提示','请选择快递公司',[{text:'确定'}])
        return
      }else{
          this.props.navigator.push({id:'RefundSchedule',params:{price:this.props.price,count:this.props.count}})
      }
    }
//关闭选择器(picker)
 //isShow:0代表的关闭picker需要和dialog.close()一起使用
 //isShow:1代表的显示picker需要和dialog.show()一起使用
 dialog_close(){
    this.setState({isShow:0})
    this.refs.picker.close();
 }

 //退款原因选择的组件
 reason_picker(){
    return(
        <View style={{flex:1,backgroudColor:"#fff"}}>
          <TouchableOpacity  onPress={()=>this.pickerisShow(reason,0)} style={{position:"absolute",top:0,bottom:0,left:0,right:0,justifyContent:"center" }}>
              <Text style={{fontSize:14,color:this.state.color}}>{this.state.reason}</Text>
          </TouchableOpacity>
       </View>
      )
  }
  //快递选择的组件
  express_picker(){
    return(
      <View style={{flex:1,backgroudColor:"#fff"}}>
        <TouchableOpacity  onPress={()=>this.pickerisShow(express,1)} style={{ position:"absolute",top:0,bottom:0,left:0,right:0,justifyContent:"center"}}>
            <Text style={{fontSize:14,color:this.state.color}}>{this.state.express}</Text>
        </TouchableOpacity>
      </View>
      )
  }
//显示picker选择器
//sign识别退款原因选择picker和快递选择picker的标记
//sign等于0为退款原因选择
//sign等于1为快递选择
  pickerisShow(data,s){
     sign=s
     this.refs.picker.show();
     this.setState({data:data,isShow:1})

  }
//确认选择和取消选择，并且让sign标记判断数据来源
  confirm_cancel(data){
    if(data){
      if(sign==0){
          this.setState({isShow:0,color:"#101010",reason:data})
        }else{
          this.setState({isShow:0,color:"#101010",express:data})
        }
       this.refs.picker.close();
      }else{
        this.setState({isShow:0})
        this.refs.picker.close();
      }
  }

  butonClick(unbrokencolor,alreadydamaged_color,x ){
    this.setState({
      isdamage:x,
      unbroken_color:unbrokencolor,
      alreadydamaged_color:alreadydamaged_color
  })

  }
  isdamage(){
    if(this.state.isdamage==1){
     return(
      <View>
        <ART.Surface width={full_width} height={2}>
            <ART.Shape d={path} stroke="#e5e5e5" strokeWidth={1} />
        </ART.Surface>
        <View style={{backgroundColor:'#fff',height:46,flexDirection:'row',borderColor:'#DDDDDD'}}>
            <View style={{width:130,justifyContent: "center"}}>
              <Text style={{fontSize:14,color:'#3d4245',margin:15}}>退款原因:</Text>
            </View>
            <View style={{width:full_width-130,justifyContent: "center"}}>
              {this.reason_picker()}
            </View>
          </View>
            <ART.Surface width={full_width} height={2}>
                <ART.Shape d={h_line_1} stroke="#e5e5e5" strokeWidth={1} />
            </ART.Surface>
            <ReasonTextInput
            title='退款联系人:'
            placeholder='商城售后小兰'
            placeholderTextColor='#101010'
            editable={false}
                      />
            <ART.Surface width={full_width} height={2}>
              <ART.Shape d={h_line_1} stroke="#e5e5e5" strokeWidth={1} />
            </ART.Surface>
            <ReasonTextInput
            title='联系方式:'
            placeholder='QQ:1312345236'
            placeholderTextColor='#101010'
            editable={false}
            borderBottomWidth={1}
            />
            <View style={{backgroundColor:'#fff',height:46,flexDirection:'row',borderColor:'#DDDDDD'}}>
              <View style={{width:130,justifyContent: "center"}}>
                <Text style={{fontSize:14,color:'#3d4245',margin:15}}>快递公司:</Text>
              </View>
              <View style={{width:full_width-130,justifyContent: "center"}}>
                {this.express_picker()}
              </View>
          </View>
          <ART.Surface width={full_width} height={2}>
              <ART.Shape d={h_line_1} stroke="#e5e5e5" strokeWidth={1} />
            </ART.Surface>
            <ReasonTextInput
              title='订单号:'
              placeholderTextColor='#101010'
              placeholder={this.props.orderNo}
              editable={false}
              multiline={true}
              borderBottomWidth={1}
            />
            <TouchableHighlight  onPress={()=>this.tiJiao()}  style={{backgroundColor:'#f29836',marginTop:30,marginHorizontal:113,justifyContent:'center',alignItems:'center',height:40,}}>
              <Text style={{color:'#ffffff',fontSize:16}}>提交申请</Text>
            </TouchableHighlight>
        </View>
       )
    }else{
      return(
        <View>

          <View style={{marginHorizontal:25,justifyContent:'space-between',flexDirection:'row'}}>
            <View style={{flexDirection:'row'}}>
              <Text style={{fontSize:16,color:'#101010'}}>零食:</Text>
              <Text style={{marginLeft:25,fontSize:16,color:'#101010'}}>12345678</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <Text style={{fontSize:16,color:'#101010'}}>母婴:</Text>
              <Text style={{marginLeft:25,fontSize:16,color:'#101010'}}>12345678</Text>
            </View>
          </View>
          <View style={{marginHorizontal:25,marginTop:18,justifyContent:'space-between',flexDirection:'row'}}>
            <View style={{flexDirection:'row'}}>
              <Text style={{fontSize:16,color:'#101010'}}>厨具:</Text>
              <Text style={{marginLeft:25,fontSize:16,color:'#101010'}}>12345678</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <Text style={{fontSize:16,color:'#101010'}}>保养:</Text>
              <Text style={{marginLeft:25,fontSize:16,color:'#101010'}}>12345678</Text>
            </View>
          </View>
          <View style={{marginHorizontal:25,marginTop:18,flexDirection:'row'}}>
            <Text style={{fontSize:16,color:'#101010'}}>保养:</Text>
            <Text style={{marginLeft:25,fontSize:16,color:'#101010'}}>12345678</Text>
          </View>
        </View>
       )
     }
  }
  render() {
    return(
      <View style={styles.root}>
        <BackNavBar component={this}>退款</BackNavBar>
        <View style={{height:103,borderColor:'#dddddd'}}>
          <View style={{justifyContent:'center',alignItems:'center',flex:1,marginHorizontal:30,marginVertical:20,backgroundColor:'#fff3e6',flexDirection:'row'}}>
           <View>
            <Text style={{fontSize:14}}>商品目前未发货，可直接无理</Text>
            <Text style={{fontSize:14}}>由退货，如有疑问请联系商家</Text>
           </View>
           <Image source={require('ares/app/assets/image/phone01.png')} style={{width:49,height:49,marginLeft:25}} />
          </View>
        </View>
           {this.isdamage()}
           <DialogPicker click={this.dialog_close.bind(this)} isShow={this.state.isShow} title='请选择退款原因'  data={this.state.data}  ref="picker"   onPress={this.confirm_cancel.bind(this)}   />
      </View>
    )
  }
}
export default RefundProcess
