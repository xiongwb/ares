import React from 'react'
import AresAPI from 'AresAPI'
import {
    Alert,
    View,
    StyleSheet,
    ART,
    Navigator,
    AsyncStorage,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
} from 'react-native'
import {
  COMMON_STYLES,
  STORAGE_KEYS,
  VERIFY,
  EVENT_EMITTER_CONST,
} from 'AresConstant'
import {
    BasePage,
    BackNavBar,
} from 'AresComponent'

import Icon from 'react-native-vector-icons/FontAwesome'
import Button from 'antd-mobile/lib/button'

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#f5f5f9",
        flex: 1,
    },
    detailView: {
        backgroundColor: '#fff',
        paddingLeft: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E6E6E6',
    },
    iconView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 70,
        borderBottomWidth: 1,
        borderBottomColor: '#E6E6E6'
    },
    iconText: {
        fontSize: 17,
        marginLeft: 10,
    },
    messageView: {
        alignItems: 'flex-start',
        paddingTop:10,
        paddingRight: 10,
    },
    itemMsgView: {
        flexDirection: 'row',
        paddingBottom:10,
    },
    confirmView: {
        backgroundColor: '#fff',

        paddingHorizontal: 10,

        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#E6E6E6',
        borderBottomWidth: 1,
        borderBottomColor:'#E6E6E6',
    },

});

class HeatingConfirm extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            disabled: true,
            phone:'',
        };
    }

    inputChange(value) {
        this.setState({
            money: value,
            disabled: value != null && value > 0 ? false : true
        });
    }

    componentWillMount(){
      AsyncStorage.getItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
      let hash = JSON.parse(value)
      if (!!hash) {
        this.setState({phone:hash.phone})
    }
  })
  }

    submit() {
      const regexp=VERIFY.MONEY;
      if (regexp.test(this.state.money) === false) {
        Alert.alert('提示', '对不起，金额只支持亿元以内精确到两位小数的纯数字', [{ text: '确定'}]);
        return;
      }
      AsyncStorage.getItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
      let hash = JSON.parse(value)
      if (!!hash) {
        AresAPI.Card.cardFindBind({custNo:hash.custNo}).done((res_json, res)=>{
          if(res_json.retCode === 1){
             this.props.navigator.push({ id: 'PayTheFees', params: { price:this.state.money } })
      }else{
        Alert.alert('错误提示', '对不起，您还没有绑定银行卡', [{ text: '确定'}])
      }
    })
    }
    })
    }

    render() {
        return (
            <View style={styles.root}>
                <BackNavBar component={this}>生活缴费</BackNavBar>
                <View style={styles.detailView}>
                    <View style={styles.iconView}>
                        <Image source={require('../assets/image/central_heating.png')} />
                        <Text style={styles.iconText}>暖气费</Text>
                    </View>
                    <View style={styles.messageView}>
                        <View style={styles.itemMsgView}>
                            <Text style={{flex:2}}>缴费单位</Text>
                            <Text style={{ flex: 5 }}>{this.props.org.name}</Text>
                        </View>
                        <View style={styles.itemMsgView}>
                            <Text style={{ flex: 2 }}>缴费户号</Text>
                            <Text style={{ flex: 5 }}>{this.props.code}</Text>
                        </View>
                        <View style={styles.itemMsgView}>
                            <Text style={{ flex: 2 }}>户名</Text>
                            <Text style={{ flex: 5 }}>侯台家园房地产开发商</Text>
                        </View>
                        <View style={styles.itemMsgView}>
                            <Text style={{ flex: 2 }}>手机号码</Text>
                            <Text style={{ flex: 5 }}>{this.state.phone}</Text>
                        </View>
                        <View style={styles.itemMsgView}>
                            <Text style={{ flex: 2 }}>住址信息</Text>
                            <Text style={{ flex: 5 }}>天津市西青区中北镇侯台家园11号楼3单元1201</Text>
                        </View>
                        <View style={styles.itemMsgView}>
                            <Text style={{ flex: 2 }}>代扣</Text>
                            <Text style={{ flex: 5 }}>未开通</Text>
                        </View>
                        <View style={styles.itemMsgView}>
                            <Text style={{ flex: 2 }}>当前可用余额</Text>
                            <Text style={{ flex: 5 }}>111.11</Text>
                        </View>
                        <View style={styles.itemMsgView}>
                            <Text style={{ flex: 2 }}>当前欠费金额</Text>
                            <Text style={{ flex: 5 }}>0.00</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.confirmView}>
                    <Text style={{ fontSize: 17 }}>缴费金额</Text>
                    <TextInput style={{ flex: 3 }} maxLength={11} keyboardType='numeric' placeholder='请输入缴费金额' placeholderTextColor='#CCCCCC' underlineColorAndroid='transparent' value={this.state.money} onChangeText={value => this.inputChange(value)} />
                </View>
                <Button
                    style={{ marginHorizontal: 10, marginTop:15 }}
                    type="primary"
                    onClick={e => this.submit()}
                    disabled={this.state.disabled}
                >
                    立即缴费
                </Button>
            </View>
        )
    }

}
export default HeatingConfirm
