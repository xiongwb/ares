import React from 'react'

import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Platform,
    TextInput,
    Dimensions,
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

var full_height = Dimensions.get('window').height
var full_width = Dimensions.get('window').width


export default class ReasonTextInput extends React.Component {


  render() {
    styles = StyleSheet.create({
  input: {
    height:46,
    flexDirection:'row',
    backgroundColor:'#fff',
    marginTop:this.props.marginTop,
    borderWidth:this.props.borderWidth,
    borderLeftWidth:this.props.borderLeftWidth,
    borderTopWidth:this.props.borderTopWidth,
    borderRightWidth:this.props.borderRightWidth,
    borderBottomWidth:this.props.borderBottomWidth,
    borderColor:'#DDDDDD',
  },

});
    return (
        <View style={styles.input}>
            <View style={{width:130,justifyContent: "center"}}>
              <Text style={{fontSize:14,color:'#3d4245',marginLeft:15,}}>{this.props.title}</Text>
            </View>
            <View style={{width:full_width-130,justifyContent: "center"}}>
              <TextInput
              style={{margin:0,padding:0,flex:1,fontSize:14}}
              onChangeText={this.props.onChangeText}
              onChange={this.props.onChange}
              value={this.props.value}
              multiline={this.props.multiline}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholderTextColor={this.props.placeholderTextColor}
              placeholder={this.props.placeholder}
              editable={this.props.editable}
              textAlign={this.props.textAlign}
              ></TextInput>
            </View>
          </View>
    )
  }
}
