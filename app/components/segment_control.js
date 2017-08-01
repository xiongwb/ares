/*
	@providesModule SegmentControl
*/
import React from 'react'

import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Platform,
    Dimensions,
    ART,
} from 'react-native'
const {Surface, Shape, Path} = ART;

var full_width = Dimensions.get('window').width

const TITLE_COMMENT_COLOR = 'black'
const TITLE_SELECTED_COLOR = '#ffab1a'
const LINE_COMMENT_COLOR = 'white'
const LINE_SELECTED_COLOR = '#ffab1a'

const colorList = [
  {
    titlecolor:TITLE_COMMENT_COLOR,
    linecolor:LINE_COMMENT_COLOR
  },
  {
    titlecolor:TITLE_SELECTED_COLOR,
    linecolor:LINE_SELECTED_COLOR
  }
]


 class SegmentControl extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      segmentState:0, //0普通，1显示的
      statusList:[]
    }
  }
  exchange(index){
    let changeList = []
    for (let i=0;i<this.state.statusList.length ;i++ ) {
      changeList.push(0)
    }
    changeList[index]=1
    this.setState({
      statusList:changeList
    })
    this.props.exchange(index)
  }

  componentWillMount(){
    for (let i=0;i<this.props.title_array.length ;i++ ) {
      if (i === 0) {
        this.state.statusList.push(1)
      }else {
        this.state.statusList.push(0)
      }
    }
  }
  creat_1_view(title,index){
    let count = this.props.title_array.length
    const horizontal_line_1 = ART.Path();
    horizontal_line_1.moveTo(30,1);
    horizontal_line_1.lineTo(full_width/count - 30,1);

    const horizontal_line_2 = ART.Path();
    horizontal_line_2.moveTo(1,1);
    horizontal_line_2.lineTo(full_width,1);

    let partStyle = this.state.statusList[index]
    let currentStyle = colorList[partStyle]

    return(
      <View style={{flex:1,height:this.props.style.height}}>
    		<View style={{justifyContent:'center',alignItems:'center',height:this.props.style.height-4}}>
          <TouchableOpacity  onPress={() => {this.exchange(index)}}>
            <View style={{justifyContent:'center',alignItems:'center'}}>
              <Text style={{textAlign:'center',color:currentStyle.titlecolor,fontSize:15}}>{title}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <ART.Surface width={horizontal_line_1} height={3}>
            <ART.Shape d={horizontal_line_1} stroke={currentStyle.linecolor} strokeWidth={3} />
          </ART.Surface>
        </View>
        <View>
          <ART.Surface width={horizontal_line_2} height={1}>
            <ART.Shape d={horizontal_line_2} stroke='#dddddd' strokeWidth={1} />
          </ART.Surface>
        </View>
      </View>
      )
  }

  render() {
    return (
        <View style={this.props.style}>
          {this.props.title_array.map((s,i) => {
            return this.creat_1_view(s,i)
          })}
        </View>
    )
  }



}

export default SegmentControl
