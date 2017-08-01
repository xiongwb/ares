//套餐详情
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
  Alert,
  TouchableOpacity,
  SegmentedControlIOS,
  Platform,
  Linking,
} from 'react-native'
import {
  BasePage,
  NavBar,
  StringUtils,
  SegmentControl,
} from 'AresComponent'
import {
  COMMON_STYLES,
} from 'AresConstant'

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

const mockList = [
  {
    name:'前菜三品',
    count:'2',
    price:'24',
  },
    {
    name:'蔬菜沙拉',
    count:'2',
    price:'28',
  },
  {
    name:'生鱼片三品(三文鱼、金枪鱼、黄师鱼格三片)',
    count:'2',
    price:'74',
  },
  {
    name:'山药炒肉松饭',
    count:'1',
    price:'78',
  },
  {
    name:'大虾天妇罗',
    count:'1',
    price:'44',
  },
  {
    name:'烤鱼下巴',
    count:'2',
    price:'43',
  },
  {
    name:'煎豆腐',
    count:'2',
    price:'24',
  },
    {
    name:'手握寿司',
    count:'3',
    price:'24',
  },
  {
    name:'乌冬面',
    count:'2',
    price:'24',
  },
  {
    name:'水果或甜品',
    count:'2',
    price:'8',
  },
]

const mockNotice = [
  {
    name:'有效期',
    content:[
      '2016-02-03至2018-01-01'
    ],
  },
    {
    name:'除外日期',
    content:[
      '有效期内周末、法定节假日可用'
    ],
  },
  {
    name:'使用日期',
    content:[
      '团购券24小时可用'
    ],
  },
  {
    name:'预约提醒',
    content:[
      '请您提前一天预约'
    ],
  },
  {
    name:'规则提醒',
    content:[
      '每张购物券建议2人使用'
    ],
  },
  {
    name:'包间',
    content:[
      '可免费使用包间'
    ],
  },
  {
    name:'温情提示',
    content:[
      '团购用户不可同时享受商家其他优惠',
      '如部分菜品因时令或其他不可抗因素导致无法提供，店内会用等价菜品替换，具体事宜请与店内协商'
    ],
  },
  {
    name:'商家服务',
    content:[
      '提供免费WiFi',
      '等车位收费标准：请咨询商户'
    ],
  },

]
const buttons = ['取消', '10086', '022-124643'];
const CANCEL_INDEX = 0;


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
    left: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  left_touch_box: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
  },

});
class PackageDetail extends BasePage {
  constructor(){
    super();
    this.state = {
      iconString:'star-o',
      iconColor:'gray',
    }
  }
//导航栏
  createHeader(){
    return(
          <NavBar
            backgroundColor={'#383838'}
            leftContent={
              <View style={styles.left}>
                <TouchableOpacity style={styles.left_touch_box} onPress={() => {
                    this.props.navigator.pop()
                }}>
                  <Icon style={{marginRight: 3}} name="angle-left" size={22} color='white' />
                  <Text style={{fontSize: 16, color: 'white'}}>返回</Text>
                </TouchableOpacity>
              </View>
            }
            titleContent={
              <TouchableOpacity>
                <View style={{flexDirection:'row'}}>
                  <Text style={{color:'white',fontSize:18}}>商品</Text>
                </View>
              </TouchableOpacity>
            }
            rightContent={
              <View style={{flexDirection:'row'}}>
                <TouchableOpacity>
                  <Icon style={{marginRight:10}} name="star-o" size={24} color='white' />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon style={{marginRight: 3}} name="share-square-o" size={24} color='white' />
                </TouchableOpacity>
              </View>
             }
           />
    )
  }
// 图片以及文字
  createHeaderImage(){
    return(
      <View>
        <Image source={require('ares/app/assets/image/picture01.png')} style={{width:full_width,height:220}}>
          <Text style={{fontSize:18,backgroundColor:'transparent',marginTop:150,color:'white',marginLeft:COMMON_FONT_SIZE,marginRight:COMMON_FONT_SIZE}}>哈哈哈日料店</Text>
          <Text style={{fontSize:COMMON_FONT_SIZE,backgroundColor:'transparent',marginTop:5,color:'white',marginLeft:COMMON_FONT_SIZE,marginRight:COMMON_FONT_SIZE}}>仅售198元！价格488的双人餐，可免费使用包间，提供免费wifi</Text>
        </Image>
        <View style={{backgroundColor:'white',height:35,flexDirection:'row',alignItems:'center'}}>
          <Icon style={{marginLeft:COMMON_EDGE_LEFT}} name="check-circle-o" size={COMMON_FONT_SIZE} color='#f29836' />
          <Text style={{color:'#f29836',fontSize:COMMON_FONT_SIZE}}>随时退</Text>
          <Icon style={{marginLeft:COMMON_EDGE_LEFT}} name="check-circle-o" size={COMMON_FONT_SIZE} color='#f29836' />
          <Text style={{color:'#f29836',fontSize:COMMON_FONT_SIZE}}>过时退</Text>
          <View style={{position: "absolute",right: 15,top: 10,bottom: 0,flexDirection:'row'}}>
            <Icon style={{}} name="check-circle-o" size={COMMON_FONT_SIZE} color='#999999' />
            <Text style={{color:'#999999',fontSize:COMMON_FONT_SIZE}}>已售318</Text>
          </View>
        </View>
      </View>
    )
  }
// 店铺信息
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

  createMessage(){
    const v_line_1 = ART.Path();
    v_line_1.moveTo(1,15);
    v_line_1.lineTo(1,35);

    const h_line_1 = ART.Path();
    h_line_1.moveTo(1,1);
    h_line_1.lineTo(full_width,1);

    return(
      <View style={{backgroundColor:'white'}}>
        <View style={{height:50,alignItems:'center',backgroundColor:'white',flexDirection:'row'}}>
          <Image source={require('ares/app/assets/image/zhoubian.png')} style={{width:15,height:19,marginLeft:10}} />
          <Text style={{fontSize:15,marginLeft:5}}>华苑产业园梅苑路13号哈哈酒店2楼</Text>
          <TouchableOpacity style={{position: "absolute",right: 15,top: 15,bottom: 0}} onPress={this.show.bind(this)}>
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
            <ART.Surface width={1} height={40}>
              <ART.Shape d={v_line_1} stroke="#dddddd" strokeWidth={1} />
            </ART.Surface>
          </View>
        </View>
        <ART.Surface width={full_width} height={1}>
          <ART.Shape d={h_line_1} stroke="#dddddd" strokeWidth={1} />
        </ART.Surface>
        <View style={{height:50,justifyContent:'center',backgroundColor:'white'}}>
          <Text style={{fontSize:15,marginLeft:COMMON_EDGE_LEFT}}>评论(16555)条</Text>
          <View style={{position: "absolute",right: 15,top: 16,bottom: 0,flexDirection:'row'}}>
            <Text style={{fontSize:15}}>好评率</Text>
            <Text style={{fontSize:16,color:DEFAULT_RED_COLOR,marginTop:-2}}>97%</Text>
            <Icon style={{marginLeft:5,marginTop:-3}} name="angle-right" size={20} color={'gray'}/>
          </View>
        </View>
        <ART.Surface width={full_width} height={1}>
          <ART.Shape d={h_line_1} stroke="#dddddd" strokeWidth={1} />
        </ART.Surface>
        <View style={{height:50,justifyContent:'center',backgroundColor:'white'}}>
          <Text style={{fontSize:15,marginLeft:COMMON_EDGE_LEFT}}>团购详情</Text>
          <View style={{position: "absolute",right: 15,top: 16,bottom: 0,flexDirection:'row'}}>
            <Text style={{fontSize:15}}>更多图文详解</Text>
            <Icon style={{marginLeft:5,marginTop:-3}} name="angle-right" size={20} color={'gray'}/>
          </View>
        </View>
        <ART.Surface width={full_width} height={1}>
          <ART.Shape d={h_line_1} stroke="#dddddd" strokeWidth={1} />
        </ART.Surface>

      </View>
    )
  }

// 套餐详情

  createPackageContent(data,index){
    return(
      <View style={{marginLeft:COMMON_FONT_SIZE,marginRight:COMMON_FONT_SIZE,flexDirection:'row',marginBottom:5}}>
        <Text style={{flex:4,textAlign:'left'}}>{data.name}</Text>
        <Text style={{flex:1,textAlign:'left'}}>{data.count + '份'}</Text>
        <Text style={{flex:1,textAlign:'right'}}>{data.price + '元'}</Text>
      </View>
    )
  }

  createPackageDetail(){
    return(
      <View style={{backgroundColor:'white'}}>
        <Text style={{marginLeft:COMMON_FONT_SIZE,color:'gray',marginTop:5,marginBottom:5}}>全部商品</Text>
        {mockList.map((data,index)=>{
          return this.createPackageContent(data,index)
        })}
        <View style={{marginLeft:COMMON_FONT_SIZE,marginRight:COMMON_FONT_SIZE,flexDirection:'row',marginBottom:5}}>
          <Text style={{flex:4,textAlign:'left'}} />
          <Text style={{flex:1,textAlign:'left'}}>最高价值</Text>
          <Text style={{flex:1,textAlign:'right'}}>493元</Text>
        </View>
        <View style={{marginLeft:COMMON_FONT_SIZE,marginRight:COMMON_FONT_SIZE,flexDirection:'row',marginBottom:5}}>
          <Text style={{flex:4,textAlign:'left'}} />
          <Text style={{flex:1,textAlign:'left'}}>团购价</Text>
          <Text style={{flex:1,textAlign:'right',color:DEFAULT_RED_COLOR,fontSize:15}}>198元</Text>
        </View>
        <Text style={{marginLeft:COMMON_EDGE_LEFT,marginBottom:5}}>免费提供餐巾纸</Text>
      </View>
    )
  }

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
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <TouchableOpacity>
            <Icon name='shopping-cart' size={30} color={DEFAULT_RED_COLOR} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{flex:3}}>
          <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:DEFAULT_RED_COLOR}}>
            <Text style={{color:'white',fontSize:20}}>加入购物车</Text>
          </View>
        </TouchableOpacity>
      </View>
      )
  }


// 购前须知

  createNoticeDetail(data,index){
    return (
      <View style={{flexDirection:'row',alignItems:'center',marginBottom:5}}>
        <Icon style={{marginLeft:COMMON_EDGE_LEFT}} name={'circle'} size={8} color={'gray'} />
        <Text style={{marginLeft:COMMON_EDGE_LEFT,width:full_width-30}} numberOfLines={2} >{data}</Text>
      </View>
    )
  }

  createNoticeContent(data,index){
    return(
      <View style={{marginTop:15}}>
        <Text style={{color:'gray',marginLeft:COMMON_EDGE_LEFT,marginBottom:5}}>{data.name}</Text>
        {data.content.map((s,i)=>{
          return this.createNoticeDetail(s,i)
        })}
      </View>
    )
  }

  createNotice(){
    const h_line_1 = ART.Path();
    h_line_1.moveTo(10,1);
    h_line_1.lineTo(full_width,1);

    return(
      <View style={{backgroundColor:'white'}}>
        <Text style={{margin:COMMON_EDGE_LEFT}}>购买须知</Text>
        <ART.Surface width={full_width} height={1}>
          <ART.Shape d={h_line_1} stroke="#dddddd" strokeWidth={1} />
        </ART.Surface>
        {mockNotice.map((data,index) => {
          return this.createNoticeContent(data,index)
        })}
      </View>
    )
  }


  render() {
      return (
        <View style={styles.root}>
          {this.createHeader()}
          <ScrollView showsVerticalScrollIndicator={false}>
            {this.createHeaderImage()}
            <WhiteSpace size='md' />
            {this.createMessage()}
            {this.createPackageDetail()}
            <WhiteSpace size='md' />
            {this.createNotice()}
            <View style={{height:50}} />
          </ScrollView>
          {this.createPayView()}
        </View>
        )
  }
}
export default PackageDetail
