import React from 'react'

import {
  Alert,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import {
  BasePage,
  BackNavBar,
} from 'AresComponent'

import Icon from 'react-native-vector-icons/FontAwesome'
import Button from 'antd-mobile/lib/button'
import List from 'antd-mobile/lib/list'
import Popup from 'antd-mobile/lib/popup'

const Brief = List.Item.Brief;

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#f5f5f9",
    flex: 1,
    flexDirection: "column",
  },
  dialog_root:{
    height:277,
    flex: 1,
  },
  confirm_close_box:{
    paddingHorizontal: 10,
    justifyContent:'flex-end',
    alignItems:'flex-start',
  },
  confirm_msg_box:{
    marginTop:63,
    alignItems:'center',
  },
  confirm_msg:{
    fontSize:16,
  },
  dialog_btn_box:{
    paddingHorizontal: 63,
    marginTop:55,
  },
  list_text:{
    fontSize:16,
    color:'#333333',

  },
  list_box:{
    marginTop:12,
  }
});

class AidKit extends BasePage {
  constructor(props) {
    super(props);
    this.state={

    };
  }

  confirm(){
    Alert.alert('提示','抱歉，解冻机制暂时不能直接在线解冻，点击确定进入帮助页面',[
      {text:'取消'},{text:'确定',onPress:()=>{this.success()}},
    ])
    /**
    Popup.show(<View style={styles.dialog_root}>
                  <View style={styles.confirm_close_box}>
                      <TouchableOpacity onPress={() => Popup.hide()}>
                        <Icon name='times' size={25} color="#A9A9A9" />
                      </TouchableOpacity>
                  </View>
                  <View style={styles.confirm_msg_box}>
                    <Text style={styles.confirm_msg}>抱歉，解冻机制暂时不能直接在线解冻</Text>
                  </View>
                  <View style={styles.dialog_btn_box}>
                    <Button type='primary' onClick={this.success.bind(this)}>联系客服</Button>
                  </View>
              </View>,{maskClosable:true,animationType:'slide-up'})
              */
  }

  success(){
    //Popup.hide()
    this.props.navigator.push({id:'SmartService',params:{}})
  }

  render() {

    return(
      <View style={styles.root}>
        <BackNavBar component={this}>急救包</BackNavBar>
        <View style={styles.list_box}>
          <List>
            <List.Item arrow="horizontal" onClick={()=>{this.props.navigator.push({id:'ReportLoss1',params:{}})}}>
              <View style={{height:67,justifyContent:'center'}}>
                <Text style={styles.list_text}>快速挂失</Text>
                <Text>挂失后资金不进不出、任何人无法登陆</Text>
              </View>
            </List.Item>
            <List.Item arrow="horizontal" onClick={()=>{this.confirm()}}>
              <View style={{height:67,justifyContent:'center'}}>
                <Text style={styles.list_text}>解除挂失</Text>
                <Text>确保账户安全后，可解除挂失</Text>
              </View>
            </List.Item>
          </List>
        </View>
      </View>
    )
  }

}
export default AidKit
