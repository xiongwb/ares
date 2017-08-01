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
  ListView,
  ART,
  StatusBar,
  Dimensions,
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
  StringUtils,
  SegmentControl,
} from 'AresComponent'
import {
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
const DEFAULT_RED_COLOR = '#f5787c'

const styles = StyleSheet.create({

  dialog_root:{
      height:full_height*3/4,

  },
  dialog_close_box:{
    paddingHorizontal: 10,
    justifyContent:'center',
    alignItems:'flex-end',
  },
  goods_msg_box:{
    flexDirection:'row',
    paddingHorizontal:10,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom:5,
    borderBottomWidth:1,
    borderBottomColor:'#EEEEEE',
    height:full_width/3+10
  },
  dialog_img_box:{
    borderWidth:1,
    borderColor:'#EEEEEE',
    borderRadius:4,
  },
  dialog_img:{
    width:full_width/3,
    height:full_width/3,
    resizeMode:'contain',
  },
  dialog_txt:{
    fontSize:20,
    color:'red',
    marginLeft:20,
  },
  detail_box:{
    flex:1,
    paddingHorizontal:10,
    paddingTop:10,
  },
  detail_name:{


  },
  detail_list:{
    flexDirection: "row",
    paddingTop:10,
    paddingBottom:10,
  },
  color_btn:{
    marginRight:20
  },
  color_view_selected:{
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    borderColor:'red',
    paddingHorizontal:10,
    paddingTop:5,
    paddingBottom:5,
    borderRadius:2,
  },
  color_text_selected:{
    color:'red'
  },
  color_view_unselect:{
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    borderColor:'#BBBBBB',
    paddingHorizontal:10,
    paddingTop:5,
    paddingBottom:5,
    borderRadius:2,
  },
  color_text_unselect:{
    color:'#000000'
  },
  number_box:{
    flexDirection: "row",
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:10,
  },
  number_view:{
    flexDirection: "row",
    borderColor:'#000000',
    borderWidth:1,
    borderRadius:2,
    height:30,
    width:120,
  },
  number_btn:{
    flex:1,
  },
  number_ctrl_box:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  number_input_box:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    borderLeftWidth:1,
    borderLeftColor:'#000000',
    borderRightWidth:1,
    borderRightColor:'#000000',
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

export default class SelectPage extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      selectIndex:1,
      number:1,
    }
  }

  minus(){
    const { getCount } = this.props
    if(this.state.number>1){
      this.setState({number:this.state.number-1})
    }
  }

  plus(){
    const { getCount } = this.props
    this.setState({number:this.state.number+1})
  }

  changeText(value){
    if(value!=null&&value.length>0){
      this.setState({number:parseInt(value)})
    }else{
      this.setState({number:''})
    }
  }

  addCart = () => {
    const { onPress } = this.props;
    onPress(this.state.number);
  };

  render(){
    const { data } = this.props
    return(
      <View style={styles.dialog_root}>
        <View style={styles.dialog_close_box}>
            <TouchableOpacity onPress={() => Popup.hide()}>
              <Icon name='times' size={25} color="#A9A9A9" />
            </TouchableOpacity>
        </View>
        <View style={styles.goods_msg_box}>
          <View style={styles.dialog_img_box}><Image style={styles.dialog_img} source={{uri: this.props.data.image}}/></View>
          <View><Text style={styles.dialog_txt}>{data.price}</Text></View>
        </View>
        <View style={styles.detail_box}>
          <View>
            <Text style={styles.detail_name}>{data.detail.option.kouwei}</Text>
            <View style={styles.detail_list}>
              {
                this.state.selectIndex==1?
                  <TouchableOpacity activeOpacity={1} style={styles.color_btn} onPress={()=>this.setState({selectIndex:1})}>
                    <View style={styles.color_view_selected} >
                      <Text style={styles.color_text_selected}>{data.detail.option.name}</Text>
                    </View>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity activeOpacity={1} style={styles.color_btn} onPress={()=>this.setState({selectIndex:1})}>
                    <View style={styles.color_view_unselect}>
                      <Text style={styles.color_text_unselect}>{data.detail.option.name}</Text>
                    </View>
                  </TouchableOpacity>
              }
              {
                this.state.selectIndex==2?
                  <TouchableOpacity activeOpacity={1} style={styles.color_btn} onPress={()=>this.setState({selectIndex:2})}>
                    <View style={styles.color_view_selected} >
                      <Text style={styles.color_text_selected}>{data.detail.option.brand}</Text>
                    </View>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity activeOpacity={1} style={styles.color_btn} onPress={()=>this.setState({selectIndex:2})}>
                    <View style={styles.color_view_unselect}>
                      <Text style={styles.color_text_unselect}>{data.detail.option.brand}</Text>
                    </View>
                  </TouchableOpacity>
              }
              {
                this.state.selectIndex==3?
                  <TouchableOpacity activeOpacity={1} style={styles.color_btn} onPress={()=>this.setState({selectIndex:3})}>
                    <View style={styles.color_view_selected} >
                      <Text style={styles.color_text_selected}>{data.detail.option.city}</Text>
                    </View>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity activeOpacity={1} style={styles.color_btn} onPress={()=>this.setState({selectIndex:3})}>
                    <View style={styles.color_view_unselect}>
                      <Text style={styles.color_text_unselect}>{data.detail.option.city}</Text>
                    </View>
                  </TouchableOpacity>
              }
            </View>
          </View>
          <View style={styles.number_box}>
            <Text style={styles.detail_name}>数量</Text>
            <View style={styles.number_view}>
              <TouchableOpacity style={styles.number_btn} onPress={this.minus.bind(this)}>
                <View style={styles.number_ctrl_box}>
                  <Icon name='minus' size={10} color="#000000" />
                </View>
              </TouchableOpacity>
              <View style={styles.number_input_box}>
                <Text>{this.state.number.toString()}</Text>
              </View>
              <TouchableOpacity style={styles.number_btn} onPress={this.plus.bind(this)}>
                <View style={styles.number_ctrl_box}>
                  <Icon name='plus' size={10} color="#000000" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.dialog_btn_box}>
          <TouchableOpacity style={styles.dialog_btn} onPress={this.addCart}>
            <Text style={styles.dialog_btn_text}>确定</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
