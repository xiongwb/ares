import buildUrl from '../api/build_url'
import APIFetch from 'APIFetch'

const tranAcctSelf1To2 = (data) => {
  let url = buildUrl('/gaea/TranAcctSelf/1To2')
  data.brcno = '1'
  data.ccy   = '01'
  data.classes='T'

  return APIFetch.post(url, data)
}
const tranAcctSelf2To1 = (data) => {
  let url = buildUrl('/gaea/TranAcctSelf/2To1')
  data.brcno = '1'
  data.ccy  = '01'
  data.classes='T'

  return APIFetch.post(url, data)
}
const tranAcctSelf1To3 = (data) => {
  let url = buildUrl('/gaea/TranAcctSelf/1To3')
  data.brcno = '1'
  data.ccy  = '01'
  data.classes='T'

  return APIFetch.post(url, data)
}
const tranAcctSelf3To1 = (data) => {
  let url = buildUrl('/gaea/TranAcctSelf/3To1')
  data.brcno = '1'
  data.ccy  = '01'
  data.classes='T'

  return APIFetch.post(url, data)
}
export default {
   tranAcctSelf1To2,
   tranAcctSelf2To1,
   tranAcctSelf1To3,
   tranAcctSelf3To1,
}
