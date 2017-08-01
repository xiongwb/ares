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
  AresTextInput,
} from 'AresComponent'
import {
  STORAGE_KEYS,
  COMMON_STYLES,
} from 'AresConstant'
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
  var full_height = Dimensions.get('window').height
  const h_line_1 = ART.Path();
    h_line_1.moveTo(16,1); 
    h_line_1.lineTo(full_width-16,1)
function ListBox(props) {
  return (
    <View>
      <ART.Surface width={full_width} height={1}>
        <ART.Shape d={h_line_1} stroke='#e5e5e5' strokeWidth={1} />
      </ART.Surface>
        <TouchableOpacity style={{justifyContent:'space-between',alignItems: 'center',height:46,flexDirection:'row',backgroundColor:'#ffffff'}} onPress={() => this.on_Press("Asset")}>
        <View style={{flexDirection:'row',alignItems: 'center'}}>
          <Text style={{fontSize:16,color:'#101010',marginHorizontal: 16}}>{props.title}</Text>
          <Image style={{marginRight:6}} source={props.source} />
          <Text style={{fontSize:15}}>{props.text}</Text>
        </View> 
          <Icon style={{marginRight:20}}  name="angle-right" size={22} color={'#bdbdbd'} marg /> 
      </TouchableOpacity>
    </View> 
  );
}

function Label(props) {
  return (
      <TouchableOpacity onPress={props.onPress} style={{borderColor:props.color.borderColor,backgroundColor:props.color.backgroundColor,borderWidth:1,marginTop:1,justifyContent:'center',borderRadius:4,alignItems: 'center',marginLeft:16,width:31, height:16}} >  
        <Text style={{marginBottom:2,color:props.color.fontcolor,fontSize:12}}>{props.text}</Text>  
      </TouchableOpacity> 
  );
}

class NewAddress extends BasePage  {
  
  constructor(props) {
  super(props);
  this.state = {
     arraycolor:[]
  };
}
 componentWillMount(){
  for(let i=0;i<4;i++){
    this.state.arraycolor.push({borderColor:'#101010',backgroundColor:'#ffffff',fontcolor:"#101010"})
  }
  
}
 selected(id){
   let array=[]
   for(let j=0;j<4;j++){
     if(j==id){
       array.push({borderColor:'#ffffff',backgroundColor:'#f29836',fontcolor:"#ffffff"})
     }else{
       array.push({borderColor:'#101010',backgroundColor:'#ffffff',fontcolor:"#101010",})
     }

  }
      this.state.arraycolor=array
      this.setState()
 } 

  render(){
      return(
       <View style={styles.root}> 
        <BackNavBar component={this}  backgroundColor={COMMON_STYLES.NAVIBAR_COLOR} backTextColor="#FFFFFF" titleColor="#FFFFFF">添加地址</BackNavBar>
        <View style={{backgroundColor:'#ffffff'}}>
          <AresTextInput title={'收货人'}  placeholder={'收货人姓名'} />
          <ART.Surface width={full_width} height={1}>
              <ART.Shape d={h_line_1} stroke="#e5e5e5" strokeWidth={1} />
          </ART.Surface>
          <AresTextInput title={'手机号码'}  placeholder={'手机号码'} />
          <ListBox  title={'所在城市'} text={'选择所在的城市'}/>
          <ListBox source={require('ares/app/assets/image/position02.png')} title={'收货地址'} text={'小区/写字楼'}/>
          <ART.Surface width={full_width} height={1}>
              <ART.Shape d={h_line_1} stroke="#e5e5e5" strokeWidth={1} />
          </ART.Surface>
          <AresTextInput title={'楼号门牌'}  placeholder={'楼号/单元/门牌号'} />
          <ART.Surface width={full_width} height={1}>
              <ART.Shape d={h_line_1} stroke="#e5e5e5" strokeWidth={1} />
          </ART.Surface>
          <View style={{alignItems: "center",height:46,flexDirection:'row',backgroundColor:'#ffffff'}} onPress={() => this.on_Press("Asset")}>
            <Text style={{fontSize:12,color:"#101010",marginLeft: 16}}>地址类型</Text>
            <Label onPress={()=>{this.selected(0)}} color={this.state.arraycolor[0]} text={'公司'}/>
            <Label onPress={()=>{this.selected(1)}} color={this.state.arraycolor[1]} text={'住宅'}/>
            <Label onPress={()=>{this.selected(2)}} color={this.state.arraycolor[2]} text={'学校'}/>
            <Label onPress={()=>{this.selected(3)}} color={this.state.arraycolor[3]} text={'其他'}/>     
          </View>
        </View>
        <TouchableOpacity onPress={()=>this.setState({sava:1})}>
           <View style={{alignItems:'center',justifyContent: "center",borderRadius:8,marginHorizontal:12,height:41,backgroundColor:"#f29836"}}><Text style={{color:"#ffffff",fontSize:16}}>保存收货信息</Text></View> 
        </TouchableOpacity>
     </View>     
    )
    
  }
}
export default NewAddress