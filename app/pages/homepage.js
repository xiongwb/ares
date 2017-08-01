/**
dujh
*/

import React from 'react'

import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native'
var full_width = Dimensions.get('window').width
var full_height = Dimensions.get('window').height
var Swiper = require('react-native-swiper');

class BtforHome extends React.Component{
  constructor(props) {
    super(props)
  }

onPress(){
  this.props.navig.replace({id: "Dashboard", params: {}})
}

render(){
  return(
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <TouchableOpacity onPress={this.onPress.bind(this)} style={{width:full_width,height:full_height}}>

      </TouchableOpacity>
    </View>
  )
}
}

class HomePage extends React.Component {
  constructor(props) {
    super(props)

  }

  showImg(){
   var imageViews=[];
   imageViews.push(
     <Image
         key={0}
         style={{width:full_width,flex:1}}
         resizeMode ='contain'
         source={require('ares/app/assets/image/homepage1.jpg')}
         />,
     <Image
         key={1}
         style={{width:full_width,flex:1}}
         resizeMode="contain"
         source={require('ares/app/assets/image/homepage2.jpg')}
         />,
     <Image
         key={2}
         style={{width:full_width,flex:1}}
         source={require('ares/app/assets/image/homepage3.jpg')}
         resizeMode="contain"
         justifyContent='center'
         alignItems='center'
         ><BtforHome navig={this.props.navigator}></BtforHome></Image>
   )
   return imageViews;
 }

  like_view() {
    return(
        <Swiper
                  loop={false}
                  index={0}
                  showsPagination={false}
            >{this.showImg()}
        </Swiper>
      )
}


render(){
  return(
    <View style={{flex:1}}>
      <StatusBar backgroundColor='#ff0000'
          translucent={true}
          hidden={true}
          animated={true}/>
        <View>{this.like_view()}</View>
    </View>
  )
}
}

export default HomePage
