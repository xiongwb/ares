import React from 'react'
import {
ART,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ListView,
  Alert,
 Dimensions,
} from 'react-native'
/*订单详情页面
      张乐   */
import {
  BasePage,
  BackNavBar,
} from 'AresComponent'
import {
  COMMON_STYLES,
} from 'AresConstant'

import Icon from 'react-native-vector-icons/FontAwesome'
var full_width = Dimensions.get('window').width
let viewWidth = full_width-15-75-10-10-20-15
const DEFAULT_RED_COLOR = '#f5787c'
const styles = StyleSheet.create({
 root: {
    backgroundColor: COMMON_STYLES.MAIN_BACKGROUND_COLOR,//页面的布局和颜色
    flex: 1,
  },
  
  
});

 class OrderDetails extends BasePage {
 constructor(props){
    super(props);
    this.state = {
      
    }
  }
  createPayView(){
    return(
      <View style={{backgroundColor:'white',height:66,position: "absolute",right: 0,bottom: 0,left:0,flexDirection:'row'}}>
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <TouchableOpacity > 
            <Text style={{color:'#ff9800',fontSize:16}}>¥ 123</Text>
          </TouchableOpacity>
        </View> 
        <TouchableOpacity onPress={() => this.props.navigator.push({id: "RefundProcess", params: {}})} style={{flex:1}} >
          <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#ff9800'}}>
            <Text style={{color:'white',fontSize:20}}>申请退款</Text>
          </View>
        </TouchableOpacity>
      </View>
      )
  }
  weifukuan(){
      return(
     <View style={styles.root}>
    	  <BackNavBar component={this}  >订单：未付款</BackNavBar>
          <View style={{backgroundColor:'#fff',alignItems:'center'}}>
            <Text style={{ fontSize:12,alignItems:'center',color:'#a1a1a1',marginTop:20,}}>请尽快完成付款，以免影响您的使用</Text>
          </View>
          {this.yemian()}
          {this.createPayView()}
      </View>
      )
  }

yemian(){
    const path = ART.Path();
    path.moveTo(1,1); //将起始点移动到(1,1) 默认(0,0)
    path.lineTo(1,40); //连线到目标点(300,1)
    const line = ART.Path();
    path.moveTo(1,1); //将起始点移动到(1,1) 默认(0,0)
    path.lineTo(full_width,1); //连线到目标点(300,1)
    return(
        <View>
        <View style={{ backgroundColor:'#fff'}}>
             
            <TouchableOpacity onPress={() => this.props.navigator.push({id: "CommodityDetail", params: {}})}>
                <View style={{marginTop:70,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <Text style={{fontSize:14,color:'#4c5154',marginLeft:35}}>商品详情:</Text>
                    <Text style={{fontSize:14,color:'#ff9800',marginLeft:10,width:viewWidth}}>哈哈大鸡排</Text>
                    <Icon style={{marginRight:16}} name="angle-right" size={22} color={'#ff9800'} />
                </View>
            </TouchableOpacity>
            <View style={{marginTop:20,flexDirection:'row' }}>
                <Text style={{fontSize:14,color:'#4c5154',marginLeft:35}}>使用日期:</Text>
                <Text style={{fontSize:14,color:'#a1a1a1',marginLeft:20}}>2017年1月2日</Text>
            </View>
            <View style={{marginTop:20,flexDirection:'row' }}>
                <Text style={{fontSize:14,color:'#4c5154',marginLeft:35,}}>截止日期:</Text>
                <Text style={{fontSize:14,color:'#a1a1a1',marginLeft:20}}>2017年1月7日</Text>
            </View>
            <View style={{marginTop:10,flexDirection:'row',marginBottom:10 }}>
                <Text style={{fontSize:14,color:'#4c5154',marginLeft:35,}}>数<Text style={{color:'#fff'}}>哈哈</Text>量:</Text>
                <Text style={{fontSize:14,color:'#a1a1a1',marginLeft:20}}>2个</Text>
            </View>
             <ART.Surface width={full_width} height={1}>
                <ART.Shape d={path} stroke="#dddddd" strokeWidth={1} />
              </ART.Surface>
              <View style={{marginTop:20,flexDirection:'row',height:40 ,}}>
                <Text style={{fontSize:14,color:'#4c5154',alignItems:'center',marginLeft:35}}><Text style={{color:'#fff'}}>哈</Text>订单号:</Text>
                <Text style={{fontSize:14,color:'#59a8f7',alignItems:'center',marginLeft:20}}>22222222222</Text>
            </View>
          </View>
          <View style={{marginTop:10,backgroundColor:'#fff', }}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',height:55,paddingHorizontal:1, borderColor:'#e1e1e1',borderBottomWidth:1}}>    
                <Text style={{fontSize:16,color:'#101010',marginLeft:16,}}>智能客服</Text>
                <Icon style={{marginRight:10,}}name="angle-right" size={22} color={'#bbbbbb'}  />
              </View>
          </View>
          </View>
    )
}

  render() {
  	
    return(
    	<View style={styles.root}>
    	  <BackNavBar component={this}  >订单：已付款</BackNavBar>
           
          {this.yemian()}
          {this.createPayView()}
      </View>
    );
  }



}
export default OrderDetails
