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
  Platform,
} from 'react-native'
import {
  NavBar,
} from 'AresComponent'
import {
  COMMON_STYLES,
} from 'AresConstant'

const {Surface, Shape, Path} = ART;
import WhiteSpace from 'antd-mobile/lib/white-space'

var full_width = Dimensions.get('window').width
var common_color='#abaeb3'
var select_color='#cd9e6a'


const styles = StyleSheet.create({
  root: {
    backgroundColor: "#F5F5F9",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  segment_text:{
    fontSize:17,
  },
});

class Assistant extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
      is_around_selected:true,
      is_like_selected:false,
      around_text_color : select_color,
      like_text_color : common_color,
      around_line_color: select_color,
      like_line_color: '#fff',
      current_page:0,
    }

  }


  financial_select(){
    return(
        <View></View>
      )
  }

  financial_overview(){
    return(
        <View>
          <Image source={require('ares/app/assets/image/licai01.png')} style={[{width:full_width}]} resizeMode='stretch'/>
          <WhiteSpace size='md' />
          <Image source={require('ares/app/assets/image/licai02.png')} style={[{width:full_width}]} resizeMode='stretch'/>
          <WhiteSpace size='md' />
          <Image source={require('ares/app/assets/image/licai03.png')} style={[{width:full_width}]} resizeMode='stretch'/>
        </View>
      )
  }

  exchange_style(number){
    if (number === 0 && this.state.is_around_selected === false) {
      this.setState({
        current_page:0,
        around_text_color:select_color,
        around_line_color:select_color,
        like_text_color:common_color,
        like_line_color:'#fff',
        is_around_selected:true,
        is_like_selected:false,
      })
      return
    }
    if (number === 1 && this.state.is_like_selected === false) {
      this.setState({
        current_page:1,
        around_text_color:common_color,
        around_line_color:'#fff',
        like_text_color:select_color,
        like_line_color:select_color,
        is_around_selected:false,
        is_like_selected:true,
      })
      return
    }
  }

  select_view(){
    if (this.state.current_page == 0) {
      return this.financial_overview()
    }
    if (this.state.current_page == 1) {
      return this.financial_select()
    }
  }

  render() {
    const horizontal_line_1 = ART.Path();
    horizontal_line_1.moveTo(10,1);
    horizontal_line_1.lineTo(full_width/2 - 10,1);

    return(
      <View style={styles.root}>
        <Image source={require('ares/app/assets/image/shenghuodaohangtiao.png')} style={[styles.head_img,{width:full_width}]}>
          <NavBar
          backgroundColor={'transparent'}
          titleContent={<Text style={{color: "#fff", fontSize: 20}}>乾元金融</Text>}
          />
        </Image>
        <View style={{height:50,backgroundColor:'#fff'}}>
          <View style={{flex:1,flexDirection:'row'}}>
            <TouchableOpacity  onPress={() => {this.exchange_style(0)}}>
              <View style={{flex:1,alignItems:'center'}}>
                <View style={{flex:1,justifyContent:'center'}}>
                  <Text style={[styles.segment_text,{color:this.state.around_text_color}]}>理财总览</Text>
                </View>
                <ART.Surface width={full_width/2} height={2}>
                  <ART.Shape d={horizontal_line_1} stroke={this.state.around_line_color} strokeWidth={1.5} />
                </ART.Surface>
              </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => {this.exchange_style(1)}}>
              <View style={{flex:1,alignItems:'center'}}>
                <View style={{flex:1,justifyContent:'center'}}>
                  <Text style={[styles.segment_text,{color:this.state.like_text_color}]}>理财精选</Text>
                </View>
                <ART.Surface width={full_width/2} height={2}>
                  <ART.Shape d={horizontal_line_1} stroke={this.state.like_line_color} strokeWidth={1.5} />
                </ART.Surface>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View>{this.select_view()}</View>
        </ScrollView>
      </View>
    )
  }
}

export default Assistant
