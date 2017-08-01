/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';


import {
  Dialog,
} from 'AresComponent'

import Button from 'antd-mobile/lib/button'


export default class TestDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <View style={styles.root}>
        <Dialog
          ref="dialog"
          title="自定义标题内容"

          content={
            <TextInput
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
              style={{height: 40, borderColor: '#ccc', borderWidth: 1, padding: 10,}}
             />
          }
          leftButtonText="自定义文字"
          rightButtonText="可选"
          onLeftButonClick={()=>{
            this.setState({text: ""})
            this.refs.dialog.close()
          }}
          onRightButtonClick={()=>{
            this.refs.dialog.close()
          }}
        />

        <Button
          onClick={()=> this.refs.dialog.show()}
        >
          显示 Dialog
        </Button>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    marginTop: 20,
    flex: 1,
  },
});
