

import React from 'react'

import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Platform,
    TextInput,
    ART,
     Dimensions,
     Image,
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

export default class AresYuanquan extends React.Component {
 constructor(props){
    super(props);
    this.state = {
   iconString:'circle-o',
    iconColor:'#dddddd',
    }
   

  }
 tupian(){
     if(this.state.iconString==='circle-o'){
         this.setState({iconString:'check-circle',iconColor:'#ff9088',
        })
     }
      if(this.state.iconString==='check-circle'){
         this.setState({iconString:'circle-o',iconColor:'#dddddd',})
     }
 }

  render() {
  
    return (
        <View>
            <View style={{ marginTop:10,flexDirection:'row',marginHorizontal:16,alignItems:'center',}}>
               <TouchableOpacity  onPress={()=>{this.tupian()}}>
                     <Icon name={this.state.iconString} size={20} color={this.state.iconColor} />
                </TouchableOpacity>  
                <Text style={{fontSize:14,marginLeft:10}}>{this.props.title}</Text>
            </View>
         </View>
    )
  
}
}
