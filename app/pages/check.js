
import React from 'react'

import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native'
/*查看账单页面
张乐   2016-10-27*/
import {
  BasePage,
  BackNavBar,
} from 'AresComponent'
import {
  COMMON_STYLES,
} from 'AresConstant'

import Icon from 'antd-mobile/lib/icon'
import Steps from 'antd-mobile/lib/steps'
import ImagePicker from 'antd-mobile/lib/image-picker'
import WingBlank from 'antd-mobile/lib/wing-blank'
import WhiteSpace from 'antd-mobile/lib/white-space'
import Card from 'antd-mobile/lib/card'
import List from 'antd-mobile/lib/list';
var full_height = Dimensions.get('window').height
const styles = StyleSheet.create({
  root: {
    backgroundColor: COMMON_STYLES.MAIN_BACKGROUND_COLOR,/*页面的布局和颜色*/
    flex: 1,
  },
  title_box: {
    height: full_height/6,
    justifyContent: "center",
    alignItems:'center',
    backgroundColor:'#FFF'
  },

  t_box: {
   justifyContent: "center",
    alignItems:'center',

  },
 
  title_text: {
    fontSize: 14,
    color: "#000",
  },
  phone_text: {
    fontSize: 22,
    color: "#000",
  },
  chu_text: {
    fontSize: 13,
    color: "#000",
  },
  z_text: {
    fontSize: 13,
    color: "#1056B4",
  },
  p_text: {
    fontSize: 13,

  },

  next_btn: {
    marginTop: 0,
    marginHorizontal: 15,
    backgroundColor:'#FFF'
  }
  });
class check extends BasePage {



  render() {
    const Step = Steps.Step;
    const  getFieldProps  = this.props.form;
    return(
      <View style={styles.root}>
        <BackNavBar component={this}  >转账进度</BackNavBar>
        <View style={styles.title_box}>
          <View style={{flexDirection:'row'}}>
            <Image source={require('ares/app/assets/image/yinhangka.png')} style={{width:25,height:25}} />
            <Text style={styles.title_text}>中国建设银行</Text>
          </View>
          <Text style={styles.phone_text}>1212元</Text>
          <Text style={styles.z_text}>交易成功</Text>
        </View>
        <View>
          <List.Item
                extra="提现说明"
              ><Text>快速提现</Text>
          </List.Item>
          <View style={{flexDirection:'row',backgroundColor:'#fff',}}>
            <View style={{flex:1,backgroundColor:'#fff',marginHorizontal: 15,marginTop: 10,}}>
              <Text style={styles.p_text}>处理进度</Text>
              <Text style={{marginTop: 170,}}>提现到</Text>
            </View>
            <View style={{flex:2,justifyContent: "center",marginHorizontal: 15,marginTop: 10,}}>
              <WingBlank >
                <Steps size="small" current={2} style={styles.z_text}>
                  <Step title="付款成功"  />
                  <Step title="银行处理" />
                  <Step title="到账成功"  />
                </Steps>
              </WingBlank>
            </View>
            <View style={{flex:1.5,backgroundColor:'#fff',marginTop: 10,}}>
              <Text style={{fontSize:13}}>12-31 10:02</Text>
              <Text style={{marginTop: 60,}}>12-31 10:02</Text>
              <Text style={{marginTop: 60,}}>12-31 10:02</Text>
            </View>
          </View>
          <List.Item
            extra="12-31 10:09"
            arrow="horizontal"
            ><Text>创建时间</Text>
          </List.Item>
        </View>
      </View>
    )
  }
}

export default check
