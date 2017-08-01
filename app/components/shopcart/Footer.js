/**
* by dujh
*/

import React from 'react'
import AresAPI from 'AresAPI'
import {
  AppState,
  StyleSheet,
  View,
  AsyncStorage,
  Text,
  Alert,
  ART,
  Image,
  TouchableOpacity
} from 'react-native';
import {
  Navbar,
  BackNavBar,
  BasePage,
  AresTextInput,
} from 'AresComponent'
import {
  STORAGE_KEYS,
} from 'AresConstant'

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    borderTopColor: '#f5f5f5',
    borderTopWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
  },
  selectWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  selectText: {
    marginLeft: 5,
  },
  checkout: {
    backgroundColor: '#f23030',
    paddingHorizontal: 20,
    height: 50,
    justifyContent: 'center',
  },
  checkoutText: {
    fontSize: 18,
    color: '#fff',
  }
});
import { observable, computed,action } from 'mobx';
import { observer } from 'mobx-react/native';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import Circle from './Circle'




@observer
export default class Footer extends BasePage {

 selectAll = (checked) => {
   const { cartData } = this.props;
   cartData.checkall(checked);
 };

 checkedAll(){
   const { cartData } = this.props;
   for(let i=0;i < cartData.cData.length;i++){
     if(!cartData.cData[i].checked){
       return false;
     }
   }
   if(cartData.cData.length == 0){
     return false;
   }else{
     return true;
   }
 }

 settlement(){
   AsyncStorage.getItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
   let hash = JSON.parse(value)
   if (!!hash) {
     AresAPI.Card.cardFindBind({custNo:hash.custNo}).done((res_json, res)=>{
       if(res_json.retCode === 1){
         const { cartData } = this.props
         let skuList = []
         let skuCountList = []
         for(let i = 0;i < cartData.cData.length;i++){
           if(cartData.cData[i].checked){
             skuList.push(cartData.cData[i].skuNo)
             skuCountList.push(cartData.cData[i].count)
           }
         }
           if(skuList ==''){
               Alert.alert('错误提示', '您还未选择商品', [{ text: '确定'}])
           }else{
          this.props.navigator.push({id:'FillOrder', params: {nowPrice:cartData.sum,skuList:skuList,skuCountList:skuCountList}})
           }
       }else{
     Alert.alert('错误提示', '对不起，您还没有绑定银行卡', [{ text: '确定'}])
   }
 })
 }
 })
 }

  render() {
    const { cartData , cartIsNull } = this.props;

    const path = ART.Path();
    path.moveTo(1,1); //将起始点移动到(1,1) 默认(0,0)
    path.lineTo(1,40); //连线到目标点(300,1)
    return (
      <View>
        <View style={{height:50}}>
          </View>
         <View style={{borderColor:'#DDDDDD',borderTopWidth:1,backgroundColor:'white',height:50,position: "absolute",right: 0,bottom: 0,left:0,flexDirection:'row'}}>
          <View style={{flex:1,alignItems:'center',flexDirection:'row'}}>
             <Circle navigator={this.props.navigator} checked={this.checkedAll()} onPress={this.selectAll}  />
            <Text style={{fontSize:16,color:"#101010"}}>全选</Text>
          </View>
            <View style={{alignSelf:'center'}}>
              <ART.Surface width={1} height={40}>
                <ART.Shape d={path} stroke="#dddddd" strokeWidth={1} />
              </ART.Surface>
            </View>
          <View style={{flex:1,alignItems:'center',flexDirection:'row',justifyContent: "center"}}>
            <Text style={{fontSize:16,color:"#101010"}}>合计:{cartData.sum.toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={{flex:1,backgroundColor:'#f29836',justifyContent:'center',alignItems:'center'}} onPress={this.settlement.bind(this)} >
            <Text style={{color:'white',fontSize:20}}>去结算</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
