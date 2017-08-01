/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  Modal,
  PanResponder,
  KeyboardAvoidingView,
} from 'react-native';


export default class Dialog extends Component {
  constructor(props) {
    super(props);
    this.state = {modalVisible: false};
    that = this
  }

  show(){
    this.setState({modalVisible: true})
  }

  close(){
    this.setState({modalVisible: false})
  }

  componentWillMount() {

    //this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    this._panResponder = PanResponder.create({
        // 要求成为响应者：
        onStartShouldSetPanResponder: (event, gestureState) => true,
        onMoveShouldSetPanResponder: (event, gestureState) => true,

        // 父节点请求获取响应权，返回 false,表示不给放权
        // 这样可以屏蔽页面右滑动返回上一次的手势时间
        onPanResponderTerminationRequest: (event, gestureState) => false,
    })
  }

  componentDidMount(){
    //this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount () {
    //this.keyboardDidHideListener.remove();
  }

  _keyboardDidHide () {
    that.setState({modalVisible: false})
  }

  render() {
    return (
        <Modal
          onRequestClose={()=>{}}
          style={styles.modal}
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible}
          >
          <KeyboardAvoidingView behavior={"height"} style={styles.container}>
            <View style={styles.innerContainer}>
              <View style={styles.modalTitleBox}>
                <Text>{this.props.title || "标题内容"}</Text>
              </View>
              <View style={styles.modalContentBox}>
                {this.props.content}
              </View>
              <View style={styles.modalButtonBox}>
                <View style={styles.leftButtonBox}>
                  <TouchableOpacity style={{alignItems: "center", justifyContent: "center", flex: 1}} onPress={() => {
                    if(this.props.onLeftButonClick){
                      this.props.onLeftButonClick()
                    }
                  }}>
                    <Text style={{fontSize: 16, color: "#108EE9"}}>{this.props.leftButtonText || "取消"}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.rightButtonBox}>
                  <TouchableOpacity style={{alignItems: "center", justifyContent: "center", flex: 1}} onPress={() => {
                    if(this.props.onRightButtonClick){
                      this.props.onRightButtonClick()
                    }
                  }}>
                    <Text style={{fontSize: 16, color: "#108EE9"}}>{this.props.rightButtonText || "确定"}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    marginTop: 20,
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal:40,
    marginTop:0,
    backgroundColor: '#0008',
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modal: {
  },
  modalTitleBox: {
    marginTop: 20,
    alignItems: "center",
  },
  modalContentBox: {
    marginTop: 20,
    marginBottom: 20,
  },
  modalButtonBox: {
    height: 45,
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  leftButtonBox: {
    flex:1,
    borderRightWidth: 1,
    borderColor: "#ddd",
  },
  rightButtonBox: {
    flex: 1,
  }
});
