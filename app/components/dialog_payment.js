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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
var full_width = Dimensions.get('window').width
export default class DialogPayment  extends Component {
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
              <TouchableOpacity style={{position:'absolute',left:10,top:12, justifyContent: "center", flex: 1}} onPress={() => {
                    if(this.props.onLeftButonClick){
                      this.props.onLeftButonClick()
                    }
                  }}>
                <Icon   name="remove" size={25} color='#e5e5e5'/>
               </TouchableOpacity>
              <Text style={{color:"#101010",fontSize:16}}>{this.props.title || "标题内容"}</Text>
              </View>
               <View style={{justifyContent: "center",borderColor:'#e5e5e5',borderBottomWidth:1,borderTopWidth:1,height:90,alignItems:'center',width:full_width-80}}>
                <Text style={{color:"#101010",fontSize:16}}>需付款</Text>
                <Text style={{color:"#101010",fontSize:30}}>￥28.90</Text>
              </View>
              <View style={{borderColor:'#e5e5e5',borderBottomWidth:1,height:50,alignItems:'center',flexDirection:'row',width:full_width-80}}>
                <Image source={this.props.source} style={{marginLeft:20}} />
                <Text style={{marginLeft:15,color:"#101010",fontSize:16}}>{this.props.text}</Text>
               </View>

              <View style={styles.modalContentBox}>
                {this.props.content}
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
    padding: 40,
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
