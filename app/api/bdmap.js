import buildUrl from 'ares/app/api/build_url'
import APIFetch from 'APIFetch'

/**
* 将gps坐标转换成百度坐标
＊ by xiongwb
*/
const transform = (data) => {
  let coordinateStr = '';
  for(let i in data){
    coordinateStr += data[i].longitude+','+data[i].latitude+';'
  }
  let url = 'http://api.map.baidu.com/geoconv/v1/?coords='+coordinateStr.substring(0,coordinateStr.length-2)+'&from=3&to=5&ak=K3qi1pHA3WE4ZW1c93bMZCsNu1fCsx1P'
  return APIFetch.get(url)
}

export default {
  transform,
}
