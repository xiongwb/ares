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
import Radio from 'antd-mobile/lib/radio'
import { createForm } from 'rc-form'

import {
  BackNavBar,
  BasePage,
  Dialog,
  PasswordInput,
} from 'AresComponent'
import {
  COMMON_STYLES,
} from 'AresConstant'

import AresAPI from 'AresAPI'


const RadioItem = Radio.RadioItem;
const styles = StyleSheet.create({
  root: {
      backgroundColor: COMMON_STYLES.MAIN_BACKGROUND_COLOR,
    flex: 1,
  }
});
class Type3Account3 extends BasePage {
     constructor (props) {
    super(props);
    this.state = {
     isShow:false,
     initialValue:false,
      value:10,
      bal:0,
      password:0
  }
 }
  on_change(value) {
    if(value){
       this.setState({initialValue:value})
       this.setState({isShow:true})
       this.props.type3_account.state.quota = this.state.value*100+'元/笔'
       AresAPI.Settings.settingsNoPwdSet({
        acctno:this.props.account3
       })
       if(this.state.value==10){
        AresAPI.Settings.settingsSetLim({ acctno:this.props.account3,eachlim:1000})
              

              }

  }else{
      this.setState({initialValue:value});
      this.setState({isShow:false})
      AresAPI.Settings.settingsNoPwdClose({
        acctno:this.props.account3
      })
      this.props.type3_account.state.quota = '已关闭'

      this.props.navigator.pop()
    }
}
componentWillMount(){

   AresAPI.Settings.settingsGetLimFlag({
      acctno:this.props.account3,
   }).done((res_json,res) => {
        if(res_json.noflag==1){
          this.setState({value:res_json.eachlim/100})

          this.on_change(true)
        }else{
          if(res_json.eachlim==null){
            this.setState({value:10})
          }else{
          this.setState({value:res_json.eachlim/100})
         }
       }
    })
  }


  render() {
     const { getFieldProps } = this.props.form;
     if(this.state.isShow){
    return(
        <View style={styles.root}>
            <BackNavBar component={this} backText="钱包" backgroundColor={COMMON_STYLES.NAVIBAR_COLOR} backTextColor="#FFFFFF" titleColor="#FFFFFF">余额</BackNavBar>
            <View style={{alignItems:'center'}}>
               <Text style={{fontSize:10}}>开启最高免密支付最高仅支持1000元的支付</Text>
            </View>
               <List>
                  <List.Item
                   extra={
                    <Switch
                    value={this.state.initialValue}
                    onValueChange = {this.on_change.bind(this)} />
                      }
                  ><Text style={styles.text}>开启免密支付限额</Text>
                  </List.Item>
                </List>
                 <View style={{marginLeft:14}}>
               <Text style={{fontSize:10}}>请选择限制支付金额</Text>
              </View>
               <List >
                <RadioItem
                 checked={this.state.value === 1}
                   onChange={() => {
                      this.setState({ value: 1 });
                      AresAPI.Settings.settingsSetLim({
                        acctno:this.props.account3,
                        eachlim:100
                      })
                      this.props.type3_account.state.quota = 100+'元/笔'
                      this.props.navigator.pop()
                  }}

                  data-seed="logId"
                >
                  100元
                </RadioItem>
                <RadioItem
                  checked={this.state.value === 2}
                   onChange={() => {
                      this.setState({ value: 2 });
                        AresAPI.Settings.settingsSetLim({
                        acctno:this.props.account3,
                        eachlim:200
                        })
                      this.props.type3_account.state.quota = 200+'元/笔'
                      this.props.navigator.pop()
                  }}

                >
                  200元
                </RadioItem>
                <RadioItem
                  checked={this.state.value === 3}
                  onChange={() => {
                      this.setState({ value: 3 });
                        AresAPI.Settings.settingsSetLim({
                        acctno:this.props.account3,
                        eachlim:300
                        })
                      this.props.type3_account.state.quota = 300+'元/笔'
                      this.props.navigator.pop()
                  }}
                >
                 300元
                </RadioItem>
                <RadioItem
                  checked={this.state.value === 4}
                  onChange={() => {

                      this.setState({ value: 4 });
                        AresAPI.Settings.settingsSetLim({
                        acctno:this.props.account3,
                        eachlim:400
                        })
                      this.props.type3_account.state.quota = 400+'元/笔'
                      this.props.navigator.pop()

                  }}
                >
                  400元
                </RadioItem>
                <RadioItem
                  checked={this.state.value === 5}
                  onChange={() => {
                      this.setState({ value: 5 });
                      AresAPI.Settings.settingsSetLim({
                        acctno:this.props.account3,
                        eachlim:500
                        })
                      this.props.type3_account.state.quota = 500+'元/笔'
                      this.props.navigator.pop()
                  }}
                >
                  500元
                </RadioItem>
                <RadioItem
                  checked={this.state.value === 6}
                  onChange={() => {
                      this.setState({ value: 6 });
                      AresAPI.Settings.settingsSetLim({
                        acctno:this.props.account3,
                        eachlim:600
                      })
                      this.props.type3_account.state.quota = 600+'元/笔'
                      this.props.navigator.pop()
                  }}
                >
                  600元
                </RadioItem>
                <RadioItem
                  checked={this.state.value === 7}
                  onChange={() => {
                      this.setState({ value: 7 });
                      AresAPI.Settings.settingsSetLim({
                        acctno:this.props.account3,
                        eachlim:700
                        })
                      this.props.type3_account.state.quota = 700+'元/笔'
                      this.props.navigator.pop()
                  }}
                >
                  700元
                </RadioItem>
                <RadioItem
                  checked={this.state.value === 8}
                  onChange={() => {
                      this.setState({ value: 8 });
                      AresAPI.Settings.settingsSetLim({
                        acctno:this.props.account3,
                        eachlim:800
                        })
                      this.props.type3_account.state.quota = 800+'元/笔'
                      this.props.navigator.pop()
                  }}
                >
                  800元
                </RadioItem>
                <RadioItem
                  checked={this.state.value === 9}
                  onChange={() => {
                      this.setState({ value: 9 });
                      AresAPI.Settings.settingsSetLim({
                        acctno:this.props.account3,
                        eachlim:900
                        })
                      this.props.type3_account.state.quota = 900+'元/笔'
                      this.props.navigator.pop()
                  }}
                >
                  900元
                </RadioItem>
                <RadioItem
                  checked={this.state.value === 10}
                  onChange={() => {
                      this.setState({ value: 10 });
                      AresAPI.Settings.settingsSetLim({
                        acctno:this.props.account3,
                        eachlim:1000
                        })
                      this.props.type3_account.state.quota = 1000+'元/笔'
                      this.props.navigator.pop()
                  }}
                >
                  1000元
                </RadioItem>

              </List>
            </View>
        )}else{
           return(
          <View style={styles.root}>
            <BackNavBar component={this} backText="钱包" backgroundColor={COMMON_STYLES.NAVIBAR_COLOR} backTextColor="#FFFFFF" titleColor="#FFFFFF">余额</BackNavBar>
            <View style={{alignItems:'center'}}>
               <Text style={{fontSize:10}}>开启最高免密支付最高仅支持1000元的支付</Text>
              </View>
               <List>
                  <List.Item
                    extra={
                    <Switch
                    value={this.state.initialValue}
                    onValueChange = {this.on_change.bind(this)} />
                      }><Text style={styles.text}>开启免密支付限额</Text>
                  </List.Item>
                </List>

          </View>

        )
      }
    }
  }
export default createForm()(Type3Account3)
