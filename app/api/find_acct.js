import buildUrl from '../api/build_url'
import APIFetch from 'APIFetch'

const findacctacct2List  = (data) => {
  let url = buildUrl('/gaea/findacct/acct2List')
  data.brcno = '1'
  data.ccy  = '01'
  return APIFetch.post(url, data)
}

const findacctacct3List = (data) => {
  let url = buildUrl('/gaea/findacct/acct3List')
  data.brcno = '1'
  data.ccy  = '01'
  return APIFetch.post(url, data)
}

const findacctAcctAmt = (data) => {
  let url = buildUrl('/gaea/findacct/acctAmt')
  data.brcno = '1'
  data.ccy  = '01'
  return APIFetch.post(url, data)
}

const findacctAcctItemPage = (data) => {
  let url = buildUrl('/gaea/findacct/acctItemPage')
  data.brcNo = '1'
  return APIFetch.post(url,data)
}

export default {
  findacctacct2List,
  findacctacct3List,
  findacctAcctAmt,
  findacctAcctItemPage,
}
