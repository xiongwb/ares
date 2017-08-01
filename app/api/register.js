import buildUrl from '../api/build_url'
import APIFetch from 'APIFetch'
import VarCode from '../api/var_code'

/*
   这里考虑能否将var_code_flag代码放入这个js里
   太多零散的js造成阅读障碍
   这个js里完成url拼装以及请求
*/


/**
* 请求向注册手机号发送验证码
＊ by fushang318
*/
/*
  不同的flag代表不同的api，把data.flag删除  在具体调用的地方添加flag的值
  1更换手机号,2一类卡绑定，3注册app,4登录密码重置,5支付密码重置
  by mah
*/
const getVarCode = (data) => {
  data.brc  = "liu_kong"
  return VarCode.get(data)
}

/**
* 验证手机号验证码是否正确
＊ by fushang318
*/
const validateVarCode = (data) => {
  data.brc    = "liu_kong"
  data.custNo = "liu_kong"
  return VarCode.validate(data)
}

/**
* 手机号注册
＊ by fushang318
*/
const reg = (data) => {
  let url = buildUrl('/hesperides/register/reg')
  return APIFetch.post(url, data)
}


export default {
  getVarCode,
  validateVarCode,
  reg,
}
