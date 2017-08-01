import React from 'react'

import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Platform,
} from 'react-native'

import List from 'antd-mobile/lib/list'
 class ListItems extends React.Component {
  
  render() {
    return (
      
      <List.Item 
      style={{paddingBottom:-1, borderBottomWidth:0.5,borderTopWidth:0.5,borderColor:'#dddddd'}}
      arrow={this.props.arrowDirection}
      extra={this.props.extraPrompt}
      onClick={this.props.onClick}>
        <View>
          <Text style={{fontSize:16,color:this.props.color}}>{this.props.title}</Text>
        </View>
      </List.Item>
    
    )
  }
}

export default ListItems