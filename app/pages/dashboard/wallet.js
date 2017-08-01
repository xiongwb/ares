import React from 'react'

import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  NativeModules,
  NativeEventEmitter,
  Platform,
  ART,
  Dimensions,
  AsyncStorage,
  Navigator,
} from 'react-native'
import {
  NavBar,
  PushLogin,
  StringUtils,
  DevelopTip,
} from 'AresComponent'
import {
  COMMON_STYLES,
  STORAGE_KEYS,
  EVENT_EMITTER_CONST,
} from 'AresConstant'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import Icon from 'react-native-vector-icons/FontAwesome'
import WhiteSpace from 'antd-mobile/lib/white-space'
import AresAPI from 'AresAPI'
import ParallaxScrollView from 'react-native-parallax-scroll-view';


var ScanCodeManager = NativeModules.ScanCodeManager;
var full_width = Dimensions.get('window').width;
const myNativeEvt = new NativeEventEmitter(ScanCodeManager);  //创建自定义事件接口

const styles = StyleSheet.create({
  root: {
    backgroundColor: COMMON_STYLES.MAIN_BACKGROUND_COLOR,
    flex: 1,
  },
  content: {
    flex: 1,
  },
  icon_opts: {
    backgroundColor: "transparent",
    flexDirection: "row",
    height:120,
    alignItems:'center',
  },
  icon_opt: {
    flex: 1,
    height:73,
    width:65,
    justifyContent: "center",
    alignItems: "center",
  },
  icon_text: {
    color: "#fff",
    fontSize:14,
    marginTop:10,
  },
  text: {
    fontSize: 30,
    color: "#000",
    textAlign: "center",
  },
  list_root: {
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    marginLeft:14,
  },
  fun_text: {
    fontSize:11,
    marginTop:10,
  },
  head_img:{
    height:180,
    paddingTop:(Platform.Version >= 21)?0:0,
  },
  fun_view_1:{
    height:70,
    borderTopWidth:1,
    backgroundColor:'#ffffff',
    borderColor:'#DDDDDD',
  },
  fun_view_2:{
    height:70,
    borderBottomWidth:1,
    backgroundColor:'#ffffff',
    borderColor:'#DDDDDD',
  },
  type2_type3_view:{
    height:66,
    backgroundColor:'#ffffff',
  },
  assets_view:{
    height:42,
    borderBottomWidth:1,
    backgroundColor:'#ffffff',
    borderColor:'#DDDDDD',
  }

});

/**
*  首页的钱包tab内的内容组件
*  属于首页组件的子组件，所以不要继承 BasePage
*  by fushang318
*/

var once_api = true

class Wallet extends React.Component {
constructor(props) {
    super(props)
    this.state={
      amt:'',
      amt2:'',
      amt3:'',
    }

  }


on_Press(destination){
    AsyncStorage.getItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
      let hash = JSON.parse(value)
      if(!!hash){
        //登录状态
        if (!!hash && !!hash.acctNo2 && !!hash.acctNo3) {
           this.props.navigator.push({id:destination, params:{bal:this}})
          }else{
                this.props.navigator.push({id:"BankCard", params:{}})
              }
             }
         else{
                this.props.navigator.push({id: "Login", params: {}})
              }
           })
  }
  request_api(){
      AsyncStorage.getItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
      let hash = JSON.parse(value)
      if (!!hash) {
        if (!!hash && !!hash.custNo) {
           AresAPI.FindAcct.findacctAcctAmt({
            custno:hash.custNo
           }).done((res_json,res) => {
             if(res_json.retCode === 1){
                this.setState({amt:res_json.amt})
                this.setState({amt2:res_json.amt2})
                this.setState({amt3:res_json.amt3})
             }else{

             }
          })
        }
      }else{this.setState({amt:0,amt2:0,amt3:0})}
    })
  }
  componentWillMount() {

    this.listener = myNativeEvt.addListener('scanCodeController', this.iseCallback.bind(this))
    this.listener = RCTDeviceEventEmitter.addListener(EVENT_EMITTER_CONST.NEEDWALLETREQUEST,(value)=>{
    // 接受到通知后的处理
//    console.log("需要调用接口")
    this.request_api();
    });

    this.request_api()
  }

  componentWillUnmount() {
    this.listener && this.listener.remove()
    this.listener = null
  }

  iseCallback(data){
    this.props.navigator.push({id: "ScanFinish", params: {message:data}})
  }

  startScan() {
    AsyncStorage.getItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
    let hash = JSON.parse(value)
    if (!!hash) {
      AresAPI.Card.cardFindBind({custNo:hash.custNo}).done((res_json, res)=>{
        if(res_json.retCode === 1){
          if (Platform.OS === 'android') {
            this.props.navigator.push({id: "QRCodeScan", config_scene_type: Navigator.SceneConfigs.FadeAndroid})
          }
          if (Platform.OS === 'ios') {
        /*var message = {
              brano:'1',
              custno:'930000001200000242',
              time:'2014',
              way:'pay',
              count:'100',
              randomcode:'skd31b',
            }
            this.props.navigator.push({id: "ScanFinish", params: {message:message}})
          */
           ScanCodeManager.scanStart('调用摄像头');
          }
    }else{
      Alert.alert('错误提示', '对不起，您还没有绑定银行卡', [{ text: '确定'}])
    }
  })
}else {
  this.props.navigator.push({id: "Login", params: {}})
}
  })
  }

  on_sub(loc){
      AsyncStorage.getItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
      let hash = JSON.parse(value)
      if (!!hash) {
        AresAPI.Card.cardFindBind({custNo:hash.custNo}).done((res_json, res)=>{
          if(res_json.retCode === 1){
             this.props.navigator.push({ id: loc })
      }else{
        Alert.alert('错误提示', '对不起，您还没有绑定银行卡', [{ text: '确定'}])
      }
    })
  }else {
    this.props.navigator.push({id: "Login", params: {}})
  }
    })
  }

  moveTopag(loc){
    AsyncStorage.getItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
    let hash = JSON.parse(value)
    if (!!hash) {
    if(!!hash&&!!hash.custNo){
      switch (loc) {
        case 1:this.props.navigator.push({id: "TelephoneRecharge", params: {}})
          break;
        case 2:this.props.navigator.push({ id: "FluxRecharge", params: {}})
          break;
        case 3:this.props.navigator.push({id: "WaterCostOrg", params: {}})
          break;
        case 4:this.props.navigator.push({id: "ElectricityCostOrg", params: {}})
          break;
        case 5:this.props.navigator.push({ id: "GasCostOrg", params: {} })
          break;
        case 6:this.props.navigator.push({id: "CATVCostOrg", params: {}})
          break;
        case 7:this.props.navigator.push({id: "TelephoneCostOrg", params: {}})
          break;
        case 8:this.props.navigator.push({id: "MoreBusiness", params: {}})
          break;
      }
    }else {
      Alert.alert('提示', "您还没有绑定银行卡", [{ text: '确定'}])
    }
  }else {
    this.props.navigator.push({id: "Login", params: {}})
  }
  })
}
  render() {


    const { onScroll = () => {} } = this.props;

    const path = ART.Path();
    path.moveTo(1,1); //将起始点移动到(1,1) 默认(0,0)
    path.lineTo(1,40); //连线到目标点(300,1)

    const line = ART.Path();
    path.moveTo(1,1); //将起始点移动到(1,1) 默认(0,0)
    path.lineTo(full_width,1); //连线到目标点(300,1)

    let total_assets = StringUtils.moneyFormatData2Money(this.state.amt)
    let second_kind_assets = StringUtils.moneyFormatData2Money(this.state.amt2)
    let third_kind_assets = StringUtils.moneyFormatData2Money(this.state.amt3)

    return(
      <View style={styles.root}>
        <View style={styles.content}>
          <Image source={require('ares/app/assets/image/headBackground.png')} style={[styles.head_img,{width:full_width}]}>
            <NavBar
            backgroundColor={'transparent'}
            leftContent={
              <TouchableOpacity onPress={() => PushLogin.push_login_destination("Bill",this.props.navigator,{my_center:this})}>
                <Image source={require('ares/app/assets/image/zhangdan.png')} style={{width:20,height:20}}/>
              </TouchableOpacity>
            }
            titleContent={<Text style={{color: "#fff", fontSize: 20}}>农商通</Text>}
            rightContent={
              <TouchableOpacity onPress={() => PushLogin.push_login_destination("Message",this.props.navigator,{my_center:this})}>
                <Image source={require('ares/app/assets/image/bell.png')} style={{width:25,height:25}}/>
              </TouchableOpacity>}
            />
            <View style={styles.icon_opts}>
            <View style={styles.icon_opt}>
              <TouchableOpacity onPress={() => this.startScan()}>
                <Image source={require('ares/app/assets/image/saoyisao.png')} style={{height:63,width:63}} />
                <View style={{alignItems: "center"}}>
                  <Text style={styles.icon_text}>扫一扫</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.icon_opt}>
              <TouchableOpacity onPress={() => this.on_sub('CollectionAndPayment')}>
                <Image source={require('ares/app/assets/image/shoufukuan.png')} style={{height:63,width:63}} />
                <View style={{alignItems: "center"}}>
                  <Text style={styles.icon_text}>收付款</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.icon_opt}>
              <TouchableOpacity onPress={() => DevelopTip.alert()}>
                <Image source={require('ares/app/assets/image/yunshanfu.png')} style={{height:63,width:63}} />
                <View style={{alignItems: "center"}}>
                  <Text style={styles.icon_text}>云闪付</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.icon_opt}>
              <TouchableOpacity onPress={() => this.on_sub('Transfer')}>
                <Image source={require('ares/app/assets/image/zhuanzhang.png')} style={{height:63,width:63}} />
                <View style={{alignItems: "center"}}>
                  <Text style={styles.icon_text}>转账</Text>
                </View>
              </TouchableOpacity>
            </View>
            </View>
          </Image>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <View style={styles.type2_type3_view}>
                <View style={{flex:1,flexDirection:'row'}} >
                  <View style={{flex:1,flexDirection:'row',height:40,marginTop:5}}>
                    <Image source={require('ares/app/assets/image/erlei.png')} style={{width:24,height:24,marginTop:11,marginLeft:14}} />
                    <View style={{flex:1}} >
                      <TouchableOpacity onPress={() => this.on_Press("Type2")}>
                        <Text style={{fontSize:13,marginLeft:14,marginTop:11}}>账户余额</Text>
                        <Text style={{color:'#BDBDBD',fontSize:13,marginTop:6,marginLeft:14}}>{second_kind_assets}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{alignSelf:'center'}}>
                    <ART.Surface width={1} height={40}>
                      <ART.Shape d={path} stroke="#dddddd" strokeWidth={1} />
                    </ART.Surface>
                  </View>
                  <View style={{flex:1,flexDirection:'row',height:40,marginTop:5,marginLeft:14}}>
                    <Image source={require('ares/app/assets/image/sanlei.png')} style={{width:24,height:24,marginTop:11}} />
                    <View style={{flex:1}}>
                      <TouchableOpacity onPress={() => this.on_Press("Type3")}>
                        <Text style={{fontSize:13,marginLeft:14,marginTop:11}}>账户余额</Text>
                        <Text style={{color:'#BDBDBD',fontSize:13,marginTop:6,marginLeft:14}}>{third_kind_assets}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
              <ART.Surface width={full_width} height={1}>
                <ART.Shape d={path} stroke="#dddddd" strokeWidth={1} />
              </ART.Surface>
              <View onPress={() => this.on_Press("Asset")}>
                <View style={styles.assets_view}>
                  <View style={styles.list_root}>
                    <Text style={{fontSize:13,margin:5,color:'#BDBDBD'}}>资产</Text>
                    <Text style={{flex:1,fontSize:24}}>{total_assets}</Text>
                  </View>
                </View>
              </View>
              <WhiteSpace size='md' />
              <View style={styles.fun_view_1}>
                <View style={{flex:1,flexDirection:'row'}}>
                  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity onPress={() => this.moveTopag(1)}>
                      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Image source={require('ares/app/assets/image/huafei.png')} resizeMode='stretch' style={{width:14,height:20}}/>
                        <Text style={styles.fun_text}>话费充值</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <TouchableOpacity onPress={() => this.moveTopag(2)}>
                          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                              <Image source={require('ares/app/assets/image/flow.png')} resizeMode='stretch' style={{ width: 14, height: 20 }} />
                              <Text style={styles.fun_text}>流量充值</Text>
                          </View>
                      </TouchableOpacity>
                  </View>
                  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity onPress={() => this.moveTopag(3)}>
                      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Image source={require('ares/app/assets/image/water1.png')} resizeMode='stretch' style={{width:19,height:22,marginTop:-2}}/>
                        <Text style={styles.fun_text}>水费</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity onPress={() => this.moveTopag(4)}>
                      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Image source={require('ares/app/assets/image/power_rate1.png')} resizeMode='stretch' style={{width:18,height:22,marginTop:-2}}/>
                        <Text style={styles.fun_text}>电费</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <ART.Surface width={full_width} height={1}>
                <ART.Shape d={path} stroke="#dddddd" strokeWidth={1} />
              </ART.Surface>
              <View style={styles.fun_view_2}>
                <View style={{flex:1,flexDirection:'row'}}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this.moveTopag(5)}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('ares/app/assets/image/gas_bill1.png')} resizeMode='stretch' style={{ width: 20, height: 22, marginTop:-2 }} />
                                <Text style={styles.fun_text}>燃气费</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity onPress={() => this.moveTopag(6)}>
                      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Image source={require('ares/app/assets/image/catv1.png')} resizeMode='stretch' style={{width:22,height:19,marginTop:1}}/>
                        <Text style={styles.fun_text}>有线电视</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity onPress={() => this.moveTopag(7)}>
                      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Image source={require('ares/app/assets/image/phone_braodband.png')} resizeMode='stretch' style={{width:20,height:20}}/>
                        <Text style={styles.fun_text}>固话宽带</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity  onPress={() => this.moveTopag(8) }>
                      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Image source={require('ares/app/assets/image/all.png')} resizeMode='stretch' style={{width:20,height:20}}/>
                        <Text style={styles.fun_text}>更多</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <WhiteSpace size='md' />
              <View>
                <Image source={require('ares/app/assets/image/guanggao.png')} style={[{width:full_width}]} resizeMode='stretch'/>
              </View>
              <WhiteSpace size='md' />
              <View>
                <Image source={require('ares/app/assets/image/yizhanshi.png')} style={[{width:full_width}]} resizeMode='stretch'/>
              </View>
              <WhiteSpace size='md' />
              <View>
                <Image source={require('ares/app/assets/image/guanggao2.png')} style={[{width:full_width}]} resizeMode='stretch'/>
              </View>
            </View>
            </ScrollView>
        </View>
      </View>
    )
  }
}

export default Wallet
