/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  PanResponder,
  KeyboardAvoidingView,
  Dimensions,
  Image,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native';
import Picker from 'react-native-picker';
import area  from '../constants/area.json'
import Icon from 'react-native-vector-icons/FontAwesome'
var full_width = Dimensions.get('window').width
var full_height = Dimensions.get('window').height
export default class DialogPicker   extends Component {
  constructor(props) {
    super(props);
    this.state = {modalVisible: false};
  }

  show(){
    this.setState({modalVisible: true})
  }

  close(){
    this.setState({modalVisible: false})
  }


  componentWillMount() {
    this._panResponder = PanResponder.create({
        // 要求成为响应者：
        onStartShouldSetPanResponder: (event, gestureState) => true,
        onMoveShouldSetPanResponder: (event, gestureState) => true,

        // 父节点请求获取响应权，返回 false,表示不给放权
        // 这样可以屏蔽页面右滑动返回上一次的手势时间
        onPanResponderTerminationRequest: (event, gestureState) => false,
    })
  }
  picker(){


    Picker.init({
        pickerConfirmBtnText:'确认',
        pickerCancelBtnText:'取消',
        pickerTitleText:this.props.title,
        pickerData:this.props.data,
        onPickerConfirm: data => {

           this.props.onPress(data)


        },
        onPickerCancel: data => {
             this.props.onPress(false)
        },
        onPickerSelect: data => {

        }
    });
         if(this.props.isShow==1){
              Picker.show();
         }
 }
  on_press(){
    this.props.click()
  }
  render() {
    let promise = new Promise(function(resolve, reject) {

          resolve();
        });

        promise.then(this.picker.bind(this));


    return (
        <Modal
          onRequestClose={()=>{}}
          style={styles.modal}
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible}
          >
          <TouchableWithoutFeedback
          onPress={this.on_press.bind(this)}
          style={{flex:1}}
         >
            <KeyboardAvoidingView  behavior={"padding"} style={styles.container}>

            </KeyboardAvoidingView>
         </TouchableWithoutFeedback>
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
    padding: 40,
    backgroundColor: '#0008',
  },
  innerContainer: {
    height:250,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modal: {
  },
  modalTitleBox: {
    justifyContent: "center",
    height:51,
    alignItems: "center",
    flexDirection:'row',
    width:full_width-80
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
