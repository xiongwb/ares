'use strict';

import React, {
  Component,
  PropTypes,
} from 'react';
import {
  requireNativeComponent,
  StyleSheet,
  View,
  UIManager,
  InteractionManager,
  findNodeHandle,
  Animated,
  Dimensions,
  ActivityIndicator,
  Text,
} from 'react-native';

import Viewfinder from './Viewfinder';

const {height, width} = Dimensions.get('window')

class BarcodeScannerView extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);

    this._meshBoxTranslateYAnim = new Animated.Value(-this.props.viewFinderHeight - 10)

    this.state = {
      showLoading: true
    }
  }

  pause_scan(){
    this.is_pause_scan = true
  }

  resume_scan(){
    this.is_pause_scan = false
  }

  onChange(event) {
    if (!this.props.onBarCodeRead) {
      return;
    }

    if(this.is_pause_scan){
      return;
    }

    this.props.onBarCodeRead({
      type: event.nativeEvent.type,
      data: event.nativeEvent.data,
    });
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.startCamera();
      this.setState({showLoading: false})
      this.startMeshBoxTranslateYAnim();
    })
  }

  componentWillUnmount() {
    this._meshBoxTranslateYAnim = null
  }

  startMeshBoxTranslateYAnim() {
    if(this._meshBoxTranslateYAnim == null){
      return
    }
    this._meshBoxTranslateYAnim.setValue(-this.props.viewFinderHeight)
    Animated.timing(
      this._meshBoxTranslateYAnim,
      {
        toValue: 0,
        duration: 3000,
      }
    ).start(()=> this.startMeshBoxTranslateYAnim())
  }

  startCamera() {
    UIManager.dispatchViewManagerCommand(
        findNodeHandle(this.refs["RNBarcodeScannerView"]),
        UIManager.RNBarcodeScannerView.Commands.startCamera,
        [],
    );
  }

  loadingBox() {
    if(!this.state.showLoading){
      return <View style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 0,
        height: 0,
      }}></View>;
    }
    return (
      <View style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: width,
        height: height,
        backgroundColor: "#000",
        zIndex: -1,
        justifyContent: "center",
        alignItems: "center",
      }}>
        <View style={{flexDirection: "row"}}>
          <ActivityIndicator
            animating={true}
            color="#999"
            size={20}
            />
          <Text style={{color: "#999", fontSize: 16, paddingLeft: 10}}>正在加载...</Text>
        </View>
      </View>
    )
  }

  render() {
    let viewFinder = this.props.showViewFinder ? (
      <Viewfinder
        top={this.props.viewFinderTop}
        left={this.props.viewFinderLeft}
        color={this.props.viewFinderBorderColor}
        borderWidth={this.props.viewFinderBorderWidth}
        borderLength={this.props.viewFinderBorderLength}
        height={this.props.viewFinderHeight}
        width={this.props.viewFinderWidth}
      />
    ) : null;

    let meshBox = this.props.showViewFinder ? (
      <View style={{
        position: "absolute",
        top: this.props.viewFinderTop,
        left: this.props.viewFinderLeft,
        width: this.props.viewFinderWidth,
        height: this.props.viewFinderHeight,
        overflow: "hidden",
      }}>
        <Animated.Image
          style={{
            width: this.props.viewFinderWidth,
            height: this.props.viewFinderHeight,
            transform: [
              {
                translateY: this._meshBoxTranslateYAnim,
              }
            ]
          }}
          source={require("ares/app/assets/image/scanner_mesh.png")}
          />
      </View>
    ) : null;
    return (
      <RNBarcodeScannerView
        style={{flex: 1}}
        viewFinderHeight={this.props.viewFinderHeight}
        viewFinderWidth={this.props.viewFinderWidth}
        viewFinderTopLeftPointX={this.props.viewFinderTopLeftPointX}
        viewFinderTopLeftPointY={this.props.viewFinderTopLeftPointY}
        onChange={this.onChange}
        ref={"RNBarcodeScannerView"}>
        <View style={{flex: 1}} collapsable={false}>
          {viewFinder}
          {meshBox}
          {this.loadingBox()}
          {this.props.children}
        </View>
      </RNBarcodeScannerView>
    );
  }
}

BarcodeScannerView.propTypes = {
  ...View.propTypes,
  onBarCodeRead: PropTypes.func,
  showLoadingIndicator: PropTypes.bool,
  showViewFinder: PropTypes.bool,
  torchMode: PropTypes.string,
  viewFinderBackgroundColor: PropTypes.string,
  viewFinderBorderColor: PropTypes.string,
  viewFinderBorderWidth: PropTypes.number,
  viewFinderBorderLength: PropTypes.number,
  viewFinderShowLoadingIndicator: PropTypes.bool,
  viewFinderHeight: PropTypes.number,
  viewFinderWidth: PropTypes.number,
  viewFinderTopLeftPointX: PropTypes.number,
  viewFinderTopLeftPointY: PropTypes.number,
};

BarcodeScannerView.defaultProps = {
  showViewFinder: true,
};

var RNBarcodeScannerView = requireNativeComponent('RNBarcodeScannerView', BarcodeScannerView, {
  nativeOnly: {onChange: true}
});

module.exports = BarcodeScannerView;
