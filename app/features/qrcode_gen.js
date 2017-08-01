import React from 'react'

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  BackAndroid,
  Platform,
} from 'react-native'

import QRCode from 'react-native-qrcode'

import {DefaultHeadBar} from '../features/head_bar'

export default class QrcodeGen extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      text: 'http://www.zhihu.com'
    }
    this._on_back_android = this.on_back_android.bind(this)
  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this._on_back_android);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this._on_back_android);
    }
  }

  on_back_android(){
    this.props.navigator.pop()
    return true
  }

  render() {
      return (
          <View style={styles.root}>
            <DefaultHeadBar navigator={this.props.navigator} title="二维码生成" leftType="back" />

            <View style={styles.input_box}>
              <Text style={styles.label}>输入文字，实时生成二维码</Text>
              <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => this.setState({text: text})}
                  value={this.state.text}
              />            
            </View>

            <View style={styles.qrcode_box}>
              <QRCode
                value={this.state.text}
                size={200}
                bgColor='black'
                fgColor='white' />
            </View>

          </View>
      )
  }

}

var styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
  input_box: {
    margin: 20,
  },
  label: {
    fontSize: 20,
    height: 30,
  },
  input: {
    fontSize: 20,
    height: 40,
    padding: 5,
    backgroundColor: "#eee",
  },
  qrcode_box: {
    alignItems: 'center',
  }
})