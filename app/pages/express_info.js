/**
 * Created by 宏基电脑 on 2017/5/10.
 */
import React from 'react'
import {
    Text,
    View,
    Dimensions,
    ART,
    Alert,
    TextInput,
    Platform,
} from 'react-native'
import {
    BackNavBar,
    BasePage,
    NavBar,
} from 'AresComponent'
import {
  VERIFY,
} from 'AresConstant'
import Button from 'antd-mobile/lib/button'
import WhiteSpace from 'antd-mobile/lib/white-space'

class ExpressInfo extends BasePage{
    constructor(props) {
        super(props);
        this.state = { textPhone: '' };
        this.state ={textSendAddress:''};
        this.state ={textConsigneeAddress:''};
    }
    onEnsure(){
      const regexp=VERIFY.PHONE;
      if (this.state.textPhone == '') {
        Alert.alert('错误提示', '请输入手机号', [{ text: '确定'}]);
        return;
      }
      if (regexp.test(this.state.textPhone) === false) {
        Alert.alert('错误提示', '请输入正确的手机号', [{ text: '确定'}]);
        return;
      }
      if(this.state.textSendAddress == ''){
        Alert.alert('错误提示：','请输入寄件人地址',[{text:'确定'}])
        return;
      }
        if(this.state.textConsigneeAddress == ''){
            Alert.alert('错误提示：','请输入收件人地址',[{text:'确定'}])
            return
        }
          this.props.navigator.push({id:'TakeSuccess'})
    }
    creatSendInfo(){
        return(
                <View style={{flex:1,marginTop:15,marginHorizontal:5}}>

                    <View style={{backgroundColor:'white'}}>
                        <View style={{flexDirection:'row',borderColor: '#C1CDC1',borderBottomWidth:1}}>
                            <Text style={{ marginLeft:5,marginTop:15,fontSize:15}}>寄件人电话：</Text>
                                <TextInput ref="testInput"
                                           keyboardType="numeric"
                                           underlineColorAndroid='transparent'
                                           style={{flex:1,fontSize:15,marginLeft:5}}
                                           onChangeText={(textPhone) => this.setState({textPhone})}
                                           placeholder="请填写寄件人电话"
                                           maxLength={11}
                                />
                        </View>
                        <View style={{flexDirection:'row',borderColor: '#C1CDC1',borderBottomWidth:1}}>
                            <Text style={{ marginLeft:5,marginTop:15,fontSize:15}}>寄件人地址：</Text>
                            <TextInput ref="testInput"
                                       underlineColorAndroid='transparent'
                                       style={{flex:1,fontSize:15,marginLeft:5}}
                                       onChangeText={(textSendAddress) => this.setState({textSendAddress})}
                                       placeholder="请填写寄件人地址"
                                       multiline={true}
                                       maxLength={16}
                            />
                        </View>
                        <View style={{flexDirection:'row',borderColor: '#C1CDC1',borderBottomWidth:1}}>
                            <Text style={{ marginLeft:5,marginTop:15,fontSize:15}}>收件人地址：</Text>
                            <TextInput ref="testInput"
                                       underlineColorAndroid='transparent'
                                       style={{flex:1,fontSize:15,marginLeft:5}}
                                       onChangeText={(textConsigneeAddress) => this.setState({textConsigneeAddress})}
                                       placeholder="请填写收件人地址"
                                       multiline={true}
                                       maxLength={16}
                            />
                        </View>
                    </View>
                    <Button type="primary"
                            onClick={e => this.onEnsure()}
                            style={{marginTop:10}}>
                        上门取件
                    </Button>
                </View>
        )
    }

    render(){

        return(
            <View style={{backgroundColor:'#F5F5F9',flex:1}}>
                <View>
                    <BackNavBar component={this}>寄快递</BackNavBar>
                </View>
                <WhiteSpace size='md'  />
                {this.creatSendInfo()}
            </View>
        )
    }
}
export default ExpressInfo
