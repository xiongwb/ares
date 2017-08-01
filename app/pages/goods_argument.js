/**
*dujh
*/

import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  AsyncStorage,
  ListView,
  ART,
  StatusBar,
  Dimensions,
  NativeModules,
  Alert,
  TouchableOpacity,
  SegmentedControlIOS,
  Platform,
  Linking,
} from 'react-native'
import {
  NavBar,
  BasePage,
  BackNavBar,
  SelectPage,
  StringUtils,
  SegmentControl,
} from 'AresComponent'

import {
  STORAGE_KEYS,
  COMMON_STYLES,
} from 'AresConstant'

import RNSegmentC from '../components/segmentcontrol_android'

import Icon from 'react-native-vector-icons/FontAwesome'
import AresAPI from 'AresAPI'
import WhiteSpace from 'antd-mobile/lib/white-space'

import Mock from '../constants/mock';
import Popup from 'antd-mobile/lib/popup'

const discountMessageY = 0
const userEvaluationY = 0
const bussinessmenY = 0

const full_width = Dimensions.get('window').width
const full_height = Dimensions.get('window').height


const COMMON_FONT_SIZE = 14
const COMMON_EDGE_LEFT = 10
const SMALL_FONT_SIZE  = 12
const DEFAULT_RED_COLOR = '#f5787c'

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    flex:1
  },
  contentViewStyle: {
    // 主轴方向
    flexDirection:'row',
    // 换行
    flexWrap:'wrap',
    //必须设置否则换行不起作用
    alignItems:'center',
  },
  dialog_btn_box:{
    height:50,

  },
  dialog_btn:{
    flex:1,
    backgroundColor:'#FF0000',
    alignItems:'center',
    justifyContent:'center'
  },
  dialog_btn_text:{
    color:'#fff',
    fontSize:20
  },
})

const titleList = ['图文详情','产品参数','店铺推荐']

const PIC_URLS = [
  require('ares/app/assets/image/zhongmuwan.png'),
  require('ares/app/assets/image/zhongmuwan.png'),
  require('ares/app/assets/image/zhongmuwan.png'),
]


class GoodsArgument extends BasePage {
  constructor(props) {
    super(props)
    this.state = {
      discountList : [1,2],
      isShowPart : true,
      msg:0,
      count:1,
      iconString:'star-o',
      iconColor:'gray',
      custNo:'',
      shopingcarcont:0,
      details:this.props.data.detail.imageAndDes,
      arguments:this.props.data.detail.ARG,
    }
    that = this
  }

  componentWillMount(){
    AsyncStorage.getItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
    let hash = JSON.parse(value)
    if (!!hash&&!!hash.custNo) {
      this.setState({custNo:hash.custNo})
    AresAPI.ShoppingCartController.findShoppingCart({brcNo:1,userNo:hash.custNo}).done((res_data,res)=>{
      if(res_data.retCode == 1){
        const aData = res_data.shoppingCartListReturnVO
        this.setState({shopingcarcont:aData.length})
      }else{
        Alert.alert('错误提示', res_data.retMsg, [{ text: '确定'}])
      }
    })
    AresAPI.ProdCollectionController.findIsCollection({prodNo:this.props.data.PROD_NO , userNo:hash.custNo}).done((res_data,res)=>{
      if(res_data.retCode == 1){
        if(res_data.isCollectionFlag == 0){
          this.setState({iconString:'star',iconColor:DEFAULT_RED_COLOR})
        }
      }else{
        Alert.alert('错误提示', res_data.retMsg, [{ text: '确定'}])
      }
    })
  }
})
  }

  exchange(meg){
    let offsetY = 0
    if (meg === 0) {
      this.setState({msg:meg})
    }
    if (meg === 1) {
      // iOS有顶吸效果 需要将最上面的导航位置的高度40减去
      this.setState({msg:meg})
    }
    if (meg === 2) {
      this.setState({msg:meg})
    }

  }

  clickStartButton(){
    AsyncStorage.getItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
    let hash = JSON.parse(value)
    if (!!hash) {
      if (this.state.iconString === 'star-o') {
        AresAPI.ProdCollectionController.addProdCollection({prodNo:this.props.data.PROD_NO,userNo:this.state.custNo}).done((res_data,res)=>{
          if(res_data.retCode == 1){
            this.setState({
              iconString:'star',
              iconColor:DEFAULT_RED_COLOR,
            })
          }else {
            Alert.alert('错误提示', res_data.retMsg, [{ text: '确定'}])
          }
        })
      }
      if (this.state.iconString === 'star') {
        AresAPI.ProdCollectionController.delProdCollection({prodNo:this.props.data.PROD_NO,userNo:this.state.custNo}).done((res_data,res)=>{
          if(res_data.retCode == 1){
            this.setState({
              iconString:'star-o',
              iconColor:'gray',
            })
          }else{
            Alert.alert('错误提示', res_data.retMsg, [{ text: '确定'}])
          }
        })
      }
  }else {
    this.props.navigator.push({id: "Login", params: {}})
  }
})
}

    likeDataSelect(sel){
      switch (sel) {
        case 1:
          return Mock.foods.likeDetail
          break;
        case 2:
          return Mock.muying.likeDetail
          break;
        case 3:
          return Mock.baojian.likeDetail
          break;
        case 4:
          return Mock.chuju.likeDetail
          break;
        case 5:
          return Mock.xihu.likeDetail
          break;
      }
    }


    addShopingCar(){
      AsyncStorage.getItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
      let hash = JSON.parse(value)
      if (!!hash) {
      Popup.show(<View>
                    <SelectPage data={this.props.data} getCount={this.getCount} onPress={this.addShoppingCart}/>
                  </View>,{maskClosable:true,animationType:'slide-up'})
      }else {
        this.props.navigator.push({id: "Login", params: {}})
      }
    })
    }

    addShoppingCart(num){
      let post_data = {
        skuNo:that.props.data.SKU_NO,
        count:num,
        brcNo:1,
        userNo:that.state.custNo,
      }
      AresAPI.ShoppingCartController.addShoppingCart(post_data).done((res_data,res)=>{
        if(res_data.retCode == 1){
          that.setState({shopingcarcont:res_data.shoppingCartCount})
          Popup.hide()
        }else{
          Alert.alert('错误提示', res_data.retMsg, [{ text: '确定'}])
        }
      })
    }

    goToShopCart(){
      AsyncStorage.getItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
      let hash = JSON.parse(value)
      if (!!hash) {
        this.props.navigator.replace({id: "ShopCart", params: {}})
      }else {
        this.props.navigator.push({id: "Login", params: {}})
      }
    })
    }


  createTitle2(){
    return(
        <NavBar
          backgroundColor={'#fff'}
          leftContent={
            <View style={{flexDirection:'row',
            justifyContent: "center",
            alignItems: "center",}}>
              <TouchableOpacity onPress = {() => this.props.navigator.pop()}>
                <Icon name="angle-left" size={30} color='orange'/>
              </TouchableOpacity>
            </View>
          }
          titleContent={
            <View style={{flexDirection:'row'}}>
              <Text style={{fontSize:22,color:'black'}}>
                商品详情
              </Text>
            </View>
          }
        />
    )
  }

  createBody(msg){
    if(msg == 0){
      return(
        this.pictureDetails()
      )
    }else if (msg == 1) {
      return(
        this.goodsArguments()
      )
    }else if (msg == 2) {
      return(
        this.maybeLike()
      )
    }
  }

/**
  createFoot(){
    return(
      <View style={{
        backgroundColor:'#fff',
        borderColor:'#DDDDDD',
        flexDirection:'row',
        height:50,
        borderTopWidth:1,
        alignItems:'center',
        justifyContent:'center',
        position: "absolute",right: 0,bottom: 0,left:0,
      }}>
        <View style={{flex:1,height:50,alignItems:'center',justifyContent:'center',flexDirection:'row',borderRightWidth:1,borderColor:'#DDDDDD'}}>
          <TouchableOpacity onPress={()=>{this.clickStartButton()}}>
            <Icon name={this.state.iconString} size={30} color={this.state.iconColor} />
          </TouchableOpacity>
        </View>
        <View style={{
          flex:1,
          height:50,
          alignItems:'center',
          justifyContent:'center',
          flexDirection:'row',
          borderRightWidth:1,
          borderColor:'#DDDDDD'}}>
          <TouchableOpacity onPress={() => this.props.navigator.replace({id: "ShopCart", params: {}})}>
            <Image style={{resizeMode:'contain',height:30,width:30}}
                   source={require('ares/app/assets/image/xiaofenche.png')}/>
          </TouchableOpacity>
          <View style={{
            position: "absolute",
            left:37,bottom:30,
            height:13,width:13,
            borderRadius:100,
            backgroundColor:DEFAULT_RED_COLOR,
            borderWidth:1,
            alignItems:'center',
            justifyContent:'center',
            borderColor:'#fff'
          }}>
            <Text style={{fontSize:7,color:'#fff'}}>
              {this.state.shopingcarcont}
            </Text>
          </View>
        </View>
        <View style={{
          flex:4,
          height:50,
          alignItems:'center',
          justifyContent:'center',
          flexDirection:'row',
          backgroundColor:DEFAULT_RED_COLOR,
        }}>
        <TouchableOpacity onPress={() => {this.addShopingCar()}}>
          <View style={{
            flex:1,
            alignItems:'center',
            justifyContent:'center',
            flexDirection:'row',
          }}>
            <Text style={{fontSize:24,color:'#fff'}}>
              加入购物车
            </Text>
          </View>
        </TouchableOpacity>
        </View>
      </View>
    )
  }
*/

createFoot(){
  return(
    <View style={{
      backgroundColor:'#fff',
      borderColor:'#DDDDDD',
      flexDirection:'row',
      height:40,
      borderTopWidth:1,
      alignItems:'center',
      justifyContent:'center',
      position: "absolute",right: 0,bottom: 0,left:0,
    }}>
      <View style={{flex:1,height:40,alignItems:'center',justifyContent:'center',flexDirection:'row',borderRightWidth:1,borderColor:'#DDDDDD'}}>
        <TouchableOpacity onPress={()=>{this.clickStartButton()}}>
          <Icon name={this.state.iconString} size={25} color={this.state.iconColor} />
        </TouchableOpacity>
      </View>
      <View style={{
        flex:1,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        borderRightWidth:1,
        borderColor:'#DDDDDD'}}>
        <TouchableOpacity onPress={() => this.goToShopCart()}>
          <Image style={{resizeMode:'contain',height:25,width:25}}
                 source={require('ares/app/assets/image/xiaofenche.png')}/>
        </TouchableOpacity>
        <View style={{
          position: "absolute",
          left:33,bottom:25,
          height:13,width:13,
          borderRadius:100,
          backgroundColor:DEFAULT_RED_COLOR,
          borderWidth:1,
          alignItems:'center',
          justifyContent:'center',
          borderColor:'#fff'
        }}>
          <Text style={{fontSize:7,color:'#fff'}}>
            {this.state.shopingcarcont}
          </Text>
        </View>
      </View>
      <View style={{
        flex:4,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        backgroundColor:DEFAULT_RED_COLOR,
      }}>
      <TouchableOpacity onPress={() => {this.addShopingCar()}}>
        <View style={{
          flex:1,
          alignItems:'center',
          justifyContent:'center',
          flexDirection:'row',
        }}>
          <Text style={{fontSize:17,color:'#fff'}}>
            加入购物车
          </Text>
        </View>
      </TouchableOpacity>
      </View>
    </View>
  )
}

  pictureDetails(){
    let dataSource = new ListView.DataSource
    ({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.state.details)
    return(
      <View style={{flex:1}}>
        <ListView
          style={{flex:1,marginBottom:150}}
          dataSource={dataSource}
          renderRow={this.pictureRow.bind(this)}
        />
      </View>
    )
  }
  pictureRow(rowData){
    var imgSource = rowData
    return(
      <View style={{flex:1}}>
        <Image style={{width:full_width,height:200}} resizeMode='contain' source={{uri: imgSource}} />
      </View>
    )
  }

  goodsArguments(){
    let dataSource = new ListView.DataSource
    ({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.state.arguments)
    return(
      <View style={{flex:1}}>
        <ListView
          style={{flex:1,marginBottom:150,marginTop:10}}
          dataSource={dataSource}
          renderRow={this.argumentsRow.bind(this)}
        />
      </View>
    )
  }
  argumentsRow(rowData){
    return(
      <View style={{width:full_width,height:30,flexDirection:'row',alignItems:'center'}}>
        <Text style={{flex:1,marginLeft:70}}>
          {rowData.n}:
        </Text>
        <Text style={{flex:1,color:'black'}}>
          {rowData.c}
        </Text>
      </View>
    )
  }


  maybeLike(){
    const h_line_1 = ART.Path();
    h_line_1.moveTo(10,1);
    h_line_1.lineTo(full_width,1);

    let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.likeDataSelect(this.props.data.sel));
    return(
      <View style={{flex:1,backgroundColor:'white',borderColor:'#dddddd',borderBottomWidth:1}}>
        <ListView
          style={{flex:1,marginBottom:160}}
          dataSource={dataSource}
          renderRow={this.createMaybeLikeRow.bind(this)}
          contentContainerStyle={styles.contentViewStyle}
        />
      </View>
      )
  }
  createMaybeLikeRow(rowData,sectionId){
    let imageSize = (full_width - 3 * COMMON_EDGE_LEFT)/2
    return(
      <TouchableOpacity onPress={()=>this.props.navigator.replace({id:'B2CGoodsDetails' , params: {data:rowData}})}>
        <View style={{backgroundColor:'white',marginLeft:10,marginTop:10}}>
          <Image resizeMode='contain' source={{uri: rowData.image}} style={{width:imageSize,height:imageSize*0.8}} />
          <View>
            <View style={{margin:10}}>
              <Text style={{fontSize:SMALL_FONT_SIZE,color:'gray'}}>{rowData.name}</Text>
              <View style={{flexDirection:'row',marginTop:5,alignItems:'center'}}>
                <View style={{flex:1}}>
                  <Text style={{fontSize:14,color:'gold'}}>{rowData.price}</Text>
                </View>
                <View style={{flex:1,justifyContent:'flex-end'}}>
                  <Image style={{marginLeft:50,resizeMode:'contain',height:20,width:20}}
                    source={require('ares/app/assets/image/xiaoche.png')}/>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      )
  }




  render(){
    return(
      <View style={styles.root}>
        <StatusBar hidden={false} barStyle='dark-content' translucent={true} backgroundColor="#ffffff">
        </StatusBar>
        {this.createTitle2()}
        <View style={{borderColor:'#dddddd',borderTopWidth:1}} onLayout={(e)=>{discountMessageY = e.nativeEvent.layout.y}}>
          <SegmentControl
            style = {{width:full_width,height:40,backgroundColor:'#fff',flexDirection:'row'}}
            title_array = {titleList}
            exchange = {(msg)=>this.exchange(msg)}
          />
        </View>
        <View style={{width:full_width,height:full_height,marginBottom:200}}>
          {this.createBody(that.state.msg)}
        </View>
        {this.createFoot()}
      </View>
    )
  }
}

export default GoodsArgument
