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
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

var full_width = Dimensions.get('window').width
let viewWidth = full_width-15-75-10-10-20-15
const DEFAULT_RED_COLOR = '#f5787c'

export default class AresEvaluate extends React.Component {
 constructor(props){
    super(props);
    this.state = {
        iconString4:'star-o',
      iconColor:'#ff9088',
       iconString1:'star-o',
        iconString2:'star-o',
        iconString3:'star-o',
        iconString5:'star-o',
    }
   

  }
  clickStartButton1(){
    if (this.state.iconString1 === 'star-o') {
      this.setState({
        iconString1:'star',
        iconColor:'#f5787c',
        iconString4:'star-o',
        iconString2:'star-o',
        iconString3:'star-o',
        iconString5:'star-o',
      })
    }
    if (this.state.iconString1 === 'star') {
      this.setState({
        iconString1:'star',
        iconColor:'#ff9088',
        iconString4:'star-o',
        iconString2:'star-o',
        iconString3:'star-o',
        iconString5:'star-o',
      })
    }
  }
 clickStartButton2(){
    if (this.state.iconString2 === 'star-o') {
      this.setState({
        iconString1:'star',
        iconColor:'#f5787c',
        iconString4:'star-o',
        iconString2:'star',
        iconString3:'star-o',
        iconString5:'star-o',
      })
    }
    if (this.state.iconString2 === 'star') {
      this.setState({
        iconString1:'star',
        iconColor:'#ff9088',
        iconString4:'star-o',
        iconString2:'star',
        iconString3:'star-o',
        iconString5:'star-o',
      })
    }
  }
   clickStartButton3(){
    if (this.state.iconString3 === 'star-o') {
      this.setState({
        iconString1:'star',
        iconColor:'#f5787c',
        iconString4:'star-o',
        iconString2:'star',
        iconString3:'star',
        iconString5:'star-o',
      })
    }
    if (this.state.iconString3 === 'star') {
      this.setState({
        iconString1:'star',
        iconColor:'#ff9088',
        iconString4:'star-o',
        iconString2:'star',
        iconString3:'star',
        iconString5:'star-o',
      })
    }
  }
   clickStartButton4(){
    if (this.state.iconString4 === 'star-o') {
      this.setState({
        iconString1:'star',
        iconColor:'#f5787c',
        iconString4:'star',
        iconString2:'star',
        iconString3:'star',
        iconString5:'star-o',
      })
    }
    if (this.state.iconString4 === 'star') {
      this.setState({
        iconString1:'star',
        iconColor:'#ff9088',
        iconString4:'star',
        iconString2:'star',
        iconString3:'star',
        iconString5:'star-o',
      })
    }
  }
   clickStartButton5(){
    if (this.state.iconString5 === 'star-o') {
      this.setState({
        iconString1:'star',
        iconColor:'#f5787c',
        iconString4:'star',
        iconString2:'star',
        iconString3:'star',
        iconString5:'star',
      })
    }
    if (this.state.iconString5 === 'star') {
      this.setState({
        iconString1:'star',
        iconColor:'#ff9088',
        iconString4:'star',
        iconString2:'star',
        iconString3:'star',
        iconString5:'star',
      })
    }
  }
  render() {
   
const path = ART.Path();
    path.moveTo(1,1); //将起始点移动到(1,1) 默认(0,0)
    path.lineTo(1,40); //连线到目标点(300,1)
    const line = ART.Path();
    path.moveTo(1,1); //将起始点移动到(1,1) 默认(0,0)
    path.lineTo(full_width,1); //连线到目标点(300,1)
    return (
        <View >
             <View style={{height:50,flexDirection:'row',backgroundColor:'#fff'}}>
            <View style={{justifyContent:'center',marginHorizontal:14}}>
                <Text style={{fontSize:14,marginLeft:10,color:'#707070'}}>{this.props.title}</Text>
            </View>
        <View style={{flexDirection:'row',backgroundColor:'#fff'}}>
          <TouchableOpacity onPress={()=>{this.clickStartButton1()}}>
            <View style={{marginTop:15,marginHorizontal:10,justifyContent:'center',}}>
            <Icon name={this.state.iconString1} size={24} color={this.state.iconColor} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{this.clickStartButton2()}}>
            <View style={{marginTop:15,marginHorizontal:10,justifyContent:'center',}}>
                <Icon name={this.state.iconString2} size={24} color={this.state.iconColor} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{this.clickStartButton3()}}>
            <View style={{marginTop:15,marginHorizontal:10,justifyContent:'center',}}>
                <Icon name={this.state.iconString3} size={24} color={this.state.iconColor} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{this.clickStartButton4()}}>
            <View style={{marginTop:15,marginHorizontal:10,justifyContent:'center',}}>
                <Icon name={this.state.iconString4} size={24} color={this.state.iconColor} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{this.clickStartButton5()}}>
            <View style={{marginTop:15,marginHorizontal:10,justifyContent:'center',}}>
                <Icon name={this.state.iconString5} size={24} color={this.state.iconColor} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <ART.Surface width={full_width} height={1}>
        <ART.Shape d={path} stroke="#dddddd" strokeWidth={1} />
      </ART.Surface>
          </View>
    )
  }
}

