import React from 'react'

import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
   AsyncStorage,
} from 'react-native'

/*更改手机号的第一步骤的页面
      张乐   2016-10-26*/

import { createForm } from 'rc-form'
import AresAPI from 'AresAPI'
import Button from 'antd-mobile/lib/button'

import {
  BasePage,
  StringUtils,
  BackNavBar,
  PushLogin,
} from 'AresComponent'

import {
  COMMON_STYLES,
  STORAGE_KEYS,
} from 'AresConstant'

var full_height = Dimensions.get('window').height
const styles = StyleSheet.create({
  root: {
    backgroundColor: COMMON_STYLES.MAIN_BACKGROUND_COLOR,//页面的布局和颜色
    flex: 1,
  },

});
class PhoneChange extends BasePage {
  constructor (props) {
    super(props)
    this.state = {
      phone:'',
      bankphone:'',
    }
  }

  //点击按钮 触发这个方法跳转到更改手机的第二个画面
on_submit() {
        this.props.navigator.push({id: "PhoneChange1", params: {data:this.state.phone,my_center:this.props.my_center}})

  }
  //当进入这个页面的时候激活这个事件，获取到登陆的手机号。
componentWillMount() {
   AsyncStorage.getItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
      let hash = JSON.parse(value)
      if (!!hash) {
        if (!!hash && !!hash.tokenModel && !!hash.phone) {
            this.setState({phone:hash.phone})
        }
        if (!!hash && !!hash.custNo) {
          //获取到后台的个人资料，手机号。
          AresAPI.Person.getPersonInfoPersonInfo({custno:hash.custNo}).done((res_json, res) => {
                    if(res_json.retCode == 1){
                      let bankphone = StringUtils.phoneNumberData2Human(res_json.phone)
                      this.setState({bankphone:bankphone})

                    }else{
                      Alert.alert('错误提示', res_json.retMsg, [{ text: '确定'}])
                    }
                  })

        }
      }
    })

  }
  render() {
    const { getFieldProps } = this.props.form
    return(
        <View style={styles.root}>
          <BackNavBar component={this}>手机号变更</BackNavBar>
          <View style={{height:46, flexDirection:'row',backgroundColor:'#fff',borderWidth: 1,borderColor:'#DDDDDD',marginTop:22}}>
            <View style={{flex:2.5,justifyContent: "center",}}>
              <Text style={{fontSize:16,color:'#101010',marginHorizontal:16}}>手机号</Text>
            </View>
            <View style={{flex:1,justifyContent: "center",}}>
              <Text style={{fontSize:13,}}>{this.state.bankphone}</Text>
            </View>
          </View>
          <View  style={{marginTop:16,marginHorizontal: 16}}>
            <Button
             style={styles.next_btn}
             type="primary"
             onClick={this.on_submit.bind(this)}
             >更改手机号
            </Button>
          </View>
        </View>
    )
  }
}


export default createForm()(PhoneChange)
