import React from 'react'
import AresAPI from 'AresAPI'
import {
  Alert,
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  ART,
  ListView,
  ScrollView,
  Button,
  TouchableWithoutFeedback
} from 'react-native'
import {
  Navbar,
  BackNavBar,
  BasePage,
  AresTextInput,
  DialogPicker,
} from 'AresComponent'

import {
  VERIFY,
  STORAGE_KEYS,
  COMMON_STYLES,
} from 'AresConstant'
// @陈耀霆，订单填写页面
import Icon from 'react-native-vector-icons/FontAwesome'
import Picker from 'react-native-picker';
import area  from '../constants/area.json'
const styles = StyleSheet.create({
  root: {
    backgroundColor: COMMON_STYLES.MAIN_BACKGROUND_COLOR,
    flex: 1,

  },
  text: {
   fontSize:14,
   color:"#101010",
   marginLeft: 6

  }

});
var full_width = Dimensions.get('window').width
var full_height = Dimensions.get('window').height
const h_line_1 = ART.Path();
    h_line_1.moveTo(16,1);
    h_line_1.lineTo(full_width-16,1);


function ListBox(props) {
  return (
    <View>
      <ART.Surface width={full_width} height={1}>
        <ART.Shape d={h_line_1} stroke='#e5e5e5' strokeWidth={1} />
      </ART.Surface>
      <TouchableOpacity style={{justifyContent:'space-between',alignItems: 'center',height:46,flexDirection:'row',backgroundColor:'#ffffff'}} onPress={props.onPress}>
        <View style={{flexDirection:'row',alignItems: 'center'}}>
          <Text style={{fontSize:16,color:'#101010',marginHorizontal: 16}}>{props.title}</Text>
          <Image style={{marginRight:6}} source={props.source} />
          <Text style={{fontSize:15,color:props.color}}>{props.text}</Text>
        </View>
          <Icon style={{marginRight:20}}  name="angle-right" size={22} color={'#bdbdbd'} />
      </TouchableOpacity>
    </View>
  );
}

function Label(props) {
  return (
      <TouchableOpacity onPress={props.onPress} style={{borderColor:props.color.borderColor,backgroundColor:props.color.backgroundColor,borderWidth:1,marginTop:1,justifyContent:'center',borderRadius:4,alignItems: 'center',marginLeft:16,width:31, height:16}} >
        <Text style={{marginBottom:1,color:props.color.fontcolor,fontSize:12}}>{props.text}</Text>
      </TouchableOpacity>
  );
}
class FillOrder extends BasePage {
     constructor () {
    super();
    this.state = {
          color:"#7f7f7f",
        sava:0,
        arraycolor:[],
        region:'请选择所在地区',
        isShow:0,
        name:'',
        phone:'',
        location:'',
        custNo:'',
  }
 }
 //关闭收货地址选择器(picker)
 //isShow:0代表的关闭picker需要和dialog.close()一起使用
 //isShow:1代表的显示picker需要和dialog.show()一起使用
  dialog_close(){
    this.setState({isShow:0})
    this.refs.dialog.close();
  }
  //确认是否有数据，如果有接受选中的收货地址后关闭选择器(picker)，如果没有就是于取消选择。
  picker_data(data){
    if(data){
      this.setState({isShow:0,color:"#101010",region:data})
      this.refs.dialog.close();
    }else{
      this.setState({isShow:0})
      this.refs.dialog.close();
    }
  }
  //显示收货地址后选择器(picker)
  on_Click(){
      this.refs.dialog.show();
      this.setState({isShow:1})
    }
   //地址数据的格式转换
   _createAreaData() {
        let data = [];
        let len = area.length;
        for(let i=0;i<len;i++){
            let city = [];
            for(let j=0,cityLen=area[i]['city'].length;j<cityLen;j++){
                let _city = {};

                _city[area[i]['city'][j]['name']] = area[i]['city'][j]['area'];

                city.push(_city);
            }

            let _data = {};
            _data[area[i]['name']] = city;
            data.push(_data);
        }
            return data;
    }

 componentWillMount(){
   AsyncStorage.getItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
      let hash = JSON.parse(value)
      if (!!hash&&!!hash.custNo) {
        this.setState({custNo:hash.custNo})
      }
    })
   AsyncStorage.getItem(STORAGE_KEYS.ADDRESS ,(error, value)=>{
     let address = JSON.parse(value)
     console.log(address);
     if(!!address){
       this.setState({phone:address.phone})
       this.setState({name:address.name})
       this.setState({location:address.location})
       this.setState({region:address.region})
       this.setState({sava:1})
     }
   })
  for(let i=0;i<4;i++){
    this.state.arraycolor.push({borderColor:'#101010',backgroundColor:'#ffffff',fontcolor:"#101010"})
  }
}

tiJiao(){

if(this.state.sava == 1){
  let post_data = {
     brcNo:1,
     userNo:this.state.custNo,
     nowPrice:this.props.nowPrice.toFixed(2),
     skuList:this.props.skuList.toString(),
     skuCountList:this.props.skuCountList.toString(),
  }
  AresAPI.OrderController.submitOrder(post_data).done((res_data,res)=>{
    if(res_data.retCode == 1){
      console.log(res_data);
      let orderNo = res_data.orderNo
      this.props.navigator.push({id:'PaymentOrder',params:{price:this.props.nowPrice , orderNo:orderNo}})
    }else{
      Alert.alert('错误提示', res_data.retMsg, [{ text: '确定'}])
    }
  })
}else if(this.state.name == ''||this.state.phone == ''||this.state.location =='') {
  Alert.alert('错误提示', '请填写收货信息', [{ text: '确定'}])
}else {
  Alert.alert('错误提示', '请保存收货地址', [{ text: '确定'}])
}
}

saveMsg(){
  const regexp=VERIFY.PHONE;

  if (this.state.phone == '') {
    Alert.alert('错误提示', '请输入手机号', [{ text: '确定'}]);
    return;
  }
  if (regexp.test(this.state.phone) === false) {
    Alert.alert('错误提示', '请输入正确的手机号', [{ text: '确定'}]);
    return;
  }
  if(this.state.name != ''&&this.state.phone != ''&&this.state.location !=''&&this.state.region !='请选择所在地区'){
    this.setState({sava:1})
  }else{
    Alert.alert('错误提示', '请填写收货信息', [{ text: '确定'}])
  }
  let data = {
    'phone':this.state.phone,
    'name':this.state.name,
    'location':this.state.location,
    'region':this.state.region,
  };
  console.log(data);
  AsyncStorage.setItem(STORAGE_KEYS.ADDRESS, JSON.stringify(data), (error)=>{
    console.log(data);
  })
}
 address(){
    if(this.state.sava==0){
     return this.Input_address()
      }
    if(this.state.sava==1){
     return this.save_address()
  }
 }

 changeAddress(){
   this.setState({sava:0})
   this.setState({phone:''})
   this.setState({name:''})
   this.setState({location:''})
   this.setState({region:'请选择所在地区'})
   console.log(this.state.save);
   AsyncStorage.removeItem(STORAGE_KEYS.ADDRESS, (error, value)=>{
     this.setState({save:0})
   })
   this.setState({save:0})
 }

 save_address(){
   return(
      <View>
        <View onPress={() => this.props.navigator.push({id:"ReceivingAddress"})} style={{alignItems: "center",flexDirection:'row',height:100,backgroundColor:'#ffffff'}} >
           <Image style={{marginLeft:16}} source={require('ares/app/assets/image/position01.png')} />
           <View>
            <View style={{flexDirection:'row'}} >
              <Text style={{fontSize:14,color:"#101010",marginHorizontal: 16}}>{this.state.name}</Text>
              <Text style={{fontSize:14,color:"#101010"}}>{this.state.phone}</Text>
            </View>
            <View style={{flexDirection:'row',marginTop:5}} >
              <Text  style={{ fontSize:14,color:"#101010", marginLeft:16}}>{this.state.region[0]}</Text>
              <Text style={styles.text}>{this.state.region[1]}</Text>
              <Text style={styles.text}>{this.state.region[2]}</Text>
            </View>
            <View style={{marginTop:5}}>
              <Text numberOfLines={2} style={styles.text,{width:250,marginLeft:16}}>{this.state.location}</Text>
            </View>
           </View>
           <TouchableOpacity style={{alignItems:'center',justifyContent: "center",borderRadius:8,backgroundColor:"#00BFFF",width:40,height:40}} onPress={this.changeAddress.bind(this)}>
              <View style={{alignItems:'center',justifyContent:'center'}}><Text style={{color:"#ffffff",fontSize:12}}>修改</Text><Text style={{color:"#ffffff",fontSize:12}}>信息</Text></View>
           </TouchableOpacity>
         </View>
          <Image source={require('ares/app/assets/image/colour_bar.png')} />
      </View>
    )
 }
 Input_address(){
   return(
     <View>
        <View style={{backgroundColor:'#ffffff'}}>
          <AresTextInput title={'收货人'}  placeholder={'收货人姓名'} onChangeText={(value) => {this.setState({name:value})}}/>
          <ART.Surface width={full_width} height={1}>
              <ART.Shape d={h_line_1} stroke="#e5e5e5" strokeWidth={1} />
          </ART.Surface>
          <AresTextInput maxLength={11} title={'手机号'}  keyboardType="numeric"  placeholder={'手机号'} onChangeText={(value) => {this.setState({phone:value})}}/>
          <ListBox color={this.state.color} onPress={this.on_Click.bind(this)} title={'所在地区'} text={this.state.region}/>

          <ART.Surface width={full_width} height={1}>
              <ART.Shape d={h_line_1} stroke="#e5e5e5" strokeWidth={1} />
          </ART.Surface>
          <AresTextInput title={'收货地址'} multiline={true} maxLength={32} placeholder={'请填写地址'} onChangeText={(value) => {this.setState({location:value})}}/>
          <ART.Surface width={full_width} height={1}>
              <ART.Shape d={h_line_1} stroke="#e5e5e5" strokeWidth={1} />
          </ART.Surface>
        </View>
        <TouchableOpacity onPress={this.saveMsg.bind(this)}>
           <View style={{marginTop:17,alignItems:'center',justifyContent: "center",borderRadius:8,marginHorizontal:12,height:41,backgroundColor:"#f29836"}}><Text style={{color:"#ffffff",fontSize:16}}>保存收货信息</Text></View>
        </TouchableOpacity>
     </View>
   )
 }
 selected(id){
   let array=[]
   for(let j=0;j<4;j++){
     if(j==id){
       array.push({borderColor:'#ffffff',backgroundColor:'#f29836',fontcolor:"#ffffff"})
     }else{
       array.push({borderColor:'#101010',backgroundColor:'#ffffff',fontcolor:"#101010",})
     }
  }
      this.state.arraycolor=array
      this.setState()
}

  render(){
    const path = ART.Path();
    path.moveTo(16,1);
    path.lineTo(full_width,1);
    let sum = this.props.nowPrice+10
    return(
      <View style={styles.root}>
        <BackNavBar component={this}  backgroundColor={COMMON_STYLES.NAVIBAR_COLOR} backTextColor="#FFFFFF" titleColor="#FFFFFF">填写订单</BackNavBar>
        <ScrollView showsVerticalScrollIndicator={false}>
             {this.address()}

              <View style={{marginTop:17,backgroundColor:'#ffffff'}}>
                <TouchableOpacity style={{justifyContent:'space-between',alignItems: 'center',height:46,flexDirection:'row',backgroundColor:'#ffffff'}} >
                  <Text style={{fontSize:14,color:'#101010',marginHorizontal: 16}}>优惠券</Text>
                  <View style={{flexDirection:'row',marginRight:10,alignItems: 'center'}}>
                    <Text style={{fontSize:14,marginRight:10,color:'#f5787c'}}>您无可用优惠券</Text>
                    <Icon name="angle-right" size={22} color={'#bdbdbd'} />
                  </View>
                </TouchableOpacity>
                <ART.Surface width={full_width} height={1}>
                  <ART.Shape d={path} stroke="#e5e5e5" strokeWidth={1} />
                </ART.Surface>
                <TouchableOpacity style={{justifyContent:'space-between',alignItems: 'center',height:46,flexDirection:'row',backgroundColor:'#ffffff'}} >
                  <Text style={{marginTop:2,fontSize:16,color:'#101010',marginHorizontal: 16}}>配送方式</Text>
                  <View style={{flexDirection:'row',marginRight:10,alignItems: 'center'}}>
                    <Text style={{marginRight:10,fontSize:16,color:'#101010'}}>快递￥10.00</Text>
                    <Icon  name="angle-right" size={22} color={'#bdbdbd'} />
                  </View>
               </TouchableOpacity>
              </View>
              <View style={{borderColor:'#e5e5e5',marginTop:18,height:157,backgroundColor:'#fff'}}>
                <View style={{marginTop:11,flexDirection:'row',backgroundColor:'#fff',justifyContent:'space-between'}}>
                  <Text style={{fontSize:16,color:"#101010",marginLeft: 16}}>商品价格：</Text>
                  <Text style={{fontSize:16,color:"#f29836",marginRight:13}}>￥{this.props.nowPrice.toFixed(2)}</Text>
                </View>
                <View style={{marginTop:13,flexDirection:'row',backgroundColor:'#fff',justifyContent:'space-between'}}>
                  <Text style={{fontSize:16,color:"#101010",marginLeft: 16}}>已优惠：</Text>
                  <Text style={{fontSize:16,color:"#f29836",marginRight:13}}>￥0</Text>
                </View>
                 <View style={{marginTop:15,marginBottom:5,flexDirection:'row',backgroundColor:'#fff',justifyContent:'space-between'}}>
                  <Text style={{fontSize:16,color:"#101010",marginLeft: 16}}>运费：</Text>
                  <Text style={{fontSize:16,color:"#f29836",marginRight:13}}>￥10.00</Text>
                </View>
                <ART.Surface width={full_width} height={1}>
                  <ART.Shape d={path} stroke="#e5e5e5" strokeWidth={2} />
                </ART.Surface>
                <View style={{marginTop:15,marginBottom:5,flexDirection:'row',backgroundColor:'#fff',justifyContent:'flex-end'}}>
                  <Text style={{fontSize:16,color:'#101010'}}>合计：</Text>
                  <Text style={{fontSize:16,color:'#f29836',marginRight:13}}>￥{sum.toFixed(2)}</Text>
                </View>
             </View>
             <View style={{height:100}}></View>
          </ScrollView>
          <View style={{backgroundColor:'white',height:50,position: "absolute",right: 0,bottom: 0,left:0,flexDirection:'row'}}>
            <View style={{flex:2,alignItems:'center',flexDirection:'row'}}>
              <Text style={{fontSize:16,color:"#101010",marginLeft: 16}}>实付款：</Text>
              <Text style={{fontSize:14,color:"#f29836"}}>￥{sum.toFixed(2)}</Text>
              <Text style={{fontSize:10,color:"#b3b3b3",marginLeft: 16}}>(为您节省0.00元)</Text>
            </View>
            <TouchableOpacity style={{flex:1,backgroundColor:'#f5787c',justifyContent:'center',alignItems:'center'}} onPress={this.tiJiao.bind(this)} >
                <Text style={{color:'white',fontSize:20}}>提交订单</Text>
            </TouchableOpacity>
          </View>
             <DialogPicker
             data={this._createAreaData()}
             onPress={this.picker_data.bind(this)}
             ref="dialog"
             title='请选择地址'
             isShow={this.state.isShow}
             click={this.dialog_close.bind(this)}
        />
        </View>

    )
  }
}
export default FillOrder
