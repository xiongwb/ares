import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  ART,
  ListView,
  TouchableOpacity,
  ScrollView,
  PixelRatio,
  Platform,
} from 'react-native'
import {
  PushLogin,
  NavBar,
  SegmentControl,
} from 'AresComponent'
import {
  COMMON_STYLES,
} from 'AresConstant'


var Swiper = require('react-native-swiper');

import Mock from '../../constants/mock';
const {Surface, Shape, Path} = ART;

import WhiteSpace from 'antd-mobile/lib/white-space'
import Icon from 'react-native-vector-icons/FontAwesome'
var full_width = Dimensions.get('window').width;

const COMMON_FONT_SIZE = 14
const COMMON_EDGE_LEFT = 10
const SMALL_FONT_SIZE  = 12
const mockFood = [
  {
    image:'ares/app/assets/image/picture01.png',
    name:'七番地(日式烧肉专门店)',
    distance:'华苑 545m',
    discount:'¥20/人',
  },
  {
    image:'ares/app/assets/image/picture01.png',
    name:'七番地(日式烧肉专门店)',
    distance:'华苑 545m',
    discount:'¥20/人',
  },
  {
    image:'ares/app/assets/image/picture01.png',
    name:'七番地(日式烧肉专门店)',
    distance:'华苑 545m',
    discount:'¥20/人',
  },
  {
    image:'ares/app/assets/image/picture01.png',
    name:'七番地(日式烧肉专门店)',
    distance:'华苑 545m',
    discount:'¥20/人',
  },
]
const mockLike = [
  {
    image:'ares/app/assets/image/zhongmuwan.png',
    name:'七番地(日式烧肉专门店)',
    stars:3.5,
    distance:'>4km',
    discount:'￥29.8',
    kind:'日本料理',
  },
    {
    image:'ares/app/assets/image/zhongliawan.png',
    name:'七番地(日式烧肉专门店)',
    stars:3.5,
    distance:'>4km',
    discount:'￥29.8',
    kind:'日本料理',
  },
  {
    image:'ares/app/assets/image/zhongmuwan.png',
    name:'七番地(日式烧肉专门店)',
    stars:3.5,
    distance:'>4km',
    discount:'￥233.2',
    kind:'日本料理',
  },
  {
    image:'ares/app/assets/image/zhongliawan.png',
    name:'七番地(日式烧肉专门店)',
    stars:3.5,
    distance:'>4km',
    discount:'￥233.2',
    kind:'日本料理',
  },
  {
    image:'ares/app/assets/image/zhongmuwan.png',
    name:'七番地(日式烧肉专门店)',
    stars:3.5,
    distance:'>4km',
    discount:'￥18.2',
    kind:'日本料理',
  },
]
const styles = StyleSheet.create({
  root: {
    backgroundColor: COMMON_STYLES.MAIN_BACKGROUND_COLOR,
    flex: 1,
  },
  text: {
    fontSize: 30,
    color: "#000",
  },
  head_img:{
    ...Platform.select({
      android:{
        height: (Platform.Version >= 21)?70:54,
        paddingTop:(Platform.Version >= 21)?0:0,
      },
      ios:{
        height: 64,
      }
    })
  },
  mid_view:{
    height:60,
    backgroundColor:'#fff',
    borderColor:'#DDDDDD',
    borderTopWidth:1,
    borderBottomWidth:1,
    //alignItems:'center',
  },
  tourism_view:{
    height:75,
    flexDirection:'row',
    backgroundColor:'#fff',
    borderColor:'#DDDDDD',
    borderTopWidth:1,
    alignItems:'center',
  },
  segment_text:{
    fontSize:17,
  },
  play_around:{
    fontSize:15,
    color:'#f29836',
    fontWeight:'bold'
  },
  fun_text:{
    fontSize:13,
    color:'#707070',
    marginTop:8,
  },
    contentViewStyle: {
    // 主轴方向
    flexDirection:'row',
    // 换行
    flexWrap:'wrap',
    //必须设置否则换行不起作用
    alignItems:'center',
  },
})


class Living extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedFood:mockFood,
      youLikeList: Mock.shouye.likeDetail,
    }
  }
/*resizeMode图片显示样式
　
  contain模式自适应宽高，给出高度值即可
  cover铺满容器，但是会做截取
  stretch铺满容器，拉伸
*/
  renderImg(){
    var imageViews=[];
    imageViews.push(
        <Image
            key={0}
            style={{flex:1,width:full_width}}
            source={require('ares/app/assets/image/banner01.png')}
            resizeMode='stretch'
        />
      ,
      <Image
          key={1}
          style={{flex:1,width:full_width}}
          source={require('ares/app/assets/image/banner02.png')}
          />,
      <Image
          key={2}
          style={{flex:1,width:full_width}}
          source={require('ares/app/assets/image/banner03.png')}
          resizeMode='stretch'
          />,
    )
    return imageViews;
  }
  renderText(){
    var textViews=[];
    textViews.push(

      <Text key={1} style={{fontSize:13,color:'#707070',marginLeft:10}}>
        年终大促，满100反300，数量有限，先到先得
      </Text>,
      <Text key={1} style={{fontSize:13,color:'#707070',marginLeft:10}}>
        年终大促，满100反300，数量有限，先到先得
      </Text>,
      <Text key={1} style={{fontSize:13,color:'#707070',marginLeft:10}}>
        年终大促，满100反300，数量有限，先到先得
      </Text>,
    )
    return textViews;
  }
/**
  周边精选界面
*/
  around_view() {
    const vertical_line = ART.Path();
    vertical_line.moveTo(1,1);
    vertical_line.lineTo(1,40);
    return(
      <View>
        <Swiper   height={200}
                  loop={true}
                  index={0}
                  autoplay={true}
                  width={full_width}
                  dot={
                        <View style={{backgroundColor:'#fff', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 0, marginBottom: 0,justifyContent:'center',alignItems:'center'}}>
                          <View style={{backgroundColor: '#000', width: 4, height: 4, borderRadius: 2}} />
                        </View>
                        }
                  activeDot={
                        <View style={{backgroundColor:'#000', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 0, marginBottom: 0,justifyContent:'center',alignItems:'center'}}>
                          <View style={{backgroundColor: '#fff', width: 4, height: 4, borderRadius: 2}} />
                       </View>
                        }
            >{this.renderImg()}</Swiper>
        {this.createFuncationButton()}
        <WhiteSpace size='md' />
        {this.createModuleImage()}
        <WhiteSpace size='md' />
        {this.createPopularRecommended()}
        <WhiteSpace size='md' />
        {this.createLeg()}
        <WhiteSpace size='md' />
      </View>
      )
  }

  createModuleImage(){
    return(
      <View style={{height:160,width:full_width,flexDirection:'row',backgroundColor:'white'}}>
        <TouchableOpacity style={{flex:1}} onPress={()=>this.props.navigator.push({id:'B2cMall' , params: {data: Mock.foods}})}>
        <View style={{flex:1,borderColor:'#dddddd',borderRightWidth:1}}>
          <View style={{flex:2,alignItems:'center',marginTop:20}}>
            <Text>美味零食大卖场</Text>
            <Text>精品促销</Text>
          </View>
          <View style={{flex:3,alignItems:'center',marginTop:-10}}>
            <Image source={require('ares/app/assets/image/squirrel.png')}/>
          </View>
        </View>
        </TouchableOpacity>
        <View style={{flex:2}}>
          <TouchableOpacity style={{flex:1}} onPress={()=>this.props.navigator.push({id:'B2cMall' , params: {data: Mock.muying}})}>
          <View style={{flex:1,flexDirection:'row',borderColor:'#dddddd',borderBottomWidth:1}}>
            <View style={{flex:2,marginTop:20,marginLeft:15}}>
              <Text>母婴精品大卖场</Text>
              <Text>母婴专场，限时抢购</Text>
            </View>
            <View style={{flex:1,marginTop:12}}>
              <Image source={require('ares/app/assets/image/milk_powder.png')}/>
            </View>
          </View>
          </TouchableOpacity>
          <View style={{flex:1,flexDirection:'row'}}>
            <TouchableOpacity style={{flex:1}} onPress={()=>this.props.navigator.push({id:'B2cMall' , params: {data: Mock.chuju}})}>
            <View style={{flex:1,flexDirection:'row',borderColor:'#dddddd',borderRightWidth:1}}>
              <View style={{flex:1,marginTop:5,marginLeft:8}}>
                <Text>新品购</Text>
                <Text>厨具专场</Text>
              </View>
              <View style={{flex:1,marginTop:15}}>
                <Image source={require('ares/app/assets/image/kettle2.png')}/>
              </View>
            </View>
            </TouchableOpacity>
            <TouchableOpacity style={{flex:1}} onPress={()=>this.props.navigator.push({id:'B2cMall' , params: {data: Mock.xihu}})}>
            <View style={{flex:1,flexDirection:'row',}}>
              <View style={{flex:1,marginTop:5,marginLeft:5}}>
                <Text>新品购</Text>
                <Text>洗护专场</Text>
              </View>
              <View style={{flex:1,marginTop:5}}>
                <Image source={require('ares/app/assets/image/body_wash.png')}/>
              </View>
            </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }


  createFuncationButton(){
    return(
        <View style={styles.mid_view}>
          <View style={{flexDirection:'row',flex:1,alignItems:'center'}}>
            <TouchableOpacity style={{flex:1}} onPress={()=>this.props.navigator.push({id:'B2cMall' , params: {data: Mock.foods}})}>
              <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Image source={require('ares/app/assets/image/lingshi.png')} style={{width:20,height:22,marginBottom:3}}/>
                <Text style={styles.fun_text}>零食</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{flex:1}} onPress={()=>this.props.navigator.push({id:'B2cMall' , params: {data: Mock.muying}})}>
              <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Image  source={require('ares/app/assets/image/muying.png')} style={{width:13,height:25,marginTop:-3}}/>
                <Text style={styles.fun_text}>母婴</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{flex:1}} onPress={()=>this.props.navigator.push({id:'B2cMall' , params: {data: Mock.baojian}})}>
              <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Image source={require('ares/app/assets/image/baojian.png')} style={{width:24,height:24,marginTop:-2}}/>
                <Text style={styles.fun_text}>保健</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{flex:1}} onPress={()=>this.props.navigator.push({id:'B2cMall' , params: {data: Mock.chuju}})}>
              <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Image source={require('ares/app/assets/image/chuju.png')} style={{width:16,height:22}}/>
                <Text style={styles.fun_text}>厨具</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{flex:1}} onPress={()=>this.props.navigator.push({id:'B2cMall' , params: {data: Mock.xihu}})}>
              <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Image source={require('ares/app/assets/image/xihu.png')} style={{width:16,height:26,marginTop:1}}/>
                <Text style={styles.fun_text}>洗护</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )
  }
/**
  热门推荐
*/
  createPopularImage(data,index){
    let imageWidth = (full_width-4*COMMON_EDGE_LEFT)/3
    return(
        <View style={{width:imageWidth + COMMON_EDGE_LEFT}}>
          <View style={{flex:1,width:(full_width-36)/3}}>
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
              <TouchableOpacity onPress={()=>this.props.navigator.push({id:'B2CGoodsDetails' , params: {data: data}})}>
                <Image resizeMode='contain' source={{uri: data.image}} style={{width:imageWidth,height:imageWidth*0.8,marginLeft:COMMON_EDGE_LEFT,justifyContent:'flex-end'}}>
                  <View style={{backgroundColor:'black',height:30,opacity:0.7}} />
                  <View style={{marginTop:-30,alignSelf:'center',justifyContent:'center',alignItems:'center'}}>
                  <Text style={{color:'white',fontSize:9,backgroundColor:'transparent'}}>{data.name}</Text>
                  <Text style={{color:'white',fontSize:11,backgroundColor:'transparent'}}>{data.price}</Text>
                  </View>
                </Image>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )
  }
  createPopularRecommended(){
    const h_line_1 = ART.Path();
    h_line_1.moveTo(10,1);
    h_line_1.lineTo(full_width,1);
    return(
        <View style={{backgroundColor:'white'}}>
          <View style={{height:40,flexDirection:'row',width:full_width,alignItems:'center'}}>
            <Text style={{fontSize:COMMON_FONT_SIZE,marginLeft:COMMON_EDGE_LEFT}}>热门推荐</Text>
          </View>
          <ART.Surface width={full_width} height={1}>
            <ART.Shape d={h_line_1} stroke="#dddddd" strokeWidth={1} />
          </ART.Surface>
          <View style={{marginTop:15,marginBottom:15}}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {Mock.shouye.choiceDetail.map((data,index)=>{
                return this.createPopularImage(data,index)
              })}
            </ScrollView>
          </View>
        </View>
      )
  }
/**
  精选美食
*/
createLeg(){
  const h_line_1 = ART.Path();
  h_line_1.moveTo(10,1);
  h_line_1.lineTo(full_width,1);

  let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.state.youLikeList);
  return(
    <View style={{backgroundColor:'white',borderTopWidth:1,borderColor:'#dddddd',borderBottomWidth:1}}>
      <View style={{height:40,justifyContent:'center'}}>
        <Text style={{fontSize:COMMON_FONT_SIZE,marginLeft:COMMON_EDGE_LEFT}}>精品推荐</Text>
      </View>
      <ART.Surface width={full_width} height={1}>
        <ART.Shape d={h_line_1} stroke="#dddddd" strokeWidth={1}/>
      </ART.Surface>
      <ListView
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
    <TouchableOpacity onPress={()=>this.props.navigator.push({id:'B2CGoodsDetails' , params: {data:rowData}})}>
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
/**
  createSelectedFoodRow(rowData,sectionId){
    let imageSize = (full_width - 3 * COMMON_EDGE_LEFT)/2
    return(
      <View style={{backgroundColor:'white',marginLeft:10,marginTop:10}}>
        <Image source={require('ares/app/assets/image/picture01.png')} style={{width:imageSize,height:imageSize*0.8}} />
        <View style={{borderWidth:1,borderColor:'#dddddd'}}>
          <View style={{margin:5}}>
            <Text style={{fontSize:COMMON_FONT_SIZE,color:'gray'}}>{rowData.name}</Text>
            <View style={{flexDirection:'row',marginTop:5}}>
              <Text style={{color:'gray',fontSize:SMALL_FONT_SIZE,position: "absolute",right: 10}}>{rowData.distance}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <Text style={{color:'#f5787c',fontSize:SMALL_FONT_SIZE,textAlign:'center'}}>{rowData.discount}</Text>
              <Text style={{fontSize:SMALL_FONT_SIZE,color:'gray',marginLeft:5}}>{rowData.kind}</Text>
            </View>
          </View>
        </View>
      </View>
      )
  }
/**
  createSelectedFood(){
    const h_line_1 = ART.Path();
    h_line_1.moveTo(10,1);
    h_line_1.lineTo(full_width,1);
    let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.state.selectedFood);
    return(
      <View style={{backgroundColor:'white'}}>
        <View style={{height:40,flexDirection:'row',width:full_width,alignItems:'center'}}>
          <Text style={{fontSize:COMMON_FONT_SIZE,marginLeft:COMMON_EDGE_LEFT}}>精选美食</Text>
          <Icon style={{position: "absolute",right: 15,top: 10,bottom: 0,}} name="angle-right" size={20} color='gray'/>
        </View>
        <ART.Surface width={full_width} height={1}>
          <ART.Shape d={h_line_1} stroke="#dddddd" strokeWidth={1} />
        </ART.Surface>
        <ListView
          dataSource={dataSource}
          renderRow={this.createSelectedFoodRow.bind(this)}
          contentContainerStyle={styles.contentViewStyle}
        />
      </View>
      )
  }
*/
/**
  猜你喜欢
*/
/**
  createMaybeYouLikeRow(rowData,sectionId){
    const h_line_1 = ART.Path();
    h_line_1.moveTo(10,1);
    h_line_1.lineTo(full_width,1);
    return(
      <View>
        <View style={{height:100,flexDirection:'row'}}>
          <Image source={require('ares/app/assets/image/picture01.png')} style={{width:70,height:70,marginLeft:COMMON_EDGE_LEFT,marginTop:15}} />
          <View style={{marginLeft:COMMON_EDGE_LEFT,marginTop:15,height:70}}>
            <View style={{flexDirection:'row',width:full_width-90,flex:1}}>
              <Text style={{fontSize:15}}>{rowData.name}</Text>
              <Text style={{fontSize:SMALL_FONT_SIZE,color:'gray',position: "absolute",right: 15}}>{rowData.distance}</Text>
            </View>
            <View style={{flexDirection:'row',flex:1,alignItems:'center'}}>
              <Text style={{fontSize:SMALL_FONT_SIZE,color:'gray'}}>[{rowData.location}]{rowData.active}</Text>
            </View>
            <View style={{flex:1,flexDirection:'row',alignItems:'flex-end'}}>
              <Text style={{color:'#f5787c',fontSize:15}}>{rowData.price}</Text>
              <Text style={{fontSize:SMALL_FONT_SIZE,color:'gray',position: "absolute",right: 15,top:8}}>{rowData.sell}</Text>
            </View>
          </View>
        </View>
        <ART.Surface width={full_width} height={1}>
          <ART.Shape d={h_line_1} stroke="#dddddd" strokeWidth={1} />
        </ART.Surface>
      </View>
      )
  }
  createMaybeYouLike(){
    const h_line_1 = ART.Path();
    h_line_1.moveTo(10,1);
    h_line_1.lineTo(full_width,1);
    let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.state.youLikeList);
    return(
      <View style={{backgroundColor:'white'}}>
        <View style={{height:40,flexDirection:'row',width:full_width,alignItems:'center'}}>
          <Text style={{fontSize:COMMON_FONT_SIZE,marginLeft:COMMON_EDGE_LEFT}}>猜你喜欢</Text>
        </View>
        <ART.Surface width={full_width} height={1}>
          <ART.Shape d={h_line_1} stroke="#dddddd" strokeWidth={1} />
        </ART.Surface>
        <ListView
          dataSource={dataSource}
          renderRow={this.createMaybeYouLikeRow.bind(this)}
          contentContainerStyle={styles.contentViewStyle}
        />
      </View>
      )
  }
  */
  
  render() {
    const horizontal_line_1 = ART.Path();
    horizontal_line_1.moveTo(10,1);
    horizontal_line_1.lineTo(full_width/2 - 10,1);
    return(
      <View style={styles.root}>
        <Image source={require('ares/app/assets/image/shenghuodaohangtiao.png')} style={[styles.head_img,{width:full_width}]}>
          <NavBar
          backgroundColor={'transparent'}
          leftContent={
            <TouchableOpacity onPress={() => PushLogin.push_login_destination("MyCollection",this.props.navigator,{my_center:this})}>
             <Image source={require('ares/app/assets/image/shoucang.png')} style={{width:18,height:18}}/>
            </TouchableOpacity>
          }
          titleContent={<Text style={{color: "#fff", fontSize: 20}}>周边生活</Text>}
          rightContent={
            <TouchableOpacity onPress={() => PushLogin.push_login_destination("ShopCart",this.props.navigator,{my_center:this})}>
              <Image source={require('ares/app/assets/image/gouwuche.png')} style={{width:19,height:20}}/>
             </TouchableOpacity>
           }
          />
        </Image>
        <ScrollView showsVerticalScrollIndicator={false}>
          {this.around_view()}
        </ScrollView>
      </View>
    )
  }
}
export default Living
