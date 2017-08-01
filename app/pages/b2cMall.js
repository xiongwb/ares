import React from 'react'

import {
  Dimensions,
  Text,
  View,
  Image,
  ART,
  ListView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
  TextInput,
  Platform,
  Navigator,
  ScrollView,
} from 'react-native'
/*绑定银行卡第一步骤的页面
      */
import {
  BasePage,
  NavBar,
} from 'AresComponent'

import {
  COMMON_STYLES,
} from 'AresConstant'



import Icon from 'react-native-vector-icons/FontAwesome'
import { getLocation, geoReverse } from 'react-native-bdmap';
const COMMON_FONT_SIZE = 14
const COMMON_EDGE_LEFT = 10
const SMALL_FONT_SIZE  = 12
var full_width = Dimensions.get('window').width
var full_height = Dimensions.get('window').height

const styles = StyleSheet.create({
  root: {
    backgroundColor: COMMON_STYLES.MAIN_BACKGROUND_COLOR,
    flex: 1,
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
      position: "absolute",
      top: 0,
      bottom: 0,
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: 15,
      paddingRight: 15,
    },
  title: {
      flexDirection:'row',
      borderWidth:1,
      borderColor:'#FF6600',
      height:35,
      width:180,
      borderRadius:10,
      marginLeft:-60,
      alignItems:'center',
  },
  placeholder :{
    position:'absolute',
    left:10,
    top:0,
    bottom:0,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  placeholderText :{
    marginLeft:5,
    fontSize:14,
    color:'#999999'
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

class B2cMall extends BasePage {
  constructor(props){
      super(props);
      this.state = {
        youLikeList: this.props.data.mallDetail,
        iconShow:true,
        show:true
      };
      console.log(Mock.foods);
    }

  componentWillMount(){
    getLocation().then(position=>{
      geoReverse({latitude:position.latitude,longitude:position.longitude}).then((value)=>{
        let city = value.addressComponent.city;
        this.setState({cityName:city});
      })
    });
  }

  renderBrand(){
    let datas = this.props.data.choiceDetail;
    return(
      <View style={{flex:1,flexDirection:"row",marginTop:18,marginBottom:15}}>
        <View style={{flex:1,width:(full_width-36)/3}}>
          <TouchableOpacity style={{flex:1}} onPress={()=>this.props.navigator.replace({id:'B2CGoodsDetails' , params: {data:datas[0]}})}>
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
              <Image style={{width:(full_width-36)/3,height:(full_width-36)/3,justifyContent:"center",alignItems:"center"}} resizeMode='contain' source={{uri: datas[0].image}} >
              </Image>
            </View>
            <View style={{marginTop:10}}>
              <Text numberOfLines={1} style={{width:(full_width-36)/3,fontSize:14,color:'#101010'}}>{datas[0].name}</Text>
              <Text style={{fontSize:14,color:'#f29836'}}>{datas[0].price}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flex:1,width:(full_width-36)/3}}>
          <TouchableOpacity style={{flex:1}} onPress={()=>this.props.navigator.replace({id:'B2CGoodsDetails' , params: {data:datas[1]}})}>
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
              <Image style={{width:(full_width-36)/3,height:(full_width-36)/3,justifyContent:"center",alignItems:"center"}} resizeMode='contain' source={{uri: datas[1].image}} >
              </Image>
            </View>
            <View style={{marginTop:10}}>
              <Text numberOfLines={1} style={{width:(full_width-36)/3,fontSize:14,color:'#101010'}}>{datas[1].name}</Text>
              <Text style={{fontSize:14,color:'#f29836'}}>{datas[1].price}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flex:1,width:(full_width-36)/3}}>
          <TouchableOpacity style={{flex:1}} onPress={()=>this.props.navigator.replace({id:'B2CGoodsDetails' , params: {data:datas[2]}})}>
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
              <Image style={{width:(full_width-36)/3,height:(full_width-36)/3,justifyContent:"center",alignItems:"center"}} resizeMode='contain' source={{uri: datas[2].image}} >
              </Image>
            </View>
            <View style={{marginTop:10}}>
              <Text numberOfLines={1} style={{width:(full_width-36)/3,fontSize:14,color:'#101010'}}>{datas[2].name}</Text>
              <Text style={{fontSize:14,color:'#f29836'}}>{datas[2].price}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  createLeg(){
    const h_line_1 = ART.Path();
    h_line_1.moveTo(10,1);
    h_line_1.lineTo(full_width,1);

    let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.state.youLikeList);
    console.log(dataSource);
    return(
      <View style={{backgroundColor:'white'}}>
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
                <View style={{flex:1}}>
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

  render() {
    let img = this.props.data.mallDetail;
    return(
      <View style={styles.root}>
        <StatusBar hidden={false} barStyle='dark-content' translucent={true} backgroundColor="#ffffff">
        </StatusBar>
        <NavBar
            backgroundColor='#fff'
            leftContent={
              <View >
                <TouchableOpacity onPress={()=>this.props.navigator.pop()}>
                  <Icon style={{marginRight: 3}} name="angle-left" size={22} color='#FF6600'/>
                </TouchableOpacity>
              </View>
            }
            titleContent={
             <View style={{height:35,width:180,borderRadius:10,flexDirection:'row',borderWidth:1,borderColor:'#FF6600',alignItems:'center'}}>
              <TouchableOpacity style={{marginLeft:5}} >
                 <Image source={require('ares/app/assets/image/search.png')} />

              </TouchableOpacity>
              <TextInput
                underlineColorAndroid='transparent'
                style={{flex:1,padding:0,marginLeft:10}}
              />
            </View>
            }

            />
        <ScrollView showsVerticalScrollIndicator={true} style={{flex:1}} keyboardDismissMode='on-drag'>
          <View style={{flexDirection:"row",height:full_width*2/3,width:full_width,marginTop:10,backgroundColor:'#fff'}}>
          <TouchableOpacity style={{flex:2}} onPress={() => this.props.navigator.replace({id: "B2CGoodsDetails", params: {data:img[4]}})}>
            <View style={{flex:2}}>
              <Image style={{height:250,width:full_width*2/3,justifyContent: "center",alignItems: "center"}} resizeMode='stretch' source={{uri: img[4].image}} >

              </Image>
            </View>
            </TouchableOpacity>
            <View style={{flex:1}}>
              <TouchableOpacity style={{flex:1}} onPress={() => this.props.navigator.replace({id: "B2CGoodsDetails", params: {data:img[5]}})}>
              <View style={{flex:1}}>
                <Image style={{height:125,width:full_width/3,justifyContent: "center",alignItems: "center"}} resizeMode='stretch' source={{uri: img[5].image}} >

                </Image>
              </View>
              </TouchableOpacity>
              <TouchableOpacity style={{flex:1}} onPress={() => this.props.navigator.replace({id: "B2CGoodsDetails", params: {data:img[3]}})}>
              <View style={{flex:1}}>
                <Image style={{height:125,width:full_width/3,justifyContent: "center",alignItems: "center"}} resizeMode='stretch' source={{uri: img[3].image}} >

                </Image>
              </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginTop:10,backgroundColor:'#fff',paddingHorizontal:10,borderTopWidth:1,borderTopColor:'#e5e5e5',borderBottomWidth:1,borderBottomColor:'#e5e5e5'}}>
            <View style={{height:47,borderBottomColor:'#d9d9d9',borderBottomWidth:1,justifyContent:'center'}}>
              <Text style={{fontSize:16,color:'#101010'}}>精选商品</Text>
            </View>
            <View style={{flex:1}}>
              {this.renderBrand()}
            </View>
          </View>
          <View style={{flex:1,marginTop:10,backgroundColor:'#fff',borderTopWidth:1,borderTopColor:'#e5e5e5',borderBottomWidth:1,borderBottomColor:'#e5e5e5'}}>
            <View style={{height:47,borderBottomColor:'#d9d9d9',borderBottomWidth:1,paddingHorizontal:10,justifyContent:'center'}}>
              <Text style={{fontSize:16,color:'#101010'}}>热门商品</Text>
            </View>
              {this.createLeg()}
          </View>
        </ScrollView>
      </View>
    )
  }
}


export default B2cMall
