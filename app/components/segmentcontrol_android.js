/**
* by dujh
*/

import React,{Component,PropTypes} from 'react';
import {
  requireNativeComponent,
  View
} from 'react-native';

let iface={
  name:'RNSegmentC',
  propTypes:{
    setSource:PropTypes.number,
    ...View.propTypes
  }
}

module.exports = requireNativeComponent('RNSegmentC', iface);
