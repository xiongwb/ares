import React from 'react'

import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ART,
} from 'react-native'
import {
  Navbar,
  BackNavBar,
  BasePage,
  ReasonTextInput
} from 'AresComponent'
import {
  COMMON_STYLES,
} from 'AresConstant'
// @陈耀霆，填写订单页面
const styles = StyleSheet.create({
  root: {
    backgroundColor: COMMON_STYLES.MAIN_BACKGROUND_COLOR,
    flex: 1,

  }
});


var full_width = Dimensions.get('window').width
var full_height = Dimensions.get('window').height



class Purchasegoods extends BasePage {
   constructor () {
    super();
    this.state = {
      radiodot:true,
      radio:true
  }
 }
 //圆形单选框是否被选中
 radio_dot(){
    if(this.state.radiodot){
       return(
           <Image  source={require('ares/app/assets/image/unchecked.png')} />
           )
     }else{
       return(
           <Image  source={require('ares/app/assets/image/radio.png')} />
        )
     }
}
  //圆形单选框是否被选中
 radio(){
    if(this.state.radio){
       return(
           <Image  source={require('ares/app/assets/image/unchosen.png')} />
           )
     }else{
       return(
           <Image  source={require('ares/app/assets/image/check.png')} />
          )
     }
   
 }
  render(){
    const h_line_1 = ART.Path();
    h_line_1.moveTo(16,1); 
    h_line_1.lineTo(full_width,1);
    return(
     	<View style={styles.root}>
      	<BackNavBar component={this}  backgroundColor={COMMON_STYLES.NAVIBAR_COLOR} backTextColor="#FFFFFF" titleColor="#FFFFFF">某某餐厅</BackNavBar>
        <ReasonTextInput
              marginTop={12}
              title='消费总额'
              placeholder='请询问服务员后输入'    
              borderBottomWidth={1}
              textAlign="right"
              placeholderTextColor='#dddddd'
            />
        <Image source={require('ares/app/assets/image/colour_bar.png')} /> 
        <View style={{alignItems:'center',marginTop:15,flexDirection:'row'}}>
          <TouchableOpacity style={{marginTop:1,marginLeft: 16}} onPress={()=>this.setState({radiodot:!this.state.radiodot})}>
              {this.radio_dot()}
          </TouchableOpacity >  
          <Text style={{fontSize:10,color:"#ababab",marginLeft: 5}}>输入不参与优惠金额（如酒水，套餐）</Text>
        </View>
         <ReasonTextInput
              marginTop={12}
              title='不参与优惠金额:'
              placeholder='请询问服务员后输入'    
              borderBottomWidth={1}
              textAlign="right"
              placeholderTextColor='#dddddd'
            />
        <Image source={require('ares/app/assets/image/colour_bar.png')} />
        <View style={{justifyContent:'space-between',borderTopWidth:1,borderBottomWidth:1,borderColor:'#e5e5e5',marginTop:18,height:50,flexDirection:'row',alignItems:'center',backgroundColor:'#fff'}}>
          <View style={{flexDirection:'row',alignItems: 'center'}}>
            <View style={{marginLeft:17,marginRight:3,backgroundColor:"#f5787c"}}>
              <Text style={{margin:2,fontSize:12,color:"#ffffff"}}>买</Text>
            </View>
            <Text style={{fontSize:14,color:"#101010",marginRight:11}}>美满100元减5元</Text>
            <Text style={{fontSize:10,color:"#6c9ad8"}}>优惠限制</Text>
          </View>
          <TouchableOpacity style={{marginLeft: 16,marginRight:13,marginTop:1}} onPress={()=>this.setState({radio:!this.state.radio})}>
            {this.radio()}       
          </TouchableOpacity >
        </View>
        <View style={{borderTopWidth:1,borderBottomWidth:1,borderColor:'#e5e5e5',marginTop:18,height:130,backgroundColor:'#fff'}}>
          <View style={{justifyContent:'space-between',marginTop:17,flexDirection:'row',backgroundColor:'#fff'}}>
            <Text style={{fontSize:14,color:"#101010",marginLeft: 16}}>消费总额：</Text>
            <Text style={{fontSize:14,color:"#f5787c",marginRight:13}}>￥56.9</Text>
          </View>
          <View style={{justifyContent:'space-between',marginTop:18,marginBottom:17,flexDirection:'row',backgroundColor:'#fff'}}>
            <Text style={{fontSize:14,color:"#101010",marginLeft: 16}}>已优惠：</Text>
            <Text style={{fontSize:14,color:"#f5787c",marginRight:13}}>-￥28.9</Text>
          </View>
          <ART.Surface width={full_width} height={1}>
            <ART.Shape d={h_line_1} stroke="#e5e5e5" strokeWidth={2} />
         </ART.Surface>
         <View style={{ flex:1,justifyContent:'flex-end',flexDirection:'row',alignItems:'center'}}>
            <Text style={{fontSize:14,color:"#101010"}}>实付款：</Text>    
            <Text style={{fontSize:14,color:"#f5787c",marginRight:13}}>￥28.9</Text>       
         </View >
        </View>     
         
        <View style={{backgroundColor:'white',height:50,position: "absolute",right: 0,bottom: 0,left:0,flexDirection:'row'}}>
          <View style={{flex:2,alignItems:'center',flexDirection:'row'}}>
            <Text style={{fontSize:16,color:"#101010",marginLeft: 16}}>实付款：</Text>
            <Text style={{fontSize:14,color:"#f5787c"}}>￥28.9</Text>
            <Text style={{fontSize:10,color:"#b3b3b3",marginLeft: 16}}>(为您节省28.0元)</Text> 
          </View>
          <TouchableOpacity style={{flex:1,backgroundColor:'#f5787c',justifyContent:'center',alignItems:'center'}} onPress={()=>this.props.navigator.push({id:'PaymentOrder'})} >
            <Text style={{color:'white',fontSize:20}}>提交订单</Text>  
          </TouchableOpacity>
        </View>
      </View>

    )
  }
}
export default Purchasegoods