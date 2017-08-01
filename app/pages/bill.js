import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  ListView,
  ART,
  Dimensions,
  Alert,
  AsyncStorage,
} from 'react-native'
import {
  BasePage,
  BackNavBar,
  StringUtils,
} from 'AresComponent'
import {
  STORAGE_KEYS,
} from 'AresConstant'
import Icon from 'react-native-vector-icons/FontAwesome'
import AresAPI from 'AresAPI'

var full_width = Dimensions.get('window').width

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header : {
    backgroundColor: '#F5F5F5',
    height:30,
    justifyContent:'center',
  },
  row:{
    flex:1,
    backgroundColor:'#ffffff',
    flexDirection:'row',
    height:55,
    alignItems:'center',
    marginLeft:15,
  }
});

var pageCount = 1
var firstApi = 0
class Bill extends BasePage {
  constructor(){
    super();
    this.state = {
      totalList:[],
      foot:0
    }
  }

  request_api(){
    AsyncStorage.getItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
      let hash = JSON.parse(value)
      if (!!hash) {
          AresAPI.FindAcct.findacctAcctItemPage({
            custNo:hash.custNo,
            pageNumber:pageCount
           }).done((res_json,res) => {

            if (res_json.retCode == '1' && res_json.dataList) {
                var currentData = this.state.totalList
                for (var i = 0 ; i < res_json.dataList.length ; i++) {
                  currentData.push(res_json.dataList[i])
                }
                if (firstApi == 0 && currentData.length < 15) {
                  this.setState({
                    totalList:currentData,
                                })
                  firstApi = 1
                }else{
                  this.setState({
                    totalList:currentData,
                    foot:1
                                })
                }

            }else if(res_json.retCode == '0' && res_json.retMsg == "当前页无数据"){
              Alert.alert('提示', "暂无更多数据", [{ text: '确定'}])
              this.setState({
                  foot:3
              })
            }else {
              Alert.alert('提示', res_json.retMsg, [{ text: '确定'}])
            }
        })

      }
    })
  }

  componentWillMount() {
    this.request_api()
  }
  componentWillUnmount() {
    pageCount = 1
    firstApi = 0
  }

  render() {
    if (this.state.totalList === []) {
      return (
          <View style={styles.root}>
            <BackNavBar component={this}>账单</BackNavBar>
          </View>
        )
    }else{
      let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.state.totalList);
      return (
      <View style={styles.root}>
        <BackNavBar component={this}>账单</BackNavBar>
        <ListView
        dataSource={dataSource}
        renderRow={this.renderRow.bind(this)}
        onEndReached={this.endReached.bind(this)}
        renderFooter={this.renderFooter.bind(this)}
        onEndReachedThreshold={0}
        />
      </View>
      );
    }

  }
/*
  renderHeaderfunction(sectionData,sectionId){
     return(
      <View style={styles.header}>
        <Text style={{marginLeft:15,fontSize:15}}>本月</Text>
      </View>
    )
  }
*/

  renderFooter(){
    if (this.state.foot === 0) {
      return
    }
    if(this.state.foot === 1){//加载完毕
      return (
        <View style={{height:40,alignItems:'center',justifyContent:'center'}}>
            <Text style={{color:'#999999',fontSize:12,marginTop:10}}>
                加载完毕
            </Text>
        </View>);
    }else if(this.state.foot === 2) {//加载中
      return (
        <View style={{height:40,alignItems:'center',justifyContent:'center'}}>
            <Text style={{color:'#999999',fontSize:12,marginTop:10}}>
                加载中
            </Text>
        </View>);
    }else if(this.state.foot === 3) {//加载中
      return (
        <View style={{height:40,alignItems:'center',justifyContent:'center'}}>
            <Text style={{color:'#999999',fontSize:12,marginTop:10}}>
                我是有底线的
            </Text>
        </View>);
    }
  }

  endReached(){
    if(this.state.foot == 0 ){
      return ;
    }else{
      this.setState({
        foot:2,
      });
      pageCount ++
      this.request_api();
    }
  }

  create_image_by_message(message){
    if (message === "1类转入3类过渡户") {
      return <Image source={require('ares/app/assets/image/sanlei.png')} style={{width:20,height:20,marginLeft:30}} />
    }
    if (message === "1类转入2类过渡户") {
      return <Image source={require('ares/app/assets/image/erlei.png')} style={{width:20,height:20,marginLeft:30}} />
    }
  }

  renderRow(rowData,sectionId) {
    const path = ART.Path();
    path.moveTo(1,1); //将起始点移动到(1,1) 默认(0,0)
    path.lineTo(full_width,1); //连线到目标点(300,1)

    let count = StringUtils.moneyFormatData2Money(rowData.amt)

    var strs= new Array(); //定义一数组
    strs = rowData.curTime.split(" ");

    if (rowData.cdflag == "+") {
        return (
          <View>
            <View style={styles.row}>
              <View>
                <Text>{strs[0]}</Text>
                <Text style={{marginTop:5}}>{strs[1]}</Text>
              </View>
              {this.create_image_by_message(rowData.oppAccName)}
              <View>
                <Text style={{fontSize:16,marginLeft:30,color:'#32bbb4'}}>{rowData.cdflag + count + '(元)'}</Text>
                <Text style={{fontSize:12,marginLeft:30,marginTop:5,color:'#BDBDBD'}}>{rowData.oppAccName}</Text>
              </View>
            </View>
            <ART.Surface width={full_width} height={1}>
              <ART.Shape d={path} stroke="#dddddd" strokeWidth={1} />
            </ART.Surface>
          </View>
        )
    }else if (rowData.cdflag == "-") {
          return (
            <View>
              <View style={styles.row}>
                <View>
                  <Text>{strs[0]}</Text>
                  <Text style={{marginTop:5}}>{strs[1]}</Text>
                </View>
                {this.create_image_by_message(rowData.oppAccName)}
                <View>
                  <Text style={{fontSize:16,marginLeft:30,color:'#f5787c'}}>{rowData.cdflag + count + '(元)'}</Text>
                  <Text style={{fontSize:12,marginLeft:30,marginTop:5,color:'#BDBDBD'}}>{rowData.oppAccName}</Text>
                </View>
              </View>
              <ART.Surface width={full_width} height={1}>
                <ART.Shape d={path} stroke="#dddddd" strokeWidth={1} />
              </ART.Surface>
            </View>
          )
    }else{
      return <View></View>
    }
  }
}
export default Bill
