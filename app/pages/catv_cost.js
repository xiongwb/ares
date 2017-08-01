import React from 'react'

import {
    Alert,
    View,
    StyleSheet,
    ART,
    Navigator,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
} from 'react-native'

import {
  VERIFY,
} from 'AresConstant'

import {
    BasePage,
    BackNavBar,
    NavigatorUtils,
} from 'AresComponent'
import dismissKeyboard from 'dismissKeyboard'
import Icon from 'react-native-vector-icons/FontAwesome'
import Button from 'antd-mobile/lib/button'

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#f5f5f9",
        flex: 1,
    },
    familyView: {
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
        borderBottomColor:'#E6E6E6'
    },
    iconText: {
        fontSize: 17,
        marginLeft:10,
    },
    familySelectView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height:50,
        paddingRight:10,
    },
    arrowBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    userCode: {
        marginTop: 15,
        paddingLeft: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#E6E6E6',
        borderBottomWidth: 1,
        borderBottomColor: '#E6E6E6',
    },
    orgSelect: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        paddingRight: 10,
        borderBottomWidth: 1,
        borderBottomColor:'#E6E6E6'
    },
    userView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    agreeView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        marginTop: 15,
        marginBottom:15,
    },
});

class CATVCost extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            disabled: true,
            org: this.props.org,
            family: this.props.family
        };
    }

    selectFamily() {
        if (this.props.family) {
            return this.props.navigator.push({ id: 'CATVFamily', params: { family: this.props.family } })
        } else {
            return this.props.navigator.push({ id: 'CATVFamily', params: { family: '我家' } })
        }

    }

    inputChange(value) {
        this.setState({
            code: value,
            disabled: value != null && value.length > 0 ? false : true
        });
    }

    submit() {
      dismissKeyboard()
      const regexp=VERIFY.NUM;
      if (regexp.test(this.state.code) === false) {
        Alert.alert('提示', '对不起，请输入正确的用户编号', [{ text: '确定'}]);
        return;
      }
        this.props.navigator.push({ id: 'CATVConfirm', params: { code: this.state.code, org: this.state.org } })
    }



    render() {
        return (
            <View style={styles.root}>
                <BackNavBar component={this}>新增缴费用户</BackNavBar>
                <View style={styles.familyView}>
                    <View style={styles.iconView}>
                        <Image source={require('../assets/image/CATV.png')} />
                        <Text style={styles.iconText}>有线电视</Text>
                    </View>
                    <View style={styles.familySelectView}>
                        <Text style={{ fontSize: 17 }}>家庭</Text>
                        <TouchableOpacity style={styles.arrowBtn} onPress={() => this.selectFamily()}>
                            <Text style={{ color: '#CCCCCC', marginRight: 8 }}>{this.props.family || "我家"}</Text>
                            <Icon name='angle-right' size={22} color='#CCCCCC'/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.userCode}>
                    <View style={styles.orgSelect}>
                        <Text style={{ fontSize: 17 }}>缴费单位</Text>

                            <Text style={{ color: '#CCCCCC', marginRight: 8 }}>{this.state.org.name}</Text>


                    </View>
                    <View style={styles.userView}>
                        <Text style={{ fontSize: 17, marginRight: 10 }}>用户编号</Text>
                        <TextInput keyboardType='numeric' maxLength={8} style={{ flex: 1 }} placeholder='查看纸质账单' placeholderTextColor='#CCCCCC' underlineColorAndroid='transparent' value={this.state.code} onChangeText={value => this.inputChange(value)}/>
                    </View>
                </View>
                <View style={styles.agreeView}>
                    <Text>同意</Text>
                    <Text style={{ color: '#5599FF' }}>&lt;&lt;自助缴费服务协议&gt;&gt;</Text>
                </View>
                <Button
                    style={{ marginHorizontal:10}}
                    type="primary"
                    onClick={e => this.submit()}
                    disabled={this.state.disabled}
                >
                    下一步
                </Button>
            </View>
        )
    }

}
export default CATVCost
