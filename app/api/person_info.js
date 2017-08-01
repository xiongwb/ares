import buildUrl from '../api/build_url'
import APIFetch from 'APIFetch'

import {
  DeviceUtils,
} from 'AresComponent'

import {
  AsyncStorage
} from 'react-native'

/**
* 查询个人资料
*/
const getPersonInfoPersonInfo = (data) => {
  let url = buildUrl('/hesperides/personInfo/getPersonInfo')
  data.brcno    = 1
  return APIFetch.post(url, data)
}

export default {
  getPersonInfoPersonInfo,
}
