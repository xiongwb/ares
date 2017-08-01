import React from 'react'

import {
  Dimensions,
  Text,
  View,
  Alert,
  StyleSheet,
} from 'react-native'

import {
  BasePage,
  BackNavBar,
} from 'AresComponent'


import { createForm } from 'rc-form'
import Button from 'antd-mobile/lib/button'
import InputItem from 'antd-mobile/lib/input-item'
import Modal from 'antd-mobile/lib/modal'


var full_height = Dimensions.get('window').height

console.disableYellowBox = true;

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
    flex: 1,
  },
  title_box: {
    height: full_height/4,
    justifyContent: "center",
    alignItems:'center',
  },
  title_text: {
    fontSize: 30,
    color:'#333333',
  },
  alert_box: {
    alignItems:'flex-start',
    marginHorizontal: 10,
  },
  alert_text: {
    fontSize: 12,
    color:'#dedede',
  },
  sign_up_btn: {
    marginTop: 20,
    marginHorizontal: 10,
  }
});

class ReportLoss1 extends BasePage {
  constructor (props) {
    super(props)
    this.state = {
      sign_up_params_validate: false
    }
  }

  on_change() {
    setTimeout(()=>{
      this.props.form.validateFields((error, value) => {
        if(error == null){
          this.setState({sign_up_params_validate: true,phone:value.phone})
        }else{
          this.setState({sign_up_params_validate: false})
        }
      });
    },0)
  }

  render() {
    const { getFieldProps } = this.props.form

    return(
      <View style={styles.root}>
        <BackNavBar component={this} >挂失</BackNavBar>
        
        <View style={styles.title_box}>
          <Text style={styles.title_text}>快速挂失</Text>
        </View>
        
        <View>
          <InputItem
            {...getFieldProps('phone', {
              initialValue: '',
              onChange: this.on_change.bind(this),
              rules: [{required: true, pattern: /^[0-9]{3} [0-9]{4} [0-9]{4}$/}]
            })}
            type="phone"
            placeholder="手机号"
          >
          +86
          </InputItem>
        </View>
        <View style={styles.alert_box}>
          <Text style={styles.alert_text}>请在手机丢失或出现资金风险时及时挂失</Text>
        </View>
        <Button 
          style={styles.sign_up_btn} 
          type="primary"
          disabled={!this.state.sign_up_params_validate}
          onClick={()=>this.props.navigator.push({id:'ReportLoss2',params:{phone:this.state.phone}})}
        >
          立即挂失
        </Button>
        
      </View>
    )
  }
}

export default createForm()(ReportLoss1)