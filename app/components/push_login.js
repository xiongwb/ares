import {
  AsyncStorage,
} from 'react-native'

import {
  STORAGE_KEYS
} from 'AresConstant'

export default class PushLogin {

  static push_login_destination(destination,navigator,data){
	AsyncStorage.getItem(STORAGE_KEYS.SIGN_TOKEN, (error, value)=>{
      let hash = JSON.parse(value)
      if(!!hash){
        //登录状态
        navigator.push({id: destination, params: data})
      }else{
        navigator.push({id: "Login", params: data})
      }
    })
  }
}