import React from 'react'

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ART,
  Alert,
  AsyncStorage,
  ScrollView,
  Platform,
} from 'react-native'
import {
  PushLogin,
  StringUtils,
} from 'AresComponent'
import {
  EVENT_EMITTER_CONST,
  STORAGE_KEYS,
  COMMON_STYLES,
} from 'AresConstant'
import AresAPI from 'AresAPI'
const {Surface, Shape, Path} = ART;
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import Icon from 'react-native-vector-icons/FontAwesome'
import List from 'antd-mobile/lib/list'
import WhiteSpace from 'antd-mobile/lib/white-space'
import Button from 'antd-mobile/lib/button'

var full_width = Dimensions.get('window').width
/*viewWidth指的是顶部文字view的宽度
  宽度=屏幕宽度-左边距-头像宽度-间距-间距-箭头宽度-右边距
 */
let viewWidth = full_width-15-75-10-10-20-15

let common_color = '#8f8f8f'
let common_fontsize = 13

var full_width = Dimensions.get('window').width
var full_height = Dimensions.get('window').height


const styles = StyleSheet.create({
  root: {
    backgroundColor: COMMON_STYLES.MAIN_BACKGROUND_COLOR,
    flex:1,
    //marginTop:(Platform.Version >= 21)? 30:0,
//    flex: 1
  },
  head_view: {
    height:75,
    marginLeft:10,
    backgroundColor:'transparent'
  },
  line:{
    position: "absolute",
    right: 50,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  noti_image: {
    position: "absolute",
    right: 20,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  card_view:{
    margin:15,
    backgroundColor:'#dae2e6',
    borderRadius:8,
    height:110,
  },
  card_arrow:{
    position: "absolute",
    right: 5,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  my_view:{
    flex:1,
    flexDirection:'row',
    marginLeft:15,
    alignItems:'center',
  },
  my_view_text:{
    color:common_color,
    fontSize:common_fontsize,
    marginTop:10,
  },
  my_view_text_2:{
    color:common_color,
    fontSize:common_fontsize,
    marginLeft:10,
  }
});

class MyCenter extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      is_bankcard : false,
      cardno:'',
      welcome_words : '您好，请您登录',
    }
  }
  request_api() {
    AsyncStorage.getItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
      let hash = JSON.parse(value)
      if (!!hash) {
        if (!!hash && !!hash.tokenModel) {
          AresAPI.Person.getPersonInfoPersonInfo({custno:hash.custNo}).done((res_json, res) => {
                    if(res_json.retCode == 1){
                      this.setState({welcome_words:"hi" + " " + res_json.custName})
                    }else{
                      Alert.alert('错误提示', res_json.retMsg, [{ text: '确定'}])
                    }
                  })
        }
        if(!!hash && !!hash.custNo){
          /*
          API.card.card_find_bind({custNo:hash.custNo}).done((res_data_json, res)=>{
            if(res_data_json.retCode === 1){
              //登录状态下请求成功  显示银行卡
              this.setState({is_bankcard:true})
              let bankcard = StringUtils.bankCardNumberData2Human(res_data_json.cardNo)
              this.setState({cardno:bankcard})
            }else{
            }
          })
          */
        }
      }else{
        //未登录状态下  显示添加银行卡
        this.setState({is_bankcard:false})
        this.setState({welcome_words:"您好，请您登录"})
      }
    })
  }
  componentDidMount(){
  this.listener = RCTDeviceEventEmitter.addListener(EVENT_EMITTER_CONST.DIDLOGINSUCCESS,(value)=>{
    // 接受到通知后的处理
//    console.log("我的已经登录成功")
    this.request_api();
  });
  this.listener = RCTDeviceEventEmitter.addListener(EVENT_EMITTER_CONST.DIDLOGOUTSUCCESS,(value)=>{
    // 接受到通知后的处理
   // console.log("我的已经退出成功")
    this.request_api();
  });

  }

  componentWillUnmount(){
    // 移除 一定要写
    this.listener.remove();
  }

  componentWillMount(){
    this.request_api();
  }

  render() {
    const vertical_line = ART.Path();
    vertical_line.moveTo(1,1);
    vertical_line.lineTo(1,80);

    const vertical_line_2 = ART.Path();
    vertical_line_2.moveTo(1,1);
    vertical_line_2.lineTo(1,55);

    const vertical_line_3 = ART.Path();
    vertical_line_3.moveTo(1,1);
    vertical_line_3.lineTo(1,50);

    const horizontal_line = ART.Path();
    horizontal_line.moveTo(1,1);
    horizontal_line.lineTo(full_width,1);

    const horizontal_line_2 = ART.Path();
    horizontal_line_2.moveTo(1,1);
    horizontal_line_2.lineTo(full_width,1);

    return(
      <View style={styles.root}>
        <TouchableOpacity onPress={() => PushLogin.push_login_destination("PersonalNformation",this.props.navigator,{my_center:this})}>
          <Image source={require('ares/app/assets/image/mycenter_head.png')} style={[{width:full_width,height:180}]}>
            <View style={{height:180,justifyContent:'center'}}>
              <View style={{marginLeft:15,marginRight:15,flexDirection:'row',alignItems:'center'}}>
                <View>
                    <Image source={require('ares/app/assets/image/head.png')} style={{width:75,height:75}}/>
                </View>
                <View style={[styles.head_view,{width:viewWidth}]}>
                  <Text style={{fontSize:15,color:'white',marginTop:15}}>{this.state.welcome_words}</Text>
                  <Text style={{fontSize:common_fontsize,color:'white',marginTop:10}}>勤奋是积累财富的唯一方式</Text>
                </View>
                <View>
                  <Image source={require('ares/app/assets/image/jiantou.png')} style={{width:11,height:17,marginLeft:10}}/>
                </View>
              </View>
            </View>
          </Image>
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false}>
          <WhiteSpace size='md' />
          <View style={{height:80,backgroundColor:'#fff',flexDirection:'row',alignItems:'center'}}>
            <View style={{flex:1,alignItems:'center'}}>
              <TouchableOpacity onPress={() => PushLogin.push_login_destination("Bill",this.props.navigator,{my_center:this})}>
                <Image source={require('ares/app/assets/image/my_zhangdan.png')} style={{width:21,height:23,alignSelf:'center'}}/>
                <Text style={styles.my_view_text}>我的账单</Text>
              </TouchableOpacity>
            </View>
            <ART.Surface width={2} height={80}>
              <ART.Shape d={vertical_line} stroke={COMMON_STYLES.MAIN_BACKGROUND_COLOR} strokeWidth={1} />
            </ART.Surface>
            <View style={{flex:1,alignItems:'center'}}>
              <TouchableOpacity onPress={() => PushLogin.push_login_destination("MyOrder",this.props.navigator,{my_center:this})}>
                <Image source={require('ares/app/assets/image/dingdan.png')} style={{width:23,height:25,alignSelf:'center'}}/>
                <Text style={styles.my_view_text}>我的订单</Text>
              </TouchableOpacity>
            </View>
            <ART.Surface width={2} height={80}>
              <ART.Shape d={vertical_line} stroke={COMMON_STYLES.MAIN_BACKGROUND_COLOR} strokeWidth={1} />
            </ART.Surface>
            <View style={{flex:1,alignItems:'center'}}>
              <TouchableOpacity onPress={() => PushLogin.push_login_destination("MyEarnings",this.props.navigator,{my_center:this})}>
                <Image source={require('ares/app/assets/image/shouyi.png')} style={{width:21,height:23,alignSelf:'center'}}/>
                <Text style={styles.my_view_text}>我的收益</Text>
              </TouchableOpacity>
            </View>
            <ART.Surface width={2} height={80}>
              <ART.Shape d={vertical_line} stroke={COMMON_STYLES.MAIN_BACKGROUND_COLOR} strokeWidth={1} />
            </ART.Surface>
            <View style={{flex:1,alignItems:'center'}}>
              <TouchableOpacity onPress={() => PushLogin.push_login_destination("Setting",this.props.navigator,{my_center:this})}>
                <Image source={require('ares/app/assets/image/shezhi.png')} style={{width:24,height:24,alignSelf:'center'}}/>
                <Text style={styles.my_view_text}>我的设置</Text>
              </TouchableOpacity>
            </View>
          </View>
          <WhiteSpace size='md' />
          <View style={{height:110,backgroundColor:'#fff'}}>
            <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
              <View style={{flex:1}}>
                <TouchableOpacity style={{flex:1}} onPress={() => PushLogin.push_login_destination("BankCard",this.props.navigator,{my_center:this})}>
                  <View style={styles.my_view}>
                    <Image source={require('ares/app/assets/image/yinhangka.png')} style={{width:29,height:22}}/>
                    <Text style={[styles.my_view_text_2,{marginTop:5}]}>我的银行卡</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <ART.Surface width={2} height={55}>
                <ART.Shape d={vertical_line_2} stroke={COMMON_STYLES.MAIN_BACKGROUND_COLOR} strokeWidth={1} />
              </ART.Surface>
              <View style={{flex:1}}>
                <TouchableOpacity style={{flex:1}} onPress={() => PushLogin.push_login_destination("MyCoupon",this.props.navigator,{my_center:this})}>
                  <View style={styles.my_view}>
                    <Image source={require('ares/app/assets/image/youhuiquan.png')} style={{width:26,height:18}}/>
                    <Text style={[styles.my_view_text_2,{marginTop:2}]}>我的优惠劵</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View>
            <ART.Surface width={full_width} height={2}>
              <ART.Shape d={horizontal_line} stroke={COMMON_STYLES.MAIN_BACKGROUND_COLOR} strokeWidth={1} />
            </ART.Surface>
            </View>
            <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
              <View style={{flex:1}}>
                <TouchableOpacity style={{flex:1}} onPress={() => PushLogin.push_login_destination("MyIntegral",this.props.navigator,{my_center:this})}>
                  <View style={styles.my_view}>
                    <Image source={require('ares/app/assets/image/jifen.png')} style={{width:27,height:26}}/>
                    <Text style={[styles.my_view_text_2,{marginTop:6,marginLeft:12}]}>我的积分栏</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <ART.Surface width={2} height={55}>
                <ART.Shape d={vertical_line_2} stroke={COMMON_STYLES.MAIN_BACKGROUND_COLOR} strokeWidth={1} />
              </ART.Surface>
              <View style={{flex:1}}>
                <TouchableOpacity style={{flex:1}} onPress={() => PushLogin.push_login_destination("Message",this.props.navigator,{my_center:this})}>
                  <View style={styles.my_view}>
                    <Image source={require('ares/app/assets/image/gonggao.png')} style={{width:25,height:20}}/>
                    <Text style={[styles.my_view_text_2,{marginTop:3,marginLeft:11}]}>我的通知</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <WhiteSpace size='md' />
          <View style={{height:100,backgroundColor:'#fff'}}>
            <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
              <TouchableOpacity style={{flex:1}} onPress={()=> {this.props.navigator.push({id:"SmartService",param:{}})}}>
                <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                  <View style={{position: "absolute",left: 0,top: 0,bottom: 0}}>
                    <ART.Surface width={3} height={50}>
                      <ART.Shape d={vertical_line} stroke='#ff9933' strokeWidth={3} />
                    </ART.Surface>
                  </View>
                  <View style={{flex:1,marginLeft:13,width:full_width - 13}}>
                    <Text style={{fontSize:common_fontsize,color:common_color}}>疑难解答专区</Text>
                    <Text style={{fontSize:11,color:'#d9d9d9',marginTop:5}}>当您在购物，解决理财遇到问题或者账号异常等问题</Text>
                    <Image source={require('ares/app/assets/image/shuangjiantou.png')} style={{width:11,height:11,position: "absolute",right: 15,top: 10,bottom: 0}}/>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <ART.Surface width={full_width} height={2}>
              <ART.Shape d={horizontal_line} stroke={COMMON_STYLES.MAIN_BACKGROUND_COLOR} strokeWidth={1} />
            </ART.Surface>
            <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
              <TouchableOpacity style={{flex:1}} onPress={()=> {this.props.navigator.push({id:"CompanyProfile",param:{}})}}>
                <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                  <View style={{position: "absolute",left: 0,top: 0,bottom: 0}}>
                    <ART.Surface width={3} height={50}>
                      <ART.Shape d={vertical_line} stroke='#00cccc' strokeWidth={3} />
                    </ART.Surface>
                  </View>
                  <View style={{flex:1,marginLeft:13,width:full_width - 13}}>
                    <Text style={{fontSize:common_fontsize,color:common_color}}>关于乾元大通</Text>
                    <Text style={{fontSize:11,color:'#d9d9d9',marginTop:5}}>乾元大通倾心为您服务</Text>
                    <Image source={require('ares/app/assets/image/shuangjiantou.png')} style={{width:11,height:11,position: "absolute",right: 15,top: 10,bottom: 0}}/>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }

}

export default MyCenter
