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
} from 'react-native'
/*查看物流
      张乐   */
import {
  BasePage,
  BackNavBar,
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

 class Logistics extends BasePage {
 constructor(props){
    super(props);
    this.state = {
      
    }
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  this.state = {
    dataSource: ds.cloneWithRows(['1','2','3','4']),
  };
  }
  

yemian(){
    const path = ART.Path();
    path.moveTo(1,1); //将起始点移动到(1,1) 默认(0,0)
    path.lineTo(1,40); //连线到目标点(300,1)
    const line = ART.Path();
    path.moveTo(1,1); //将起始点移动到(1,1) 默认(0,0)
    path.lineTo(full_width,1); //连线到目标点(300,1)
    return(
        <View style={{backgroundColor:'#fff'}}>
        <View style={{flexDirection:'row',backgroundColor:'#fff',marginBottom:10}}>
            <View style={{justifyContent:'center',marginHorizontal:14}}>
          <Image source={require('ares/app/assets/image/picture01.png')} style={{width:60,height:60,}} />
          </View>
          <View style={{marginTop:15,marginHorizontal:10}}>
            <View style={{flexDirection:'row'}}>
                <Text style={{fontSize:16,marginLeft:10}}>物流状态</Text>
                <Text style={{fontSize:16,marginLeft:18,color:'#51a862'}}>已签收</Text>
            </View>
            <View style={{flexDirection:'row',marginTop:2}}>
                <Text style={{fontSize:14,marginLeft:10,color:'#a1a1a1'}}>承运来源：</Text>
                <Text style={{fontSize:14,marginLeft:10,color:'#a1a1a1'}}>圆通速递</Text>
            </View>
            <View style={{flexDirection:'row',marginTop:2}}>
                <Text style={{fontSize:14,marginLeft:10,color:'#a1a1a1'}}>运单编号：</Text>
                <Text style={{fontSize:14,marginLeft:10,color:'#a1a1a1'}}>464343434343</Text>
            </View>
            <View style={{flexDirection:'row',marginTop:2}}>
                <Text style={{fontSize:14,marginLeft:10,color:'#a1a1a1'}}>官方电话：</Text>
                <Text style={{fontSize:14,marginLeft:10,color:'#59a8f7'}}>暂无</Text>
            </View>
          </View>
        </View>
        <ART.Surface width={full_width} height={1}>
          <ART.Shape d={path} stroke="#dddddd" strokeWidth={1} />
        </ART.Surface>
      </View>
    )
}
kuaidi(){
    return(
        <View>
             <View style={styles.assets_view}>
                  <View style={styles.list_root}>
                   <Image source={require('ares/app/assets/image/contacts.png')} style={{width:40,height:40,marginRight:10}}/>
                   <View style={{flex:1}}>
                     <Text style={{fontSize:14,color:'#a1a1a1'}}>派送员</Text>
                     <Text style={{fontSize:16,marginTop:6}}>陈瑶婷</Text>
                    </View>
                    <Image source={require('ares/app/assets/image/phoneone.png')} style={{width:20,height:20,marginRight:30}}/>
                    <Icon style={{marginRight: 14}} name="angle-right" size={30} color={'#bdbdbd'} />
                  </View>
                </View>
        </View>
    )
}
wuliu(){
    
    
    return(

        <View>
            <View style={styles.assets_view}>
                <View style={styles.list_root}>
                    <Icon style={{marginRight: 14}} name="user" size={22} color={'#bdbdbd'} />
                    <Text style={{fontSize:16,flex:1,}}>本数据由<Text style={{fontSize:16,color:'#59a8f7'}}>菜鸟裹裹</Text>提供</Text>
                    <Icon style={{marginRight: 14}} name="angle-right" size={30} color={'#bdbdbd'} />
                </View>
            </View>
            <View style={{backgroundColor:'#ffffff',}}>
              <View style={{backgroundColor:'#51a862',width:18,height:18,borderRadius:9,marginLeft:20,marginTop:10}} />
            </View>
           
        </View>
    )
}
huoyun(){
    const path = ART.Path();
    path.moveTo(0,0); //将起始点移动到(1,1) 默认(0,0)
    path.lineTo(1,80); //连线到目标点(300,1)
    const line = ART.Path();
    path.moveTo(1,1); //将起始点移动到(1,1) 默认(0,0)
    path.lineTo(full_width,1); //连线到目标点(300,1)
    return(
    
        <View style={{ flexDirection:'row',backgroundColor:'#fff'}}>
            <View style={{width:60,height:90}}>
               <View style={{marginHorizontal:28}}>
                <ART.Surface width={1} height={70}>
                    <ART.Shape d={path} stroke="#dddddd" strokeWidth={10} />
                </ART.Surface>
                </View>
                <View style={{backgroundColor:'#dddddd',width:18,height:18,borderRadius:9,marginLeft:20,marginBottom:0}} />
            </View>
            <View style={{marginTop:70,marginHorizontal:10}}>
                <ART.Surface width={full_width-10} height={1}>
                    <ART.Shape d={path} stroke="#dddddd" strokeWidth={1} />
                </ART.Surface>
            </View>
        </View>
     
    )
}
createPayView(){
    return(
      <View style={{backgroundColor:'#fff',height:50,position: "absolute",right: 0,bottom: 0,left:0,flexDirection:'row'}}>
       
          <View style={{flex:1,justifyContent:'flex-end',backgroundColor:'#ffffff',flexDirection:'row',alignItems:'center',marginRight:10}}>
            <TouchableOpacity > 
                <View style={{ height:30,borderWidth:1,backgroundColor:'#ffffff',borderColor:'#DDDDDD',justifyContent:'center',alignItems:'center', borderRadius:8}}>
                    
                        <Text style={{color:'a1a1a1',fontSize:16,marginHorizontal:8}}>物流客服</Text>
                    
                </View>
            </TouchableOpacity >
            
            <TouchableOpacity  onPress={() => this.props.navigator.push({id: "Evaluate", params: {}})}> 
            
                <View style={{ height:30,borderWidth:1,backgroundColor:'#ffffff',borderColor:'#f29836',marginHorizontal:8,justifyContent:'center',alignItems:'center', borderRadius:8}}>
                    <Text style={{color:'#f29836',fontSize:16,marginHorizontal:8}}>派送评价</Text>
                </View>
            
            </TouchableOpacity >
            </View> 
          
      </View>
      )
  }
  render() {
  	
    return(
    	<View style={styles.root}>
    	  <BackNavBar component={this}  >查看物流</BackNavBar>
          <ScrollView>
         {this.yemian()}
         {this.kuaidi()}
         {this.wuliu()}
          <ListView
          dataSource={this.state.dataSource}
          renderRow={this.huoyun.bind(this)}
          
         />
         </ScrollView>
         {this.createPayView()}
      </View>
    );
  }



}
export default  Logistics
