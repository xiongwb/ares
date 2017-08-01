/**
* by dujh
*/

import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ART,
  ListView,
  ScrollView,
} from 'react-native'
import {
  Navbar,
  BackNavBar,
  BasePage,
  AresTextInput,
} from 'AresComponent'
import {
  COMMON_STYLES,
} from 'AresConstant'
import React  from 'react';
import { observable, computed } from 'mobx';
import Item from './Item';
import { observer } from 'mobx-react/native';
const styles = StyleSheet.create({
  root: {
    flex: 1,
  }
});


@observer
export default class ItemList extends BasePage {

  render() {
    const { cartData } = this.props;
    return (
          <ScrollView showsVerticalScrollIndicator={false}>
              {
          cartData.cData.slice(0).map((data, index) => {
            return  <Item index={index} navigator={this.props.navigator} data={data} cartData={cartData} />
          })
        }
          </ScrollView>
    );
  }
}
