import React from 'react'

import {
    Alert,
    View,
    StyleSheet,
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
    NavigatorUtils,
} from 'AresComponent'

import Radio from 'antd-mobile/lib/radio'
import List from 'antd-mobile/lib/list'

const RadioItem = Radio.RadioItem;

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#f5f5f9",
        flex: 1,
    },
    
});

class TelephoneFamily extends BasePage {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    onChange(family) {
        this.setState({ family: family });
        NavigatorUtils.popToRoute(this.props.navigator, { id: 'TelephoneCost', params: { family: family} })
    }

    render() {
        let family = this.props.family || this.state.family
        return (
            <View style={styles.root}>
                <BackNavBar component={this}>家庭</BackNavBar>
                <List>
                    <RadioItem key='我家' checked={family === '我家'} onChange={() => this.onChange('我家')}>我家</RadioItem>
                    <RadioItem key='父母' checked={family === '父母'} onChange={() => this.onChange('父母')}>父母</RadioItem>
                    <RadioItem key='房东' checked={family === '房东'} onChange={() => this.onChange('房东')}>房东</RadioItem>
                    <RadioItem key='朋友' checked={family === '朋友'} onChange={() => this.onChange('朋友')}>朋友</RadioItem>
                </List>
            </View>
        )
    }

}
export default TelephoneFamily
