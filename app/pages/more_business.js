import React from 'react'

import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ART,
  Navigator,
} from 'react-native'
import {
  BasePage,
  BackNavBar,
  PushLogin,
} from 'AresComponent'
import {
  COMMON_STYLES,
  STORAGE_KEYS,
} from 'AresConstant'
import Button from 'antd-mobile/lib/button'
import InputItem from 'antd-mobile/lib/input-item'


const full_width = Dimensions.get('window').width

const styles = StyleSheet.create({
  root: {
    backgroundColor: COMMON_STYLES.MAIN_BACKGROUND_COLOR,
    flex: 1,
  },
});

class MoreBusiness extends BasePage {
  constructor(props) {
    super(props);
    this.state={

    };
  }

  onBack() {
      this.props.navigator.resetTo({ id: 'Dashboard', params: {} })
  }

  render() {
    const vertical_line = ART.Path();
    vertical_line.moveTo(1,1);
    vertical_line.lineTo(1,89);
    const horizontal_line = ART.Path();
    horizontal_line.moveTo(1,1);
    horizontal_line.lineTo(full_width,1);
    return(
      <View style={styles.root}>
        <BackNavBar component={this}>综合服务大厅</BackNavBar>
        <View style={{height:52,borderBottomColor:COMMON_STYLES.MAIN_BACKGROUND_COLOR,borderBottomWidth:1,alignItems:'center',justifyContent:'center',backgroundColor:'#fff'}}>
          <TouchableOpacity onPress={()=>this.props.navigator.push({id:'SelectCity',config_scene_type:Navigator.SceneConfigs.FloatFromBottom,params:{city:this.props.city||'天津'}})}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
              <Image source={require('ares/app/assets/image/location.png')} style={{alignSelf:'center'}}/>
              <Text style={{color:'#333333',fontSize:13,marginHorizontal:9}}>{this.props.city||'天津'}</Text>
              <Image source={require('ares/app/assets/image/arrow_down.png')} style={{alignSelf:'center'}}/>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{height:84,flexDirection:'row',alignItems:'center',marginTop:5,backgroundColor:'#fff'}}>
          <View style={{flex:1,alignItems:'center'}}>
            <TouchableOpacity onPress={()=>this.props.navigator.push({id:'WaterCostOrg'})}>
              <Image source={require('ares/app/assets/image/water_rate.png')} style={{alignSelf:'center'}}/>
              <Text style={{color:'#101010',fontSize:12,marginTop:10}}>水费</Text>
            </TouchableOpacity>
          </View>
          <ART.Surface width={2} height={89}>
            <ART.Shape d={vertical_line} stroke={COMMON_STYLES.MAIN_BACKGROUND_COLOR} strokeWidth={1} />
          </ART.Surface>
          <View style={{flex:1,alignItems:'center'}}>
            <TouchableOpacity onPress={()=>this.props.navigator.push({id:'ElectricityCostOrg'})}>
              <Image source={require('ares/app/assets/image/power_rate.png')} style={{alignSelf:'center'}}/>
              <Text style={{color:'#101010',fontSize:12,marginTop:10}}>电费</Text>
            </TouchableOpacity>
          </View>
          <ART.Surface width={2} height={89}>
            <ART.Shape d={vertical_line} stroke={COMMON_STYLES.MAIN_BACKGROUND_COLOR} strokeWidth={1} />
          </ART.Surface>
          <View style={{flex:1,alignItems:'center'}}>
            <TouchableOpacity onPress={()=>this.props.navigator.push({id:'GasCostOrg'})}>
              <Image source={require('ares/app/assets/image/gas_bill.png')} style={{alignSelf:'center'}}/>
              <Text style={{color:'#101010',fontSize:12,marginTop:10}}>燃气费</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ART.Surface width={full_width} height={1}>
          <ART.Shape d={horizontal_line} stroke={COMMON_STYLES.MAIN_BACKGROUND_COLOR} strokeWidth={1} />
        </ART.Surface>
        <View style={{height:84,flexDirection:'row',alignItems:'center',backgroundColor:'#fff'}}>
          <View style={{flex:1,alignItems:'center'}}>
            <TouchableOpacity onPress={()=>this.props.navigator.push({id:'CATVCostOrg'})}>
              <Image source={require('ares/app/assets/image/CATV.png')} style={{alignSelf:'center'}}/>
              <Text style={{color:'#101010',fontSize:12,marginTop:10}}>有线电视</Text>
            </TouchableOpacity>
          </View>
          <ART.Surface width={2} height={89}>
            <ART.Shape d={vertical_line} stroke={COMMON_STYLES.MAIN_BACKGROUND_COLOR} strokeWidth={1} />
          </ART.Surface>
          <View style={{flex:1,alignItems:'center'}}>
            <TouchableOpacity onPress={()=>this.props.navigator.push({id:'TelephoneCostOrg'})}>
              <Image source={require('ares/app/assets/image/phone_broadband.png')} style={{alignSelf:'center'}}/>
              <Text style={{color:'#101010',fontSize:12,marginTop:10}}>固话宽带</Text>
            </TouchableOpacity>
          </View>
          <ART.Surface width={2} height={89}>
            <ART.Shape d={vertical_line} stroke={COMMON_STYLES.MAIN_BACKGROUND_COLOR} strokeWidth={1} />
          </ART.Surface>
          <View style={{ flex: 1, alignItems: 'center' }}>
              <TouchableOpacity onPress={() => this.props.navigator.push({ id: 'TelephoneRecharge' })}>
                  <Image source={require('ares/app/assets/image/telephone_fare1.png')} style={{ alignSelf: 'center' }} />
                  <Text style={{ color: '#101010', fontSize: 12, marginTop: 10 }}>话费充值</Text>
              </TouchableOpacity>
          </View>
        </View>
        <ART.Surface width={full_width} height={1}>
          <ART.Shape d={horizontal_line} stroke={COMMON_STYLES.MAIN_BACKGROUND_COLOR} strokeWidth={1} />
        </ART.Surface>
        <View style={{ height: 84, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff' }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => this.props.navigator.push({ id: 'FluxRecharge' })}>
                    <Image source={require('ares/app/assets/image/flow1.png')} style={{ alignSelf: 'center' }} />
                    <Text style={{ color: '#101010', fontSize: 12, marginTop: 10 }}>流量充值</Text>
                </TouchableOpacity>
            </View>
            <ART.Surface width={2} height={89}>
                <ART.Shape d={vertical_line} stroke={COMMON_STYLES.MAIN_BACKGROUND_COLOR} strokeWidth={1} />
            </ART.Surface>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => this.props.navigator.push({ id: 'BlueCard' })}>
                    <Image source={require('ares/app/assets/image/credit1.png')} style={{ alignSelf: 'center' }} />
                    <Text style={{ color: '#101010', fontSize: 12, marginTop: 10 }}>信用卡还款</Text>
                </TouchableOpacity>
            </View>
            <ART.Surface width={2} height={89}>
                <ART.Shape d={vertical_line} stroke={COMMON_STYLES.MAIN_BACKGROUND_COLOR} strokeWidth={1} />
            </ART.Surface>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => this.props.navigator.push({ id: 'MyExpress' })}>
                    <Image source={require('ares/app/assets/image/express1.png')} style={{ alignSelf: 'center' }} />
                    <Text style={{ color: '#101010', fontSize: 12, marginTop: 10 }}>我的快递</Text>
                </TouchableOpacity>
            </View>
        </View>
        <ART.Surface width={full_width} height={1}>
            <ART.Shape d={horizontal_line} stroke={COMMON_STYLES.MAIN_BACKGROUND_COLOR} strokeWidth={1} />
        </ART.Surface>
      </View>
    )
  }

}
export default MoreBusiness
