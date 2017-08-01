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
  Alert,
  ListView,
  AsyncStorage,
  ScrollView
} from 'react-native'
import {
  Navbar,
  BackNavBar,
  StringUtils,
  BasePage,
  Dialog,
  PasswordInput,
} from 'AresComponent'
import {
  STORAGE_KEYS,
  COMMON_STYLES,
} from 'AresConstant'
import Icon from 'react-native-vector-icons/FontAwesome'
import WhiteSpace from 'antd-mobile/lib/white-space'
import AresAPI from 'AresAPI'
var full_width = Dimensions.get('window').width
var full_height = Dimensions.get('window').height
const styles = StyleSheet.create({
    root: {
    backgroundColor: COMMON_STYLES.MAIN_BACKGROUND_COLOR,
    flex: 1,

  },
  head_view: {
    height:75,
    marginLeft:10,
    backgroundColor:'transparent'
  },

});
var dataSource
class Type2 extends BasePage  {
  constructor(props) {
  super(props);
  this.state = {
    data:[],
    hash:'',
    password: '',
    acctno:'',
  };
}


componentWillMount() {
     AsyncStorage.getItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
      let hash = JSON.parse(value)
        if (!!hash && !!hash.custNo) {
          this.setState({hash:hash})
           AresAPI.FindAcct.findacctacct2List({
            custno:hash.custNo
           }).done((res_json,res) => {

               this.setState({data:res_json.findAcctList})

          })
        }
    })
  }

  deleteA2(str){
    Alert.alert('提示','确认要删除二类账户吗？',[
      {text:'取消'},{text:'删除',onPress:()=>{this.dele(str)}},
    ])
  }

  dele(str){
    console.log(str);
    this.setState({acctno:str})
    this.refs.dialog.show();
  }

  onRight_ButtonClick(){
    this.refs.dialog.close()
    AresAPI.DestroyAcctController.acct2Close({
      brcno:this.state.hash.brcNo||'1',
      classes:'T',
      acctno:this.state.acctno,
      passwd:this.state.password.toString(),
    }).done((res_json, res)=>{
      if(res_json.retCode === 1){
        this.props.navigator.push({id: "Success", params: {data:'二类账户销户成功'}})
      }else {
        Alert.alert('错误提示', res_json.retMsg, [{ text: '确定'}])
      }
  })
}

type2(rowData, sectionID, rowID){
     const h_line_1 = ART.Path();
    h_line_1.moveTo(15,1);
    h_line_1.lineTo(full_width,1);
    let amt = StringUtils.moneyFormatData2Money(rowData.amt)
    let str = rowData.acctno;
    let reg = /^(\d{4})\d+(\d{4})$/;
    str = str.replace(reg, "$1****$2");
    return (
       <TouchableOpacity  style={{marginTop:10,alignItems:'center'}} onPress={ () => this.props.navigator.push({id: "Type2Account", params: {bal:rowData.amt,account2:rowData.acctno}})}>
          <Image source={require('ares/app/assets/image/two_bg.png')} style={{width:350,height:110}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <View style={{backgroundColor:'transparent',justifyContent:'center'}}>
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
          <BackNavBar component={this}  backgroundColor={COMMON_STYLES.NAVIBAR_COLOR} backTextColor="#FFFFFF" titleColor="#FFFFFF">二类账户</BackNavBar>
      <ScrollView showsVerticalScrollIndicator={false}>
            <ListView
          dataSource={dataSource}
          renderRow={this.type2.bind(this)}
         />
      </ScrollView>
      <Dialog
          ref="dialog"
          title="请输入交易密码"
          content={
            <View style={{alignItems:'center'}}>
              <PasswordInput
                maxLength={6}
                onEnd={(pwd)=>{this.setState({password:pwd})}}
              ></PasswordInput>
            </View>
          }
        leftButtonText="取消"
        rightButtonText="好"
        onLeftButonClick={()=>{
          this.setState({password: ""})
          this.refs.dialog.close()
        }}
        onRightButtonClick={()=>{this.onRight_ButtonClick()}}
      />
    </View>
      )

  }
}
export default Type2
