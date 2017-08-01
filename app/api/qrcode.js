import buildUrl from '../api/build_url'
import APIFetch from 'APIFetch'

/**
* 生成收付款码
＊ by xiongwb
*/
const generateCode = (data) => {
  let url = buildUrl('/hesperides/QRcode/array')
  return APIFetch.post(url, data)
}

export default {
  generateCode,
}
