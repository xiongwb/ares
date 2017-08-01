import React from 'react'

import {
    Navigator,
    AsyncStorage,
    StatusBar,
    View,
    Platform,
} from 'react-native'

import ROUTE_MAP from 'AresRouteMap'
import {
  STORAGE_KEYS,
} from 'AresConstant'
import {
  DeviceStorage
} from 'AresComponent'

var flag = true

const barStyles = [
  'dark-content',
  'dark-content',
];

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      text:null,
      barStyle: this.getValue(barStyles, 0),
    }
    this.PushFromRight = Object.assign({},Navigator.SceneConfigs.PushFromRight, {gestures: {}});
  //  this.select()
  }
  getValue<T>(values: Array<T>, index: number): T {
  return values[index % values.length];
}

  renderStatusBar (){
    if (Platform.OS === 'android') {
      return <StatusBar hidden={false} translucent={true}
        barStyle='dark-content' backgroundColor="#00000000"/>
    }else{
      return <StatusBar barStyle= 'light-content'/>
    }
  }

  render_scene (route, navigator) {
    let id         = route.id
    let route_item = ROUTE_MAP[id]

    if (route_item) {
        Component = route_item.component;
        route_params = {}
        //合并默认参数
        Object.assign(route_params, route_item.params || {}, route.params || {});
    } else {
        Component = ROUTE_MAP.ErrorPage.component;
        route_params = {data: {message: `当前页面没有找到：${id}`}}
    }


    return (
      <View style={{flex:1}}>
        {this.renderStatusBar()}
        <Component navigator={navigator} {...route_params} />
      </View>
    );
  }

  config_scene (route, routeStack) {
    if(route.config_scene_type == null){
      return this.PushFromRight
    }
    return route.config_scene_type;
  }
  render() {
          return(
            <Navigator
              // 初始页面
              initialRoute={{
                id: 'Loading',
                params: {}
              }}
              // 路由入口
              renderScene={this.render_scene.bind(this)}
              configureScene={this.config_scene.bind(this)}
            />
          );
  }
}
