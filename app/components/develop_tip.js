import React from 'react'

import {
    Alert,
} from 'react-native'

/**
*  开发界面时，快速验证可点击事件的工具方法
*  by fushang318
*/
export default class DevelopTip {
  static alert(){
    Alert.alert('提示', "该功能尚未开发完成", [
      { text: '确定'}
    ])
  }
}
