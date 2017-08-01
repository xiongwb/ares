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
    ListView,
    TouchableOpacity,
} from 'react-native'

import {
    BasePage,
    BackNavBar,
} from 'AresComponent'

import { getLocation, geoReverse } from 'react-native-bdmap';
import Radio from 'antd-mobile/lib/radio'
import List from 'antd-mobile/lib/list'

const RadioItem = Radio.RadioItem;

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#f5f5f9",
        flex: 1,
    },
    searchView: {
        backgroundColor: "#BBBBBB",
        height: 55,
        padding: 6,
    },
    inputView: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 5,
        justifyContent:'center'
    },
});

class CATVCostOrg extends BasePage {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentWillMount() {
        if (this.props.city != null) {
            this.setState({ cityName: this.props.city });
        } else {
            getLocation().then(position => {
                geoReverse({ latitude: position.latitude, longitude: position.longitude }).then((value) => {
                    let city = value.addressComponent.city;
                    this.setState({ cityName: city });
                })
            });
        }
    }

    fetchData() {
        let data = [{ id: 1, name: "天津广播电视网络有限公司" }, { id: 2, name: "天津泰达有线电视网络有限公司" }];
        return data;
    }

    onChange(org) {
        this.setState({ id: org.id });
        this.props.navigator.push({ id: "CATVCost", params: { org: org } })
    }

    render() {
        let id = this.props.id || this.state.id
        const datas = this.fetchData();
        return (
            <View style={styles.root}>
                <BackNavBar component={this} rightContent={
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => this.props.navigator.push({ id: "Location", params: { city: this } })}>
                        <Text style={{width:80,fontSize:16,color:'#fff',textAlign:'right'}}>{this.state.cityName != null ? this.state.cityName.substring(0, this.state.cityName.length) : '选择城市'}</Text>
                    </TouchableOpacity>
                }>机构选择</BackNavBar>
                <View style={styles.searchView}>
                    <View style={styles.inputView}>
                        <TextInput style={{flex:1}} placeholder="目前无搜索引擎，暂不支持搜索" editable={false} underlineColorAndroid='transparent' value={this.state.text} onChangeText={value => this.setState({ text: value })}></TextInput>
                    </View>
                </View>
                <List>
                    {datas.map(i => (
                        <RadioItem key={i.id} checked={id === i.id} onChange={() => this.onChange(i)}>
                            {i.name}
                        </RadioItem>
                    ))}
                </List>
            </View>
        )
    }

}
export default CATVCostOrg
