import buildUrl from '../api/build_url'
import APIFetch from 'APIFetch'


const findShoppingCart = (data) => {
  let url = buildUrl('/athena/cart/findShoppingCart')
  return APIFetch.post(url, data)
}

const delShoppingCart = (data) => {
  let url = buildUrl('/athena/cart/delShoppingCart')
  return APIFetch.post(url, data)
}

const addCount = (data) => {
  let url = buildUrl('/athena/cart/addCount')
  return APIFetch.post(url, data)
}

const addShoppingCart = (data) => {
  let url = buildUrl('/athena/cart/addShoppingCart')
  return APIFetch.post(url, data)
}

const minusCount = (data) => {
  let url = buildUrl('/athena/cart/minusCount')
  return APIFetch.post(url, data)
}

export default {
  findShoppingCart,
  delShoppingCart,
  addCount,
  addShoppingCart,
  minusCount,
}
