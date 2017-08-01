/**
 * Created by 宏基电脑 on 2017/5/9.
 */
import React from 'react'
import {
    Text,
    View,
    Dimensions,
    ART,
    TextInput,
    Alert,
    Platform,
} from 'react-native'
import {
    BackNavBar,
    BasePage,
    NavBar,
} from 'AresComponent'
import WhiteSpace from 'antd-mobile/lib/white-space'
import Button from 'antd-mobile/lib/button'
export default class ExpressCheck extends BasePage{
    constructor(props) {
        super(props);
        this.state = { text: '' };
    }

    onEnsure(){
        if(this.state.text)
        {
            this.props.navigator.push({id:'Recruitment'})
        }else{
            Alert.alert('错误提示：','请输入正确的订单号',[{text:'确定'}])
        }
    }

    render(){
        return (
        <View style={{backgroundColor:'#F5F5F9',flex:1}}>
            <View>
                <BackNavBar component={this}>查询快递单号</BackNavBar>
            </View>
            <WhiteSpace size='md' />
            <View style={{marginTop:10}}>
                <View style={{borderBottomWidth:1,borderColor:'#C1CDC1',backgroundColor:'white'}}>
                    <View style={{margin:10}}>
                        <Text style={{fontSize:18}}>运单号</Text>
                    </View>
                    <TextInput ref="testInput"
                        underlineColorAndroid='transparent'
                        style={{borderColor: '#C1CDC1',fontSize:20}}
                        onChangeText={(text) => this.setState({text})}
                        placeholder="请输入或扫描运单号"
                        keyboardType="numeric"
                    />
                </View>
                <WhiteSpace size='md' />
                <View style={{backgroundColor:'white'}}>
                    <Button type="primary"
                            onClick={e => this.onEnsure()}
                            >
                        确定
                    </Button>
                </View>
            </View>

        </View>

        )
    }
}
