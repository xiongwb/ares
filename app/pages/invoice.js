import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  ListView,
  ART,
  Dimensions,
  NativeModules,
  Alert,
  TouchableOpacity,
  SegmentedControlIOS,
  Platform,
  Linking,
  TextInput,
} from 'react-native'
import {
  BasePage,
  BackNavBar,
  StringUtils,
  SegmentControl,
  AresYuanquan,
} from 'AresComponent'
import {
  COMMON_STYLES,
} from 'AresConstant'

import WhiteSpace from 'antd-mobile/lib/white-space'
import Icon from 'react-native-vector-icons/FontAwesome'
const full_width = Dimensions.get('window').width
const full_height = Dimensions.get('window').height


const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COMMON_STYLES.MAIN_BACKGROUND_COLOR,
  },
 
  contentViewStyle: {
    // 主轴方向
    flexDirection:'row',
    // 换行
    flexWrap:'wrap',
    //必须设置否则换行不起作用
    alignItems:'center',
  },

  shopping_buton:{
    borderColor:'#dddddd',
    borderWidth:1,
    marginTop:10,
    alignItems:'center',
    justifyContent: "center",
    borderRadius:8,
    width:90,
    height:35,
    marginLeft:10,
    backgroundColor:"#ffffff",
    flex:1,
    marginBottom:20,
  },
});






class Invoice extends BasePage {
  constructor(){
    super();
    this.state = {
   pingjia:'',
   isshow:true,
   color:'#fa0202',
   testcolor:'#dddddd'
    }
  }
  //发票类型
Invoicetype(){
    return(
        <View style={{backgroundColor:'#ffffff'}}>
            <View style={{marginTop:20}}>
                <Text style={{fontSize:16,marginHorizontal:16}}>发票类型</Text>
            </View>
            <View style={{ marginTop:10,flexDirection:'row',marginHorizontal:16,}}>
                <TouchableOpacity style={{borderColor:this.state.testcolor, borderWidth:1,marginTop:10,alignItems:'center',justifyContent: "center",borderRadius:8,width:90, height:35, backgroundColor:"#ffffff", flex:1,marginBottom:20,}} onPress={()=>{this.dianji()}}>
                    <Text style={{color:this.state.testcolor,fontSize:14}}>纸质发票</Text> 
                </TouchableOpacity>  
                <TouchableOpacity style={{borderColor:this.state.color, borderWidth:1,marginTop:10,alignItems:'center',justifyContent: "center",borderRadius:8,width:90, height:35, marginLeft:10, backgroundColor:"#ffffff", flex:1,marginBottom:20,}} onPress={()=>{this.dianji2()}} >
                    <Text style={{color:this.state.color,fontSize:14}}>电子发票</Text> 
                </TouchableOpacity>  
                <TouchableOpacity style={{borderColor:'#dddddd', borderWidth:1,marginTop:10,alignItems:'center',justifyContent: "center",borderRadius:8,width:90, height:35, marginLeft:10, backgroundColor:"#ffffff", flex:1,marginBottom:20,}} >
                    <Text style={{color:"#aaaaaa",fontSize:14}}>增税发票</Text> 
                </TouchableOpacity>  
            </View>
        </View>
    )
}
dianji(){
 this.setState({isshow:false,color:'#dddddd',testcolor:'#fa0202'})
}
dianji2(){
 this.setState({isshow:true,color:'#fa0202',testcolor:'#dddddd'
 })
}
//发票抬头
Invoicetop(){
  return(
    <View style={{backgroundColor:'#ffffff',marginTop:20,borderWidth: 1,borderColor:'#dddddd'}}>
            <View style={{marginTop:20}}>
                <Text style={{fontSize:16,marginHorizontal:16}}>发票抬头</Text>
            </View>
            <View style={{ marginTop:10,flexDirection:'row',}}>
               <AresYuanquan title='个人'/>
               <AresYuanquan title='单位'/>
            </View>
            <View style={{ marginTop:10,marginHorizontal:16,height:30,borderWidth:1,borderColor:'#dddddd',marginBottom:14,borderRadius:5}}>
               <TextInput
            style={{backgroundColor:'#dddddd',fontSize:18,flex:1 ,}}
            onChangeText={(text) => {this.setState({text});this.setState({pingjia:text})}}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder=''
            multiline ={true}
            borderColor='#fff'>
          </TextInput>
            </View>
        </View>
  )
}
//个人信息
xinxi(){
   
    const h_line_1 = ART.Path();
    h_line_1.moveTo(10,1);
    h_line_1.lineTo(full_width,1);
  return(
     <View style={{backgroundColor:'#ffffff',marginTop:20,borderWidth: 1,borderColor:'#dddddd'}}>
            <View style={{marginTop:20,marginBottom:10}}>
                <Text style={{fontSize:16,marginHorizontal:16}}>收票人信息</Text>
            </View>
            <ART.Surface width={full_width} height={1}>
              <ART.Shape d={h_line_1} stroke="#dddddd" strokeWidth={1} />
            </ART.Surface>
            <View style={{height:46, flexDirection:'row',backgroundColor:'#fff',}}>
              <View style={{flex:2,justifyContent: "center",backgroundColor:'#fff'}}>
                <Text style={{fontSize:14,color:'#000',marginHorizontal: 16}}>*收票人手机</Text>
              </View>
              <View style={{flex:4,justifyContent: "center"}}>
                <TextInput
                  style={{backgroundColor:'#fff',flex:1,padding:0,fontSize:14,}}
                  onChangeText={(text) => {this.setState({text});this.setState({varCode:text})}}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder='请输入手机号'
                  borderColor='#fff'>
                </TextInput>
              </View>
            </View>
            <ART.Surface width={full_width} height={1}>
              <ART.Shape d={h_line_1} stroke="#dddddd" strokeWidth={1} />
            </ART.Surface>
            <View style={{height:46, flexDirection:'row',backgroundColor:'#fff',}}>
              <View style={{flex:2,justifyContent: "center",backgroundColor:'#fff'}}>
                <Text style={{fontSize:14,color:'#000',marginHorizontal: 16}}> 收票人邮箱</Text>
              </View>
              <View style={{flex:4,justifyContent: "center"}}>
                <TextInput
                  style={{backgroundColor:'#fff',flex:1,padding:0,fontSize:14,}}
                  onChangeText={(text) => {this.setState({text});this.setState({varCode:text})}}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder='用来接收电子发票邮箱，可选填'
                  borderColor='#fff'>
                </TextInput>
              </View>
            </View>
        </View>
  )
}
//发票内容
neirong(){
  const h_line_1 = ART.Path();
    h_line_1.moveTo(10,1);
    h_line_1.lineTo(full_width,1);
  return(
    <View style={{backgroundColor:'#ffffff',marginTop:20,borderWidth: 1,borderColor:'#dddddd'}}>
            <View style={{marginTop:20,marginBottom:10}}>
                <Text style={{fontSize:16,marginHorizontal:16}}>发票内容</Text>
            </View>
            <ART.Surface width={full_width} height={1}>
              <ART.Shape d={h_line_1} stroke="#dddddd" strokeWidth={1} />
            </ART.Surface>
            <View style={{ marginTop:10,marginBottom:10}}>
              <Text style={{fontSize:14,color:'#808080',marginTop:10,marginHorizontal:16}}>非图片商品</Text>
               <AresYuanquan title='明细'/>
               <AresYuanquan title='耗材'/>
               <AresYuanquan title='办公用品'/>
               <AresYuanquan title='电脑配件'/>
            </View>
            
        </View>
  )

}
createPayView(){
    return(
        
      <View style={{backgroundColor:'#DDDDDD',height:60,position: "absolute",right: 0,bottom: 0,left:0,alignItems:'center',justifyContent:'center'}}>
      <TouchableOpacity > 
        <View style={{backgroundColor:'#fa0202',height:40,width:150,alignItems:'center',justifyContent:'center'}}>
                
                    <Text style={{color:'#ffffff',fontSize:20,}}>确定</Text>
                
          </View>
          </TouchableOpacity >
      </View>
      )
  }  
  render() {
    if(this.state.isshow===true){
      return (
      
        <View style={styles.root}>
          <BackNavBar component={this} >设置发票信息</BackNavBar>
          <ScrollView>
           {this.Invoicetype()}
           {this.Invoicetop()}
           {this.xinxi()}
           {this.neirong()}
         </ScrollView>
         {this.createPayView()}
        </View>
        )
  }else{
    return (
      
        <View style={styles.root}>
          <BackNavBar component={this} >设置发票信息</BackNavBar>
          <ScrollView>
           {this.Invoicetype()}
           {this.Invoicetop()}
           {this.neirong()}
         </ScrollView>
         <View style={{height:60}}></View>
         {this.createPayView()}
        </View>
    )
  }
}
}
export default Invoice
