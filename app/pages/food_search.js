/**
* dujh & xiong
*/

import React from 'react'

import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  ART,
  StatusBar,
  Alert,
  TouchableOpacity,
  Platform,
  TextInput,
  ListView,
  AsyncStorage,
} from 'react-native'

import {
  COMMON_STYLES,
} from 'AresConstant'

import {
  NavBar,
} from 'AresComponent'

import Icon from 'react-native-vector-icons/FontAwesome'
import WhiteSpace from 'antd-mobile/lib/white-space'
import WingBlank from 'antd-mobile/lib/wing-blank'

var full_width = Dimensions.get('window').width
var full_height = Dimensions.get('window').height

const {width,height} = Dimensions.get('window')

const styles = StyleSheet.create({
  root: {
    backgroundColor: COMMON_STYLES.MAIN_BACKGROUND_COLOR,
    //flex: 1,
    height: full_height,
    width: full_width
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
})

class FoodSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text:null,
    }
  }

  componentWillMount(){
    AsyncStorage.getItem('searchHistory', (error, value)=>{
      let hash = value!=null&&value.length>0?value.split(','):[];
      this.setState({
        searchHistory:hash
      })
    })
  }

  componentDidMount(){
    AsyncStorage.getItem('searchHistory', (error, value)=>{
      let hash = value!=null&&value.length>0?value.split(','):[];
      this.setState({
        searchHistory:hash
      })
    })
  }

  search(text){
    AsyncStorage.getItem('searchHistory', (error, value)=>{
      let hash = value!=null&&value.length>0?value.split(','):[];
      let flag = true;
      for(let i in hash){
        if(hash[i]==text){
          flag = false;
          break;
        }
      }
      if(flag&&text!=null&&text.length>0){
        if(hash.length<5){
          hash.push(text);
        }else{
          hash.splice(0,1);
          hash.push(text);
        }
      }
      let searchHistory = hash.join(',');
      AsyncStorage.setItem('searchHistory',searchHistory);
      this.setState({
        searchHistory:hash
      })
    })
  }

createHeader(){
  return(
      <NavBar
        backgroundColor={'#fff'}
        titleContent={
          <View style={{backgroundColor:'#f0f0f0',height:30,width:full_width-80,borderRadius:5,flexDirection:'row',marginRight:40}}>
            <TouchableOpacity onPress={() => this.search(this.state.text)}>
              <Icon style={{marginLeft:13,marginTop:5}} name="search" size={20} color='gray'/>
            </TouchableOpacity>
            <TextInput
              underlineColorAndroid='transparent'
              style={{flex:1,padding:0,marginLeft:10}}
              placeholder="海底捞火锅"
              onChangeText={(text) => this.setState({text})}
            />
          </View>
        }
        rightContent={
          <TouchableOpacity onPress={() => this.props.navigator.pop()}>
            <Text style={{fontSize:17}}>
              取消
            </Text>
          </TouchableOpacity>
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
              肯德基
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.body_in}>
          <TouchableOpacity>
            <Text>
              人人乐
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex:1,alignItems:'center'}}>
          <TouchableOpacity>
            <Text>
              物美超市
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body_head}>
        <View style={{flex:1,alignItems:'center'}}>
          <TouchableOpacity>
            <Text>
              西式快餐
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.body_in}>
          <TouchableOpacity>
            <Text>
              西餐
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex:1,alignItems:'center'}}>
          <TouchableOpacity>
            <Text>
              面包
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flexDirection:'row',flex:1,alignItems:'center'}}>
        <View style={{flex:1,alignItems:'center'}}>
          <TouchableOpacity>
            <Text>
              远洋未来广场
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.body_in}>
          <TouchableOpacity>
            <Text>
              大悦城
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex:1,alignItems:'center'}}>
          <TouchableOpacity>
            <Text>
              爱琴海
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

createFoot(){
  if(this.state.searchHistory!=null&&this.state.searchHistory.length>0){
    let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.state.searchHistory);
    return (
      <View style={{alignItems:'center',backgroundColor:'white',borderTopWidth:1,borderTopColor:'#DDDDDD',borderBottomWidth:1,borderBottomColor:'#DDDDDD'}}>
          <ListView
            dataSource={dataSource}
            renderRow={this.renderRow}
          />
          <TouchableOpacity onPress={this.clearSearchHistory.bind(this)}>
            <Text style={{marginTop:7,marginBottom:7}}>清除历史记录</Text>
          </TouchableOpacity>
      </View>
        )
  }
}

clearSearchHistory(){
  AsyncStorage.removeItem('searchHistory',(error)=>{
    this.setState({searchHistory:null});
  });
}

renderRow(rowData, sectionID, rowID){
        return (
                <View style={{
                  height:40,
                  width:full_width,
                  flexDirection:'row',
                  alignItems:'center',
                  marginLeft:13,
                  borderBottomWidth:1,
                  borderBottomColor:'#DDDDDD'
                }}>
                    <Icon name="search" size={20} color='gray'/>
                    <Text style={{marginLeft:10}}>
                      {rowData}
                    </Text>
                </View>
            );
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
      <View style={{marginLeft:10}}>
        <Text>
          搜索历史
        </Text>
      </View>
      <WhiteSpace size='md' />
      {this.createFoot()}
    </View>
)
}
}


export default FoodSearch
