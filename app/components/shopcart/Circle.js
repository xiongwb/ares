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


 class Circle extends BasePage {

   select = () => {
     const { onPress, checked } = this.props;
     console.log(checked);
     let { checkedN } = this.state;
     checkedN = !checked;
     this.setState({
       checkedN,
     });
     onPress && onPress(checkedN);
   };

   selectImg(checked){
     if(checked){
       return <Image style={{marginHorizontal:10}} source={require('ares/app/assets/image/red_check.png')} />
     }else{
       return <Image style={{marginHorizontal:10}} source={require('ares/app/assets/image/unchosen.png')} />
     }
   }
   state = {
     checkedN: false,
   };
   render() {
    const { cartData, checked } = this.props;
    return (
      <TouchableOpacity
        onPress={this.select}>
        {this.selectImg(checked)}
      </TouchableOpacity>
    );
  }
}
export default Circle
