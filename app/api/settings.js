import buildUrl from '../api/build_url'
import APIFetch from 'APIFetch'


/*验证III类账户支付密码 */
const settingsValidatePayPwd = (data) => {
  let url = buildUrl('/hesperides/settings/validatePayPwd')
  data.brcno = '1'
  data.classes='T'
  return APIFetch.post(url, data)
}
/*开启免密支付*/
const settingsNoPwdSet = (data) => {
  let url = buildUrl('/hesperides/settings/noPwdSet')
  data.brcno = '1'
  return APIFetch.post(url, data)
}
/*关闭免密支付 */
const settingsNoPwdClose = (data) => {
  let url = buildUrl('/hesperides/settings/noPwdClose')
  data.brcno = '1'
  return APIFetch.post(url, data)
}

/*设置免密支付 */
const settingsSetLim = (data) => {
  let url = buildUrl('/hesperides/settings/setLim')
  data.brcno = '1'
  return APIFetch.post(url, data)
}

/*判断是否已开启免密支付 */
const settingsGetLimFlag = (data) => {
  let url = buildUrl('/hesperides/settings/getLimFlag')
  data.brcno = '1'
  return APIFetch.post(url, data)
}

export default {
  settingsValidatePayPwd,
  settingsNoPwdSet,
  settingsNoPwdClose,
  settingsSetLim,
  settingsGetLimFlag,
}
