
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {
  BasePage,
  BackNavBar,
  DevelopTip,
} from 'AresComponent'


import Icon from 'react-native-vector-icons/FontAwesome'

export default class TestBackNavBar extends BasePage {
  render() {
    return (
      <View style={styles.root}>
        <BackNavBar
          component={this} // 必传参数
          backText={"钱包"} // 可选参数
          backgroundColor={"#108EE9"} // 可选参数
          backTextColor={"#fff"} // 可选参数
          titleColor={"#fff"} // 可选参数

          // 可选参数
          rightContent={
            <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}} onPress={() => {
                DevelopTip.alert()
            }}>
              <Icon style={{flex: 1}} name="plus" size={22} color={"#fff"} />
            </TouchableOpacity>

          }
          >测试标题栏</BackNavBar>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#ccc",
  },
  nav_bar: {
    backgroundColor: "#ccc",
  }
});
