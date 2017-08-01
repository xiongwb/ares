import React from 'react'

import {
  BackAndroid,
  Platform,
} from 'react-native'

/**
*  页面组件的父类，所有页面组件都需要继承这个组件
*  这个组件内主要处理了后退事件
*  by fushang318
*/
class BasePage extends React.Component {
  constructor(props) {
    super(props);
    this.__onBack = this.onBack.bind(this)
  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.__onBack);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this.__onBack);
    }
  }

  onBack(){
   // console.log("onBack")
   // console.log(this.props.navigator.getCurrentRoutes())
    if(this.props.navigator.getCurrentRoutes().length != 1){
      this.props.navigator.pop()
      return true
    }
    return false
  }
}

export default BasePage
