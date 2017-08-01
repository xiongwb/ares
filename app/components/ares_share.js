import React from 'react'

import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Platform,
    TextInput,
    ScrollView,
    Image,
    Dimensions,
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import Popup from 'antd-mobile/lib/popup'

var full_width = Dimensions.get('window').width
var full_height = Dimensions.get('window').height

const styles = StyleSheet.create({
  root:{
    backgroundColor:'#fff',
    width:full_width,
    height:full_height/3
  },
  btnList:{
    flex:3,
    flexDirection:'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal:10, 
  },
  btn:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText:{
    fontSize:14,
    color:'#000000'
  },
  cencelBtnView:{
    flex:1,
    borderTopWidth:1,
    borderTopColor:'#EEEEEE'
  },
  cencelBtn:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cencelBtnText:{
    fontSize:20,
    color:'#000000'
  }
})

export default class AresShare extends React.Component {
 
  share2QQfriends(){
    QQAPI.shareToQQ({   
      type: 'news',
      title: '我的财富报告2好友',
      description: '我是描述',
      webpageUrl: 'www.baidu.com',
      
    })
  }

  share2Qzone(){
    QQAPI.shareToQzone({   
      type: 'news',
      title: '我的财富报告2空间',
      description: '我是描述',
      webpageUrl: 'www.baidu.com',
      imageUrl: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png'
    })
  }

  share2WXfriends(){
    WechatAPI.shareToSession({   
      type: 'text', 
      text: '我的财富报告2好友',
    })
  }

  shareToTimeline(){
    WechatAPI.shareToTimeline({   
      type: 'text', 
      text: '我的财富报告2朋友圈',
    })
  }

  shareToWB(){
    WeiboAPI.share({   
      type: 'text', 
      text: '我的财富报告2微博',
    })
  }

  show(){
    Popup.show(<View style={styles.root}>
                  <View style={styles.btnList}>
                    <TouchableOpacity>
                      <View style={styles.btn}>
                        <Image source={require('ares/app/assets/image/share2QQFriends.png')} />
                        <Text style={styles.btnText}>QQ好友</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <View style={styles.btn}>
                        <Image source={require('ares/app/assets/image/share2Qzone.png')} />
                        <Text style={styles.btnText}>QQ空间</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <View style={styles.btn}>
                        <Image source={require('ares/app/assets/image/share2WXFriends.png')} />
                        <Text style={styles.btnText}>微信好友</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <View style={styles.btn}>
                        <Image source={require('ares/app/assets/image/share2Timeline.png')} />
                        <Text style={styles.btnText}>朋友圈</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <View style={styles.btn}>
                        <Image source={require('ares/app/assets/image/share2WB.png')} />
                        <Text style={styles.btnText}>新浪微博</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.cencelBtnView}>
                    <TouchableOpacity style={styles.cencelBtn} onPress={()=>Popup.hide()}>
                      <Text style={styles.cencelBtnText}>取消</Text>
                    </TouchableOpacity>
                  </View>
               </View>,{maskClosable:true,animationType:'slide-up'})
  }

}

