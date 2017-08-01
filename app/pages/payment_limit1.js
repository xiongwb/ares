import React from 'react'

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  BackAndroid,
  Platform,
  Dimensions,
  Switch 
} from 'react-native'

import List from 'antd-mobile/lib/list'
import {DefaultHeadBar} from '../features/head_bar'
import { createForm } from 'rc-form'
import BackNavBar from '../components/back_nav_bar'
import BasePage from '../components/base_page'
import Dialog from '../components/dialog'
import Password from '../components/passwordInput'


const styles = StyleSheet.create({
  root: {
    backgroundColor: "#F5F5F9",
    flex: 1,
  },
  text: {
    color:"#000000",
    fontSize:16,
  }
});
class paymentlimit1 extends BasePage {
  constructor () {
    super();
    this.state = {     
     isShow:false,
     initialValue:false,
  }
 }
  /*判断限制金额按钮是否显示*/
  on_change(value) {
    if(value){  
       this.setState({initialValue:value});  
       this.refs.dialog.show(); 
  }else{     
      this.setState({initialValue:value}); 
     this.setState({isShow:false});     
    }
}

  render() {
     const { getFieldProps } = this.props.form;
     if(this.state.isShow){
      return ( 
      <View style={styles.root}>
        <BackNavBar component={this}>支付限额</BackNavBar>
        <View style={{marginTop:17}}>
          <List>
            <List.Item
              extra={
              <Switch
              value={this.state.initialValue} 
              onValueChange = {this.on_change.bind(this)} />
                }><Text style={styles.text}>开启支付限额</Text>
            </List.Item>
          </List>
          <View style={{alignItems:'center'}}>
            <Text style={{fontSize:10}}>开启最高免密支付最高仅支持1000元的支付</Text>
          </View>
          <List>
            <List.Item 
              onClick={()=> {this.props.navigator.push({id: "paymentlimit2", params: []})}}
              arrow="horizontal"
              ><Text style={styles.text} >限制金额</Text>
            </List.Item>
          </List>
        </View>

      </View>   
  );
     }else{
      return ( 
      <View style={styles.root}>
        <BackNavBar component={this}>支付限额</BackNavBar>
        <View style={{marginTop:17}}>
          <List>
             <List.Item
                extra={
                <Switch
                value={this.state.initialValue} 
                onValueChange = {this.on_change.bind(this)} />
                 }><Text style={styles.text}>开启支付限额</Text>
            </List.Item>
          </List>
          <View style={{alignItems:'center'}}>
            <Text style={{fontSize:10}}>开启最高免密支付最高仅支持1000元的支付</Text>
          </View>    
        </View>
        <Dialog
            ref="dialog"
            title="请输入交易密码"
            content={           
              <View style={{alignItems:'center'}}>
                    <Password
                    maxLength={6}
                  ></Password>
              </View>
            }
            leftButtonText="取消"
            rightButtonText="好的"
            onLeftButonClick={()=>{
              this.setState({text: ""})
              this.refs.dialog.close()
              this.setState({initialValue:false});
            }}
            onRightButtonClick={()=>{
              this.refs.dialog.close()
              this.setState({isShow:true}); 
            }}
          />
    </View>
     
  );


     }

    
       
  }
}
export default createForm()(paymentlimit1)   