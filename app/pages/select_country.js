import React from 'react'

import {
  Alert,
  View,
  StyleSheet,
  ART,
  Navigator,
  Text,
  Image,
} from 'react-native'

import {
  BasePage,
  BackNavBar,
  NavigatorUtils,
} from 'AresComponent'

import List from 'antd-mobile/lib/list'
import Radio from 'antd-mobile/lib/radio'

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
    flex: 1,
  },
});

class SelectCity extends BasePage {
  constructor(props) {
    super(props);
    this.state={
      default_check : ''
    };
  }

  onBack(selected){
    if (this.props.click === 'up') {
      this.props.rate.state.selected_up = selected || this.props.rate.state.selected_up
      NavigatorUtils.popToRoute(this.props.navigator,{id:'ExchangeRateConversion',params:{}})
    }
    if (this.props.click === 'down') {
      this.props.rate.state.selected_down = selected || this.props.rate.state.selected_down
      NavigatorUtils.popToRoute(this.props.navigator,{id:'ExchangeRateConversion',params:{}})
    }
  }

  componentWillMount() {
    if (this.props.click === 'up') {
      this.setState({default_check:this.props.rate.state.selected_up})
    }
    if (this.props.click === 'down') {
      this.setState({default_check:this.props.rate.state.selected_down})
    }
  }


  render() {

    return(
      <View style={styles.root}>
        <BackNavBar component={this}>选择国家</BackNavBar>
        <Radio.RadioItem key='beijing' checked={this.state.default_check === '中国'} onChange={()=>{this.onBack("中国")}}>
          <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
            <Image source={require('ares/app/assets/image/CNY.png')} style={{width:20,height:20}}/>
            <Text style={{fontSize:17,color:'#333333',marginLeft:15}}>中国</Text>
            <Text style={{fontSize:17,color:'#333333',marginLeft:15}}>CNY</Text>
          </View>
        </Radio.RadioItem>
        <Radio.RadioItem key='shanghai' checked={this.state.default_check === '美国'} onChange={()=>{this.onBack('美国')}}>
          <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
            <Image source={require('ares/app/assets/image/USA.png')} style={{width:20,height:20}}/>
            <Text style={{fontSize:17,color:'#333333',marginLeft:15}}>美国</Text>
            <Text style={{fontSize:17,color:'#333333',marginLeft:15}}>USA</Text>
          </View>
        </Radio.RadioItem>
      </View>
    )
  }

}
export default SelectCity
