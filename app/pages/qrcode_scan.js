import React from 'react'

import {
    Text,
    View,
    StyleSheet,
    Vibration,
    BackAndroid,
    Platform,
    Dimensions,
    StatusBar,
    InteractionManager,
    TouchableOpacity,
    Alert,
} from 'react-native'

import {
  BasePage,
  BackNavBar,
  DevelopTip,
} from 'AresComponent'

import BarcodeScanner from 'react-native-barcodescanner'
import Icon from 'react-native-vector-icons/FontAwesome'

const {height, width} = Dimensions.get('window')

let topOffset = 0;

let finderViewWidth  = width/7 * 5;
let finderViewHeight = finderViewWidth;

let finderViewTop    = (height - finderViewHeight)/2 + topOffset;
let finderViewLeft   = (width - finderViewWidth)/2;

let topMatteHeight = finderViewTop;

let leftMatteTop    = topMatteHeight;
let leftMatteWidth  = (width - finderViewWidth)/2;
let leftMatteHeight = finderViewHeight;

let rightMatteTop    = topMatteHeight;
let rightMatteWidth  = (width - finderViewWidth)/2;
let rightMatteHeight = finderViewHeight;

let bottomMatteHeight = height - topMatteHeight - finderViewHeight - StatusBar.currentHeight;
let bottomMatteHeight_h = height - topMatteHeight - finderViewHeight;
/**
* android 二维码扫描页面
* by fushang318
*/
export default class QRCodeScan extends BasePage {
  constructor(props) {
    super(props)

    this.state = {
      barcode: '',
      torchMode: 'off',
      type: '',
    }

    this._on_back_android = this.on_back_android.bind(this)
  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this._on_back_android)
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this._on_back_android)
    }
  }

  on_back_android(){
    this.props.navigator.pop()
    return true
  }

  barcode_received(e) {
    this.refs.barcodescanner.pause_scan()
    let arr = e.data.split("_")
    if(arr.length != 6){
      this.refs.barcodescanner.resume_scan()
      return;
    }

    let message = {
      brano:       arr[0],
      custno:      arr[1],
      time:        arr[2],
      way:         arr[3],
      count:       arr[4],
      randoncode:  arr[5],
    }
    this.props.navigator.replace({id: "ScanFinish", params: {message:message}})
  }

  render() {
    return(
        <BarcodeScanner
          ref="barcodescanner"
          onBarCodeRead={this.barcode_received.bind(this)}
          showViewFinder={true}
          viewFinderTop={finderViewTop}
          viewFinderLeft={finderViewLeft}
          viewFinderHeight={finderViewHeight}
          viewFinderWidth={finderViewWidth}
          viewFinderTopLeftPointX={finderViewLeft}
          viewFinderTopLeftPointY={finderViewTop + StatusBar.currentHeight}
        >


          <View style={styles.topMatte}></View>
          <View style={styles.bottomMatte}></View>
          <View style={styles.leftMatte}></View>
          <View style={styles.rightMatte}></View>
          <BackNavBar
            component={this}
            backText={"钱包"}
            backgroundColor={"transparent"}
            backTextColor={"#fff"}
            titleColor={"#fff"}
            
          />
          <View style={{
            backgroundColor:'transparent',
            flexDirection:'row',
            height:100,
            alignItems:'center',
            justifyContent:'center',
            position: "absolute",right: 0,bottom: 0,left:0,
          }}>
            <Text style={{size:20,color:'white'}}>
              放入框内，自动扫描
            </Text>
          </View>
        </BarcodeScanner>
    )
  }
}

const styles = StyleSheet.create({
  topMatte: {
    position: "absolute",
    left: 0,
    right: 0,
    height: topMatteHeight,
    backgroundColor: "#000b",
  },
  leftMatte: {
    position: "absolute",
    left: 0,
    top: leftMatteTop,
    width: leftMatteWidth,
    height: leftMatteHeight,
    backgroundColor: "#000b",
  },
  rightMatte: {
    position: "absolute",
    right: 0,
    top: rightMatteTop,
    width: rightMatteWidth,
    height: rightMatteHeight,
    backgroundColor: "#000b",
  },
  bottomMatte: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height:(Platform.Version >= 21)?bottomMatteHeight_h:bottomMatteHeight,
    backgroundColor: "#000b",
  },
})
