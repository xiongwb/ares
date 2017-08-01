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
} from 'react-native'
import {
  BasePage,
  BackNavBar,
  StringUtils,
  SegmentControl,
} from 'AresComponent'
import {
  COMMON_STYLES,
} from 'AresConstant'

import RNSegmentC from '../components/segmentcontrol_android'

import Icon from 'react-native-vector-icons/FontAwesome'
import AresAPI from 'AresAPI'
import WhiteSpace from 'antd-mobile/lib/white-space'

import ActionSheet from 'react-native-actionsheet';

const full_width = Dimensions.get('window').width
const full_height = Dimensions.get('window').height

const COMMON_FONT_SIZE = 14
const COMMON_EDGE_LEFT = 10
const SMALL_FONT_SIZE  = 12
const DEFAULT_RED_COLOR = '#f5787c'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COMMON_STYLES.MAIN_BACKGROUND_COLOR,
  },
  header : {
    backgroundColor: '#F5F5F5',
    height:30,
    justifyContent:'center',
  },
  contentViewStyle: {
    // 主轴方向
    flexDirection:'row',
    // 换行
    flexWrap:'wrap',
    //必须设置否则换行不起作用
    alignItems:'center',
  },
});


const titleList = ['优惠信息','网友评价','商家信息']

const mockEvaluation = [
  {
    header:'ares/app/assets/image/picture01.png',
    name:'哈哈啊哈哈',
    stars:4.5,
    date:'2016年12月30日',
    content:'很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；',
    picture:[
      'ares/app/assets/image/picture01.png',
      'ares/app/assets/image/picture01.png',
      'ares/app/assets/image/picture01.png',
      'ares/app/assets/image/picture01.png',
      'ares/app/assets/image/picture01.png',
      'ares/app/assets/image/picture01.png',
    ],
    browse:2041,
    praise:21,
  },
  {
    header:'ares/app/assets/image/picture01.png',
    name:'hahhaha',
    stars:3,
    date:'2016年12月30日',
    content:'很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；',
    picture:[],
    browse:2041,
    praise:1,
  },
]

const mockLike = [
  {
    image:'ares/app/assets/image/picture01.png',
    name:'七番地(日式烧肉专门店)',
    stars:3.5,
    distance:'>4km',
    discount:'8.6折',
    kind:'日本料理',
  },
    {
    image:'ares/app/assets/image/picture01.png',
    name:'七番地(日式烧肉专门店)',
    stars:3.5,
    distance:'>4km',
    discount:'8.6折',
    kind:'日本料理',
  },
  {
    image:'ares/app/assets/image/picture01.png',
    name:'七番地(日式烧肉专门店)',
    stars:3.5,
    distance:'>4km',
    discount:'8.6折',
    kind:'日本料理',
  },
  {
    image:'ares/app/assets/image/picture01.png',
    name:'七番地(日式烧肉专门店)',
    stars:3.5,
    distance:'>4km',
    discount:'8.6折',
    kind:'日本料理',
  },
  {
    image:'ares/app/assets/image/picture01.png',
    name:'七番地(日式烧肉专门店)',
    stars:3.5,
    distance:'>4km',
    discount:'8.6折',
    kind:'日本料理',
  },
]

const discountMessageY = 0
const userEvaluationY = 0
const bussinessmenY = 0

const buttons = ['取消', '10086', '022-124643'];
const CANCEL_INDEX = 0;

class CommodityDetail extends BasePage {
  constructor(){
    super();
    this.state = {
      discountList : [1,2],
      isShowPart : true,
      evaluationList: mockEvaluation,
      youLikeList: mockLike,
      iconString:'star-o',
      iconColor:'gray',
    }
  }
/**
  商家简介
*/
  _handlePress(index) {
    if (index != 0) {
      this.callPhone(buttons[index])
    }
  }

  show() {
      this.ActionSheet.show();
  }

  callPhone(tel){
    Linking.canOpenURL('tel:' + tel).then(supported => {
      if (!supported) {
        Alert.alert("不能拨打电话" + tel)
      } else {
        return Linking.openURL('tel:' + tel)
      }
    }).catch(err => console.error('An error occurred', err));
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

  createCommodityInformation(){
    const h_line_1 = ART.Path();
    h_line_1.moveTo(1,1);
    h_line_1.lineTo(full_width,1);

    const v_line_1 = ART.Path();
    v_line_1.moveTo(1,10);
    v_line_1.lineTo(1,30);

    return(
      <View>
        <View style={{backgroundColor:'white',flexDirection:'row'}}>
          <View>
           <Image source={require('ares/app/assets/image/picture01.png')} style={{width:120,height:80,margin:10}} />
          </View>
          <View>
            <Text style={{marginTop:15,fontSize:15}}>哈哈日韩料理</Text>
            <View style={{marginTop:8, flexDirection:'row',width:full_width-100}}>
              {this.createStarsList(4.5).map((s,i) => {
                if (s === 0) {
                  return <Icon style={{marginRight:2}} name="star" size={15} color='#ffab1a'/>
                }
                if (s === 1) {
                  return <Icon style={{marginRight:2}} name="star-half-o" size={15} color='#ffab1a'/>
                }
                if (s === 2) {
                  return <Icon style={{marginRight:2}} name="star-o" size={15} color='#ffab1a'/>
                }
              })}
              <Text style={{marginLeft:5,fontSize:SMALL_FONT_SIZE}}>416条</Text>
              <Text style={{marginLeft:5,fontSize:SMALL_FONT_SIZE}}>¥168/人</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <Text style={{marginTop:8,fontSize:SMALL_FONT_SIZE}}>华苑</Text>
              <Text style={{fontSize:SMALL_FONT_SIZE,marginTop:8,marginLeft:COMMON_EDGE_LEFT}}>日韩料理</Text>
            </View>
          </View>
        </View>
        <View>
          <ART.Surface width={full_width} height={1}>
            <ART.Shape d={h_line_1} stroke="#dddddd" strokeWidth={1} />
          </ART.Surface>
        </View>
        <View style={{height:40,alignItems:'center',backgroundColor:'white',flexDirection:'row'}}>
          <Image source={require('ares/app/assets/image/zhoubian.png')} style={{width:15,height:19,marginLeft:10}} />
          <Text style={{fontSize:15,marginLeft:5}} onPress={() => this.props.navigator.push({id: "AresMap", params: {}})}>华苑产业园梅苑路13号哈哈酒店2楼</Text>
          <TouchableOpacity style={{position: "absolute",right: 15,top: 10,bottom: 0}} onPress={this.show.bind(this)}>
            <Icon name="phone" size={20} color={DEFAULT_RED_COLOR}/>
            <ActionSheet 
                ref={(o) => this.ActionSheet = o}
                title="拨打商家电话"
                options={buttons}
                cancelButtonIndex={CANCEL_INDEX}
                onPress={this._handlePress.bind(this)}
            />
          </TouchableOpacity>
          <View style={{position: "absolute",right: 50,top: 0,bottom: 0}}>
            <ART.Surface width={1} height={35}>
              <ART.Shape d={v_line_1} stroke="#dddddd" strokeWidth={1} />
            </ART.Surface>
          </View>
        </View>
        <View>
          <ART.Surface width={full_width} height={1}>
            <ART.Shape d={h_line_1} stroke="#dddddd" strokeWidth={1} />
          </ART.Surface>
        </View>
      </View>
      )
  }

/**
  切换按钮回调
*/

  exchange(meg){
    let offsetY = 0
    if (meg === 0) {
      offsetY = discountMessageY
    }
    if (meg === 1) {
      // iOS有顶吸效果 需要将最上面的导航位置的高度40减去
      offsetY = Platform.OS === 'ios' ? userEvaluationY - 40 : userEvaluationY
    }
    if (meg === 2) {
      offsetY = Platform.OS === 'ios' ? bussinessmenY - 40 : bussinessmenY
    }
    _scrollView.scrollTo({x: 0, y: offsetY, animated: true})
  }

/**
  套餐or团购
*/
  showAllPackageOrCoupon(number,isShow){
    let showList = []
    for (let i=0;i< number; i++ ) {
      showList.push(1)
    }
    this.setState({
      discountList:showList,
      isShowPart:isShow
    })
  }

  showPackageOrCoupon(title){
    if (title === "团") {
      return this.state.discountList.map((data,index) => {
        return this.createOfferPackage()
      })
    }
  }

  createOfferPackage(){
    const h_line_1 = ART.Path();
    h_line_1.moveTo(10,1);
    h_line_1.lineTo(full_width,1);

    return(
        <TouchableOpacity onPress={() => this.props.navigator.push({id: "PackageDetail", params: {}})}>
          <View style={{backgroundColor:'white',height:66}}>
            <View style={{flexDirection:'row'}}>
              <Image source={require('ares/app/assets/image/picture01.png')} style={{width:60,height:45,margin:10,marginLeft:40}} />
              <View style={{width:full_width-110}}>
                <Text style={{marginTop:10,fontSize:COMMON_FONT_SIZE}}>双人餐</Text>
                <View style={{flexDirection:'row',marginTop:10}}>
                  <Text style={{color:DEFAULT_RED_COLOR,fontSize:COMMON_FONT_SIZE}}>¥{" "}198</Text>
                  <Text style={{color:'gray',fontSize:SMALL_FONT_SIZE,marginLeft:COMMON_EDGE_LEFT,textDecorationLine:'line-through'}}>¥{" "}478</Text>
                </View>
                <View style={{position: "absolute",right: 15,top: 0,bottom: 0,flexDirection:'row',height:65,alignItems:'center'}}>
                  <Text style={{fontSize:SMALL_FONT_SIZE,color:'gray'}}>已售318</Text>
                  <Icon style={{marginTop:-2,marginLeft:3}} name="angle-right" size={15} color='gray'/>
                </View>
              </View>
            </View>
            <ART.Surface width={full_width} height={1}>
              <ART.Shape d={h_line_1} stroke="#dddddd" strokeWidth={1} />
            </ART.Surface>
          </View>
        </TouchableOpacity>
      )
  }

  createPackageOrCoupon(title,detail){
    return(
        <View>
          <View style={{flexDirection:'row',backgroundColor:'white',alignItems:'center',height:30}}>
            <View style={{backgroundColor:DEFAULT_RED_COLOR,marginLeft:COMMON_EDGE_LEFT}}>
              <Text style={{margin:3,color:'white'}}>{title}</Text>
            </View>
            <Text style={{fontSize:COMMON_FONT_SIZE,marginLeft:COMMON_EDGE_LEFT}}>{detail}</Text>
          </View>
          {this.showPackageOrCoupon(title)}
          {this.showPartOrAll()}
        </View>
      )
  }

  showPartOrAll(){
    if (this.state.isShowPart === true) {
      return(
          <View style={{height:40,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
            <TouchableOpacity onPress={()=>{this.showAllPackageOrCoupon(3,false)}}>
              <View style={{flexDirection:'row'}}>
                <Text>查看其他1个团购信息</Text>
                <Icon style={{marginTop:-2,marginLeft:3}} name="angle-down" size={20} color='gray'/>
              </View>
            </TouchableOpacity>
          </View>
        )
    }else{
      return(
          <View style={{height:40,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
            <TouchableOpacity onPress={()=>{this.showAllPackageOrCoupon(2,true)}}>
              <View style={{flexDirection:'row'}}>
                <Text>收起</Text>
                <Icon style={{marginTop:-2,marginLeft:3}} name="angle-up" size={20} color='gray'/>
              </View>
            </TouchableOpacity>
          </View>
        )
    }
  }
/**
  推荐菜
*/

  createDishesImage(){
    let imageWidth = (full_width-4*COMMON_EDGE_LEFT)/3
    return(
        <View style={{width:imageWidth + COMMON_EDGE_LEFT}}>
          <Image source={require('ares/app/assets/image/picture01.png')} style={{width:imageWidth,height:imageWidth*0.8,marginLeft:COMMON_EDGE_LEFT,justifyContent:'flex-end'}}>
            <View style={{backgroundColor:'black',height:20,opacity:0.7}} />
            <View style={{flexDirection:'row',marginTop:-20,alignSelf:'center'}}>
              <Icon style={{backgroundColor:'transparent'}} name="thumbs-up" size={12} color='white'/>
              <Text style={{color:'white',fontSize:SMALL_FONT_SIZE,backgroundColor:'transparent'}}>9人推荐</Text>
            </View>
          </Image>
          <Text style={{fontSize:SMALL_FONT_SIZE,color:'gray',paddingTop:10,textAlign:'center',marginLeft:COMMON_EDGE_LEFT}}>刺身三色拼盘</Text>
        </View>
      )
  }

  createRecommendedDishes(){
    const h_line_1 = ART.Path();
    h_line_1.moveTo(10,1);
    h_line_1.lineTo(full_width-20,1);
    return(
        <View style={{backgroundColor:'white'}}>
          <View style={{height:40,flexDirection:'row',width:full_width,alignItems:'center'}}>
            <Text style={{fontSize:COMMON_FONT_SIZE,marginLeft:COMMON_EDGE_LEFT}}>推荐菜</Text>
            <Icon style={{position: "absolute",right: 15,top: 10,bottom: 0,}} name="angle-right" size={20} color='gray'/>
          </View>
          <ART.Surface width={full_width} height={1}>
            <ART.Shape d={h_line_1} stroke="#dddddd" strokeWidth={1} />
          </ART.Surface>
          <View style={{height:30,justifyContent:'center',alignItems:'center',marginTop:-15}}>
            <Text style={{fontSize:COMMON_FONT_SIZE,padding:4}}>网友推荐</Text>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {[1,1,1,1].map((data,index)=>{
              return this.createDishesImage()
            })}
          </ScrollView>
          <View style={{height:50,margin:10}}>
            <Text style={{fontSize:COMMON_FONT_SIZE}} numberOfLines={3}>餐前面包  摩洛哥烤羊排  鸡尾酒  蜜枣  BBQ  couscous  摩洛哥面饼 大虾浓汤  下午茶  大盘烤肉  鹌鹑肉汁饭  羊排  摩洛哥传统果仁库  蓝莓芝士  牛肉丸大盘烤肉  鹌鹑肉汁饭  羊排  摩洛哥传统果仁库  蓝莓芝士  牛肉丸
            </Text>
          </View>
        </View>
      )
  }
/**
  网友评价
*/
  segmentedOnValueChange(value){

  }

  createSegmentedControl(){
    if (Platform.OS === 'android') {
      return(
        <View style={{width:278,height:30,marginHorizontal:40}}>
          <View style={{marginLeft:40,borderRadius:7,height:30,width:200,backgroundColor:'white',borderColor:DEFAULT_RED_COLOR,borderWidth:1}}>
            <RNSegmentC style={{width:198,height:28}}/>
          </View>
        </View>
      )
    }
    if (Platform.OS === 'ios') {
      return(
        <View style={{marginHorizontal:40}}>
          <SegmentedControlIOS
            onValueChange={this.segmentedOnValueChange}
            selectedIndex={0}
            tintColor={DEFAULT_RED_COLOR}
            values={['全部', '最新' , '有图']} />
        </View>
        )
    }
  }

  createEvaluationImage(list){
    let imageSize = (full_width - 60 - 3 * COMMON_EDGE_LEFT)/3
    if (list.length != 0) {
      return(
        <View style={{flexDirection:'row',marginTop:10}}>
          <Image source={require('ares/app/assets/image/picture01.png')} style={{width:imageSize,height:imageSize,marginRight:COMMON_EDGE_LEFT}} />
          <Image source={require('ares/app/assets/image/picture01.png')} style={{width:imageSize,height:imageSize,marginRight:COMMON_EDGE_LEFT}} />
          <Image source={require('ares/app/assets/image/picture01.png')} style={{width:imageSize,height:imageSize,marginRight:COMMON_EDGE_LEFT,justifyContent:'flex-end',alignItems:'flex-end'}}>
            <View style={{height:15,width:20,backgroundColor:'black',margin:10,borderRadius:8,opacity:0.7}}>
              <Text style={{color:'white',backgroundColor:'transparent',textAlign:'center'}}>{list.length-3}</Text>
            </View>
          </Image>
        </View>
        )
    }
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
              <Text style={{fontSize:SMALL_FONT_SIZE,color:'gray'}}>浏览{rowData.browse}</Text>
              <View style={{position: "absolute",right: 15,top: 0,bottom: 0,flexDirection:'row'}}>
                <Icon style={{marginRight:5}} name="heart" size={14} color={DEFAULT_RED_COLOR}/>
                <Text style={{fontSize:SMALL_FONT_SIZE,color:'gray'}}>{rowData.praise}赞</Text>
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

  createUserEvaluation(){
    const h_line_1 = ART.Path();
    h_line_1.moveTo(10,1);
    h_line_1.lineTo(full_width,1);

    let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.state.evaluationList);
    return(
      <View style={{backgroundColor:'white'}} onLayout={(e)=>{userEvaluationY = e.nativeEvent.layout.y}} >
        <View style={{height:40,flexDirection:'row',width:full_width,alignItems:'center'}}>
          <Text style={{fontSize:COMMON_FONT_SIZE,marginLeft:COMMON_EDGE_LEFT}}>网友评价</Text>
          <Text style={{fontSize:12,color:'gray'}}>(465)</Text>
          <Icon style={{position: "absolute",right: 15,top: 10,bottom: 0,}} name="angle-right" size={20} color='gray'/>
        </View>
        {this.createSegmentedControl()}
        <View style={{height:100,justifyContent:'center',alignItems:'center'}}>
          <View style={{flexDirection:'row'}}>
            <View style={{justifyContent:'center',alignItems:'center'}}>
              <Text style={{fontSize:30,color:DEFAULT_RED_COLOR}}>8.8</Text>
              <Text style={{fontSize:SMALL_FONT_SIZE,color:'gray'}}>417人评价</Text>
            </View>
            <View style={{justifyContent:'center',alignItems:'center',marginLeft:30}}>
              <Text style={{fontSize:SMALL_FONT_SIZE,color:'gray',flex:1}}>口味：4.9</Text>
              <Text style={{fontSize:SMALL_FONT_SIZE,color:'gray',flex:1}}>环境：3.2</Text>
              <Text style={{fontSize:SMALL_FONT_SIZE,color:'gray',flex:1}}>服务：4.5</Text>
            </View>
          </View>
        </View>
        <ART.Surface width={full_width} height={1}>
          <ART.Shape d={h_line_1} stroke="#dddddd" strokeWidth={1} />
        </ART.Surface>
        <ListView
          dataSource={dataSource}
          renderRow={this.createUserEvaluationRow.bind(this)}
        />
        <View style={{height:40,justifyContent:'center'}}>
            <TouchableOpacity onPress={() => this.props.navigator.push({id: "AllEvaluation", params: {}})}>  
              <Text style={{fontSize:COMMON_FONT_SIZE,marginLeft:COMMON_EDGE_LEFT}}>查看全部评价</Text>
              <Icon style={{position: "absolute",right: 15,top: 10,bottom: 0,}} name="angle-right" size={20} color='gray'/>
          </TouchableOpacity>
        </View>
      </View>
      )
  }
/**
  商家信息
*/

  createBussinessIconWithTitle(icon,title){
    return(
      <View style={{flexDirection:'row',width:80,marginBottom:5}}>
        <Icon style={{}} name={icon} size={15} color='gray'/>
        <Text style={{fontSize:SMALL_FONT_SIZE,color:'gray',marginLeft:5}}>{title}</Text>
      </View>
      )
  }

  createBussinessmenInformation(){
    return(
      <View style={{height:100,backgroundColor:'white'}} onLayout={(e)=>{bussinessmenY = e.nativeEvent.layout.y}}>
        <Text style={{fontSize:COMMON_FONT_SIZE,margin:10}}>商家信息</Text>
        <View>
          <View style={{marginLeft:COMMON_EDGE_LEFT,flex:1}}>
            {this.createBussinessIconWithTitle('clock-o','营业时间：11:00-20:30')}
          </View>
          <View style={{marginLeft:COMMON_EDGE_LEFT,flex:1,flexDirection:'row'}}>
            {this.createBussinessIconWithTitle('clock-o','无烟区')}
            {this.createBussinessIconWithTitle('clock-o','包间')}
            {this.createBussinessIconWithTitle('clock-o','停车')}
          </View>
          <View style={{marginLeft:COMMON_EDGE_LEFT,flex:1,flexDirection:'row'}}>
            {this.createBussinessIconWithTitle('clock-o','WIFI')}
            {this.createBussinessIconWithTitle('clock-o','刷卡')}
          </View>
        </View>
      </View>
      )
  }

/**
  猜你喜欢
*/
  createMaybeLikeRow(rowData,sectionId){
    let imageSize = (full_width - 3 * COMMON_EDGE_LEFT)/2
    return(
      <View style={{backgroundColor:'white',marginLeft:10,marginTop:10}}>
        <Image source={require('ares/app/assets/image/picture01.png')} style={{width:imageSize,height:imageSize*0.8}} />
        <View style={{borderWidth:1,borderColor:'#dddddd'}}>
          <View style={{margin:10}}>
            <Text style={{fontSize:SMALL_FONT_SIZE,color:'gray'}}>{rowData.name}</Text>
            <View style={{flexDirection:'row',marginTop:5}}>
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
              <Text style={{color:'gray',fontSize:SMALL_FONT_SIZE,position: "absolute",right: 10}}>{rowData.distance}</Text>
            </View>
            <View style={{flexDirection:'row',marginTop:5}}>
              <Text style={{color:DEFAULT_RED_COLOR,borderWidth:1,borderColor:DEFAULT_RED_COLOR,fontSize:10,borderRadius:2,textAlign:'center'}}>{rowData.discount}</Text>
              <Text style={{fontSize:SMALL_FONT_SIZE,color:'gray',marginLeft:5}}>{rowData.kind}</Text>
            </View>
          </View>
        </View>
      </View>
      )
  }

  createMaybeLike(){
    const h_line_1 = ART.Path();
    h_line_1.moveTo(10,1);
    h_line_1.lineTo(full_width,1);

    let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.state.youLikeList);
    return(
      <View style={{backgroundColor:'white'}}>
        <Text style={{fontSize:COMMON_FONT_SIZE,margin:10}}>猜你喜欢</Text>
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
/**
  买单按钮
*/
  clickStartButton(){
    if (this.state.iconString === 'star-o') {
      this.setState({
        iconString:'star',
        iconColor:DEFAULT_RED_COLOR,
      })
    }
    if (this.state.iconString === 'star') {
      this.setState({
        iconString:'star-o',
        iconColor:'gray',
      })
    }
  }

  createPayView(){
    return(
      <View style={{backgroundColor:'white',height:50,position: "absolute",right: 0,bottom: 0,left:0,flexDirection:'row'}}>
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <TouchableOpacity onPress={()=>{this.clickStartButton()}}>
            <Icon name={this.state.iconString} size={30} color={this.state.iconColor} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{flex:3}} onPress={() => this.props.navigator.push({id: "PurchaseGoods", params: {}})}>
          <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:DEFAULT_RED_COLOR}}>
            <Text style={{color:'white',fontSize:20}}>买单</Text>
          </View>
        </TouchableOpacity>
      </View>
      )
  }

  onScrolling(){
    console.log("滚动")
  }

  render() {
      return (
        <View style={styles.root}>
          <BackNavBar component={this} rightContent={<TouchableOpacity>
            <Image source={require('ares/app/assets/image/share.png')} style={{height:22,width:23}} />
            </TouchableOpacity>}>商品</BackNavBar> 
          <ScrollView style={{height:full_height-50}}
           ref={(scrollView) => { _scrollView = scrollView}}
           onScroll={()=>this.onScrolling()}
           scrollEventThrottle={200}
           stickyHeaderIndices={[2]}
           showsVerticalScrollIndicator={false}
           >
            {this.createCommodityInformation()}
            <WhiteSpace size='md' />
            <View onLayout={(e)=>{discountMessageY = e.nativeEvent.layout.y}}>
              <SegmentControl
                style = {{width:full_width,height:40,backgroundColor:'#fff',flexDirection:'row'}}
                title_array = {titleList}
                exchange = {(msg)=>this.exchange(msg)}
              />
            </View>
            {this.createPackageOrCoupon("团","优惠信息")}
            <WhiteSpace size='md' />
            {this.createRecommendedDishes()}
            <WhiteSpace size='md' />
            {this.createUserEvaluation()}
            <WhiteSpace size='md' />
            {this.createBussinessmenInformation()}
            <WhiteSpace size='md' />
            {this.createMaybeLike()}
            <View style={{backgroundColor:COMMON_STYLES.MAIN_BACKGROUND_COLOR,height:65}} />
          </ScrollView>
          {this.createPayView()}
        </View>
        )
  }
}
export default CommodityDetail
