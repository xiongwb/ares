import React from 'react'
import {
ART,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ListView,
  Alert,
 Dimensions,
 ScrollView,
 TextInput,
} from 'react-native'
/*评价
      张乐   */
import {
  BasePage,
  BackNavBar,
  AresEvaluate,
} from 'AresComponent'
import {
  COMMON_STYLES,
} from 'AresConstant'

import Icon from 'react-native-vector-icons/FontAwesome'
var full_width = Dimensions.get('window').width
let viewWidth = full_width-15-75-10-10-20-15
const DEFAULT_RED_COLOR = '#f5787c'
const styles = StyleSheet.create({
 root: {
    backgroundColor: COMMON_STYLES.MAIN_BACKGROUND_COLOR,//页面的布局和颜色
    flex: 1,
  },
  assets_view:{
    height:55,
    borderBottomWidth:0.5,
    backgroundColor:'#ffffff',
    borderColor:'#DDDDDD',
    marginTop:20,
  },
  list_root: {
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    marginLeft:14,
  },
  
  
});

 class Evaluate extends BasePage {
 constructor(props){
    super(props);
    this.state = {
       pingjia:''
    }
   

  }
 



pingjia(){
    return(
        <View style={{marginTop:10,backgroundColor:'#ffffff'}}>
            <View style={{height:50,justifyContent:'center',marginHorizontal:14}}>
                <Text style={{fontSize:14,color:'#707070',}}>文字评价</Text>
            </View>
            <View style={{marginLeft:14,marginRight:14,height:170,borderWidth:1,borderColor:'#dddddd',marginBottom:14}}>
            <TextInput
            style={{borderWidth: 1,backgroundColor:'#ffffff',marginLeft:14,marginRight:14,fontSize:18,flex:1 ,borderColor:'#dddddd',}}
            onChangeText={(text) => {this.setState({text});this.setState({pingjia:text})}}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder=''
            multiline={true}
            borderColor='#fff'>
          </TextInput>
            </View>
        
        </View>
    )
}

createPayView(){
    return(
        
      <View style={{backgroundColor:'#ff9800',height:50,position: "absolute",right: 0,bottom: 0,left:0,alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity > 
                    <Text style={{color:'#ffffff',fontSize:20,}}>提交评价</Text>
                </TouchableOpacity >
      </View>
      )
  }  
  render() {
  	
    return(
    	<View style={styles.root}>
    	  <BackNavBar component={this}  >评价</BackNavBar>
        <AresEvaluate title="整体评价"></AresEvaluate>
        <AresEvaluate title="整体评价"></AresEvaluate>
        <AresEvaluate title="整体评价"></AresEvaluate>
        {this.pingjia()}
         {this.createPayView()}
      </View>
    );
  }



}
export default Evaluate
