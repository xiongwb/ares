import React from 'react'

import {
  Text,
  View,
  StyleSheet,
  ListView,
  Image,
  TouchableOpacity,
  ART,
  Dimensions,
} from 'react-native'

import {
  BasePage,
  BackNavBar,
} from 'AresComponent'
import {
  COMMON_STYLES,
} from 'AresConstant'

import Accordion from 'react-native-accordion'

const full_width = Dimensions.get('window').width

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#f5f5f9",
    flex: 1,
    flexDirection: "column",
  },

});

const data = []


class SmartService extends BasePage {
  constructor(props) {
    super(props);
    this.state={
      dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const vertical_line = ART.Path();
    vertical_line.moveTo(1,1);
    vertical_line.lineTo(1,86);
    const horizontal_line = ART.Path();
    horizontal_line.moveTo(1,1);
    horizontal_line.lineTo(full_width,1);
    return(
      <View style={styles.root}>
        <BackNavBar component={this}>疑难解答</BackNavBar>
        <View style={{paddingHorizontal:10,paddingTop:10,paddingBottom:10,borderColor:'#e1e1e1',borderBottomWidth:1}}>
          <Text style={{fontSize:18,color:'#1E1E1E'}}>常见问题</Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.render_row}
          style={styles.listView}
          />

      </View>
    )
  }

  fetchData() {
    data.push({question:'使用app如何进行挂失',answer:'在登录界面点击急救包，首先输入账号，然后选择短信验证或者支付密码验证进行挂失'})
    data.push({question:'能否在线解冻',answer:'抱歉，解冻机制暂时不能直接在线解冻'})
    data.push({question:'还有其他二三类账户相关问题',answer:'请到银行柜台咨询，谢谢！'})
    data.push({question:'使用app如何进行挂失',answer:'在登录界面点击急救包，首先输入账号，然后选择短信验证或者支付密码验证进行挂失'})
    data.push({question:'能否在线解冻',answer:'抱歉，解冻机制暂时不能直接在线解冻'})
    data.push({question:'还有其他二三类账户相关问题',answer:'请到银行柜台咨询，谢谢！'})
    data.push({question:'使用app如何进行挂失',answer:'在登录界面点击急救包，首先输入账号，然后选择短信验证或者支付密码验证进行挂失'})
    data.push({question:'能否在线解冻',answer:'抱歉，解冻机制暂时不能直接在线解冻'})
    data.push({question:'还有其他二三类账户相关问题',answer:'请到银行柜台咨询，谢谢！'})
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data),
    });
  }

  render_row(message) {
    var question = (
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',height:55,paddingHorizontal:10,borderColor:'#e1e1e1',borderBottomWidth:1}}>
        <Text style={{fontSize:14,color:'#1E1E1E'}}>{message.question}</Text>
        <Image source={require('ares/app/assets/image/arrow_down.png')} style={{marginRight:14}}/>
      </View>
    );
    var answer = (
      <View style={{paddingHorizontal:10,paddingTop:10,paddingBottom:10,borderColor:'#e1e1e1'}}>
        <Text style={{fontSize:14,color:'#8f8d8f'}}>{message.answer}</Text>
      </View>
    );
    return (
      <Accordion
        header={question}
        content={answer}
        easing="easeOutCubic"
        underlayColor="#dddddd"
      />
    );
  }
}
export default SmartService
