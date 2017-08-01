
import React from 'react'

import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  ART,
  ListView,
  TouchableOpacity,
  ScrollView,
  Platform,
  
} from 'react-native'



var full_width = Dimensions.get('window').width
import WhiteSpace from 'antd-mobile/lib/white-space'
import Icon from 'react-native-vector-icons/FontAwesome'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import DefaultTabBar from 'react-native-scrollable-tab-view/DefaultTabBar'
import {
  BasePage,
  BackNavBar,
  Navbar,
} from 'AresComponent'
import {
  COMMON_STYLES,
} from 'AresConstant'

const COMMON_FONT_SIZE = 14
const COMMON_EDGE_LEFT = 10
const SMALL_FONT_SIZE  = 12
const DEFAULT_RED_COLOR = '#f5787c'

const mockLiskt = [

    {
    header:'ares/app/assets/image/picture01.png',
    name:'哈哈啊哈哈',
    stars:4.5,
    date:'2016年12月30日',
    content:'很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；',
    picture:[
      'ares/app/assets/image/picture01.png',
      'ares/app/assets/image/picture01.png',
      'ares/app/assets/image/picture01.png',
      'ares/app/assets/image/picture01.png',
      'ares/app/assets/image/picture01.png',
      'ares/app/assets/image/picture01.png',
    ],
    browse:2041,
    praise:21,
    kind:'有图'
  },
  {
    header:'ares/app/assets/image/picture01.png',
    name:'hahhaha',
    stars:3,
    date:'2016年12月30日',
    content:'很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；',
    picture:[],
    browse:2041,
    praise:1,
    kind:'最新'

  },
  {
    header:'ares/app/assets/image/picture01.png',
    name:'哈哈啊哈哈',
    stars:4.5,
    date:'2016年12月30日',
    content:'很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；',
    picture:[
      'ares/app/assets/image/picture01.png',
      'ares/app/assets/image/picture01.png',
      'ares/app/assets/image/picture01.png',
      'ares/app/assets/image/picture01.png',
      'ares/app/assets/image/picture01.png',
      'ares/app/assets/image/picture01.png',
    ],
    browse:2041,
    praise:21,
    kind:'有图'
  },
  {
    header:'ares/app/assets/image/picture01.png',
    name:'hahhaha',
    stars:3,
    date:'2016年12月30日',
    content:'很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；很好吃，还想再吃一次；',
    picture:[],
    browse:2041,
    praise:1,
    kind:'最新'

  },
  

]
const styles = StyleSheet.create({
  root: {
    backgroundColor: COMMON_STYLES.MAIN_BACKGROUND_COLOR,
    flex: 1,
  },
  head_img:{
    ...Platform.select({
      android:{
        height: 54,
      },
      ios:{
        height: 64,
      }
    })
  },

})

class AllEvaluation extends BasePage {
  constructor(props) {
    super(props)
    

  }
  createEvaluationImage(list){
    let imageSize = (full_width - 60 - 3 * COMMON_EDGE_LEFT)/3
    if (list.length != 0) {
      return(
        <View style={{flexDirection:'row',marginTop:10}}>
          <Image source={require('ares/app/assets/image/picture01.png')} style={{width:imageSize,height:imageSize,marginRight:COMMON_EDGE_LEFT}} />
          <Image source={require('ares/app/assets/image/picture01.png')} style={{width:imageSize,height:imageSize,marginRight:COMMON_EDGE_LEFT}} />
          <Image source={require('ares/app/assets/image/picture01.png')} style={{width:imageSize,height:imageSize,marginRight:COMMON_EDGE_LEFT,justifyContent:'flex-end',alignItems:'flex-end'}}>
            <View style={{height:15,width:20,backgroundColor:'black',margin:10,borderRadius:8,opacity:0.7}}>
              <Text style={{color:'white',backgroundColor:'transparent',textAlign:'center'}}>{list.length-3}</Text>
            </View>
          </Image>
        </View>
        )
    }
  }
    createStarsList(number){
    let starsList = []
    let integer = parseInt(number)
    let remainder = number * 2 % 2
    let half = remainder === 1 ? true : false
    for (let i=0; i<5;i++ ) {
      if (i < integer) {
        starsList.push(0)
      }else{
        if (half === true) {
          starsList.push(1)
          half = false
          continue
        }
        starsList.push(2)
      }
    }
    return starsList
  }

  

   order_data(rowData,rowID,whole){
     const h_line_1 = ART.Path();
    h_line_1.moveTo(10,1);
    h_line_1.lineTo(full_width,1);
     if(whole==rowData.kind||whole=='全部'){
      return(
           <View style={{marginTop:10}}>
        <View style={{backgroundColor:'white',flexDirection:'row'}}>
          <View>
            <View style={{backgroundColor:DEFAULT_RED_COLOR,borderRadius:20,width:40,height:40,margin:COMMON_EDGE_LEFT}} />
          </View>
          <View style={{marginTop:10}}>
            <View style={{height:40,justifyContent:'center'}}>
              <Text style={{flex:1,fontSize:COMMON_FONT_SIZE}}>{rowData.name}</Text>
              <View style={{flexDirection:'row',flex:1}}>
                {this.createStarsList(rowData.stars).map((s,i) => {
                  if (s === 0) {
                    return <Icon style={{marginRight:2}} name="star" size={13} color='#ffab1a'/>
                  }
                  if (s === 1) {
                    return <Icon style={{marginRight:2}} name="star-half-o" size={13} color='#ffab1a'/>
                  }
                  if (s === 2) {
                    return <Icon style={{marginRight:2}} name="star-o" size={13} color='#ffab1a'/>
                  }
                })}
                <Text style={{fontSize:SMALL_FONT_SIZE,color:'gray',marginLeft:10}}>{rowData.date}</Text>
              </View>
            </View>
            <View style={{height:30,width:full_width-60,marginTop:10}}>
              <Text style={{fontSize:SMALL_FONT_SIZE,flex:1}} numberOfLines={2} letterSpacing={10}>{rowData.content}</Text>
            </View>
            {this.createEvaluationImage(rowData.picture)}
            <View style={{flexDirection:'row',width:full_width-60,marginTop:10,marginBottom:10}}>
              <Text style={{fontSize:SMALL_FONT_SIZE,color:'gray'}}>浏览{rowData.browse}</Text>
              <View style={{position: "absolute",right: 15,top: 0,bottom: 0,flexDirection:'row'}}>
                <Icon style={{marginRight:5}} name="heart" size={14} color={DEFAULT_RED_COLOR}/>
                <Text style={{fontSize:SMALL_FONT_SIZE,color:'gray'}}>{rowData.praise}赞</Text>
              </View>
            </View>
          </View>
        </View>
        <ART.Surface width={full_width} height={1}>
          <ART.Shape d={h_line_1} stroke="#dddddd" strokeWidth={1} />
        </ART.Surface>
      </View>
     )}else{return null}
   }
     

      
 render(){
    let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(mockLiskt);
    return(
      <View style={styles.root}>
            <BackNavBar component={this} >全部评价</BackNavBar>
            <ScrollableTabView
              renderTabBar={() => <DefaultTabBar/>}
              tabBarUnderlineStyle={{backgroundColor: '#f29836'}}
              tabBarActiveTextColor='#f29836' 
              tabBarBackgroundColor='#ffffff' 
              tabBarTextStyle={{fontSize: 14,marginTop:10}}>
              <ScrollView tabLabel='全部' showsVerticalScrollIndicator={false}>
                <ListView
                  dataSource={dataSource}
                  renderRow={(rowData, rowID)=>this.order_data(rowData, rowID,'全部')}
                />
              </ScrollView>
                 <ScrollView tabLabel='有图' showsVerticalScrollIndicator={false}>
                <ListView
                  dataSource={dataSource}
                  renderRow={(rowData, rowID)=>this.order_data(rowData, rowID,'有图')}
                />
              </ScrollView>
               
                 <ScrollView tabLabel='最新' showsVerticalScrollIndicator={false}>
                <ListView
                  dataSource={dataSource}
                  renderRow={(rowData, rowID)=>this.order_data(rowData, rowID,'最新')}
                />
              </ScrollView>
              <ScrollView tabLabel='好评' showsVerticalScrollIndicator={false}>
                <ListView
                  dataSource={dataSource}
                  renderRow={(rowData, rowID)=>this.order_data(rowData, rowID,'好评')}
                />
              </ScrollView>
              <ScrollView tabLabel='中评' showsVerticalScrollIndicator={false}>
                <ListView
                  dataSource={dataSource}
                  renderRow={(rowData, rowID)=>this.order_data(rowData, rowID,'中评')}
                />
              </ScrollView>
          
             
            </ScrollableTabView>
                  
          </View>
   
    
    )
  }


}

export default AllEvaluation