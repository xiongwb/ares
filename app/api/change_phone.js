import buildUrl from '../api/build_url'
import APIFetch from 'APIFetch'

import {
  DeviceUtils,
} from 'AresComponent'

import {
  AsyncStorage
} from 'react-native'
/**
* 修改手机号
*/
const settingsModIphone = (data) => {
  let url = buildUrl('/hesperides/settings/modiPhone')

  return APIFetch.post(url, data)
}

/**
* 请求向新手机号发送验证码，当flag为1时，为修改手机号。
*/
const getVarCode = (data) => {
	let url = buildUrl('/hesperides/varCode/get')
  data.flag = 1
  data.brc    = 1
  data.phoneId   = DeviceUtils.getPhoneId()
  data.phoneName = DeviceUtils.getPhoneName()
  return APIFetch.post(url, data)
}

/**
* 验证新手机号验证码是否正确
*/
const validateVarCode = (data) => {
  let url = buildUrl('/hesperides/varCode/validate')
  data.flag   = 1
  data.brc    = 1
  data.phoneId   = DeviceUtils.getPhoneId()
  data.phoneName = DeviceUtils.getPhoneName()
  return APIFetch.post(url, data)
}
//二转二接口，目前是测试用
const tranAcctNonSelf2To2 = (data) => {
  let url = buildUrl('/gaea/TranAcctNonSelf/2To2')
  data.phoneId   = DeviceUtils.getPhoneId()
  data.phoneName = DeviceUtils.getPhoneName()
  data.brcno    = 1
  data.classes = "T"
  return APIFetch.post(url, data)
}

export default {
  settingsModIphone,
  getVarCode,
  validateVarCode,
  tranAcctNonSelf2To2,
}
