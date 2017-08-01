import React from 'react'
import AresAPI from 'AresAPI'
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  AsyncStorage,
  TextInput,
  TouchableOpacity,
   ART,
   ListView,
   ScrollView,
   Alert,
} from 'react-native'
import Mock from '../constants/mock';
import {
  Navbar,
  BackNavBar,
  BasePage,
  NavigatorUtils,
} from 'AresComponent'
import {
  STORAGE_KEYS,
  COMMON_STYLES,
} from 'AresConstant'
/*我的收藏的第一步骤的页面
      张乐   2017-2-22*/
import Icon from 'react-native-vector-icons/FontAwesome'
import WhiteSpace from 'antd-mobile/lib/white-space'

// import Swipeout from 'react-native-swipe-out'

var full_width = Dimensions.get('window').width
var full_height = Dimensions.get('window').height
const  True = 'ares/app/assets/image/red_check.png'
const  False = 'ares/app/assets/image/unchosen.png'
const COMMON_EDGE_LEFT = 10
const mockLiskt = []
const styles = StyleSheet.create({
    root: {
    backgroundColor: COMMON_STYLES.MAIN_BACKGROUND_COLOR,
    flex: 1,

  },
  head_view: {
    height:75,
    marginLeft:10,
    backgroundColor:'transparent'
  },
  contentViewStyle: {
    // 主轴方向
    flexDirection:'row',
    // 换行
    flexWrap:'wrap',
    //必须设置否则换行不起作用
    alignItems:'center',
  },
  aid_kit:{
    fontSize: 16,
    color: '#fff',
  },
  success_logo_box:{
    marginTop : 130,
    justifyContent: "center",
    alignItems:'center',
  },
   shopping_logo_box:{
      flex: 1,
    alignItems:'center',
     justifyContent: "center",
  },
   shopping_message_text:{
    color:'#bbbbbb',
    marginTop:22,
    fontSize:14,

    textAlign:'center',
  },

  shopping_buton:{
    borderColor:'#dddddd',
    borderWidth:1,
    marginTop:50,
    alignItems:'center',
    justifyContent: "center",
    borderRadius:8,
    width:100,
    height:29,
    backgroundColor:"#ffffff"
  },

});

class MyCollection extends BasePage  {
  constructor(props) {
  super(props);
  this.state={
    is_bankcard : false,
    kongzhi:1,
      total:0,
      isNull:mockLiskt.length,
      data:mockLiskt,
      custNo:'',
  }

}

//进入我的收藏页面，调用这个方法。
componentWillMount(){
 this.setState({is_bankcard:true});
 AsyncStorage.getItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
    let hash = JSON.parse(value)
    if (!!hash&&!!hash.custNo) {
      this.setState({custNo:hash.custNo})
      AresAPI.ProdCollectionController.findProdCollection({userNo:hash.custNo}).done((res_data,res)=>{
        if(res_data.retCode == 1){
          console.log(res_data.prodCollectionListReturnVOList);
          mockLiskt = res_data.prodCollectionListReturnVOList
          this.setState({data:mockLiskt,isNull:mockLiskt.length})
        }else{
          Alert.alert('错误提示', res_data.retMsg, [{ text: '确定'}])
        }
      })
    }
  })
}

goTo(rowData){
  for(let i=0;i<Mock.suoyou.all.length;i++){
    if(Mock.suoyou.all[i].PROD_NO == rowData.prodNo){
      this.props.navigator.push({id:'B2CGoodsDetails',params:{data:Mock.suoyou.all[i]}})
    }
  }
}
//点击切换，调用这个方法。
shuzhe(){
  this.setState({is_bankcard:!this.state.is_bankcard});

}
yemianqiehuan(){
  NavigatorUtils.popToRoute(
    this.props.navigator,
    {id: 'Dashboard'}
  )
  // this.props.navigator.resetTo({id:'Dashboard',params:{data:'order'}})
}

onsha(rowID){
  Alert.alert('提示','确认要删除商品吗？',[
    {text:'取消'},{text:'删除',onPress:()=>{this.delete(rowID)}},
  ])
}
delete(rowID){
  let post_data = {
     prodNo:this.state.data[rowID].prodNo,
     userNo:this.state.custNo,
  }
  AresAPI.ProdCollectionController.delProdCollection(post_data).done((res_data,res)=>{
    if(res_data.retCode == 1){
      mockLiskt.splice(rowID,1)
      this.state.isNull=this.state.isNull-1
      this.setState({
        data:mockLiskt
      })
    }else{
      Alert.alert('错误提示', res_data.retMsg, [{ text: '确定'}])
    }
  })
 }

//横着摆放商品的页面格式
MyCollection1(rowData, sectionID, rowID){
    let imageSize = (full_width - 3 * COMMON_EDGE_LEFT)/2
    return (
       <TouchableOpacity onLongPress={()=>this.onsha(rowID)} onPress={()=>this.goTo(rowData) } >
          <View style={{backgroundColor:'white',marginLeft:10,marginTop:10}}>
            <Image source={{uri:rowData.imgUrl}} style={{width:imageSize,height:imageSize*0.8}} />
              <View style={{margin:5}}>
                <Text style={{fontSize:14,color:'#666666',textAlign:'center'}}>{rowData.prodName}{" "}{rowData.standard}</Text>
              </View>
              <View style={{marginBottom:10}}>
                <Text style={{color:'#f5787c',fontSize:16,textAlign:'center'}}>现价：¥ {rowData.nowPrice}</Text>
              </View>
        </View>
      </TouchableOpacity>
    );
 }
 //竖着商品摆放的格式
qiehuan(rowData, sectionID, rowID){
    let imageSize = (full_width - 3 * COMMON_EDGE_LEFT)/2
    const h_line_1 = ART.Path();
    h_line_1.moveTo(10,1);
    h_line_1.lineTo(full_width,1);
    let swipeoutBtns = [
      {
      backgroundColor:'red',
        text:'删除',
      onPress:()=>{this.delete(rowID,rowData.newPrice)}
      }
    ]
    return (
      <View>
          <TouchableOpacity onLongPress={()=>this.onsha(rowID)}  onPress={() => this.goTo(rowData)} >
          <View style={{height:100,flexDirection:'row',backgroundColor:'#fff'}}>
            <Image source={{uri:rowData.imgUrl}} style={{width:70,height:70, marginLeft:COMMON_EDGE_LEFT,marginTop:15}} />
            <View style={{marginLeft:COMMON_EDGE_LEFT,marginTop:15,height:70}}>
              <View style={{flexDirection:'row',width:full_width-90,flex:1}}>
                <Text style={{fontSize:14,color:'#666666'}}>{rowData.prodName}{" "}{rowData.standard}</Text>
              </View>
              <View style={{flex:1,flexDirection:'row'}}>
                <Text style={{color:'#f5787c',fontSize:16,textAlign:'center'}}>现价：¥ {rowData.nowPrice}</Text>
                <Text style={{fontSize:12,color:'gray',position: "absolute",right: 15,top:8}}>{rowData.juli}</Text>
              </View>
            </View>
          </View>
          </TouchableOpacity>
          <ART.Surface width={full_width} height={1}>
            <ART.Shape d={h_line_1} stroke="#dddddd" strokeWidth={1} />
          </ART.Surface>
      </View>


      );
    }
yemian(){

  let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.state.data);
  if (this.state.is_bankcard===false){
    return(
            <ListView
          dataSource={dataSource}
          renderRow={this.qiehuan.bind(this)}
          contentContainerStyle={styles.contentViewStyle}
         />
    )
  }else{
    return(
        <ListView
          dataSource={dataSource}
          renderRow={this.MyCollection1.bind(this)}
          contentContainerStyle={styles.contentViewStyle}
         />

    )
  }
 }
 render() {
   if(this.state.isNull==0){
    return(
      <View style={styles.root}>
        <BackNavBar component={this}>我的收藏</BackNavBar>

        <View style={styles.shopping_logo_box}>
          <Image  source={require('ares/app/assets/image/empty_trolley.png')} />

        <Text style={styles.shopping_message_text}>您的收藏是空的，快去逛逛吧</Text>
        <TouchableOpacity style={styles.shopping_buton} onPress={this.yemianqiehuan.bind(this)}>
           <Text style={{color:"#aaaaaa",fontSize:14}}>去收藏</Text>
        </TouchableOpacity>
        </View>

      </View>
    )
  }else{
    return(
      <View style={styles.root}>
        <BackNavBar
          component={this}
          rightContent={
            <TouchableOpacity  onPress={this.shuzhe.bind(this)}>
              <Text style={styles.aid_kit}>切换</Text>
            </TouchableOpacity>}
        >我的收藏</BackNavBar>
        <ScrollView >
           <View>{this.yemian()}</View>
        </ScrollView>
      </View>
    )
  }
 }
}

export default MyCollection
