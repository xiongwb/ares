/**
dujh
*/


import React from 'react'

import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
  ART,
  Alert,
  TouchableOpacity,
  Platform,
  TextInput,
  ListView,
  FlatList,
} from 'react-native'

import {
  COMMON_STYLES,
} from 'AresConstant'

import {
  NavBar,
} from 'AresComponent'

import Icon from 'react-native-vector-icons/FontAwesome'

import _ from 'lodash';
import data from '../constants/city.json'
import WhiteSpace from 'antd-mobile/lib/white-space'
import WingBlank from 'antd-mobile/lib/wing-blank'


const {Surface, Shape, Path} = ART;

var full_width = Dimensions.get('window').width
var full_height = Dimensions.get('window').height

var common_color='#abaeb3'
var select_color='#cd9e6a'


const {width,height} = Dimensions.get('window')
const SECTIONHEIGHT = 30,ROWHEIGHT = 40
//这是利用lodash的range和数组的map画出26个英文字母
const letters = _
    .range('A'.charCodeAt(0), 'Z'.charCodeAt(0) + 1)
    .map(n => String.fromCharCode(n).substr(0))
    _.pull(letters,'O','V')//去掉o和V,这两个下面没有城市
let city=[]//城市的数组
var totalheight=[];//每个字母对应的城市和字母的总高度
var that = null


const styles = StyleSheet.create({
  root: {
    backgroundColor: COMMON_STYLES.MAIN_BACKGROUND_COLOR,
    //flex: 1,
    height: full_height,
    width: full_width
  },
  text: {
    fontSize: 30,
    color: "#000",
  },
  head_img:{
    backgroundColor: 'white',
    ...Platform.select({
      android:{
        height:(Platform.Version >= 21)?70:54,
        paddingTop:(Platform.Version >= 21)?0:0,
      },
      ios:{
        height: 74,
        paddingTop:20,
      }
    })
  },
  segment_text:{
    fontSize:17,
  },
  contentContainer: {
      width: width,
      backgroundColor: 'white',
  },
  letters: {
      position: 'absolute',
      height: height-170,
      top: 0,
      bottom: 0,
      right: 10,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
  },
  letter: {
      height: height*0.03,
      width: width*3/50,
      justifyContent: 'center',
      alignItems: 'center',

  },
  letterText: {
      textAlign: 'center',
      fontSize: height*1.1/50,
      color:'rgb(40,169,185)'
  },
  rowdata:{
      borderBottomColor:'#faf0e6',
      borderBottomWidth:0.5
  },
  body_body:{
    height:150,
    backgroundColor:'#fff',
    borderColor:'#dddddd',
    borderTopWidth:1,
    borderBottomWidth:1,
    borderLeftWidth:1,
    borderRightWidth:1,
    alignItems:'center',
    justifyContent: 'center',
  },
  body_head:{
    flexDirection:'row',
    flex:1,
    alignItems:'center',
    borderColor:'#dddddd',
    borderBottomWidth:1,
  },
  body_in:{
    flex:1,
    height:50,
    alignItems:'center',
    borderLeftWidth:1,
    borderRightWidth:1,
    borderColor:'#dddddd',
    justifyContent: 'center',
  },
  rowdatatext:{
      color:'gray',
  }
})

class NewLocation extends React.Component {

  constructor(props) {
    super(props)
    var getSectionData = (dataBlob, sectionID) => {
    return dataBlob[sectionID];
    };
    var getRowData = (dataBlob, sectionID, rowID) => {
    return dataBlob[rowID];
    };
    this.state = {
    is_around_selected:true,
    is_like_selected:false,
    around_text_color : select_color,
    like_text_color : common_color,
    around_line_color: select_color,
    like_line_color: '#fff',
    current_page:0,
    text:null,

    dataSource:new ListView.DataSource({
       getRowData: getRowData,
       getSectionHeaderData: getSectionData,
       rowHasChanged: (row1, row2) => row1 !== row2,
       sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
       }),
  }
  that = this

  }

  componentWillMount () {
      //把城市放到对应的字母中
      for(let j = 0;j<letters.length;j++){
          let each =[]
          for(let i = 0;i<data.CITIES.length;i++){
              if(letters[j] == data.CITIES[i].name_en.substr(0,1) ){
                  each.push(data.CITIES[i].name);
              }
          }
          let _city={}
          _city.index = letters[j]
          _city.name = each
          city.push(_city)
      }
  }
  componentDidMount () {
      var dataBlob = {};
      var sectionIDs = [];
      var rowIDs = [];

      for(let ii = 0;ii<city.length;ii++){
          var sectionName = 'Section ' + ii;
          sectionIDs.push(sectionName)
          dataBlob[sectionName] = letters[ii]
          rowIDs[ii] = [];

          for(let j = 0;j<city[ii].name.length;j++){
              var rowName = ii + '-' + j;
              rowIDs[ii].push(rowName)
              dataBlob[rowName] = city[ii].name[j]
          }
          //计算每个字母和下面城市的总高度，递增放到数组中
          // var eachheight = this.props.sectionHeight+this.props.rowHeight*newcity.length
          var eachheight = SECTIONHEIGHT+ROWHEIGHT*city[ii].name.length
          totalheight.push(eachheight)
      }
      this.setState({
              dataSource:this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
          })
  }

  renderRow(rowData,rowId){
      return (
          <TouchableOpacity
          onPress = {() => {that.selectedLocation(rowData)}}
          key={rowId}
          style={{height:ROWHEIGHT,justifyContent:'center',paddingLeft:20,paddingRight:30}}
           >
           <View style={styles.rowdata}><Text style={styles.rowdatatext}>{rowData}</Text></View>

          </TouchableOpacity>
      )
  }
  selectedLocation(rowData){
    //this.props.navigator.replace({id: "Dashboard",params: {rowData}})
    //Alert.alert('您选择的城市是：',rowData)
    this.props.city.state.cityName = rowData
    this.props.navigator.pop()
  }

  renderSectionHeader = (sectionData, sectionID) => {
      return (
      <View style={{height:SECTIONHEIGHT,justifyContent:'center',paddingLeft:5}}>
          <Text  style={{color:'rgb(40,169,185)',fontWeight:'bold'}}>
          {sectionData}
          </Text>
      </View>
      )
  }
  // render ringht index Letters
  renderLetters(letter, index) {
      return (
          <TouchableOpacity key={index} activeOpacity={0.6} onPress={()=>{this.scrollTo(index)}}>
              <View style={styles.letter}>
                  <Text style={styles.letterText}>{letter}</Text>
              </View>
          </TouchableOpacity>
      )
  }
/*      //回调改变显示的城市
  changedata=(cityname)=>{
      this.props.changeCity(cityname)
  }
*/
  //touch right indexLetters, scroll the left
  scrollTo=(index)=>{
      let position=0;
      for(let i = 0;i<index;i++){
          position += totalheight[i]
      }
      this._listView.scrollTo({
          y:position
      })
  }


  financial_overview(){
    return(
      <View style={{flex:1}}>
          <ListView
          contentContainerStyle={styles.contentContainer}
          ref={listView => this._listView = listView}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderSectionHeader={this.renderSectionHeader}
          enableEmptySections={true}
          initialListSize={500}
          />
          <View style={styles.letters}>
              {letters.map((letter, index) => this.renderLetters(letter, index))}
          </View>
      </View>
      )
  }


  search(text){
    Alert.alert('城市',text)
  }

  createHeader(){
    return(
        <NavBar
          backgroundColor={'#fff'}
          leftContent={
            <View style={{backgroundColor:'transparent'}}>
              <TouchableOpacity onPress = {() => this.props.navigator.pop()}>
                <View style={{flexDirection:'row'}}>
                  <Icon name="angle-left" size={30} color='gray'/>
                </View>
              </TouchableOpacity>
            </View>
          }
          titleContent={
            <View style={{backgroundColor:'#f0f0f0',height:30,width:full_width-70,borderRadius:5,flexDirection:'row'}}>
              <TouchableOpacity onPress={() => that.search(that.state.text)}>
                <Icon style={{marginLeft:13,marginTop:5}} name="search" size={20} color='gray'/>
              </TouchableOpacity>
              <TextInput
                underlineColorAndroid='transparent'
                style={{flex:1,padding:0,marginLeft:10}}
                placeholder="输入所在地"
                onChangeText={(text) => this.setState({text})}
                underlineColorAndroid='transparent'
              />
            </View>
          }
        />
    )
  }

  createBody(){
    return(
      <View style={styles.body_body}>
        <View style={styles.body_head}>
          <View style={{flex:1,alignItems:'center'}}>
            <TouchableOpacity>
              <Text>
                佳木斯
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.body_in}>
            <TouchableOpacity>
              <Text>
                哈尔滨
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flex:1,alignItems:'center'}}>
            <TouchableOpacity>
              <Text>
                北京
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.body_head}>
          <View style={{flex:1,alignItems:'center'}}>
            <TouchableOpacity>
              <Text>
                天津
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.body_in}>
            <TouchableOpacity>
              <Text>
                深圳
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flex:1,alignItems:'center'}}>
            <TouchableOpacity>
              <Text>
                重庆
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flexDirection:'row',flex:1,alignItems:'center'}}>
          <View style={{flex:1,alignItems:'center'}}>
            <TouchableOpacity>
              <Text>
                鹤岗
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.body_in}>
            <TouchableOpacity>
              <Text>
                双鸭山
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flex:1,alignItems:'center'}}>
            <TouchableOpacity>
              <Text>
                漠河
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  render() {
    return(
      <View style={styles.root}>
        <StatusBar hidden={false} barStyle='dark-content' translucent={true} backgroundColor="#ffffff">
        </StatusBar>
      {this.createHeader()}
      <WhiteSpace size='md' />
      <WingBlank size='md'>
      {this.createBody()}
      </WingBlank>
      <WhiteSpace size='md' />
      <View style={{width:full_width,flex:1}}>
        {this.financial_overview()}
      </View>
    </View>
  )
  }
}

export default NewLocation
