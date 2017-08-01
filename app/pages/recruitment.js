/**
 * Created by 宏基电脑 on 2017/5/9.
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
export default class Recruitment extends BasePage{
    
    render(){
        return (
            <View style={{flex:1,backgroundColor:'#F5F5F9'}}>
                <ScrollView>
                <BackNavBar component={this} >物流信息</BackNavBar>
                <View style={{flex:1,borderBottomWidth:1,marginTop:10,borderColor:'#C1CDC1',backgroudColor:'white'}}>
                    <View style={{marginTop : 70,justifyContent:'center',alignItems:'center'}}>
                        <Image source={require('ares/app/assets/image/none.png')} style={{width:122,height:134}}/>
                    </View>
                    <View style={{marginTop : 16,marginBottom:20}}>
                        <Text style={{textAlign:'center',fontSize:20,color:'#101010'}}>暂未查到物流信息</Text>
                    </View>
                </View>
                <View>
                    <Text style={{marginHorizontal:15,flex:1,marginTop:10}}>这个包裹可能刚刚上路未录入，您可以保存运单以便跟踪包裹。</Text>
                    </View>
                    </ScrollView>
            </View>


        )
    }
}
