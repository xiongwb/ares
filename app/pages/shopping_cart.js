/**
* by dujh
*/

import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ART,
  Alert,
  BackAndroid,
  Platform,
  ListView,
  ScrollView,
} from 'react-native'
import {
  BackNavBar,
  BasePage,
} from 'AresComponent'
import {
  COMMON_STYLES,
} from 'AresConstant'
import { observer, autorun } from 'mobx-react/native';
import CartData from '../logics/cartData';
import ItemList from '../components/shopcart/ItemList';
import Footer from '../components/shopcart/Footer';

const styles = StyleSheet.create({
  root: {
    backgroundColor: COMMON_STYLES.MAIN_BACKGROUND_COLOR,
    flex: 1,
  },
  shopping_logo_box:{
       flex: 1,
     alignItems:'center',
      justifyContent: "center",
   },
   shopping_message_text:{
    color:'#bbbbbb',
    marginTop:22,
    fontSize:14,
    textAlign:'center',
  },
  shopping_buton:{
    borderColor:'#dddddd',
    borderWidth:1,
    marginTop:50,
    alignItems:'center',
    justifyContent: "center",
    borderRadius:8,
    width:100,
    height:29,
    backgroundColor:"#ffffff"
  },
});

 class ShopCart extends BasePage {
   constructor(props) {
     super(props)
     this.state = {
       cartD:1
     }
     that = this
     cartData = new CartData()
   }

   onBack(){
     this.props.navigator.popToTop()
   }

  @observer
  render() {
    if(cartData.cData.length){
      return (
        <View style={styles.root}>
          <BackNavBar component={this}  backgroundColor={COMMON_STYLES.NAVIBAR_COLOR} backTextColor="#FFFFFF" titleColor="#FFFFFF">购物车</BackNavBar>
          <ItemList navigator={this.props.navigator} cartData={cartData} />
          <Footer navigator={this.props.navigator} cartData={cartData}/>
        </View>
      )
    }else{
      return (
        <View style={styles.root}>
          <BackNavBar component={this}  backgroundColor={COMMON_STYLES.NAVIBAR_COLOR} backTextColor="#FFFFFF" titleColor="#FFFFFF">购物车</BackNavBar>
          <View style={styles.shopping_logo_box}>
            <Image  source={require('ares/app/assets/image/empty_trolley.png')} />

          <Text style={styles.shopping_message_text}>您的购物车是空的，快去逛逛吧</Text>
          <TouchableOpacity style={styles.shopping_buton} onPress={()=>this.props.navigator.push({id:'MyCollection'})}>
            <Text style={{color:"#aaaaaa",fontSize:14}}>我的收藏</Text>
          </TouchableOpacity>
          </View>
        </View>
      )
    }
  }
}
export default ShopCart
