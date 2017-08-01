import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  ListView,
  Platform,
} from 'react-native';

import {
  BasePage,
  BackNavBar,
} from 'AresComponent'

import AresAPI from 'AresAPI'

import { BDMapView ,getLocation } from 'react-native-bdmap';
import Popup from 'antd-mobile/lib/popup'
import Button from 'antd-mobile/lib/button'
import Icon from 'react-native-vector-icons/FontAwesome'

const full_height = Dimensions.get('window').height
const full_width = Dimensions.get('window').width

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#f5f5f9",
    flex: 1,

  },
});

class AresMap extends BasePage {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  componentWillMount(){
    let location = getLocation().then(position=>{
      let data = [];
      data.push({
        longitude:position.longitude,
        latitude:position.latitude
      });
      AresAPI.Bdmap.transform(data).done((res_json, res) => {
        if(res_json.status == 0){
          this.setState({region:{latitude:res_json.result[0].y,
                             longitude:res_json.result[0].x,
                             latitudeDelta:0.01,
                             longitudeDelta:0.01
                            }
                  });
        }else{
          Alert.alert('错误提示', '定位失败')
        }
      })
      
    });
  }

  fetchData(){
    let resultList = [];
      resultList.push({id:1,sort:1,title:'肯德基迎水道店',adress:'迎水道134号',latitude:39.0946500000,longitude:117.1361070000});
      resultList.push({id:2,sort:2,title:'正阳春烤鸭店',adress:'华苑地铁站附近',latitude:39.0940970000,longitude:117.1349210000});
      resultList.push({id:3,sort:3,title:'赵小国麻辣烫',adress:'迎水道141号',latitude:39.0945940000,longitude:117.1369510000});
      resultList.push({id:4,sort:4,title:'老板凳重庆小面',adress:'碧欣路侯台家园附近',latitude:39.1072360000,longitude:117.1226550000});
      resultList.push({id:5,sort:5,title:'上岛咖啡',adress:'鑫茂科技园附近',latitude:39.0930470000,longitude:117.1321770000});
      resultList.push({id:6,sort:6,title:'新美味麻辣香锅',adress:'侯台装饰城附近',latitude:39.1081350000,longitude:117.1213430000});
      return resultList;
  }

  local(){
    this.refs.bdmap._native.setNativeProps({region: this.state.region})
  }

  to_app(appName,latitude_d,longitude_d){
    let {latitude,longitude} = this.state.region;
    if(appName=='baidu'){
      let url;
      if(Platform.OS === 'android'){
        url = 'baidumap://map/direction?origin='+latitude+','+longitude+'&destination='+latitude_d+','+longitude_d;
      }else if(Platform.OS === 'ios'){
        url = 'baidumap://map/direction?origin='+latitude+','+longitude+'&destination='+latitude_d+','+longitude_d+'&mode=driving&src=webapp.navi.lesaas.ares';
      }
      Linking.canOpenURL(url).then(supported => {
        if (!supported) {
          Alert.alert('提示','请先安装百度地图app');
        } else {
          Popup.hide();
          return Linking.openURL(url);
        }
      }).catch(err => console.error('An error occurred', err));
    }else if(appName=='gaode'){
      let url = 'http://uri.amap.com/navigation?from='+longitude+','+latitude+',startpoint&to='+longitude_d+','+latitude_d+',endpoint&callnative=1';
      Linking.canOpenURL(url).then(supported => {
        if (!supported) {
          Alert.alert('提示','请先安装高德地图app');
        } else {
          Popup.hide();
          return Linking.openURL(url);
        }
      }).catch(err => console.error('An error occurred', err));
    }
  }

  detail(latitude,longitude){
    Popup.show(<View style={{height:full_height/3}}>
                  <View style={{flex:2,alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderBottomColor :'#c4c4c4'}}>
                    <Text style={{fontSize:20,}}>导航</Text>
                  </View>
                  <View style={{flex:2,alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderBottomColor :'#c4c4c4'}}>
                    <TouchableOpacity onPress={()=>this.to_app('baidu',latitude,longitude)}>
                      <Text style={{fontSize:17}}>百度地图</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{flex:2,alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderBottomColor :'#c4c4c4'}}>
                    <TouchableOpacity onPress={()=>this.to_app('gaode',latitude,longitude)}>
                      <Text style={{fontSize:17}}>高德地图</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{flex:2,alignItems:'center',justifyContent:'center'}}>
                    <TouchableOpacity onPress={() => Popup.hide()}>
                      <Text style={{fontSize:17}}>取消</Text>
                    </TouchableOpacity>
                  </View>
              </View>,{maskClosable:true,animationType:'slide-up'})
  }

  renderRow(rowData){
    return(
      <View style={{flexDirection:'row',height:55,marginHorizontal:10,borderBottomWidth:1,borderBottomColor :'#c4c4c4',alignItems:'center',justifyContent:'space-between'}}>
        <TouchableOpacity activeOpacity={1} onPress={()=>this.refs.bdmap._native.setNativeProps({region:{latitude:rowData.latitude,longitude:rowData.longitude,latitudeDelta:0.01,longitudeDelta:0.01}})}>
          <View>
            <Text style={{fontSize:15}}>{rowData.title}</Text>
            <Text style={{fontSize:12}}>{rowData.adress}</Text>
          </View>
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={()=>this.detail(rowData.latitude,rowData.longitude)}>
            <Image source={require('ares/app/assets/image/toApp.png')} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    let { region } = this.state;
    if(region){
      let {latitude,longitude} = region;
      let data = this.fetchData();
      let rrr = [];
      rrr.push({id:'local',latitude:latitude,longitude:longitude});
      for(let i in data){
        rrr.push({id:data[i].id+'',latitude:data[i].latitude,longitude:data[i].longitude});
      }
      let result = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(data)
      return (
        <View style={styles.root}>
          <BackNavBar component={this} backText='返回'></BackNavBar>
          <BDMapView ref='bdmap'
                     style={{flex:1}}
                     defaultRegion={region}
                     annotations={rrr}/>
          <TouchableOpacity style={{position:'absolute',left:10,bottom:full_height/2}} onPress={this.local.bind(this)}>
            <Image source={require('ares/app/assets/image/local.png')} />
          </TouchableOpacity>
          <View style={{flex:1}}>
            <ListView dataSource={result}
                      renderRow={this.renderRow.bind(this)}/>
          </View>
        </View>
      )
    }else{
      return (
        <View style={styles.root}>
          <BackNavBar component={this} backText='返回'></BackNavBar>
          <Text>loading...</Text>
        </View>
      )
    }
  }
}

export default AresMap
