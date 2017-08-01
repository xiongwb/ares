import React from 'react'
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  AsyncStorage,
} from 'react-native'

/*个人信息第一个页面
      张乐   2016-10-27*/


import AresAPI from 'AresAPI'
import Button from 'antd-mobile/lib/button'
import List from 'antd-mobile/lib/list';
import { createForm } from 'rc-form'
import ImagePicker  from 'antd-mobile/lib/image-picker';

import {
  STORAGE_KEYS,
} from 'AresConstant'

import {
  BasePage,
  BackNavBar,
  PushLogin,
  StringUtils,
} from 'AresComponent'
import {
  COMMON_STYLES,
} from 'AresConstant'

var full_height = Dimensions.get('window').height
const styles = StyleSheet.create({
 root: {
    backgroundColor: COMMON_STYLES.MAIN_BACKGROUND_COLOR,/*页面的布局和颜色*/
    flex: 1,
  },
  font:{
     fontSize: 17,
    color: "#101010",
  },
   next_btn: {
    marginTop: 18,

  },
  fontl:{
     fontSize: 16,

  },

});
 class PersonalNformation extends BasePage {
    constructor(props) {
    super(props)
    this.state={
        custName: '',
        sex:'',
        idNo: '',
        phone:'',
        xingb:'',

    }
  }
  componentWillMount() {
   AsyncStorage.getItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
      let hash = JSON.parse(value)
      if (!!hash) {
        if (!!hash && !!hash && !!hash.phone) {
            this.setState({phone:hash.phone})
        }
        if (!!hash && !!hash.custNo) {
          //获取到后台的个人资料，姓名，性别，身份证号，手机号。
          AresAPI.Person.getPersonInfoPersonInfo({custno:hash.custNo}).done((res_json, res) => {
                    if(res_json.retCode == 1){
                      this.setState({custName:res_json.custName})
                      this.setState({sex:res_json.sex})
                      this.setState({idNo:res_json.idNo})
                      let bankphone = StringUtils.phoneNumberData2Human(res_json.phone)
                      this.setState({phone:bankphone})
                        if(this.state.sex ==0){
                          this.setState({xingb:'男'})
                        }else if(this.state.sex==1){
                          this.setState({xingb:'女'})
                        }
                    }else{
                      Alert.alert('错误提示', res_json.retMsg, [{ text: '确定'}])
                    }
                  })

        }
      }
    })

  }

  render() {
  	const  getFieldProps  = this.props.form;
  	const Brief = List.Item.Brief;
    return(
    	<View style={styles.root}>
    	  <BackNavBar component={this}  >个人资料</BackNavBar>
        <View style={styles.next_btn}>
          <List.Item
            extra={<Image source={require('ares/app/assets/image/head.png')} style={{width:25,height:25}} />}
            ><Text style={styles.font}>头像</Text>
          </List.Item>
          <List.Item
            extra={<Text style={styles.fontl}>
            {this.state.custName}
            </Text>}
            style={styles.font}
            ><Text style={styles.font}>
            姓名
            </Text>
          </List.Item>
          <List.Item
            extra={<Text style={styles.fontl}>{this.state.idNo}</Text>}
            ><Text style={styles.font}>
            身份证号
            </Text>
          </List.Item>
          <List.Item
            extra={<Text style={styles.fontl}>{this.state.phone}</Text>}
            ><Text style={styles.font}>
            手机号
            </Text>
          </List.Item>
        </View>
      </View>

    );
  }
}
export default createForm()(PersonalNformation)
