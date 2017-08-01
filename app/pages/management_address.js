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
// @陈耀霆，地址管理页面
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
var full_width = Dimensions.get('window').width
const  True = require('ares/app/assets/image/red_check01.png')
const  False = require('ares/app/assets/image/uncheck01.png')


const mockLiskt=[{name:'哈哈1',phone:13012354678,default:0}, {name:'哈哈1',phone:13012354678,default:0}, {name:'哈哈',phone:13012354678,default:1}]
class ReceivingAddress extends BasePage  {
  
  constructor(props) {
  super(props);
   var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  this.state = {
   isDefault:[]
  };
}
componentWillMount(){
  let iteration
  for(let i=0;i<mockLiskt.length;i++){
    if(mockLiskt[i].default==1){        
          iteration=mockLiskt[0]
          mockLiskt[0]=mockLiskt[i]
          mockLiskt[i]=iteration
          this.state.isDefault[0]={title:'默认设置',color:'#ffa726',isSelected:True}
          
    }
    if(mockLiskt[i].default==0){
          this.state.isDefault[i]={title :'设为默认',color:'#101010',isSelected:False}
    }
  }
  this.setState()
}

selected(rowID){
  let iteration
  for(let i=0;i<mockLiskt.length;i++){
    if(mockLiskt[i].default==1){
          iteration=this.state.isDefault[i]
          this.state.isDefault[i]=this.state.isDefault[rowID]
          this.state.isDefault[rowID]=iteration
          mockLiskt[i].default=0
          mockLiskt[rowID].default=1
    }
  
  }
  this.setState()
}
select_address(rowData, sectionID, rowID){
  
return (  
      <View >
        <View style={{alignItems: "center",flexDirection:'row',height:70,backgroundColor:'#ffffff'}}> 
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
         <View style={{borderTopWidth:1, borderColor:'#dddddd', marginBottom:10,alignItems: "center",flexDirection:'row',height:44,backgroundColor:'#ffffff',justifyContent:'space-between'}} >
           <View style={{flexDirection:'row',alignItems: "center"}}>
              <TouchableOpacity style={{marginLeft:13}} onPress={()=>{this.selected(rowID)}}>
                <Image  source={this.state.isDefault[rowID].isSelected}  />
              </TouchableOpacity>
              <Text style={{fontSize:12,color:this.state.isDefault[rowID].color,marginLeft: 6}}>{this.state.isDefault[rowID].title}</Text>
            </View> 
            <View style={{flexDirection:'row',alignItems: "center"}}>
              <Image style={{marginLeft:6}}  source={require('ares/app/assets/image/edit.png')} />
              <TouchableOpacity  style={{flexDirection:'row'}}>          
                  <Text style={{marginVertical:1,fontSize:12,color:'#101010',marginLeft:6}}>编辑</Text>          
              </TouchableOpacity>
              <Image style={{marginLeft:6}}  source={require('ares/app/assets/image/delete.png')} />
              <TouchableOpacity style={{flexDirection:'row',alignItems: "center"}}>             
                  <Text style={{marginVertical:1,fontSize:12,color:'#101010',marginHorizontal:6}}>删除</Text>             
              </TouchableOpacity>
            </View>      
          </View>
       </View>
       
      );  
  }                     

  render(){
     let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(mockLiskt);
    return(
        <View style={styles.root}>
          <BackNavBar component={this}   backgroundColor={COMMON_STYLES.NAVIBAR_COLOR} backTextColor="#FFFFFF" titleColor="#FFFFFF">管理收货地址</BackNavBar>
            <ScrollView showsVerticalScrollIndicator={false}>
              
                <ListView
              dataSource={dataSource}
              renderRow={this.select_address.bind(this)}
            />
          </ScrollView>
          <View style={{height:50}}>
          </View>    
            <TouchableOpacity  onPress={() => this.props.navigator.push({id:"NewAddress"})} style={{justifyContent:'center',alignItems: "center",backgroundColor:'#f5787c',height:50,position: "absolute",right: 0,bottom: 0,left:0,flexDirection:'row'}}>
              <Text style={{fontSize:18, color:"#ffffff"}}>添加新地址</Text>
            </TouchableOpacity>
        </View>
    
    )
  }
}
export default ReceivingAddress