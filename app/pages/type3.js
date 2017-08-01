import React from 'react'

import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ART,
  AsyncStorage,
  ListView,
  ScrollView
} from 'react-native'
import {
  Navbar,
  BackNavBar,
  StringUtils,
  BasePage,
} from 'AresComponent'
import {
  STORAGE_KEYS,
  COMMON_STYLES,
} from 'AresConstant'
import Icon from 'react-native-vector-icons/FontAwesome'
import AresAPI from 'AresAPI'
var full_width = Dimensions.get('window').width
var full_height = Dimensions.get('window').height
const styles = StyleSheet.create({
    root: {
    backgroundColor: COMMON_STYLES.MAIN_BACKGROUND_COLOR,
    flex: 1,

  },
  list_root: {
    flexDirection:'row',
    alignItems:'center',
    marginLeft:14,
    marginTop:5
  },
   assets_Listview:{
    height:42,
    backgroundColor:'#ffffff',
    borderColor:'#DDDDDD',
  }

});

class Type3 extends BasePage  {
  constructor(props) {
  super(props);

  this.state = {
    data:[]
  };
}

componentWillMount() {
     AsyncStorage.getItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
      let hash = JSON.parse(value)
        if (!!hash && !!hash.custNo) {
           AresAPI.FindAcct.findacctacct3List({
            custno:hash.custNo
           }).done((res_json,res) => {

               this.setState({data:res_json.findAcctList})

          })
        }
    })
  }
type3(rowData, sectionID, rowID){
     const h_line_1 = ART.Path();
    h_line_1.moveTo(15,1);
    h_line_1.lineTo(full_width,1);
    let amt = StringUtils.moneyFormatData2Money(rowData.amt)
    let str = rowData.acctno;
    let reg = /^(\d{4})\d+(\d{4})$/;
    str = str.replace(reg, "$1****$2");
    return (
         <TouchableOpacity  style={{marginTop:10,alignItems:'center'}}  onPress={ () => this.props.navigator.push({id: "Type3Account", params: {bal:rowData.amt,account3:rowData.acctno}})}>
          <Image source={require('ares/app/assets/image/three_bg03.png')} style={{width:350,height:110}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <View style={{backgroundColor:'transparent',}}>
                  <Text style={{fontSize:18,color:'white',marginTop:10,marginLeft:16}}>{str}</Text>
                  <Text style={{fontSize:35,color:'white',marginLeft:16}}>{amt}￥</Text>
                </View>

              </View>
          </Image>
       </TouchableOpacity>
      );
    }
  render(){
    let dataSource= new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.state.data);
    return(
      <View style={styles.root}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <BackNavBar component={this}  backgroundColor={COMMON_STYLES.NAVIBAR_COLOR} backTextColor="#FFFFFF" titleColor="#FFFFFF">三类账户</BackNavBar>
            <ListView
          dataSource={dataSource}
          renderRow={this.type3.bind(this)}
         />
      </ScrollView>
    </View>

    )
  }
}
export default Type3
