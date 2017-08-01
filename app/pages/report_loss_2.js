import React from 'react'

import {
  Text,
  View,
  TextInput,
  StyleSheet,
} from 'react-native'

import {
  BasePage,
  BackNavBar,
  PasswordInput,
  Dialog,
} from 'AresComponent'

import List from 'antd-mobile/lib/list'

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#f5f5f9",
    flex: 1,
    flexDirection: "column",
  },
  alert_box: {
    alignItems:'flex-start',
    marginHorizontal: 15,
    height:34,
    justifyContent:'center',
  },
  alert_text: {
    fontSize: 13,
  },
  list_text:{
    fontSize:13,
    color:'#333333',

  },
  pawdInput_box:{
    alignItems:'center'
  }
});

class ReportLoss2 extends BasePage {
  constructor(props) {
    super(props);
    this.state={
      
    };
  }


  render() {

    return(
      <View style={styles.root}>
        <BackNavBar component={this}>身份验证</BackNavBar>
        <View style={styles.alert_box}>
          <Text style={styles.alert_text}>请选择任一种方式进行身份验证</Text>
        </View>
        <List>
          <List.Item arrow="horizontal" onClick={() => {this.props.navigator.push({id:'ReportLossMsg',params:{phone:this.props.phone}})}}>
            <Text style={styles.list_text}>验证短信</Text>
          </List.Item>
          <List.Item arrow="horizontal" onClick={()=> this.refs.dialog.show()}>
            <Text style={styles.list_text}>验证支付密码</Text>
          </List.Item>
        </List>
        <Dialog
          ref="dialog"
          title="确认支付密码"
          content={
            <View style={styles.pawdInput_box}>
              <PasswordInput
                maxLength={6}
                onEnd={(text) => this.setState({payPwd:text})}
                value={this.state.payPwd}
               />
             </View>
          }
          leftButtonText="取消"
          rightButtonText="好的"
          onLeftButonClick={()=>{
            this.setState({payPwd: ""})
            this.refs.dialog.close()
          }}
          onRightButtonClick={()=>{
            this.refs.dialog.close()
            this.props.navigator.push({id:'ReportLossSuccess',params:{}})
          }}
        />
      </View>
    )
  }

}
export default ReportLoss2