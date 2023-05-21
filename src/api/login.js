import request from '@/utils/request'
import store from '../store'


export function logout() {
  // store.dispatch("FedLogOut")
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  console.log(token)
  var data = request({
    url: '/user/info',
    method: 'get'
  })
  console.log(data)
  return data
}

