import React from 'react'

import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ART,
  Navigator,
} from 'react-native'
import {
  BasePage,
  BackNavBar,
  PushLogin,
} from 'AresComponent'
import {
  COMMON_STYLES,
  STORAGE_KEYS,
} from 'AresConstant'
const {Surface, Shape, Path} = ART;
import Icon from 'react-native-vector-icons/FontAwesome'
import Button from 'antd-mobile/lib/button'
import InputItem from 'antd-mobile/lib/input-item'
const full_width = Dimensions.get('window').width

const styles = StyleSheet.create({
  root: {
    backgroundColor: COMMON_STYLES.MAIN_BACKGROUND_COLOR,
    flex: 1,
  },
  head_text:{
    fontSize:13,
    color:'#a5a5a5',
  },
  rate_view:{
    backgroundColor:'#fff',
    height:180,
    marginTop:1,
    borderColor:'#DDDDDD',
    borderTopWidth:1,
    borderBottomWidth:1,
    marginTop:10,
    alignItems:'center',
  }
});

class ExchangeRateConversion extends BasePage {
  constructor(props) {
    super(props);
    this.state={
      selected_up:"USA",
      selected_down:"CNY"
    };
  }
  render() {
    const vertical_line = ART.Path();
    vertical_line.moveTo(1,1); 
    vertical_line.lineTo(1,70);

    const horizontal_line = ART.Path();
    horizontal_line.moveTo(1,1); 
    horizontal_line.lineTo(full_width,1);

    return(
      <View style={styles.root}>
      <BackNavBar component={this} backText='首页'>汇率转换</BackNavBar>
      <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:20}}>
        <Text style={[styles.head_text,{textAlign:'left',flex:3,marginLeft:10}]}>仅供参考，以交易时实际金额为准</Text>
        <Text style={[styles.head_text,{textAlign:'right',flex:1}]}>刚刚更新</Text>
      </View>
      <View style={styles.rate_view}>
        <View style={{flexDirection:'row',height:90}}>
          <View style={{flex:2,justifyContent:'center'}}>
            <TouchableOpacity onPress={()=>this.props.navigator.push({id:'SelectCountry',config_scene_type:Navigator.SceneConfigs.FloatFromBottom,params:{rate:this,click:'up'}})}>
              <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                <Image source={require('ares/app/assets/image/USA02.png')} style={{width:40,height:40,marginLeft:10}}/>
                <Text style={{fontSize:17,color:'#333333',marginLeft:10}}>{this.state.selected_up}</Text>
                <Icon style={{position: "absolute",right: 10,top: 8,bottom: 0}} name="angle-right" size={22} color={'#000'} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{marginTop:10}}>
            <ART.Surface width={2} height={70}>
              <ART.Shape d={vertical_line} stroke={COMMON_STYLES.MAIN_BACKGROUND_COLOR} strokeWidth={1} />
            </ART.Surface>  
          </View>
          <View style={{flex:3,alignItems:'flex-end',justifyContent:'center'}}>
            <Text style={{fontSize:17,color:'#9b9b9b',marginTop:15,marginRight:10}}>100</Text>
            <Text style={{fontSize:13,color:'#9b9b9b',marginTop:5,marginRight:10}}>美元</Text>
          </View>
        </View>
        <ART.Surface width={full_width} height={2}>
          <ART.Shape d={horizontal_line} stroke={COMMON_STYLES.MAIN_BACKGROUND_COLOR} strokeWidth={1} />
        </ART.Surface>
        <View style={{flexDirection:'row',height:90}}>
          <View style={{flex:2,justifyContent:'center'}}>
            <TouchableOpacity onPress={()=>this.props.navigator.push({id:'SelectCountry',config_scene_type:Navigator.SceneConfigs.FloatFromBottom,params:{rate:this,click:'down'}})}>
              <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                <Image source={require('ares/app/assets/image/CNY02.png')} style={{width:40,height:40,marginLeft:10}}/>
                <Text style={{fontSize:17,color:'#333333',marginLeft:10}}>{this.state.selected_down}</Text>
                <Image source={require('ares/app/assets/image/position.png')} style={{width:10,height:14,marginLeft:10}}/>
                <Icon style={{position: "absolute",right: 10,top: 8,bottom: 0}} name="angle-right" size={22} color={'#000'} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{marginTop:10}}>
            <ART.Surface width={2} height={70}>
              <ART.Shape d={vertical_line} stroke={COMMON_STYLES.MAIN_BACKGROUND_COLOR} strokeWidth={1} />
            </ART.Surface>  
          </View>
          <View style={{flex:3,alignItems:'flex-end',justifyContent:'center'}}>
            <Text style={{fontSize:17,color:'#9b9b9b',marginTop:15,marginRight:10}}>691.52</Text>
            <Text style={{fontSize:13,color:'#9b9b9b',marginTop:5,marginRight:10}}>人民币</Text>
          </View>
        </View>
      </View>
      </View>
    )
  }

}
export default ExchangeRateConversion