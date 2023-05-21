import request from '@/utils/request'

export function register(data) {
  const data = {
    username,
    password
    }
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}