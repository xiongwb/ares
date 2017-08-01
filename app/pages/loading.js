/**
dujh
*/

import React from 'react'

import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StatusBar,
  Dimensions,
  AsyncStorage,
} from 'react-native'

import {
  STORAGE_KEYS,
} from 'AresConstant'

var full_width = Dimensions.get('window').width
var full_height = Dimensions.get('window').height

var TimerMixin = require('react-timer-mixin');

class Loading extends React.Component {
  //mixins: [TimerMixin],
  constructor(props) {
    super(props)
    var timer = null
  }

runToHomePage(){
  this.props.navigator.replace({id: "HomePage",params:{}})
}

runToDashBoard(){
  this.props.navigator.replace({id: "Dashboard",params:{}})
}

async  select(){

      let text = await AsyncStorage.getItem(STORAGE_KEYS.FIRST_USE);
        if(text !== "UNFIRST_USE"){
          AsyncStorage.setItem(STORAGE_KEYS.FIRST_USE,"UNFIRST_USE")
          this.timer = setTimeout(
              () => {this.runToHomePage()},
              1500
            );

        }else if (text === "UNFIRST_USE") {
          this.timer = setTimeout(
              () => {this.runToDashBoard()},
             1500
           );
        }
  }

  componentDidMount() {
    this.select()
  }

  render(){
    return(
      <View style={{flex:1,backgroundColor:'#ffffff'}}>
        <StatusBar backgroundColor='#ff0000'
            translucent={true}
            hidden={true}
            animated={true}/>
        <Image
         style={{width:full_width,height:full_height-20}}
         resizeMode="stretch"
         source={require('ares/app/assets/image/loading.png')}/>
      </View>
    )
  }


}

export default Loading
