/**
 * Created by 宏基电脑 on 2017/5/10.
 */
import React from 'react'
import {
    Text,
    View,
    Dimensions,
    ART,
    Image,
    TextInput,
    Platform,
} from 'react-native'
import {
    BackNavBar,
    BasePage,
    NavBar,
} from 'AresComponent'
export default class TakeSuccess extends BasePage {
    render(){
        return(
            <View style={{backgroundColor:'white',flex:1}}>
                <BackNavBar component={this}>寄快递</BackNavBar>
                <View style={{flex:1}}>
                    <View style={{marginTop : 70,justifyContent:'center',alignItems:'center'}}>
                        <Image source={require('ares/app/assets/image/reset_login_pwd_success.png')} style={{width:150,height:150}}/>
                    </View>
                    <Text style={{textAlign:'center',fontSize:20,flex:1,marginHorizontal:30,marginTop:20}}>
                        正在为您提交到最近的快递地点，请您耐心等候。
                    </Text>
                </View>
            </View>
        )


    }
}