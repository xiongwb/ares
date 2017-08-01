import React from 'react'
 import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ART,
  AsyncStorage,
  ListView,
  ScrollView,
  Text
} from 'react-native'
import {
  Navbar,
  BackNavBar,
  StringUtils,
  BasePage,
} from 'AresComponent'
import {
  STORAGE_KEYS,
  COMMON_STYLES,
} from 'AresConstant'
// @陈耀霆，收货地址页面
import Icon from 'react-native-vector-icons/FontAwesome'
const styles = StyleSheet.create({
  root: {
    backgroundColor: COMMON_STYLES.MAIN_BACKGROUND_COLOR,
    flex: 1,

  },
  text: {
   fontSize:12,
   color:"#101010",
   marginLeft: 6

  }

});

class ReceivingAddress extends BasePage  {
  
  constructor(props) {
  super(props);
   var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  this.state = {
   dataSource: ds.cloneWithRows([{name:'哈哈',phone:13012354678}, {name:'哈哈',phone:13012354678}]),
  };
}


select_address(rowData, sectionID, rowID){
  
    return (  
        <View style={{marginBottom:10,alignItems: 'center',flexDirection:'row',height:70,backgroundColor:'#ffffff'}} onPress={() => this.on_Press("Asset")}> 
           <Image style={{marginLeft:16}} source={require('ares/app/assets/image/position01.png')} />
           <View>
            <View style={{flexDirection:'row'}} >
              <Text style={{fontSize:12,color:"#101010",marginHorizontal: 16}}>{rowData.name}</Text>
              <Text style={{fontSize:12,color:"#101010"}}>{rowData.phone}</Text>     
            </View>
            <View style={{flexDirection:'row',marginTop:5}} >
              <Text style={{ fontSize:12,color:"#101010", marginLeft:16}}>哈哈哈</Text>
              <Text style={styles.text}>天津</Text>
              <Text style={styles.text}>天津市</Text>
              <Text style={styles.text}>西青区</Text>
              <Text style={styles.text}>XXXX10号楼</Text>
              <Text style={styles.text}>3门302</Text>  
            </View>
           </View> 
          </View>
       
      );                                
    }
  render(){

    return(
      <View style={styles.root}>
        <BackNavBar component={this} rightContent={<Text onPress={() => this.props.navigator.push({id:"ManagementAddress"})} style={{fontSize:16,color:'white',justifyContent:'center'}}>管理</Text> }  backgroundColor={COMMON_STYLES.NAVIBAR_COLOR} backTextColor="#FFFFFF" titleColor="#FFFFFF">选择收货地址</BackNavBar>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.select_address.bind(this)}
          />
        </ScrollView>
     </View>
    
    )
  }
}
export default ReceivingAddress