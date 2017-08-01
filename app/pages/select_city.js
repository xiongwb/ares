import React from 'react'

import {
  Alert,
  View,
  StyleSheet,
  ART,
  Navigator,
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
      city:this.props.city||'天津'
    };
  }

  onBack(){
    NavigatorUtils.popToRoute(this.props.navigator,{id:'MoreBusiness',params:{city:this.state.city}})
  }

  render() {
    return(
      <View style={styles.root}>
        <BackNavBar component={this}>选择城市</BackNavBar>
        <Radio.RadioItem key='beijing' checked={this.state.city === '北京'} onChange={()=>NavigatorUtils.popToRoute(this.props.navigator,{id:'MoreBusiness',params:{city:'北京'}})}>
            北京
        </Radio.RadioItem>
        <Radio.RadioItem key='tianjin' checked={this.state.city === '天津'} onChange={()=>NavigatorUtils.popToRoute(this.props.navigator,{id:'MoreBusiness',params:{city:'天津'}})}>
            天津
        </Radio.RadioItem>
        <Radio.RadioItem key='shanghai' checked={this.state.city === '上海'} onChange={()=>NavigatorUtils.popToRoute(this.props.navigator,{id:'MoreBusiness',params:{city:'上海'}})}>
            上海
        </Radio.RadioItem>
        <Radio.RadioItem key='chongqing' checked={this.state.city === '重庆'} onChange={()=>NavigatorUtils.popToRoute(this.props.navigator,{id:'MoreBusiness',params:{city:'重庆'}})}>
            重庆
        </Radio.RadioItem>
      </View>
    )
  }

}
export default SelectCity
