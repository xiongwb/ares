import React from 'react'

import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  Alert,
  Picker,
  PickerIOS,
  TouchableHighlight,
  DatePickerIOS,
  DatePickerAndroid,
  Platform,
  Modal,
  ART,
  TouchableOpacity,
} from 'react-native'

import {
  BasePage,
  BackNavBar,
  StringUtils,
  Loading,
  LoginTextInput,
} from 'AresComponent'

import {
  COMMON_STYLES,
  CONST_LIST,
  VERIFY,
} from 'AresConstant'

import WhiteSpace from 'antd-mobile/lib/white-space'
import { createForm } from 'rc-form'
import Button from 'antd-mobile/lib/button'
import InputItem from 'antd-mobile/lib/input-item'

import AresAPI from 'AresAPI'


var full_height = Dimensions.get('window').height
var full_width = Dimensions.get('window').width
var PickerItemIOS = PickerIOS.Item;

const styles = StyleSheet.create({
  root: {
    backgroundColor: COMMON_STYLES.MAIN_BACKGROUND_COLOR,
    flex: 1,
  },
  sign_up_btn: {
    marginTop: 40,
    marginHorizontal: 16,
    fontSize:15,
  },
  modalStyle: {
    alignItems: 'center',
    flex:1,
  },
  sex_subView:{
    backgroundColor:'#fff',
    alignSelf: 'stretch',
    justifyContent:'center',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor:'#ccc',
  },
  modalStyle: {

    alignItems: 'center',
    flex:1,
  },
});

/**
*  注册流程页面 -> 填写身份证号码的那一页
*  by fushang318
*/
class SignUpStep3 extends BasePage {
  constructor (props) {
    super(props)
    this.state = {

      idType_value:'01',
      folk_value:'01',

      idType:'身份证',       //证件类型
      idNo:"",                    //证件号码
      custName:"",                //姓名
      homePlace:"",               //联系地址
      lostDate:"请选择证件失效日期（非必输项）",  //失效日期
      folk:'请选择民族（非必输项）',            //民族
      sex:'请选择性别（非必输项）',             //性别

      idNoLength:0,
      custNameLength:0,
      homePlaceLength:0,

      is_show_sex_picker: false,
      is_show_idType_picker: false,
      is_show_folk_picker: false,
      is_show_lostDate_picker:false,

      date: new Date(),
      timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,


    }
  }

  on_submit() {
    let reg_params = {
      phone:   StringUtils.phoneNumberHuman2Data(this.props.data.phone),
      pwd:     this.props.data.password,
      idType:      this.state.idType_value,
      idNo:        this.state.idNo,
      custName:    this.state.custName,
      classes:     'T',
    }
    console.log(this.state.idType_value);
    if (this.state.sex != '请选择性别（非必输项）') {
       if (this.state.sex == '男') {
         reg_params["sex"] = '0'
       }
       if (this.state.sex == '女') {
         reg_params["sex"] = '1'
       }
    }

    if (this.state.lostDate != '请选择证件失效日期（非必输项）') {
      reg_params['lostDate'] = this.state.lostDate
    }

    if (this.state.homePlace != '') {
      reg_params['homePlace'] = this.state.homePlace
    }
    if (this.state.folk != '请选择民族（非必输项）') {

      reg_params['folk'] = this.state.folk_value
    }

    const regexp=VERIFY.ID_NO;
    if (regexp.test(this.state.idNo) === false) {
      Alert.alert('错误提示', '请输入正确的身份证号码', [{ text: '确定'}]);
      return;
    }

    if (this.state.idNo.length != 15 && this.state.idNo.length != 18){
      Alert.alert('错误提示','身份证输入有误,请重新输入',[{text:'确定'}])
      return
    }


    /**
    * 一个比较典型的 HTTP API 请求写法
    * 验证手机验证码是否正确
    */
    AresAPI.Register.reg(reg_params).done((res_data_json, res)=>{
      this.get_loading().dismiss()
      if(res_data_json.retCode == 1){
        this.props.navigator.push({id: "SignUpStep4", params: {}})
      }else{
        Alert.alert('错误提示', res_data_json.retMsg, [{ text: '确定'}])
      }
    })

  }

  get_loading() {
    return this.refs['loading']
  }

/**
  显示选择性别
*/
/*
  creat_sex_picker(){

    const path = ART.Path();
    path.moveTo(1,1); //将起始点移动到(1,1) 默认(0,0)
    path.lineTo(full_width,1); //连线到目标点(300,1)


    return (
      <View>
        <Modal
           animationType='slide'
           transparent={true}
           visible={this.state.is_show_sex_picker}
           onShow={() => {}}
           onRequestClose={() => {}} >
           <View style={[styles.modalStyle]}>
             <View style={[styles.sex_subView,{height:200,marginTop:full_height-220}]}>
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                  <Text style={{fontSize:13,color:'#7f7f7f'}}>请选择性别</Text>
                </View>
                <ART.Surface width={full_width} height={1}>
                  <ART.Shape d={path} stroke="#dddddd" strokeWidth={1} />
                </ART.Surface>
                <View style={{flex:1,justifyContent:'center'}}>
                  <TouchableOpacity onPress={() => {this.setState({sex:'男'});this.set_sex_picker_visible()}}>
                    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                      <Text style={{fontSize:15}}>男</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <ART.Surface width={full_width} height={1}>
                  <ART.Shape d={path} stroke="#dddddd" strokeWidth={1} />
                </ART.Surface>
                <View style={{flex:1,justifyContent:'center'}}>
                  <TouchableOpacity onPress={() => {this.setState({sex:'女'});this.set_sex_picker_visible()}}>
                    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                      <Text style={{fontSize:15}}>女</Text>
                    </View>
                  </TouchableOpacity>
               </View>
                <ART.Surface width={full_width} height={1}>
                  <ART.Shape d={path} stroke="#dddddd" strokeWidth={1} />
                </ART.Surface>
              <View style={{flex:1,justifyContent:'center'}}>
                <TouchableOpacity onPress={() => {this.set_sex_picker_visible()}}>
                  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontSize:15,color:'red'}}>取消</Text>
                  </View>
                </TouchableOpacity>
              </View>

             </View>
           </View>
        </Modal>
      </View>
      )
  }
  */
  set_sex_picker_visible() {
    let isShow = this.state.is_show_sex_picker;
    this.setState({
      is_show_sex_picker:!isShow,
    });
  }

/**
  显示选择证件类型
*/

 choose_card_by_platform(){
    if (Platform.OS === 'android') {
      return this.init_idType_picker()
    }
    if (Platform.OS === 'ios') {
      return(
          <Text onPress={() => {this.set_idType_picker_visible()}}>{this.state.idType}</Text>
        )
    }
 }
/*
 create_card_picker(){

    const vpath = ART.Path();
    vpath.moveTo(1,1); //将起始点移动到(1,1) 默认(0,0)
    vpath.lineTo(full_width,1); //连线到目标点(300,1)

    const hpath = ART.Path();
    hpath.moveTo(1,1); //将起始点移动到(1,1) 默认(0,0)
    hpath.lineTo(1,40); //连线到目标点(300,1)

      return (
        <Modal
           animationType='slide'
           transparent={true}
           visible={this.state.is_show_idType_picker}
           onShow={() => {}}
           onRequestClose={() => {}} >
           <View style={[styles.modalStyle]}>
             <View style={[styles.sex_subView,{height:250,marginTop:full_height-250}]}>
              <View style={{height:40,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <View style={{flex:1}}>
                  <TouchableOpacity  onPress={()=>{this.on_idType_cancel()}}>
                    <Text style={{textAlign:'center',fontSize:15}}>取消</Text>
                  </TouchableOpacity>
                </View>
                <ART.Surface width={1} height={40}>
                  <ART.Shape d={hpath} stroke="#dddddd" strokeWidth={1} />
                </ART.Surface>
                <View style={{flex:1}}>
                  <TouchableOpacity onPress={()=>{this.on_idType_confim()}}>
                    <Text style={{flex:1,textAlign:'center',fontSize:15}}>确定</Text>
                  </TouchableOpacity>
                </View>
              </View>
                <ART.Surface width={full_width} height={1}>
                  <ART.Shape d={vpath} stroke="#dddddd" strokeWidth={1} />
                </ART.Surface>
                <Picker
                  style={{height:210}}
                  selectedValue={this.state.idType_value}
                  onValueChange={(idType) => this.setState({idType_value: idType})}>
                   {CONST_LIST.TYPE_OF_CERTIFICATE_LIST.map((s, i) => {
                          return <Picker.Item
                                   value={s.value}
                                   label={s.label} />
                    }) }
                </Picker>
            </View>
          </View>
        </Modal>
      )
 }
*/
  init_idType_picker(){
    return(
      <View style={{flex:1,backgroudColor:"#fff"}}>
        <Picker
          style={{height:210}}
          selectedValue={this.state.idType_value}
          onValueChange={(idType) => {this.on_change_idType_android(idType)}}>
           {CONST_LIST.TYPE_OF_CERTIFICATE_LIST.map((s, i) => {
             console.log(s);
                  return <Picker.Item
                           value={s.value}
                           label={s.label} />
            }) }
        </Picker>
      </View>
      )
  }

  on_change_idType_android(idType){
    if (idType=='身份证') {
      this.setState({idType_value: idType})

      var choose = ''
      for (let i in CONST_LIST.TYPE_OF_CERTIFICATE_LIST) {
        if (CONST_LIST.TYPE_OF_CERTIFICATE_LIST[i].value == idType) {
          choose = CONST_LIST.TYPE_OF_CERTIFICATE_LIST[i].label
          break
        }
      }
    } else {
      Alert.alert('对不起','目前不支持其他证件类型，请选择身份证',[{text:'确定'}])
      return
    }

    this.setState({idType:choose})
  }

  set_idType_picker_visible() {
    let isShow = this.state.is_show_idType_picker;
    this.setState({
      is_show_idType_picker:!isShow,
    });
  }

  on_idType_cancel(){
    this.set_idType_picker_visible()
    this.setState({idType_value:'01'})
  }
  on_idType_confim(){
    var choose = ''
    for (let i in CONST_LIST.TYPE_OF_CERTIFICATE_LIST) {
      if (CONST_LIST.TYPE_OF_CERTIFICATE_LIST[i].value === this.state.idType_value) {
        choose = CONST_LIST.TYPE_OF_CERTIFICATE_LIST[i].label
        break
      }
    }

    this.set_idType_picker_visible()
    this.setState({idType:choose})
  }
/**
  显示选择民族
*/

  choose_folk_by_platform(){
    if (Platform.OS === 'android') {
      return this.init_folk_picker()
    }
    if (Platform.OS === 'ios') {
      return(
          <Text onPress={() => {this.set_folk_picker_visible()}}>{this.state.folk}</Text>
        )
    }
  }
/*
  creat_folk_picker(){

    const vpath = ART.Path();
    vpath.moveTo(1,1); //将起始点移动到(1,1) 默认(0,0)
    vpath.lineTo(full_width,1); //连线到目标点(300,1)

    const hpath = ART.Path();
    hpath.moveTo(1,1); //将起始点移动到(1,1) 默认(0,0)
    hpath.lineTo(1,40); //连线到目标点(300,1)

    return (
        <Modal
           animationType='slide'
           transparent={true}
           visible={this.state.is_show_folk_picker}
           onShow={() => {}}
           onRequestClose={() => {}} >
           <View style={[styles.modalStyle]}>
             <View style={[styles.sex_subView,{height:250,marginTop:full_height-250}]}>
              <View style={{height:40,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <View style={{flex:1}}>
                  <TouchableOpacity  onPress={()=>{this.on_folk_cancel()}}>
                    <Text style={{flex:1,textAlign:'center',fontSize:15}}>取消</Text>
                  </TouchableOpacity>
                </View>
                <ART.Surface width={1} height={40}>
                  <ART.Shape d={hpath} stroke="#dddddd" strokeWidth={1} />
                </ART.Surface>
                <View style={{flex:1}}>
                  <TouchableOpacity  onPress={()=>{this.on_folk_confim()}}>
                    <Text style={{flex:1,textAlign:'center',fontSize:15}}>确定</Text>
                  </TouchableOpacity>
                </View>
              </View>
                <ART.Surface width={full_width} height={1}>
                  <ART.Shape d={vpath} stroke="#dddddd" strokeWidth={1} />
                </ART.Surface>
              <Picker
                style={{height:210}}
                selectedValue={this.state.folk_value}
                onValueChange={(idType) => this.setState({folk_value: idType})}>
                {CONST_LIST.NATION_LIST.map((s, i) => {

                        return <Picker.Item
                                 value={s.value}
                                 label={s.label} />
                  }) }
              </Picker>
           </View>
          </View>
         </Modal>
      )
  }
*/
  init_folk_picker(){
    return(
            <View style={{flex:1,backgroudColor:"#fff"}}>
              <Picker
                style={{height:210}}
                selectedValue={this.state.folk_value}
                onValueChange={(idType) => {this.setState({folk_value: idType});this.on_change_folk_android()}}>
                {CONST_LIST.NATION_LIST.map((s, i) => {

                        return <Picker.Item
                                 value={s.value}
                                 label={s.label} />
                  }) }
              </Picker>
              <View style={{
                position:"absolute",top:0,bottom:0,left:0,right:0,justifyContent:"center"
              }}>
                <Text style={{fontSize:14,color:"#7f7f7f"}}>{this.state.folk}</Text>
              </View>
            </View>
      )
  }

  on_change_folk_android(){
    var choose = ''
    for (let i in CONST_LIST.NATION_LIST) {
      if (CONST_LIST.NATION_LIST[i].value === this.state.folk_value) {
        choose = CONST_LIST.NATION_LIST[i].label
        break
      }
    }
    this.setState({folk:choose})
  }

  set_folk_picker_visible() {
    let isShow = this.state.is_show_folk_picker;
    this.setState({
      is_show_folk_picker:!isShow,
    });
  }

  on_folk_cancel(){
    this.set_folk_picker_visible()
    this.setState({folk_value:'01'})
  }

  on_folk_confim(){
    var choose = ''
    for (let i in CONST_LIST.NATION_LIST) {
      if (CONST_LIST.NATION_LIST[i].value === this.state.folk_value) {
        choose = CONST_LIST.NATION_LIST[i].label
        break
      }
    }
    this.set_folk_picker_visible()
    this.setState({folk:choose})
  }

/**
  证件失效日期
*/

  choose_lostDate_by_platform(){
    if (Platform.OS === 'android') {
      this.showPicker('')
    }
    if (Platform.OS === 'ios') {
      this.set_lostDate_picker_visible()
    }
  }

  async showPicker(stateKey, options) {

      try {
        var newState = {};
        const {action, year, month, day} = await DatePickerAndroid.open(options);
        if (action === DatePickerAndroid.dismissedAction) {
          newState[stateKey + 'Text'] = 'dismissed';
        } else {
          var date = new Date(year, month, day);
          var year = date.getFullYear()
          var month = date.getMonth() +1
          var day = date.getDate()
          var formatedStr = year + '-' + month +'-' + day

          this.setState({lostDate:formatedStr})

        }
      } catch ({code, message}) {
        console.warn(`Error in example '${stateKey}': `, message);
      }
    }
/*
  create_lostDate_picker(){

    const vpath = ART.Path();
    vpath.moveTo(1,1); //将起始点移动到(1,1) 默认(0,0)
    vpath.lineTo(full_width,1); //连线到目标点(300,1)

    const hpath = ART.Path();
    hpath.moveTo(1,1); //将起始点移动到(1,1) 默认(0,0)
    hpath.lineTo(1,40); //连线到目标点(300,1)

    return (
        <Modal
           animationType='slide'
           transparent={true}
           visible={this.state.is_show_lostDate_picker}
           onShow={() => {}}
           onRequestClose={() => {}} >
           <View style={[styles.modalStyle]}>
             <View style={[styles.sex_subView,{height:257,marginTop:full_height-257}]}>
              <View style={{height:40,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <View style={{flex:1}}>
                  <TouchableOpacity  onPress={()=>{this.on_lostDate_cancel()}}>
                    <Text style={{flex:1,textAlign:'center',fontSize:15}}>取消</Text>
                  </TouchableOpacity>
                </View>
                <ART.Surface width={1} height={40}>
                  <ART.Shape d={hpath} stroke="#dddddd" strokeWidth={1} />
                </ART.Surface>
                <View style={{flex:1}}>
                  <TouchableOpacity  onPress={()=>{this.on_lostDate_confim()}}>
                    <Text style={{flex:1,textAlign:'center',fontSize:15}}>确定</Text>
                  </TouchableOpacity>
                </View>
              </View>
                <ART.Surface width={full_width} height={1}>
                  <ART.Shape d={vpath} stroke="#dddddd" strokeWidth={1} />
                </ART.Surface>
              <DatePickerIOS
                date={this.state.date}
                mode="date"
                timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                onDateChange={this.onDateChange.bind(this)}
              />
           </View>
          </View>
         </Modal>
      )
  }
*/
  set_lostDate_picker_visible(){
    let isShow = this.state.is_show_lostDate_picker;
    this.setState({
      is_show_lostDate_picker:!isShow,
    });
  }

  onDateChange(date) {
    this.setState({date: date});
  }

  onTimezoneChange(event) {
    var offset = parseInt(event.nativeEvent.text, 10);
    if (isNaN(offset)) {
      return;
    }
    this.setState({timeZoneOffsetInHours: offset});
  }

  on_lostDate_cancel(){
    this.set_lostDate_picker_visible()
  }
  on_lostDate_confim(){
    var date = this.state.date
    var year = date.getFullYear() ;
    var month = date.getMonth() +1 ;
    var day = date.getDate() ;
    var formatedStr = year + '-' + month +'-' + day ;
    this.setState({lostDate:formatedStr})
    this.set_lostDate_picker_visible()
  }

/**

*/
  render() {
    const { getFieldProps } = this.props.form
    var button_disabled=true
    if (Platform.OS === 'android') {
      button_disabled = !this.state.custName != ''
    }
    if (Platform.OS === 'ios') {
    button_disabled= !(this.state.custName != '' && this.state.idType!= '请选择证件类型' && this.state.idNo != '')
    }

    return(
      <View style={styles.root}>
        <BackNavBar component={this} >身份验证</BackNavBar>
          <WhiteSpace size='md' />
          <View >
              <View>
                 <LoginTextInput
                  title='姓名'
                  placeholder='输入姓名'
                  autoFocus={true}
                  onChangeText={(value) => {this.setState({custName:value})}}
                  onChange={(value)=>this.setState({custNameLength: value.length})}
                  >
                  </LoginTextInput>
                 <View style={{backgroundColor:'#fff',height:46,flexDirection:'row',borderBottomWidth:0.5,borderColor:'#DDDDDD'}}>
                    <View style={{width:130,justifyContent: "center"}}>
                      <Text style={{fontSize:14,color:'#3d4245',margin:15}}>证件类型</Text>
                    </View>
                    <View style={{width:full_width-130,justifyContent: "center"}}>
                    {this.choose_card_by_platform()}
                    <View style={{
                            position:"absolute",top:0,bottom:0,left:0,right:0,justifyContent:"center"
                          }}>
                            <Text style={{fontSize:14,color:"#7f7f7f"}}>{this.state.idType}</Text>
                    </View>
                    </View>
                 </View>

                <LoginTextInput
                  title='证件号码'
                  placeholder='请输入证件号码'
                  maxLength={18}
                  onChangeText={(value) => {this.setState({idNo:value})}}
                  onChange={(value)=>this.setState({idNoLength: value.length})}
                  >
                </LoginTextInput>
                 <View style={{backgroundColor:'#fff',height:46,flexDirection:'row',borderBottomWidth:0.5,borderColor:'#DDDDDD'}}>
                    <View style={{width:130,justifyContent: "center"}}>
                      <Text style={{fontSize:14,color:'#3d4245',marginLeft:15}}>证件失效日期</Text>
                    </View>
                    <View style={{width:full_width-130,justifyContent: "center"}}>
                      <Text onPress={()=>{this.choose_lostDate_by_platform()}} style={{fontSize:14,color:'#7f7f7f'}}>{this.state.lostDate}</Text>
                    </View>
                 </View>

                  <LoginTextInput
                    title='联系地址'
                    placeholder='请输入联系地址(非必输项)'
                    onChangeText={(value)=>{this.setState({homePlace:value})}}
                    onChange={(value)=>this.setState({homePlaceLength: value.length})}
                    >
                  </LoginTextInput>

              </View>

              <Button
                style={styles.sign_up_btn}
                type="primary"
                disabled={button_disabled}
                onClick={this.on_submit.bind(this)}
              >
                确认提交
              </Button>
              <Loading ref={'loading'} />
          </View>
      </View>
    )
  }
}

export default createForm()(SignUpStep3)
