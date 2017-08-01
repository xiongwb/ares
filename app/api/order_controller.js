import buildUrl from '../api/build_url'
import APIFetch from 'APIFetch'


const submitOrder = (data) => {
  let url = buildUrl('/athena/order/submitOrder')
  return APIFetch.post(url, data)
}

const findOrderListForAPP = (data) => {
  let url = buildUrl('/athena/order/findOrderListForAPP')
  return APIFetch.post(url, data)
}

const paySuccess = (data) => {
  let url = buildUrl('/athena/order/paySuccess')
  return APIFetch.post(url, data)
}


export default {
  paySuccess,
  submitOrder,
  findOrderListForAPP,
}
