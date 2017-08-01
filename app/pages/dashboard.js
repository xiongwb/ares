import React from 'react'

import {
  Text,
  View,
  StyleSheet,
  Image,
  TabBarIOS
} from 'react-native'
import {
  BasePage,
  TabBar,
} from 'AresComponent'
import {
  EVENT_EMITTER_CONST
} from 'AresConstant'

import ScrollableTabView from 'react-native-scrollable-tab-view';
import Wallet    from '../pages/dashboard/wallet'
import Living    from '../pages/dashboard/living'
import Assistant from '../pages/dashboard/assistant'
import MyCenter from '../pages/dashboard/mycenter'
import TabNavigator from 'react-native-tab-navigator';

import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'

const styles = StyleSheet.create({
  /**
   * iOS平台下, react-native-scrollable-tab-view是用ScrollView实现的
   * 当react-native-scrollable-tab-view嵌套react-native-viewpager时, 需要给react-native-scrollable-tab-view的子View设置overflow='hidden',
   * ScrollView的removeClippedSubviews才能起作用, 将不在屏幕可视范围的视图移除掉.
   */
  iconStyle: {
    width: 24,
    height: 24,
  },
  textStyle: {
    color: '#fff',
  },
  selectedTextStyle: {
    color: '#ce9f66',
  },
});

//tabbar图片资源
const TAB_BAR_RESOURCES = [
  [require('ares/app/assets/image/qianbao_unselected.png'), require('ares/app/assets/image/qianbao_selected.png')],
  [require('ares/app/assets/image/shenghuo_unselected.png'), require('ares/app/assets/image/shenghuo_selected.png')],
  [require('ares/app/assets/image/zhushou_unselected.png'), require('ares/app/assets/image/zhushou_selected.png')],
  [require('ares/app/assets/image/wode_unselected.png'), require('ares/app/assets/image/wo_selected.png')],
];
const TAB_BAR_TITLE = [
  '钱包','生活','投资','我的',
];

class Dashboard extends BasePage {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
    };
  }
/**
  componentWillMount(){
    if(this.props.data != null){
      this.setState({
        selectedTab:this.props.data
      })
    }
  }
*/

  render() {
    // ios 下 tabbar icon 大小不能自适应，先临时用一个占位
    return (

      <TabNavigator tabBarStyle={{backgroundColor:'#000'}}>
        <TabNavigator.Item
          title="首页"
          selected={this.state.selectedTab === 'home'}
          selectedTitleStyle={styles.selectedTextStyle}
          titleStyle={styles.textStyle}
          renderIcon={() => <Image source={require('ares/app/assets/image/qianbao_unselected.png')} style={styles.iconStyle} />}
          renderSelectedIcon={() => <Image source={require('ares/app/assets/image/qianbao_selected.png')} style={styles.iconStyle} />}
          onPress={() => {this.setState({ selectedTab: 'home' });RCTDeviceEventEmitter.emit(EVENT_EMITTER_CONST.NEEDWALLETREQUEST, 'changeTaberBar')}}>
          <Wallet {...this.props} />
        </TabNavigator.Item>
        <TabNavigator.Item
          title="生活"
          selected={this.state.selectedTab === 'order'}
          selectedTitleStyle={styles.selectedTextStyle}
          titleStyle={styles.textStyle}
          renderIcon={() => <Image source={require('ares/app/assets/image/shenghuo_unselected.png')} style={styles.iconStyle} />}
          renderSelectedIcon={() => <Image source={require('ares/app/assets/image/shenghuo_selected.png')} style={styles.iconStyle} />}
          onPress={() => this.setState({ selectedTab: 'order' })}>
          <Living {...this.props} />
        </TabNavigator.Item>
        <TabNavigator.Item
          title="投资"
          selected={this.state.selectedTab === 'cart'}
          selectedTitleStyle={styles.selectedTextStyle}
          titleStyle={styles.textStyle}
          renderIcon={() => <Image source={require('ares/app/assets/image/zhushou_unselected.png')} style={styles.iconStyle} />}
          renderSelectedIcon={() => <Image source={require('ares/app/assets/image/zhushou_selected.png')} style={styles.iconStyle} />}
          onPress={() => this.setState({ selectedTab: 'cart' })}>
          <Assistant {...this.props} />
        </TabNavigator.Item>
        <TabNavigator.Item
          title="我的"
          selected={this.state.selectedTab === 'center'}
          selectedTitleStyle={styles.selectedTextStyle}
          titleStyle={styles.textStyle}
          renderIcon={() => <Image source={require('ares/app/assets/image/wode_unselected.png')} style={styles.iconStyle} />}
          renderSelectedIcon={() => <Image source={require('ares/app/assets/image/wo_selected.png')} style={styles.iconStyle} />}
          onPress={() => this.setState({ selectedTab: 'center' })}>
         <MyCenter {...this.props} />
        </TabNavigator.Item>
      </TabNavigator>
    )
  }


}

export default Dashboard
