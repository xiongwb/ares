import React from 'react'

import {
  AppRegistry
} from 'react-native'

import app from './app/app'

/**
  把 ares/app/app.js 定义的组件作为 ios 平台的第一个渲染的组件
  by fushang318
*/
AppRegistry.registerComponent('ares', () => app)