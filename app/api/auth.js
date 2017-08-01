import buildUrl from '../api/build_url'
import APIFetch from 'APIFetch'

import {
  AsyncStorage
} from 'react-native'

/**
* 登录
＊ by fushang318
*/
const signIn = (user) => {
  let url = buildUrl('/hesperides/login/sign_in')
  return APIFetch.post(url, user)
}

export default {
  signIn
}
