import buildUrl from '../api/build_url'
import APIFetch from 'APIFetch'



const acct2Close = (data) => {
  let url = buildUrl('/gaea/Destroy/acct2close')
  return APIFetch.post(url, data)
}

const acct3Close = (data) => {
  let url = buildUrl('/gaea/Destroy/acct3close')
  return APIFetch.post(url, data)
}


export default {
  acct2Close,
  acct3Close,
}
