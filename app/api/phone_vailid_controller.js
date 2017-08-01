import buildUrl from '../api/build_url'
import APIFetch from 'APIFetch'

const phoneVaild = (data) => {
  let url = buildUrl('/hesperides/phone/phoneVaild')
  return APIFetch.post(url, data)
}


export default {
  phoneVaild,
}
