import React from 'react'
import {
ART,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ListView,
  Alert,
 Dimensions,
 ScrollView,
 StatusBar,
} from 'react-native'
/*查看物流
      张乐   */
import {
  BasePage,
  BackNavBar,
} from 'AresComponent'
import {
  COMMON_STYLES,
} from 'AresConstant'

import Icon from 'react-native-vector-icons/FontAwesome'
var full_width = Dimensions.get('window').width
let viewWidth = full_width-15-75-10-10-20-15
const DEFAULT_RED_COLOR = '#f5787c'
const styles = StyleSheet.create({
 root: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  assets_view:{
    height:55,
    borderBottomWidth:0.5,
    backgroundColor:'#ffffff',
    borderColor:'#DDDDDD',
    marginTop:20,
  },
  list_root: {
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    marginLeft:14,
  },


});

 class RefundSchedule extends BasePage {
 constructor(props){
    super(props);
    this.state = {

    }
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  this.state = {
    dataSource: ds.cloneWithRows([1,2,3,4]),
  };
  }


huoyun(rowdata){
  let a = this.props.price+10
    const path = ART.Path();
    path.moveTo(0,10); //将起始点移动到(1,1) 默认(0,0)
    path.lineTo(1,200); //连线到目标点(300,1)
    const line = ART.Path();
    path.moveTo(1,10); //将起始点移动到(1,1) 默认(0,0)
    path.lineTo(full_width,1); //连线到目标点(300,1)
    if(rowdata==1){
      return(
        <View style={{marginTop:18,flexDirection:'row',backgroundColor:'#fff'}}>
            <View >
                <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'#ff9800',width:22,height:22,borderRadius:11,marginLeft:12,marginBottom:0}} >
                    <Text style={{color:'#ffffff'}}>{rowdata}</Text>
                </View>
                <View   style={{marginLeft:22,width:2,flex:1,backgroundColor:'#ff9800'}}/>
            </View>
             <View style={{flex:1}}>
                <View style={{justifyContent:'space-between',flexDirection:'row'}} >
                    <Text style={{marginLeft:14,color:'#101010',fontSize:16}}>申请提交</Text>
                    <Text style={{marginTop:3,marginRight:16,color:'#101010',fontSize:14}}></Text>
                </View>
                <Text style={{marginRight:16,marginLeft:14,color:'#808080',fontSize:14}}>您的退款申请已成功提交</Text>
            </View>
        </View>
    )}
    if(rowdata==2){
      return(

        <View style={{ flexDirection:'row',backgroundColor:'#fff'}}>
            <View >
                <View  style={{marginLeft:22,width:2,flex:1,backgroundColor:'#bbbbbb'}}/>
                    <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'#bbbbbb',width:22,height:22,borderRadius:11,marginLeft:12,marginBottom:0}} >
                        <Text style={{color:'#ffffff'}}>{rowdata}</Text>
                    </View>
                <View  style={{marginLeft:22,width:2,flex:1,backgroundColor:'#bbbbbb'}}/>
            </View>
            <View style={{marginTop:37,flex:1}}>
                <View style={{justifyContent:'space-between',flexDirection:'row'}} >
                    <Text style={{marginLeft:14,color:'#101010',fontSize:16}}>商家处理中</Text>
                    <Text style={{marginTop:3,marginRight:16,color:'#101010',fontSize:14}}></Text>
                </View>
                <Text style={{marginRight:16,marginLeft:14,color:'#808080',fontSize:14}}>您的退款申请已受理，商家会尽快完成审核，部分商品需要1-2个工作日</Text>
            </View>
        </View>

        )}
    if(rowdata==3){
      return(

            <View style={{ flexDirection:'row',backgroundColor:'#fff'}}>
                <View >
                <View   style={{marginLeft:22,width:2,flex:1,backgroundColor:'#bbbbbb'}}/>
                    <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'#bbbbbb',width:22,height:22,borderRadius:11,marginLeft:12,marginBottom:0}} >
                        <Text style={{color:'#ffffff'}}>{rowdata}</Text>
                    </View>
                    <View   style={{marginLeft:22,width:2,flex:1,backgroundColor:'#bbbbbb'}}/>
                </View>
                <View style={{marginTop:37,flex:1}}>
                    <View style={{justifyContent:'space-between',flexDirection:'row'}} >
                        <Text style={{marginLeft:14,color:'#101010',fontSize:16}}>账户支付处理中</Text>
                        <Text style={{marginTop:3,marginRight:16,color:'#101010',fontSize:14}}></Text>
                    </View>
                    <Text style={{marginRight:16,marginLeft:14,color:'#808080',fontSize:14}}>商家审核通过后退款申请将提至二类/三类账户，并在1-3个工作日完成处理</Text>
                </View>
            </View>

        )}
    if(rowdata==4){
      return(
        <View style={{ flexDirection:'row',backgroundColor:'#fff'}}>
            <View >
                 <View   style={{marginLeft:22,width:2,height:30,backgroundColor:'#bbbbbb'}}/>
                <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'#bbbbbb',width:22,height:22,borderRadius:11,marginLeft:12,marginBottom:0}} >
                    <Text style={{color:'#ffffff'}}>{rowdata}</Text>
                </View>
            </View>
             <View style={{marginTop:30,flex:1}}>
                <View style={{justifyContent:'space-between',flexDirection:'row'}} >
                    <Text style={{marginLeft:14,color:'#101010',fontSize:16}}>退款成功</Text>
                    <Text style={{marginTop:3,marginRight:16,color:'#101010',fontSize:14}}></Text>
                </View>
                <Text style={{marginRight:16,marginLeft:14,color:'#808080',fontSize:14}}>{a.toFixed(2).toString()}元退款会在3-5个工作日内退至您的账户中</Text>
            </View>
        </View>

    )}


}

  render() {
    let sum = this.props.price+10
    return(
    	<View style={styles.root}>
    	<BackNavBar component={this} >退款</BackNavBar>
        <View style={{borderWidth:1,borderColor:'#dddddd',justifyContent:'center'}}>
            <View style={{marginTop:20,flexDirection:'row'}}>
                <Text  style={{marginLeft:14,color:'#808080',fontSize:14}}>退款总金额(含运费10元)</Text>
                <Text  style={{marginLeft:14,color:'#f29836',fontSize:14}}>{sum.toFixed(2).toString()}</Text>
            </View>
            <View style={{ marginTop:20,flexDirection:'row'}}>
                <Text  style={{marginLeft:14,color:'#808080',fontSize:14}}>商品总数量</Text>
                <Text  style={{marginLeft:14,color:'#101010',fontSize:14}}>{this.props.count.toString()}</Text>
            </View>
            <View style={{marginVertical:20, flexDirection:'row'}}>
                <Text  style={{marginLeft:14,color:'#808080',fontSize:14}}>钱款去向</Text>
                <Text  style={{marginLeft:14,color:'#101010',fontSize:14}}>退回到付款账户</Text>
            </View>
        </View>
        <Text  style={{marginTop:20,marginLeft:14,color:'#101010',fontSize:14}}>退款流程</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.huoyun.bind(this)}

         />


      </View>
    );
  }



}
export default  RefundSchedule
