import buildUrl from '../api/build_url'
import APIFetch from 'APIFetch'

import {
  DeviceUtils,
} from 'AresComponent'

/**
* 请求向注册手机号发送验证码
＊ by fushang318
*/
const get = (data) => {
  let url = buildUrl('/hesperides/varCode/get')
  data.phoneId   = DeviceUtils.getPhoneId()
  data.phoneName = DeviceUtils.getPhoneName()
  return APIFetch.post(url, data)
}

/**
* 验证手机号验证码是否正确
＊ by fushang318
*/
const validate = (data) => {
  let url = buildUrl('/hesperides/varCode/validate')
  data.phoneId   = DeviceUtils.getPhoneId()
  data.phoneName = DeviceUtils.getPhoneName()
  return APIFetch.post(url, data)
}

export default {
  get,
  validate,
}
