import React from 'react'
import AresAPI from 'AresAPI'
import {
  Dimensions,
  Text,
  View,
  Image,
   StyleSheet,
   TextInput,
   TouchableHighlight,
   TouchableOpacity,
   Alert,
   AsyncStorage,
} from 'react-native'
import {
  COMMON_STYLES,
  STORAGE_KEYS,
  VERIFY,
  EVENT_EMITTER_CONST,
} from 'AresConstant'
import {
  BasePage,
  BackNavBar,
  DevelopTip,

} from 'AresComponent'
import dismissKeyboard from 'dismissKeyboard'
/*话费充值页面*/
import { createForm } from 'rc-form'
import InputItem from 'antd-mobile/lib/input-item'

const full_height = Dimensions.get('window').height;
const full_width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  root: {
    backgroundColor:'#fff'
  },

});
class TelephoneRecharge extends BasePage {
  constructor (props) {
    super(props)
    this.state = {
      text:'',
  }

  }
  on_ding(){
    Alert.alert()
  }

  onChange(text) {

      this.setState({ text: text })
  }

  on_sub(price){

    dismissKeyboard()

    console.log(this.state.text);

    const regexp=VERIFY.PHONE;

    if (this.state.text == '') {
      Alert.alert('错误提示', '请输入手机号', [{ text: '确定'}]);
      return;
    }
    if (regexp.test(this.state.text) === false) {
      Alert.alert('错误提示', '请输入正确的手机号', [{ text: '确定'}]);
      return;
    }


      AsyncStorage.getItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
      let hash = JSON.parse(value)
      if (!!hash) {
        AresAPI.Card.cardFindBind({custNo:hash.custNo}).done((res_json, res)=>{
          if(res_json.retCode === 1){
             this.props.navigator.push({ id: 'PayTheFees',params:{price:price} })
      }else{
        Alert.alert('错误提示', '对不起，您还没有绑定银行卡', [{ text: '确定'}])
      }
    })
    }
    })
  }

  render() {

      const { getFieldProps } = this.props.form;

    return(
        <View style={{ flex:1,backgroundColor:'#fff'}}>
          <BackNavBar component={this} backText='首页'>话费充值</BackNavBar>
            <View style={{height:80, flexDirection:'row',backgroundColor:'#fff'}}>
                <View style={{flex:4,justifyContent: "center",backgroundColor:'#fff'}}>
                    <TextInput
                        style={{borderWidth: 1,backgroundColor:'#fff',flex:1,marginHorizontal: 16,fontSize:25}}
                        onChangeText={(text) => this.onChange(text)}
                        keyboardType="numeric"
                        maxLength={11}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder='请输入手机号'
                        borderColor='#fff'
                    >
                    </TextInput>
                </View>

            </View>
          <View style={{marginTop:25,backgroundColor:'#fff'}}>
            <Text style={{fontSize:14,color:'#000000',marginHorizontal: 16}}>充值面额</Text>
          </View>
          <View style={{ marginTop: 20, marginHorizontal: 16, flexDirection: 'row', backgroundColor: '#fff', }}>
                <TouchableOpacity onPress={()=>this.on_sub(10)}>
                    <View style={{ borderWidth: 1, borderColor: '#448FFF', width: (full_width - 52) / 3, height: (full_width - 52) / 4, borderRadius: 3, alignItems: 'center', justifyContent: 'space-around',paddingTop:10,paddingBottom:10 }}>
                        <Text style={{ fontSize: 16, color:'#448FFF' }}>10元</Text>
                        <Text style={{ fontSize: 11, color: '#88B8FF' }}>售价：10元</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.on_sub(20)}>
                    <View style={{ borderWidth: 1, borderColor: '#448FFF', width: (full_width - 52) / 3, height: (full_width - 52) / 4, marginHorizontal: 10, borderRadius: 3, alignItems: 'center', justifyContent: 'space-around', paddingTop: 10, paddingBottom: 10 }}>
                        <Text style={{ fontSize: 16, color: '#448FFF' }}>20元</Text>
                        <Text style={{ fontSize: 11, color: '#88B8FF' }}>售价：20元</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.on_sub(30)}>
                    <View style={{ borderWidth: 1, borderColor: '#448FFF', width: (full_width - 52) / 3, height: (full_width - 52) / 4, borderRadius: 3, alignItems: 'center', justifyContent: 'space-around', paddingTop: 10, paddingBottom: 10 }}>
                        <Text style={{ fontSize: 16, color: '#448FFF' }}>30元</Text>
                        <Text style={{ fontSize: 11, color: '#88B8FF' }}>售价：30元</Text>
                    </View>
                </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10, marginHorizontal: 16, flexDirection: 'row', backgroundColor: '#fff', }}>
                <TouchableOpacity onPress={()=>this.on_sub(50)}>
                    <View style={{ borderWidth: 1, borderColor: '#448FFF', width: (full_width - 52) / 3, height: (full_width - 52) / 4, borderRadius: 3, alignItems: 'center', justifyContent: 'space-around', paddingTop: 10, paddingBottom: 10 }}>
                        <Text style={{ fontSize: 16, color: '#448FFF' }}>50元</Text>
                        <Text style={{ fontSize: 11, color: '#88B8FF' }}>售价：50元</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.on_sub(100)}>
                    <View style={{ borderWidth: 1, borderColor: '#448FFF', width: (full_width - 52) / 3, height: (full_width - 52) / 4, marginHorizontal: 10, borderRadius: 3, alignItems: 'center', justifyContent: 'space-around', paddingTop: 10, paddingBottom: 10 }}>
                        <Text style={{ fontSize: 16, color: '#448FFF' }}>100元</Text>
                        <Text style={{ fontSize: 11, color: '#88B8FF' }}>售价：100元</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.on_sub(200)}>
                    <View style={{ borderWidth: 1, borderColor: '#448FFF', width: (full_width - 52) / 3, height: (full_width - 52) / 4, borderRadius: 3, alignItems: 'center', justifyContent: 'space-around', paddingTop: 10, paddingBottom: 10 }}>
                        <Text style={{ fontSize: 16, color: '#448FFF' }}>200元</Text>
                        <Text style={{ fontSize: 11, color: '#88B8FF' }}>售价：200元</Text>
                  </View>
                </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10, marginHorizontal: 16, flexDirection: 'row', backgroundColor: '#fff', }}>
                <TouchableOpacity onPress={()=>this.on_sub(300)}>
                    <View style={{ borderWidth: 1, borderColor: '#448FFF', width: (full_width - 52) / 3, height: (full_width - 52) / 4, borderRadius: 3, alignItems: 'center', justifyContent: 'space-around', paddingTop: 10, paddingBottom: 10 }}>
                        <Text style={{ fontSize: 16, color: '#448FFF' }}>300元</Text>
                        <Text style={{ fontSize: 11, color: '#88B8FF' }}>售价：300元</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.on_sub(500)}>
                    <View style={{ borderWidth: 1, borderColor: '#3385FF', width: (full_width - 52) / 3, height: (full_width - 52) / 4, marginHorizontal: 10, borderRadius: 3, alignItems: 'center', justifyContent: 'space-around', paddingTop: 10, paddingBottom: 10 }}>
                        <Text style={{ fontSize: 16, color: '#3385FF' }}>500元</Text>
                        <Text style={{ fontSize: 11, color: '#88B8FF' }}>售价：500元</Text>
                  </View>
                </TouchableOpacity>
          </View>
        </View>

    )
  }
}


export default createForm()(TelephoneRecharge)
