import React from 'react'

import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Platform,
    TextInput,
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'



export default class AresTextInput extends React.Component {


  render() {
    styles = StyleSheet.create({
  input: {
    height:46,
    flexDirection:'row',
    backgroundColor:'#fff',
    borderWidth:this.props.borderWidth,
    borderLeftWidth:this.props.borderLeftWidth,
    borderTopWidth:this.props.borderTopWidth,
    borderRightWidth:this.props.borderRightWidth,
    borderBottomWidth:this.props.borderBottomWidth,
    borderColor:'#DDDDDD'
  },

});
    return (
        <View style={styles.input}>
            <View style={{flex:1.5,justifyContent: "center",backgroundColor:'#fff'}}>
              <Text style={{fontSize:16,color:"#101010",marginHorizontal: 16}}>{this.props.title}</Text>
            </View>
            <View style={{flex:4}}>
              <TextInput
               placeholder={this.props.placeholder}
              style={{padding:0,flex:1,fontSize:16,backgroundColor:'#fff' }}
              onChangeText={this.props.onChangeText}
              onChange={this.props.onChange}
              editable={this.props.editable}
              placeholderTextColor={this.props.placeholderTextColor}
              onChange={this.props.onChange}
              keyboardType={this.props.keyboardType}
              maxLength={this.props.maxLength}
              underlineColorAndroid='rgba(0,0,0,0)'
              multiline={this.props.multiline}
              ><Text style={{fontSize:16,color:"#101010",marginHorizontal: 16}}>{this.props.name}</Text></TextInput>
            </View>
          </View>
    )
  }
}
