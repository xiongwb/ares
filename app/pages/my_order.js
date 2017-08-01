import React from 'react'
import AresAPI from 'AresAPI'
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  AsyncStorage,
  ART,
  Alert,
  ListView,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native'
import Mock from '../constants/mock';
import WhiteSpace from 'antd-mobile/lib/white-space'
import Icon from 'react-native-vector-icons/FontAwesome'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import DefaultTabBar from 'react-native-scrollable-tab-view/DefaultTabBar'
import {
  BasePage,
  BackNavBar,
  NavigatorUtils,
  Navbar,
} from 'AresComponent'
import {
  STORAGE_KEYS,
  COMMON_STYLES,
} from 'AresConstant'


var full_width = Dimensions.get('window').width

const styles = StyleSheet.create({
  root: {
    backgroundColor: COMMON_STYLES.MAIN_BACKGROUND_COLOR,
    flex: 1,
  },
  head_img:{
    ...Platform.select({
      android:{
        height: (Platform.Version >= 21)?70:54,
        paddingTop:(Platform.Version >= 21)?5:0,
      },
      ios:{
        height: 64,
      }
    })
  },

})

class MyOrder extends BasePage {
  constructor(props) {
    super(props)
    this.state={
      data:[],
    }

  }
tixing(){
    Alert.alert('发货提醒','以提醒卖家尽快发货，请耐心等待',[{text:'确定'}])
}

onBack(){
  this.props.navigator.popToTop()
//  NavigatorUtils.popToRoute(this.props.navigator,"Dashboard")
}

componentWillMount(){
  AsyncStorage.getItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
     let hash = JSON.parse(value)
     if (!!hash&&!!hash.custNo) {
       let post_data = {
          brcNo:1,
          userNo:hash.custNo,
       }
       AresAPI.OrderController.findOrderListForAPP(post_data).done((res_data,res)=>{
         if(res_data.retCode == 1){
           console.log(res_data);
           this.setState({data:res_data.orderList2})
           console.log(this.state.data);
         }else{
           Alert.alert('错误提示', res_data.retMsg, [{ text: '确定'}])
         }
       })
     }
   })
}

button(kind){
  let buttonfunction
  if(kind.orderState == 1){
    return(
      <View style={{justifyContent:'flex-end',borderTopWidth:1,borderColor:'#e5e5e5',alignItems: 'center',flexDirection:'row',backgroundColor:'#ffffff',height:45}}>
        <TouchableOpacity onPress={() => this.props.navigator.push({id: "PaymentOrder", params: {price:kind.skuNowPrice*kind.count,orderNo:kind.orderNo}})} style={{marginRight:6,borderRadius:3,alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'#e5e5e5',height:27,width:74}}>
            <Text  >确认付款</Text>
        </TouchableOpacity>
      </View>)
  }
  if(kind.orderState == 2){
      return(

      <View style={{justifyContent:'flex-end',borderTopWidth:1,borderColor:'#e5e5e5',alignItems: 'center',flexDirection:'row',backgroundColor:'#ffffff',height:45}}>
         <TouchableOpacity onPress={() => this.props.navigator.push({id: "RefundProcess", params: {orderNo:kind.orderNo,price:kind.skuNowPrice*kind.count,count:kind.count}})} style={{marginRight:6,borderRadius:3,alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'#e5e5e5',height:27,width:74}}>
            <Text  >退款</Text>
         </TouchableOpacity>
        <TouchableOpacity onPress={() =>this.tixing() } style={{marginRight:6,borderRadius:3,alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'#e5e5e5',height:27,width:74}}>
            <Text  >发货提醒</Text>
        </TouchableOpacity>
      </View>
      )
  }
  if(kind.orderState==3){
      return(
       <View style={{justifyContent:'flex-end',borderTopWidth:1,borderColor:'#e5e5e5',alignItems: 'center',flexDirection:'row',backgroundColor:'#ffffff',height:45}}>
         <TouchableOpacity onPress={() => this.props.navigator.push({id: "RefundProcess", params: {}})} style={{marginRight:6,borderRadius:3,alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'#e5e5e5',height:27,width:74}}>
            <Text  >退款</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigator.push({id: "Logistics", params: {}})} style={{marginRight:6,borderRadius:3,alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'#e5e5e5',height:27,width:74}}>
            <Text  >查看物流</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginRight:6,borderRadius:3,alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'#e5e5e5',height:27,width:74}}>
            <Text  >确认收货</Text>
        </TouchableOpacity>
      </View>
      )
  }
  if(kind.orderState==4){
   return(
      <View style={{justifyContent:'flex-end',borderTopWidth:1,borderColor:'#e5e5e5',alignItems: 'center',flexDirection:'row',backgroundColor:'#ffffff',height:45}}>
        <TouchableOpacity  onPress={() => this.props.navigator.push({id: "RefundProcess", params: {}})} style={{marginRight:6,borderRadius:3,alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'#e5e5e5',height:27,width:74}}>
            <Text  >退款</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigator.push({id: "Evaluate", params: {}})} style={{marginRight:6,borderRadius:3,alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'#e5e5e5',height:27,width:74}}>
            <Text  >评价</Text>
        </TouchableOpacity>
      </View>
      )
  }
}

   order_data(rowData,rowID,whole){
         let  goodsstate
     if(whole==rowData.orderState||whole=='全部'){
          goodsstate = rowData.orderState
       if(rowData.orderState == 4 ){goodsstate='交易成功'}
       let a = rowData.skuNowPrice*rowData.count+10
      return(
          <View style={{marginBottom:20, backgroundColor: 'white',flex:1}}>
            <TouchableOpacity onPress={()=>this.goTo(rowData)}>
              <View style={{alignItems: 'center',flexDirection:'row',backgroundColor:'#fff',height:88}}>
                <View>
                  <Image resizeMode='contain' source={{uri: rowData.imgUrl}} style={{width:77,height:77,marginLeft:10}} />
                </View>
                <View style={{flex:1,height:88,justifyContent:'space-between',flexDirection:'row',}}>
                  <View style={{height:88}}>
                    <Text style={{marginTop:10,marginLeft:11,color:"#474c4e",fontSize:15}}>{rowData.prodName}</Text>
                    <Text style={{marginLeft:11,marginTop:15,fontSize:11}}>{rowData.stand}</Text>
                  </View>
                  <View style={{height:88}}>
                    <Text style={{marginTop:10,marginRight:15,color:"#474c4e",fontSize:13}}>{rowData.skuNowPrice.toFixed(2).toString()}</Text>
                    <Text style={{marginRight:15,textDecorationLine:'line-through',fontSize:13}}></Text>
                    <Text style={{fontSize:13}}>X{rowData.count.toString()}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
              <View style={{alignItems: 'center',flexDirection:'row',backgroundColor:'#ffffff',height:30,justifyContent:'flex-end'}}>
                <Text style={{fontSize:12}}>供应商品</Text>
                <Text style={{fontSize:12}}>合计：</Text>
                <Text style={{fontSize:12}}>{a.toFixed(2).toString()}</Text>
                <Text style={{fontSize:10}}></Text>
                <Text style={{fontSize:12,marginRight:14}}>(含运费￥10.00)</Text>
              </View>
               {this.button(rowData)}

          </View>
     )}else{return null}
   }


    goTo(rowData){
        console.log(this.state.data);
        console.log(rowData);
        console.log(Mock.suoyou.all);
        for(let i=0;i<Mock.suoyou.all.length;i++){
            if(Mock.suoyou.all[i].PROD_NO == rowData.prodNo){
                this.props.navigator.push({id:'B2CGoodsDetails',params:{data:Mock.suoyou.all[i]}})
            }
        }
    }


 render(){
     console.log(this.state.data)
    let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.state.data);
    return(
      <View style={styles.root}>
          <Image source={require('ares/app/assets/image/shenghuodaohangtiao.png')} style={[styles.head_img,{width:full_width}]}>
            <BackNavBar component={this} backgroundColor="transparent" backTextColor="#fff" titleColor="#fff">订单</BackNavBar>
           </Image>
            <ScrollableTabView
              renderTabBar={() => <DefaultTabBar/>}
              tabBarUnderlineStyle={{backgroundColor: '#f29836'}}
              tabBarActiveTextColor='#f29836'
              tabBarBackgroundColor='#ffffff'
              tabBarTextStyle={{fontSize: 14,marginTop:10}}>
              <ScrollView tabLabel='全部' showsVerticalScrollIndicator={false}>
                <ListView
                  dataSource={dataSource}
                  renderRow={(rowData, rowID)=>this.order_data(rowData, rowID,'全部')}
                />
              </ScrollView>
                 <ScrollView tabLabel='待付款' showsVerticalScrollIndicator={false}>
                <ListView
                  dataSource={dataSource}
                  renderRow={(rowData, rowID)=>this.order_data(rowData, rowID,'1')}
                />
              </ScrollView>
                 <ScrollView tabLabel='待发货' showsVerticalScrollIndicator={false}>
                <ListView
                  dataSource={dataSource}
                  renderRow={(rowData, rowID)=>this.order_data(rowData, rowID,'2')}
                />
              </ScrollView>
                 <ScrollView tabLabel='待收货' showsVerticalScrollIndicator={false}>
                <ListView
                  dataSource={dataSource}
                  renderRow={(rowData, rowID)=>this.order_data(rowData, rowID,'3')}
                />
              </ScrollView>
                 <ScrollView tabLabel='待评价' showsVerticalScrollIndicator={false}>
                <ListView
                  dataSource={dataSource}
                  renderRow={(rowData, rowID)=>this.order_data(rowData, rowID,'4')}
                />
              </ScrollView>


            </ScrollableTabView>

          </View>


    )
  }


}

export default MyOrder
