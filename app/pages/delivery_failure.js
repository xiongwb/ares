/**
 * Created by 宏基电脑 on 2017/5/11.
 */
import React from 'react'
import {
    Text,
    View,
    Dimensions,
    Image,
    ART,
    ScrollView,
    Platform,
} from 'react-native'
import {
    BasePage,
    BackNavBar,
} from 'AresComponent'
export default class DeliveryFailure extends BasePage{
    onBack(){
        this.props.navigator.pop()
    }
    render(){
        return (
            <View style={{flex:1,backgroundColor:'#F5F5F9'}}>
                <ScrollView>
                    <BackNavBar component={this} >物流信息</BackNavBar>
                    <View style={{flex:1}}>
                        <View style={{marginTop : 130,justifyContent:'center',alignItems:'center'}}>
                            <Image source={require('ares/app/assets/image/none.png')} style={{width:122,height:134}}/>
                        </View>
                        <View style={{marginTop :50}}>
                            <Text style={{textAlign:'center',fontSize:18,color:'#969696',marginHorizontal:30}}>暂未查到订单号，请您核对清楚后重新输入</Text>
                        </View>
                    </View>

                </ScrollView>
            </View>


        )
    }
}