import React, { Component, PropTypes } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  NativeModules,
  Alert,
  ART,
} from 'react-native'
import {
  BackNavBar,
  BasePage,
  Wedge,
  StringUtils,

} from 'AresComponent'

import List from 'antd-mobile/lib/list'
import WhiteSpace from 'antd-mobile/lib/white-space'

const {Surface,Group,Path,Shape} = ART;

class Asset extends BasePage {

  circular(){
    var sent = this.props.bal.state.amt === 0 ? 360 : (this.props.bal.state.amt3 / this.props.bal.state.amt) * 360

    const path = new Path()
                .moveTo(55,30)
                .arc(0,99,20)
                .arc(0,-99,20)
                .close();
      return (
        <View style={{height:180,flex:1,justifyContent:'center',marginLeft:20}}>
          <Surface width={130} height={130}>
            <Group>
                <Wedge
                 outerRadius={65}
                 startAngle={0}
                 endAngle={360}
                 originX={50}
                 originY={50}
                 innerRadius={23}
                 fill="f05a49"/>
               <Wedge
                 outerRadius={65}
                 startAngle={0}
                 endAngle={sent}
                 originX={50}
                 originY={50}
                 innerRadius={23}
                 fill="28aa8e"/>
            </Group>
          </Surface>
        </View>
      )
  }


  render() {
      let amt = StringUtils.moneyFormatData2Money(this.props.bal.state.amt)
      let amt2 = StringUtils.moneyFormatData2Money(this.props.bal.state.amt2)
      let amt3 = StringUtils.moneyFormatData2Money(this.props.bal.state.amt3)


      return (
          <View style={styles.root}>
            <BackNavBar component={this}>资产总览</BackNavBar>
            <List>
              <List.Item style={{height:40}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                  <Text style={{flex:1,fontSize:18,textAlign:'left'}}>总资产</Text>
                  <Text style={{flex:1,fontSize:18,textAlign:'right'}}><Text>¥</Text>{amt}</Text>
                </View>
              </List.Item>
              <List.Item style={{height:180}}>
                <View style={{flexDirection:'row'}}>
                  {this.circular()}
                  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:13,marginBottom:5,color:'#f05a49'}}>二类账户</Text>
                    <Text style={{fontSize:13,marginTop:5,color:'#28aa8e'}}>三类账户</Text>
                  </View>
                </View>
              </List.Item>
            </List>
            <WhiteSpace size='md' />
            <List>
              <List.Item>
                <View>
                  <Text style={{fontSize:15}}>资产明细</Text>
                </View>
              </List.Item>
              <List.Item>
                <View style={{flexDirection:'row'}}>
                  <Text style={{flex:1,marginLeft:20,fontSize:18}}>二类账户</Text>
                  <Text style={{flex:1,textAlign:'right',fontSize:18}}><Text>¥</Text>{amt2}</Text>
                </View>
              </List.Item>
              <List.Item>
                <View style={{flexDirection:'row'}}>
                  <Text style={{flex:1,marginLeft:20,fontSize:18}}>三类账户</Text>
                  <Text style={{flex:1,textAlign:'right',fontSize:18}}><Text>¥</Text>{amt3}</Text>
                </View>
              </List.Item>
            </List>
          </View>
      )
  }

}

var styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F5F5F9',
  },
})
export default Asset
