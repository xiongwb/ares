import React from 'react'

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  AsyncStorage,
  ScrollView,
} from 'react-native'
/*关于乾元大通介绍的功能页面*/
import {
  BasePage,
  BackNavBar,
  DevelopTip,
} from 'AresComponent'
import {
  COMMON_STYLES,
} from 'AresConstant'

import { createForm } from 'rc-form'
var full_width = Dimensions.get('window').width
var full_height = Dimensions.get('window').height
const styles = StyleSheet.create({
  root: {
    backgroundColor: COMMON_STYLES.MAIN_BACKGROUND_COLOR,
    flex: 1,
  },
 
});
class CompanyProfile extends BasePage  {
  constructor(props) {
    super(props)
    this.state={
     
    }
  }
  
  
  
  render() {
   const { getFieldProps } = this.props.form
    return(
      <View style={styles.root}>
        <BackNavBar   component={this}>乾元大通</BackNavBar>
        <Image source={require('ares/app/assets/image/2.png')}  style={[{width:full_width,height:full_height}]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{flex:1}}>
            <Text style={{color:'#101010',fontSize:16,marginHorizontal: 20,marginTop:20,backgroundColor:'transparent'}}>
                北京乾元大通软件有限公司（以下简称：乾元大通）
              是致力于金融软件与信息服务的厂商，专注为全球金融业提供金融IT系统服务。
              公司注册资本为1亿元人民币,总部设在中国北京,在加拿大设有子公司CloudLink公司,
              并在全国各主要城市设有分支机构和办事处。
            </Text>
            <Text style={{color:'#101010',fontSize:16,marginHorizontal: 20,marginTop:20,backgroundColor:'transparent'}}>
              公司前身CloudLink公司2009年成立于加拿大多伦多,
              主要创业成员为澳洲  Joint Services公司成员Alan先生、Sybase公司罗炽韬先生等成员，  
              于2009年在澳洲Joint Services公司原产品（即FNS原版本)基础上研发新一代核心系统及互联网金融系统。
            </Text>
            <Text style={{color:'#101010',fontSize:16,marginHorizontal: 20,marginTop:20,backgroundColor:'transparent'}}>
              根据中国银监会对银行业核心系统的自主可控的要求，
              公司于2013年在北京组建了一支精通国内银行业核心系统的资深成员，并正式在北京注册乾元大通软件有限公司。
            </Text>
          </View>
          </ScrollView >
        </Image>
      </View>
    )
  }

}

export default createForm()(CompanyProfile)
