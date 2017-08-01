/**
 * Created by 宏基电脑 on 2017/5/8.
 */
import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    Image,
    ART,
    TextInput,
    ListView,
    TouchableOpacity,
    ScrollView,
    Platform,
} from 'react-native'
import {
    BasePage,
    NavBar,
} from 'AresComponent'
import WhiteSpace from 'antd-mobile/lib/white-space'
import Icon from 'react-native-vector-icons/FontAwesome'
//图片轮播组件
var Swiper = require('react-native-swiper');
const COMMON_EDGE_LEFT = 10
const mockFood = [
    {
        image:'ares/app/assets/image/picture01.png',
        name:'七番地(日式烧肉专门店)',
        distance:'华苑 545m',
        discount:'¥20/人',
    },
    {
        image:'ares/app/assets/image/picture01.png',
        name:'七番地(日式烧肉专门店)',
        distance:'华苑 545m',
        discount:'¥20/人',
    },
    {
        image:'ares/app/assets/image/picture01.png',
        name:'七番地(日式烧肉专门店)',
        distance:'华苑 545m',
        discount:'¥20/人',
    },
    {
        image:'ares/app/assets/image/picture01.png',
        name:'七番地(日式烧肉专门店)',
        distance:'华苑 545m',
        discount:'¥20/人',
    },
]
var full_width = Dimensions.get('window').width
export default class LiuLuYe extends React.Component {
    creatToubu(){
        return(
        <View>
            <NavBar
                leftContent={
                          <View >
                            <TouchableOpacity onPress={()=>this.props.navigator.pop()}>
                              <Icon style={{marginRight: 3}} name="angle-left" size={22} color='#FF6600'/>
                            </TouchableOpacity>
                          </View>
                        }
                titleContent={
                          <View style={styles.title}>
                            <TextInput underlineColorAndroid='transparent'
                              style={{flex:1,marginLeft:20}} onChange={value=>this.setState({value})}/>
                            <View style={styles.placeholder}>
                              <TouchableOpacity>
                                <Image source={require('ares/app/assets/image/search.png')} />
                              </TouchableOpacity>
                            </View>
                          </View>
                        }
                rightContent={
                          <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} onPress={() => this.props.navigator.push({id: "Location", params: {city:this}})}>
                              <Text style={{fontSize:16,color:'#101010'}}>天津</Text>
                              <Image source={require('ares/app/assets/image/arrow_down_2.png')}
                                    style = {{marginLeft:5}}

                              />
                          </TouchableOpacity>
                        }
            />

            <Swiper
                height={200}
                width={200}
                loop={true}
                index={0}
                autoplay={true}
                width={full_width}
                dot={
                           <View style={{backgroundColor:'#fff', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 0, marginBottom: 0,justifyContent:'center',alignItems:'center'}}>
                             <View style={{backgroundColor: '#000', width: 4, height: 4, borderRadius: 2}} />
                           </View>
                        }
                activeDot={
                           <View style={{backgroundColor:'#000', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 0, marginBottom: 0,justifyContent:'center',alignItems:'center'}}>
                             <View style={{backgroundColor: '#fff', width: 4, height: 4, borderRadius: 2}} />
                           </View>
                        }
            >{this.renderImg()}</Swiper>
            <View style={styles.mid_view}>
                <View style={{flexDirection:'row',flex:1,alignItems:'center'}}>
                    <TouchableOpacity style={{flex:1}} >
                        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                            <Image source={require('ares/app/assets/image/自助餐.png')} style={{width:20,height:22,marginBottom:3}}/>
                            <Text style={styles.fun_text}>自助餐</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1}}>
                        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                            <Image  source={require('ares/app/assets/image/烧烤.png')} style={{width:13,height:25,marginTop:-3}}/>
                            <Text style={styles.fun_text}>烧烤</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1}} >
                        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                            <Image source={require('ares/app/assets/image/火锅-2.png')} style={{width:24,height:24,marginTop:-2}}/>
                            <Text style={styles.fun_text}>火锅</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1}} >
                        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                            <Image source={require('ares/app/assets/image/24海鲜水产.png')} style={{width:16,height:22}}/>
                            <Text style={styles.fun_text}>海鲜</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1}} >
                        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                            <Image source={require('ares/app/assets/image/快餐.png')} style={{width:16,height:26,marginTop:1}}/>
                            <Text style={styles.fun_text}>快餐</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        )
    }
    creatMid(){
        return(
            <View style={{height:200,marginTop:8}}>
                <View style={{flex:1,flexDirection:'row'}}>

                    <View style={{flex:1,
                                      flexDirection:'row',
                                      justifyContent: 'center',
                                      backgroundColor:'#CD6090',
                                      marginHorizontal:5,
                                      marginVertical:5,
                                      borderRadius:10}}>
                        <View style={{flex:1,alignSelf:'center',marginLeft:10}}>
                            <Text style={{color:'#FFF',fontSize:18}}>一碗好面</Text>
                            <Text style={{color:'#FFF',marginTop:5}}>吃好又吃饱</Text>
                        </View>
                        <View style={{flex:1,alignSelf:'center'}}>
                            <Image style={{height:60,width:60}} source={require('ares/app/assets/image/快餐@3x.png')} />
                        </View>

                    </View>

                    <View style={{flex:1,
                                      flexDirection:'row',
                                      justifyContent: 'center',
                                      backgroundColor:'#CDCD00',
                                      marginHorizontal:5,
                                      marginVertical:5,
                                      borderRadius:10}}>
                        <View style={{flex:1,alignSelf:'center',marginLeft:10}}>
                            <Text style={{color:'#FFF',fontSize:18}}>美味披萨</Text>
                            <Text style={{color:'#FFF',marginTop:5}}>好看又美味</Text>
                        </View>
                        <View style={{flex:1,alignSelf:'center'}}>
                            <Image style={{height:60,width:60}} source={require('ares/app/assets/image/火锅-2@3x.png')} />
                        </View>
                    </View>
                </View>
                <View style={{flex:1,flexDirection:'row'}}>
                    <View style={{flex:1,
                                      flexDirection:'row',
                                      justifyContent: 'center',
                                      backgroundColor:'#DDA0DD',
                                      marginHorizontal:5,
                                      marginVertical:5,
                                      borderRadius:10}}>
                        <View style={{flex:1,alignSelf:'center',marginLeft:10}}>
                            <Text style={{color:'#FFF',fontSize:18}}>减肥餐</Text>
                            <Text style={{color:'#FFF',marginTop:5}}>一顿减5斤</Text>
                        </View>
                        <View style={{flex:1,alignSelf:'center'}}>
                            <Image style={{height:60,width:60}} source={require('ares/app/assets/image/living_guanggao.png')}/>
                        </View>
                    </View>
                    <View style={{flex:1,
                                      flexDirection:'row',
                                      justifyContent: 'center',
                                      backgroundColor:'#7EC0EE',
                                      marginHorizontal:5,
                                      marginVertical:5,
                                      borderRadius:10}}>
                        <View style={{flex:1,alignSelf:'center',marginLeft:10}}>
                            <Text style={{color:'#FFF',fontSize:18}}>下午茶</Text>
                            <Text style={{color:'#FFF',marginTop:5}}>喝茶精神好</Text>
                        </View>
                        <View style={{flex:1,alignSelf:'center'}}>
                            <Image style={{height:60,width:60}} source={require('ares/app/assets/image/bowl.png')}/>
                        </View>

                    </View>
                </View>
            </View>
        )
    }

    creatReMen(){
        return(
            <View>
                <View style={{height:30,
                                      borderColor:'#dddddd',
                                      borderBottomWidth:1,
                                      marginTop:10,
                                      marginLeft:10}}>
                    <Text style={{fontSize:15}}>热门推荐</Text>
                </View>
                <ScrollView horizontal={true}>
                    <View style={{flex:1,flexDirection:'row'}}>
                        <View style={{flex:1}}>
                        <Image style={{height:120,width:120,marginHorizontal:5}} source={require('ares/app/assets/image/Bali.png')}>
                        <Text style={{backgroundColor:'#3B3B3B',
                                opacity:0.8,
                                height:20,
                                width:120,
                                color:'#fff',
                                alignSelf:'center',
                                textAlign:'center',
                                justifyContent: 'center'}}>你以为是旅行</Text>
                            </Image>
                            </View>
                            <View style={{flex:1}}>
                        <Image style={{height:120,width:120,marginHorizontal:5}} source={require('ares/app/assets/image/homepage1.jpg')}>
                        <Text style={{backgroundColor:'#3B3B3B',
                                opacity:0.8,
                                height:20,
                                width:120,
                                color:'#fff',
                                alignSelf:'center',
                                textAlign:'center',
                                justifyContent: 'center'}}>年度权威榜单</Text>
                            </Image>
                            </View>
                            <View style={{flex:1}}>
                        <Image style={{height:120,width:120,marginHorizontal:5}} source={require('ares/app/assets/image/homepage2.jpg')}>
                        <Text style={{backgroundColor:'#3B3B3B',
                                opacity:0.8,
                                height:20,
                                width:120,
                                color:'#fff',
                                alignSelf:'center',
                                textAlign:'center',
                                justifyContent: 'center'
                            }}>
                            周末去哪玩</Text>
                            </Image>
                            </View>
                            </View>
                </ScrollView>
            </View>
        )
    }
    createLeg(){
        let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(mockFood);
        return(
            <View style={{backgroundColor:'white',borderTopWidth:1,borderColor:'#dddddd',borderBottomWidth:1}}>
                <View style={{height:40,justifyContent:'center'}}>
                    <Text style={{fontSize:15,marginLeft:10}}>猜你喜欢</Text>
                </View>
                <ListView
                    dataSource={dataSource}
                    renderRow={this.createMaybeLikeRow.bind(this)}
                    contentContainerStyle={styles.contentViewStyle}
                />
            </View>
        )
    }
    createMaybeLikeRow(rowData,sectionId){
        let imageSize = (full_width - 3 * COMMON_EDGE_LEFT)/2
        return(
            <View style={{marginLeft:10,marginTop:10,flexDirection:'row',borderTopWidth:1,borderColor:'#C1CDC1'}}>
                <Image resizeMode='contain' source={require(rowData.image)} style={{width:imageSize,height:imageSize*0.8,flex:1}} />
                <View style={{margin:10}}>
                    <View style={{marginTop:5,alignItems:'center',flex:1}}>
                        <View style={{flex:1}}>
                            <Text style={{fontSize:18,color:'black'}}>{rowData.name}</Text>
                        </View>
                        <View style = {{flex:1}}>
                            <Text style = {{fontSize:15,color:'gray'}}>{rowData.distance}</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{fontSize:18,color:'red'}}>{rowData.discount}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    render() {
        return (
            <View style = {{flex:1}}>
                <ScrollView>
                    {this.creatToubu()}
                    <WhiteSpace size='md'  />
                    {this.creatMid()}
                    <WhiteSpace size='md'  />
                    {this.creatReMen()}
                    <WhiteSpace size='md'  />
                    {this.createLeg()}
                </ScrollView>
            </View>
        );
    }

    renderImg(){
        var imageViews=[];
        imageViews.push(
            <Image
                key={1}
                style={{flex:1,width:full_width}}
                source={require('ares/app/assets/image/banner02.png')}
            />,
            <Image
                key={2}
                style={{flex:1,width:full_width}}
                source={require('ares/app/assets/image/banner03.png')}
                resizeMode='stretch'
            />,
        )
        return imageViews;
    }
}

const styles = StyleSheet.create({

    mid_view:{
        height:60,
        backgroundColor:'#fff',
        borderColor:'#DDDDDD',
        borderTopWidth:1,
        borderBottomWidth:1,
        //alignItems:'center',
    },
    title: {
        flexDirection:'row',
        borderWidth:1,
        borderColor:'#FF6600',
        height:35,
        width:full_width*0.6,
        marginRight:full_width*0.1,
        borderRadius:20,
        justifyContent: "center",
        alignItems:'center',
    },
    placeholder :{
        position:'absolute',
        left:10,
        top:0,
        bottom:0,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
})
