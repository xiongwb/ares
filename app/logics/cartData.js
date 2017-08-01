/**
* by dujh
*/
import AresAPI from 'AresAPI'
import {
  Text,
  View,
  StyleSheet,
  AsyncStorage,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
  ART,
  ListView,
  ScrollView,
} from 'react-native'
import { observable, computed,action } from 'mobx';
import {
  STORAGE_KEYS,
  COMMON_STYLES,
} from 'AresConstant'


class CartData {

  @observable
  cData = [];

  constructor(){
    this.state = {
      hash:'',
    }
    AsyncStorage.getItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
       let hash = JSON.parse(value)
       if (!!hash&&!!hash.custNo) {
         console.log(hash.custNo);
         AresAPI.ShoppingCartController.findShoppingCart({brcNo:1,userNo:hash.custNo}).done((res_data,res)=>{
           if(res_data.retCode == 1){
             console.log(res_data.shoppingCartListReturnVO);
             const aData = res_data.shoppingCartListReturnVO
             for (const i in aData) {
                 aData[i]['checked'] = false
               }
             this.cData.replace(aData)
           }else{
             Alert.alert('错误提示', res_data.retMsg, [{ text: '确定'}])
           }
         })
       }
     })
  }
  componentWillMount() {
     AsyncStorage.getItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
        let hash = JSON.parse(value)
        if (!!hash&&!!hash.custNo) {
          this.setState({hash:hash})
        }
      })
    }

@action
  minus(index){
    let post_data = {
       cartNo:this.cData[index].cartNo
    }
    AresAPI.ShoppingCartController.minusCount(post_data).done((res_data,res)=>{
      if(res_data.retCode == 1){
        this.cData[index].count -= 1;
      }else{
        Alert.alert('错误提示', res_data.retMsg, [{ text: '确定'}])
      }
    })
  };
@action
  plus(index){
    let post_data = {
       cartNo:this.cData[index].cartNo
    }
    AresAPI.ShoppingCartController.addCount(post_data).done((res_data,res)=>{
      if(res_data.retCode == 1){
        this.cData[index].count += 1;
      }else{
        Alert.alert('错误提示', res_data.retMsg, [{ text: '确定'}])
      }
    })
  };
@action
  check(checked, index){
    this.cData[index].checked = checked;
  };
@action
  checkall(checked){
    for(let i=0;i < this.cData.length;i++){
      this.cData[i].checked = checked;
    };
  };
@action
  deleted(index){
    let post_data = {
      brcNo:1,
      userNo:this.state.hash.custNo,
      cartNo:this.cData[index].cartNo
    }
    AresAPI.ShoppingCartController.delShoppingCart(post_data).done((res_data,res)=>{
      if(res_data.retCode == 1){
        this.cData.splice(index,1);
      }else{
        Alert.alert('错误提示', res_data.retMsg, [{ text: '确定'}])
      }
    })

  }

  select = computed(() => {
    return this.cData.checked;
  });

  count = computed(() => {
    return this.cData.reduce((a, b) => {
      if (b.checked) {
        return a + b.count;
      }
      else {
        return a;
      }
    }, 0);
  });

  @computed
  get sum() {
    return this.cData.reduce((a, b) => {
      if (b.checked) {
        return a + b.count * b.nowPrice;
      }
      else {
        return a;
      }
    }, 0);
  };
}
export default CartData;
