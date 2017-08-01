/**
* by dujh
*/

import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
  ART,
  ListView,
  ScrollView,
} from 'react-native'

import {
  Navbar,
  BackNavBar,
  BasePage,
  AresTextInput,
} from 'AresComponent'
import {
  COMMON_STYLES,
} from 'AresConstant'
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import Circle from './Circle';
import Mock from '../../constants/mock';

import { observer } from 'mobx-react/native';
var full_width = Dimensions.get('window').width
var full_height = Dimensions.get('window').height
const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    height: 100,
  },
  img: {
    width: 90,
    height: 90,
  },
  content: {

  },
  price: {

  },
  name: {
    width: 180,
    fontSize: 16,
  },
  priceAndControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#000',
  },
  buttonText: {

  },
});
@observer
export default class Item extends  BasePage {

  check = (checked) => {
    const { index, cartData } = this.props;
    console.log(index);
    cartData.check(checked, index);
  };

  minus = () => {
    const { index, data, cartData } = this.props;
    if (data.count > 1) {
      cartData.minus(index);
    }
  };
  plus = () => {
    const { index, cartData } = this.props;
    cartData.plus(index);
  };

  deleteD(){
    cartData.deleted(this.props.index);
  }

  deleteCart(){
    Alert.alert('提示','确认要删除商品吗？',[
      {text:'取消'},{text:'删除',onPress:()=>{this.deleteD()}},
    ])
  }

  goTo(data){

    for(let i=0;i<Mock.suoyou.all.length;i++){
      if(Mock.suoyou.all[i].SKU_NO == data.skuNo){
        this.props.navigator.push({id:'B2CGoodsDetails',params:{data:Mock.suoyou.all[i]}})
      }
    }
  }


  render() {
    const { index, data, cartData } = this.props;
    const h_line_1 = ART.Path();
    h_line_1.moveTo(16,1);
    h_line_1.lineTo(full_width,1);
    let swipeoutBtns = [
     {
     backgroundColor:'red',
       text:'删除',
     onPress:(index)=>{
       cartData.deleted(this.props.index);
     }
     }
   ]
    return (
      	<View >
           <View style={{height:130,alignItems:'center', backgroundColor:'white',flexDirection:'row'}}>
             <Circle checked={data.checked} onPress={this.check} />
             <TouchableOpacity onLongPress={()=>this.deleteCart()} onPress={()=>this.goTo(data)}>
               <View>
                 <Image source={{uri:data.imgUrl}} style={{width:100,height:100}} />
               </View>
             </TouchableOpacity>
            <View style={{height:100,flex:1}}>
              <TouchableOpacity onLongPress={()=>this.deleteCart()} onPress={()=>this.goTo(data)}>
              <Text style={{marginLeft:15,color:'#666666',fontSize:16}}>{data.prodName}</Text>
              </TouchableOpacity>
              <View style={{marginLeft:15,marginTop:20}}>
                <Text style={{textDecorationLine:'line-through',color:'#888888',fontSize:12}}></Text>
                <View style={{flexDirection:'row'}}>
                  <Text style={{color:'#f5787c',fontSize:16}}>现价：{data.nowPrice.toString()}</Text>
                  <View style={{position:'absolute',right:10,marginRight:10,flexDirection:'row'}}>
                    <TouchableOpacity  onPress={this.minus}>
                      <Icon style={{color:'#f5787c'}} name={'minus-circle'} size={25} color='gray'/>
                    </TouchableOpacity>
                    <Text style={{marginTop:1,marginHorizontal:3,fontSize:16}}>{data.count.toString()}</Text>
                    <TouchableOpacity  onPress={this.plus}>
                      <Icon style={{color:'#f5787c'}} name={'plus-circle'} size={25} color='gray'/>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <ART.Surface width={full_width} height={1}>
            <ART.Shape d={h_line_1} stroke="#dddddd" strokeWidth={1} />
          </ART.Surface>
        </View>
    );
  }
}
