import React from 'react'

import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Platform,
    TextInput,
    ART,
   
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
/*一个带验证码的封装组件
*/
export default class AresTextInput extends React.Component {
 

  render() {
    const path = ART.Path();
    path.moveTo(1,1); //将起始点移动到(1,1) 默认(0,0)
    path.lineTo(1,40); //连线到目标点(300,1)
    return (
       <View style={{height:46, flexDirection:'row',backgroundColor:'#fff',borderWidth: 1,borderColor:'#DDDDDD'}}>
            <View style={{flex:1.5,justifyContent: "center",backgroundColor:'#fff'}}>
              <Text style={{fontSize:14,color:'#000',marginHorizontal: 16}}>{this.props.testinitl}</Text>
            </View>
            <View style={{flex:3,justifyContent: "center"}}>
              <TextInput
                style={{borderWidth: 1,backgroundColor:'#fff',flex:1 ,fontSize:14,padding:0}}
                onChangeText={(text) => this.setState({text})}
                onChange={this.props.onChange}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder={this.props.placeholder}
                borderColor='#fff'></TextInput>
            </View>
            <View style={{alignSelf:'center'}}>
              <ART.Surface width={1} height={40}>
                <ART.Shape d={path} stroke="#bbbbbb" strokeWidth={1} />
              </ART.Surface>
            </View>
            <TouchableOpacity onPress={this.props.onPress}>
            <View style={{flex:1.5,backgroundColor:'#fff',justifyContent: "center",marginHorizontal: 8}}>
              <Text style={{color:'#108EE9',fontSize:14,}}>{this.props.testinit}</Text>
            </View>
            </TouchableOpacity >
          </View>
    
    )
  }
}

