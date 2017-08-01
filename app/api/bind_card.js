import buildUrl from '../api/build_url'
import APIFetch from 'APIFetch'

import {
  DeviceUtils,
} from 'AresComponent'

//查询该用户是否绑定了银行卡
const cardFindBind = (data) => {
  let url = buildUrl('/gaea/card/findBind')
  data.bindFlag = "1"
  return APIFetch.get(url,data)
}
//查询卡类型
const cardFindCardType = (data) => {
	let url = buildUrl('/gaea/card/findCardType')
	return APIFetch.post(url,data)
}
//绑定一类卡
const cardOpenAcct = (data) => {
	let url = buildUrl('/gaea/card/openAcct')
	data.phoneId   = DeviceUtils.getPhoneId()
  data.phoneName = DeviceUtils.getPhoneName()
  data.brcno = 1
	return APIFetch.post(url,data)

}

const canclBind = (data) => {
  let url = buildUrl('/gaea/card/canclBind')
  return APIFetch.post(url,data)
}
export default {
  canclBind,
  cardFindBind,
  cardFindCardType,
  cardOpenAcct,
}
