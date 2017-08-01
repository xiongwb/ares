/**
*  dujh
*/

import React from 'react'
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  ScrollView,
  AsyncStorage,
  ListView,
  ART,
  StatusBar,
  Dimensions,
  Alert,
  TouchableOpacity,
  SegmentedControlIOS,
  Platform,
  Linking,
  Animated,
} from 'react-native'
import {
  NavBar,
  BasePage,
  BackNavBar,
  StringUtils,
  SegmentControl,
  SelectPage,
} from 'AresComponent'
import {
  STORAGE_KEYS,
  COMMON_STYLES,
} from 'AresConstant'

import Mock from '../constants/mock';

import Icon from 'react-native-vector-icons/FontAwesome'
import AresAPI from 'AresAPI'
import WhiteSpace from 'antd-mobile/lib/white-space'
import Popup from 'antd-mobile/lib/popup'

const full_width = Dimensions.get('window').width
const full_height = Dimensions.get('window').height

const COMMON_FONT_SIZE = 14
const COMMON_EDGE_LEFT = 10
const SMALL_FONT_SIZE  = 12
const DEFAULT_RED_COLOR = '#f5787c';


const styles = StyleSheet.create({
  root: {
    backgroundColor: COMMON_STYLES.MAIN_BACKGROUND_COLOR,
    flex:1,
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
});

class B2CGoodsDetails extends BasePage{
  constructor(props) {
    super(props)
    this.state = {
      data:this.props.data,
      discountList : [1,2],
      isShowPart : true,
      iconString:'star-o',
      iconColor:'gray',
      shopingcarcont:0,
      selectIndex:0,
      custNo:'',
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


  createStarsList(number){
    let starsList = []
    let integer = parseInt(number)
    let remainder = number * 2 % 2
    let half = remainder === 1 ? true : false
    for (let i=0; i<5;i++ ) {
      if (i < integer) {
        starsList.push(0)
      }else{
        if (half === true) {
          starsList.push(1)
          half = false
          continue
        }
        starsList.push(2)
      }
    }
    return starsList
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
        console.log(res_data);
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


  createTitle(){
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
                商品
              </Text>
            </View>
          }

        />
    )
  }


  createHeader(){
    return(
      <View>
        <View style={{
          width:full_width,
          height:310,
          backgroundColor:'#fff',
          borderBottomWidth:1,
          borderTopWidth:1,
          borderColor:'#dddddd'
        }}>
          <View style={{flex:1,alignItems:'center'}}>
            <Image
              style={{width:full_width,height:210,marginTop:10}}
              resizeMode='contain' source={{uri: this.props.data.image}}
            />
          </View>
          <Text style={{marginLeft:17,marginTop:8,fontSize:16,color:'black'}}>
            {this.props.data.name}
          </Text>
          <Text style={{marginLeft:17,fontSize:17,color:'gold',marginTop:3}}>
            {this.props.data.price}
          </Text>
          <View style={{flexDirection:'row',marginTop:3,marginBottom:10,justifyContent:'space-between'}}>
            <Text style={{marginLeft:13,color:'gray'}}>
              {this.props.data.activity}
            </Text>
            <Text style={{marginRight:13,color:'gray'}}>
              {this.props.data.count}
            </Text>
          </View>
        </View>
      </View>
    )
  }

  createNeck(){
    return(
      <View style={{
        width:full_width,
        height:44,
        flexDirection:'row',
        borderBottomWidth:1,
        borderTopWidth:1,
        backgroundColor:'#fff',
        borderColor:'#DDDDDD',
        alignItems:'center',
      }}>
      <TouchableOpacity onPress={() => this.props.navigator.push({id: "GoodsArgument", params: {data:this.props.data}})}>
        <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
          <Text style={{marginLeft:17,fontSize:16,color:'black'}}>
            商品详情
          </Text>
          <Icon style={{marginLeft:260}} name="angle-right" size={20} color='gray'/>
        </View>
      </TouchableOpacity>
      </View>
    )
  }

  createShoulder(){
    return(
      <View style={{
        height:44,
        flexDirection:'row',
        width:full_width,
        alignItems:'center',
        borderTopWidth:1,
        backgroundColor:'#fff',
        borderColor:'#DDDDDD',
      }}>
    
        <View style={{
          flex:1,
          alignItems:'center',
          flexDirection:'row',
          justifyContent:'space-between',
        }}>
            <Text style={{marginLeft:17,fontSize:16,color:'black'}}>网友评价</Text>
            <Text style={{fontSize:12,color:'gray'}}></Text>

        </View>

      </View>
    )
  }

  createBody(){
    const h_line_1 = ART.Path();
    h_line_1.moveTo(10,1);
    h_line_1.lineTo(full_width,1);

    let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.props.data.comment);
    return(
      <View style={{backgroundColor:'white',borderColor:'#DDDDDD',borderBottomWidth:1,}} onLayout={(e)=>{userEvaluationY = e.nativeEvent.layout.y}} >
        <ART.Surface width={full_width} height={1}>
          <ART.Shape d={h_line_1} stroke="#dddddd" strokeWidth={1} />
        </ART.Surface>
        <ListView
          dataSource={dataSource}
          renderRow={this.createUserEvaluationRow.bind(this)}
        />
      </View>
      )
  }

  createLeg(){
    const h_line_1 = ART.Path();
    h_line_1.moveTo(10,1);
    h_line_1.lineTo(full_width,1);

    let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.likeDataSelect(this.props.data.sel));
    return(
      <View style={{backgroundColor:'white',borderTopWidth:1,borderColor:'#dddddd',borderBottomWidth:1}}>
        <View style={{height:40,justifyContent:'center'}}>
          <Text style={{marginLeft:17,fontSize:16,color:'black'}}>精选商品</Text>
        </View>
        <ART.Surface width={full_width} height={1}>
          <ART.Shape d={h_line_1} stroke="#dddddd" strokeWidth={1} />
        </ART.Surface>
        <ListView
          dataSource={dataSource}
          renderRow={this.createMaybeLikeRow.bind(this)}
          contentContainerStyle={styles.contentViewStyle}
        />
      </View>
      )
  }

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

  createUserEvaluationRow(rowData,sectionId){
    const h_line_1 = ART.Path();
    h_line_1.moveTo(10,1);
    h_line_1.lineTo(full_width,1);

    return (
      <View>
        <View style={{backgroundColor:'white',flexDirection:'row'}}>
          <View>
            <View style={{backgroundColor:DEFAULT_RED_COLOR,borderRadius:20,width:40,height:40,margin:COMMON_EDGE_LEFT}} />
          </View>
          <View style={{marginTop:10}}>
            <View style={{height:40,justifyContent:'center'}}>
              <Text style={{flex:1,fontSize:COMMON_FONT_SIZE}}>{rowData.name}</Text>
              <View style={{flexDirection:'row',flex:1}}>
                {this.createStarsList(rowData.stars).map((s,i) => {
                  if (s === 0) {
                    return <Icon style={{marginRight:2}} name="star" size={13} color='#ffab1a'/>
                  }
                  if (s === 1) {
                    return <Icon style={{marginRight:2}} name="star-half-o" size={13} color='#ffab1a'/>
                  }
                  if (s === 2) {
                    return <Icon style={{marginRight:2}} name="star-o" size={13} color='#ffab1a'/>
                  }
                })}
                <Text style={{fontSize:SMALL_FONT_SIZE,color:'gray',marginLeft:10}}>{rowData.date}</Text>
              </View>
            </View>
            <View style={{height:30,width:full_width-60,marginTop:10}}>
              <Text style={{fontSize:SMALL_FONT_SIZE,flex:1}} numberOfLines={2} letterSpacing={10}>{rowData.content}</Text>
            </View>
            {this.createEvaluationImage(rowData.picture)}
            <View style={{flexDirection:'row',width:full_width-60,marginTop:10,marginBottom:10}}>
              <Text style={{fontSize:SMALL_FONT_SIZE,color:'gray'}}>浏览{rowData.browse.toString()}</Text>
              <View style={{position: "absolute",right: 15,top: 0,bottom: 0,flexDirection:'row'}}>
                <Icon style={{marginRight:5}} name="heart" size={14} color={DEFAULT_RED_COLOR}/>
                <Text style={{fontSize:SMALL_FONT_SIZE,color:'gray'}}>{rowData.praise.toString()}赞</Text>
              </View>
            </View>
          </View>
        </View>
        <ART.Surface width={full_width} height={1}>
          <ART.Shape d={h_line_1} stroke="#dddddd" strokeWidth={1} />
        </ART.Surface>
      </View>
      )
  }

  createEvaluationImage(list){
    let imageSize = (full_width - 60 - 3 * COMMON_EDGE_LEFT)/3
    if (list.length != 0) {
      return(
        <View style={{flexDirection:'row',marginTop:10}}>
          <Image source={require('ares/app/assets/image/taocixiaowan.png')} style={{width:imageSize,height:imageSize,marginRight:COMMON_EDGE_LEFT}} />
          <Image source={require('ares/app/assets/image/taocixiaowan.png')} style={{width:imageSize,height:imageSize,marginRight:COMMON_EDGE_LEFT}} />
          <Image source={require('ares/app/assets/image/taocixiaowan.png')} style={{width:imageSize,height:imageSize,marginRight:COMMON_EDGE_LEFT,justifyContent:'flex-end',alignItems:'flex-end'}}>
            <View style={{height:15,width:20,backgroundColor:'black',margin:10,borderRadius:8,opacity:0.7}}>
              <Text style={{color:'white',backgroundColor:'transparent',textAlign:'center'}}>{list.length-3}</Text>
            </View>
          </Image>
        </View>
        )
    }
  }

  render() {
    return(
      <View style={styles.root}>
        <StatusBar hidden={false} barStyle='dark-content' translucent={true} backgroundColor="#ffffff">
        </StatusBar>
        {this.createTitle()}
        <View style={{width:full_width,height:1,backgroundColor:''}}/>
        <ScrollView style={{height:full_height-50}}
         ref={(scrollView) => { _scrollView = scrollView}}
         scrollEventThrottle={200}
         stickyHeaderIndices={[2]}
         showsVerticalScrollIndicator={false}>
           {this.createHeader()}
           <WhiteSpace size='md' />
           {this.createNeck()}
           <WhiteSpace size='md' />
           {this.createShoulder()}
           {this.createBody()}
           <WhiteSpace size='md' />
           {this.createLeg()}
           <View style={{backgroundColor:COMMON_STYLES.MAIN_BACKGROUND_COLOR,height:45}} />
        </ScrollView>
        {this.createFoot()}
      </View>
    )
  }
}


export default B2CGoodsDetails
