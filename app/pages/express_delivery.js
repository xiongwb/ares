/**
 * Created by 宏基电脑 on 2017/5/10.
 */
import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    Image,
    ART,
    TextInput,
    ListView,
    TouchableOpacity,
    ScrollView,
    Platform,
} from 'react-native'
import {
    BackNavBar,
    BasePage,
    NavBar,
} from 'AresComponent'
import WhiteSpace from 'antd-mobile/lib/white-space'
import Icon from 'react-native-vector-icons/FontAwesome'
const styles = StyleSheet.create({})
const sendList =[
    {
        name:'菜鸟驿站',
        abstract:'顺路到附近驿站寄，官方合作门店安心'
    },
    {
        name:'中通快递',
        abstract:'用我们的产品，体检急速服务'
    }
]
export default class LiuSend extends BasePage{
    creatSend(){
        let dataSource = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !==r2}).cloneWithRows(sendList);
        return(
            <View>
                <ListView
                    dataSource={dataSource}
                    renderRow={this.creatSendRow.bind(this)}
                    contentContainerStyle={styles.contentViewStyle}
                />
            </View>
        )
    }
    creatSendRow(rowData,sectionId){
        return(

            <View style={{flex:1,

                          flexDirection:'row',


                          opacity:0.8,
                          backgroundColor:'white'}}>
                <View style={{flex:1,marginLeft:10,borderBottomWidth:1,borderColor:'#ADADAD',marginVertical:5}} >
                    <TouchableOpacity onPress={() => this.props.navigator.push({id: "ExpressInfo"})}>
                        <View style={{flex:1}}>
                            <Text style={{fontSize:18,color:'black'}}>{rowData.name}</Text>
                        </View>
                        <View style = {{flex:1,marginTop:5}}>
                            <Text style = {{fontSize:15,color:'gray'}}>{rowData.abstract}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={()=>this.props.navigator.pop()}>
                        <Icon style={{marginRight:3,marginTop:15}} name="angle-right" size={22} color='#FF6600'/>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
    render(){
        return(
            <View style={{backgroundColor:'#F5F5F9',flex:1}}>
                <View>
                    <BackNavBar component={this}>寄快递</BackNavBar>
                </View>
                <ScrollView >
                    <View style={{borderTopWidth:1,marginTop:20,borderColor:'#ADADAD'}}>
                        {this.creatSend()}
                    </View>
                </ScrollView>
            </View>
        )
    }
}