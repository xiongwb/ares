import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  ART,
  TouchableOpacity,
  ScrollView,
  Platform,
  TextInput,
  ListView,
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native'
import {
  NavBar,
  BasePage,
} from 'AresComponent'
import {
  COMMON_STYLES,
} from 'AresConstant'
var Swiper = require('react-native-swiper');
const {Surface, Shape, Path} = ART;
import WhiteSpace from 'antd-mobile/lib/white-space'
import Icon from 'react-native-vector-icons/FontAwesome'
var full_width = Dimensions.get('window').width
var full_height = Dimensions.get('window').height
const styles = StyleSheet.create({
  root: {
    backgroundColor: COMMON_STYLES.MAIN_BACKGROUND_COLOR,
    flex: 1,
  },
  text: {
    fontSize: 30,
    color: "#000",
  },
  head_img:{
    ...Platform.select({
      android:{
        height: (Platform.Version >= 21)?70:54,
        paddingTop:(Platform.Version >= 21)?0:0,
      },
      ios:{
        height: 64,
      }
    })
  },
  filterView:{
    flexDirection:'row',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  left: {

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  fast_come_here: {
    ...Platform.select({
      android:{
        height:15,width:51,marginTop:5
      },
      ios:{
        height:15,width:51,marginTop:2
      }
    })
  },
  location_img: {
    ...Platform.select({
      android:{
        height:17,width:14,marginTop:4
      },
      ios:{
        height:17,width:14
      }
    })
  },
  left_touch_box: {
    flexDirection: "row",
    alignItems: "center",
},

})
//模拟数据
const mockData = [
  {
   img:'ares/app/assets/image/picture01',
   name:'哈哈鸡排',
   location:'华苑店',
   stars:2,
   moneyperpeople:20,
   kind:'快餐',
   ares:'华苑',
   distance:300,
   act:[
    {
      kindact:'团',
      message:'198元三人餐，298元双人餐',
    }
   ]
  },
    {
   img:'ares/app/assets/image/picture01',
   name:'哈哈鸡排',
   location:'华苑店',
   stars:3.5,
   moneyperpeople:20,
   kind:'快餐',
   ares:'华苑',
   distance:300,
   act:[
    {
      kindact:'团',
      message:'198元三人餐，298元双人餐',
    },
    {
      kindact:'券',
      message:'满30减8元'
    }
   ]
  },
  {
   img:'ares/app/assets/image/picture01',
   name:'哈哈鸡排',
   location:'华苑店',
   stars:5,
   moneyperpeople:20,
   kind:'快餐',
   ares:'华苑',
   distance:300,
   act:[
    {
      kindact:'团',
      message:'198元三人餐，298元双人餐',
    }
   ]
  },
]
const mockFilter1 = ["全部","自助餐","火锅","烧烤","海鲜","快餐"]
const mockFilter2 = [{name:'附近',content:["附近(智能范围)","500米","1000米","2000米","5000米"]},
                     {name:'热门商圈',content:["全部商圈","滨江道","老城厢","大悦城","五大道","时代奥城","围堤道沿线","和平路","白堤路／风荷园","文化中心"]},
                     {name:'和平区',content:["全部和平区","滨江道","五大道","和平路","小白楼","南市","西康路沿线","鞍山道沿线"]},]
const mockFilter3 = ["离我最近","人气最高","评价最好","口味最佳","环境最佳","服务最好","人均最低","人均最高","离我最近",]

const filterKind = ["不限","推荐分类"]
const filterTime = ["不限","早餐","午餐","下午茶","晚餐","夜宵"]
const filterPeople = ["不限","单人餐","双人餐","3～4人餐","5～10人餐","10人以上"]

const FOUR_WIDTH = (full_width - 50)/4
const THREE_WIDTH = (full_width - 40)/3

class FoodList extends BasePage {
  constructor(props) {
    super(props)
    this.state = {
      totalList:mockData,//主数据
      isShowModal:false,//是否显示modal菜单
      cityName:'天津',//定位城市
      currentSelected:99,//当前选择的筛选菜单
      pickBussinessCircle:0,//选择的商圈
      filterSelected:[0,0,0],//筛选所选择的位置
      reservation:false,//只看免预约
      holiday:false,//节假日可用
    }
  }
/**
    头部搜索
*/
  createHeader(){
    return(
          <Image source={require('ares/app/assets/image/shenghuodaohangtiao.png')} style={[styles.head_img,{width:full_width}]}>
            <NavBar
            backgroundColor={'transparent'}
            leftContent={
              <View style={styles.left}>
                <TouchableOpacity style={styles.left_touch_box} onPress={() => {
                    this.props.navigator.pop()
                }}>
                  <Icon style={{marginRight: 3}} name="angle-left" size={22} color='white' />
                  <Text style={{fontSize: 16, color: 'white'}}>精选</Text>
                </TouchableOpacity>
              </View>
            }
            titleContent={
              <TouchableOpacity onPress={() => this.props.navigator.push({id: "Location", params: {city:this}})}>
                <View style={{flexDirection:'row'}}>
                  <Text style={{color:'white',fontSize:18}}>{this.state.cityName}</Text>
                  <Icon style={{marginLeft: 5,}} name="map-marker" size={18} color='white' />
                </View>
              </TouchableOpacity>
            }
            rightContent={
              <TouchableOpacity  onPress={() => this.props.navigator.push({id: "FoodSearch", params: {}})}>
                  <Icon style={{marginRight: 3}} name="search" size={20} color='white' />
              </TouchableOpacity>
             }
            />
          </Image>
      )
  }
/**
    筛选
*/
  createFilterVLine(){
    const v_line_1 = ART.Path();
    v_line_1.moveTo(1,10);
    v_line_1.lineTo(1,30);
    return(
        <View>
          <ART.Surface width={1} height={35}>
            <ART.Shape d={v_line_1} stroke="#dddddd" strokeWidth={1} />
          </ART.Surface>
        </View>
      )
  }
  createFilterModalContent(index){
    if(this.state.currentSelected === 0){
      let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(mockFilter1);
      return(
          <ListView
            dataSource={dataSource}
            renderRow={this.filterRenderRow.bind(this)}
          />
        )
    }
    if(this.state.currentSelected === 1){
      let dataSourceLeft = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(mockFilter2);
      let dataSourceRight = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(mockFilter2[this.state.pickBussinessCircle].content);
      return(
          <View style={{flexDirection:'row',flex:1}}>
            <ListView
              style={{flex:1,backgroundColor:'#eeeeee'}}
              dataSource={dataSourceLeft}
              renderRow={this.bussinessCircleRowLeft.bind(this)}
            />
            <ListView
              style={{flex:1}}
              dataSource={dataSourceRight}
              renderRow={this.bussinessCircleRowRight.bind(this)}
            />
          </View>
        )
    }
    if(this.state.currentSelected === 2){
      let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(mockFilter3);
      return(
          <ListView
            dataSource={dataSource}
            renderRow={this.filterRenderRow.bind(this)}
          />
        )
    }
    if(this.state.currentSelected === 3){
    const h_line_1 = ART.Path();
    h_line_1.moveTo(1,1);
    h_line_1.lineTo(full_width,1);
      return(
          <ScrollView>
            <View>
              <View style={{flexDirection:'row',height:40,alignItems:'center',marginHorizontal:10,justifyContent:"space-between"}}>
                <Text style={{fontSize:15}}>只看免预约</Text>
                <Icon style={{}} name={"square-o"} size={20} color='black' />
              </View>
              <ART.Surface width={full_width} height={1}>
                <ART.Shape d={h_line_1} stroke="#dddddd" strokeWidth={1} />
              </ART.Surface>
              <View style={{flexDirection:'row',height:40,alignItems:'center',marginHorizontal:10,justifyContent:"space-between"}}>
                <Text style={{fontSize:15}}>节假日可用</Text>
                <Icon style={{}} name={"square-o"} size={20} color='black' />
              </View>
              <ART.Surface width={full_width} height={1}>
                <ART.Shape d={h_line_1} stroke="#dddddd" strokeWidth={1} />
              </ART.Surface>
              <View style={{marginBottom:10}}>
                <Text style={{fontSize:15,marginLeft:10,marginTop:10}}>推荐分类</Text>
                <View style={{flexDirection:'row',flexWrap:'wrap',marginTop:10}}>
                  {filterKind.map((data,index)=>{
                    if(index == this.state.filterSelected[0]){
                      return this.selectedButton(data,FOUR_WIDTH,0,index)
                    }else{
                      return this.unselectedButton(data,FOUR_WIDTH,0,index)
                    }
                  })}
                </View>
              </View>
              <ART.Surface width={full_width} height={1}>
                <ART.Shape d={h_line_1} stroke="#dddddd" strokeWidth={1} />
              </ART.Surface>
              <View style={{height:120}}>
                <Text style={{fontSize:15,marginLeft:10,marginTop:10}}>用餐时间</Text>
                <View style={{flexDirection:'row',flexWrap:'wrap',marginTop:10,height:40}}>
                  {filterTime.map((data,index)=>{
                    if(index == this.state.filterSelected[1]){
                      return this.selectedButton(data,FOUR_WIDTH,1,index)
                    }else{
                      return this.unselectedButton(data,FOUR_WIDTH,1,index)
                    }
                  })}
                </View>
              </View>
              <ART.Surface width={full_width} height={1}>
                <ART.Shape d={h_line_1} stroke="#dddddd" strokeWidth={1} />
              </ART.Surface>
              <View style={{height:120}}>
                <Text style={{fontSize:15,marginLeft:10,marginTop:10}}>用餐人数</Text>
                <View style={{flexDirection:'row',flexWrap:'wrap',marginTop:10,height:40}}>
                  {filterPeople.map((data,index)=>{
                    if(index == this.state.filterSelected[2]){
                      return this.selectedButton(data,THREE_WIDTH,2,index)
                    }else{
                      return this.unselectedButton(data,THREE_WIDTH,2,index)
                    }
                  })}
                </View>
              </View>
              <ART.Surface width={full_width} height={1}>
                <ART.Shape d={h_line_1} stroke="#dddddd" strokeWidth={1} />
              </ART.Surface>
              <View style={{margin:10,flexDirection:'row',justifyContent:'space-between'}}>
                <TouchableOpacity onPress={()=>{
                  this.setState({
                    filterSelected:[0,0,0]
                  })
                }}>
                  <View style={{height:30,borderWidth:1,borderColor:'#eeeeee',width:50,alignItems:'center',justifyContent:'center',borderRadius:5}}>
                    <Text>重置</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                  let kind = filterKind[this.state.filterSelected[0]]
                  let time = filterTime[this.state.filterSelected[1]]
                  let people = filterPeople[this.state.filterSelected[2]]
                  Alert.alert("选择了" + kind + time + people)
                }}>
                  <View style={{height:30,borderWidth:1,borderColor:'#f29836',width:50,alignItems:'center',justifyContent:'center',borderRadius:5,backgroundColor:'#f2d036'}}>
                    <Text style={{color:'#f29836'}}>完成</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        )
    }

  }

  unselectedButton(title,length,section,index){
    return(
      <TouchableOpacity onPress={()=>{
        this.state.filterSelected[section] = index
        this.setState()
      }}>
        <View style={{height:30,borderWidth:1,borderColor:'#eeeeee',width:length,alignItems:'center',justifyContent:'center',borderRadius:5,marginLeft:10}}>
          <Text>{title}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  selectedButton(title,length,section,index){
    return(
      <View style={{height:30,borderWidth:1,borderColor:'#f29836',width:length,alignItems:'center',justifyContent:'center',borderRadius:5,marginLeft:10,backgroundColor:'#f2d036'}}>
        <Text style={{color:'#f29836'}}>{title}</Text>
      </View>
    )
  }


  bussinessCircleRowLeft(rowData,sectionID,rowID){
      let viewColor = this.state.pickBussinessCircle == rowID ? 'white' : '#eeeeee'
      return(
        <TouchableOpacity onPress={()=>{this.setState({pickBussinessCircle:rowID})}}>
          <View style={{justifyContent:'center',height:30,backgroundColor:viewColor}}>
            <Text style={{marginLeft:15,fontSize:14}}>{rowData.name}</Text>
          </View>
        </TouchableOpacity>
      )
  }

  bussinessCircleRowRight(rowData,sectionID){
    const h_line_1 = ART.Path();
    h_line_1.moveTo(15,1);
    h_line_1.lineTo(full_width,1);
    return(
        <TouchableOpacity onPress={()=>{Alert.alert(rowData)}}>
          <View style={{justifyContent:'center',height:30}}>
            <Text style={{marginLeft:15,fontSize:14}}>{rowData}</Text>
          </View>
          <ART.Surface width={full_width} height={1}>
            <ART.Shape d={h_line_1} stroke="#dddddd" strokeWidth={1} />
          </ART.Surface>
        </TouchableOpacity>
      )
  }

  filterRenderRow(rowData,sectionId){
    const h_line_1 = ART.Path();
    h_line_1.moveTo(15,1);
    h_line_1.lineTo(full_width,1);
    return(
        <TouchableOpacity onPress={()=>{Alert.alert(rowData)}}>
          <View style={{justifyContent:'center',height:30}}>
            <Text style={{marginLeft:15,fontSize:14}}>{rowData}</Text>
          </View>
          <ART.Surface width={full_width} height={1}>
            <ART.Shape d={h_line_1} stroke="#dddddd" strokeWidth={1} />
          </ART.Surface>
        </TouchableOpacity>
      )
  }
  showModal(show,index){
    this.setState({
      isShowModal:show,
      currentSelected:index,
    })
  }
  createFilterModal(){
    return(
        <View>
          <Modal
             animationType='fade'
             transparent={true}
             visible={this.state.isShowModal}
             onShow={() => {}}>
            <TouchableWithoutFeedback onPress={()=>{this.showModal(false,99)}}>
              <View style={{height:105}}>
              </View>
            </TouchableWithoutFeedback>
            <View style={{height:300,backgroundColor:'white'}}>
              {this.createFilterModalContent()}
            </View>
            <TouchableWithoutFeedback onPress={()=>{this.showModal(false,99)}}>
              <View style={{backgroundColor:'black',height:full_height - 405,opacity:0.3}}>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      )
  }
  createOneFilter(title,index){
    var iconName = this.state.currentSelected === index ? 'angle-up' : "angle-down"
    return(
        <TouchableOpacity onPress={() => {this.showModal(true,index)}}>
          <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:14}}>{title}</Text>
            <Icon style={{marginLeft:2}} name={iconName} size={15} color='black' />
          </View>
        </TouchableOpacity>
      )
  }
  createFilter(){
    const h_line_1 = ART.Path();
    h_line_1.moveTo(1,1);
    h_line_1.lineTo(full_width,1);

    return(
        <View>
          <View style={{backgroundColor:'white',height:40,flexDirection:'row'}}>
            <View style={styles.filterView}>
              {this.createOneFilter("附近",0)}
            </View>
            {this.createFilterVLine()}
            <View style={styles.filterView}>
              {this.createOneFilter("商圈",1)}
            </View>
            {this.createFilterVLine()}
            <View style={styles.filterView}>
              {this.createOneFilter("智能排序",2)}
            </View>
            {this.createFilterVLine()}
            <View style={styles.filterView}>
              {this.createOneFilter("筛选",3)}
            </View>
            {this.createFilterModal()}
          </View>
          <View>
            <ART.Surface width={full_width} height={1}>
              <ART.Shape d={h_line_1} stroke="#dddddd" strokeWidth={1} />
            </ART.Surface>
          </View>
        </View>
      )
  }
/**
    列表
*/
  createStarsList(number){
    let starsList = []
    let integer = parseInt(number)
    let remainder = number * 2 % 2
    let half = remainder === 1 ? true : false
    for (let i=0; i<5;i++ ) {
      if (i < integer) {
        starsList.push(0)
      }else{
        if (half === true) {
          starsList.push(1)
          half = false
          continue
        }
        starsList.push(2)
      }
    }
    return starsList
  }
  renderRow(rowData,sectionId){
    const h_line_1 = ART.Path();
    h_line_1.moveTo(1,1);
    h_line_1.lineTo(full_width,1);
    return(
      <View>
        <TouchableOpacity onPress={() => this.props.navigator.push({id: "CommodityDetail", params: {}})}>
          <View style={{backgroundColor:'white',flexDirection:'row'}}>
            <View>
             <Image source={require('ares/app/assets/image/picture01.png')} style={{width:70,height:70,margin:15}} />
            </View>
            <View>
              <Text style={{marginTop:15,fontSize:15}}>{rowData.name + '(' + rowData.location + ')'}</Text>
              <View style={{marginTop:8, flexDirection:'row',width:full_width-100}}>
                {this.createStarsList(rowData.stars).map((s,i) => {
                  if (s === 0) {
                    return <Icon style={{marginRight:2}} name="star" size={15} color='#ffab1a'/>
                  }
                  if (s === 1) {
                    return <Icon style={{marginRight:2}} name="star-half-o" size={15} color='#ffab1a'/>
                  }
                  if (s === 2) {
                    return <Icon style={{marginRight:2}} name="star-o" size={15} color='#ffab1a'/>
                  }
                })}
                <Text style={{marginLeft:5,fontSize:12}}>¥{rowData.moneyperpeople}/人</Text>
              </View>
              <View style={{flexDirection:'row',width:full_width-100}}>
                <Text style={{marginTop:8,fontSize:12}}>{this.props.kind}</Text>
                <Text style={{position: "absolute",right: 10,top: 0,bottom: 0,fontSize:12,marginTop:8}}>{rowData.ares} {""} {rowData.distance}m</Text>
              </View>
              <View style={{marginTop:8}}>
                <ART.Surface width={full_width} height={1}>
                  <ART.Shape d={h_line_1} stroke="#dddddd" strokeWidth={1} />
                </ART.Surface>
              </View>
              {rowData.act.map((s,i) => {
                return(
                    <View style={{flexDirection:'row',paddingTop:8}}>
                      <View style={{backgroundColor:'red'}}>
                        <Text style={{color:'white',margin:3,fontSize:13}}>{s.kindact}</Text>
                      </View>
                      <Text style={{marginLeft:3,marginTop:3,fontSize:12}}>{s.message}</Text>
                    </View>
                  )
              })}
              <View style={{backgroundColor:'white',height:8}}></View>
            </View>
          </View>
          <ART.Surface width={full_width} height={1}>
            <ART.Shape d={h_line_1} stroke="#dddddd" strokeWidth={1} />
          </ART.Surface>
        </TouchableOpacity>
      </View>
      )
  }
  render() {
    let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.state.totalList);
    return(
      <View style={styles.root}>
        {this.createHeader()}
        {this.createFilter()}
        <WhiteSpace size='md' />
        <ListView
          dataSource={dataSource}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    )
  }
}
export default FoodList
