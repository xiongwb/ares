import buildUrl from '../api/build_url'
import APIFetch from 'APIFetch'


const findProdCollection = (data) => {
  let url = buildUrl('/athena/collect/findProdCollection')
  return APIFetch.post(url, data)
}

const delProdCollection = (data) => {
  let url = buildUrl('/athena/collect/delProdCollection')
  return APIFetch.post(url, data)
}

const addProdCollection = (data) => {
  let url = buildUrl('/athena/collect/addProdCollection')
  return APIFetch.post(url, data)
}

const findIsCollection = (data) => {
  let url = buildUrl('/athena/collect/findIsCollection')
  return APIFetch.post(url, data)
}

export default {
  findProdCollection,
  delProdCollection,
  addProdCollection,
  findIsCollection,
}
