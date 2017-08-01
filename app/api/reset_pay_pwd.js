import buildUrl from '../api/build_url'
import APIFetch from 'APIFetch'
import VarCode from '../api/var_code'

/**
* 手机号注册
＊ by xiongwb
*/
const getVarCode = (data) => {
  return VarCode.get(data)
}

/**
* 验证手机号验证码是否正确
＊ by xiongwb
*/
const validateVarCode = (data) => {
  return VarCode.validate(data)
}

/**
* 重置交易密码
＊ by xiongwb
*/
const resetPayPwd = (data) => {
  let url = buildUrl('/hesperides/settings/resetTranPwd')
  return APIFetch.post(url, data)
}

export default {
  getVarCode,
  validateVarCode,
  resetPayPwd,
}
