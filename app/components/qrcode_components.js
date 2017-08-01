import React, { Component, PropTypes } from 'react';
import { requireNativeComponent} from 'react-native';

var QRCodeView = requireNativeComponent('QRCodeView', QRComponent);

class QRComponent extends React.Component {
  static propTypes = {
    /**
    *
    * 定义组件需要传到原生端的属性
    * 使用React.PropTypes来进行校验
    */
    message:PropTypes.string,
  };

  render() {
    return (
      <QRCodeView {...this.props} />
    );
  }
}
export default QRComponent