import {request} from '../require.js'
// 用户允许授权后需返回数据给该接口
export const setUserGroup = (data) => {
  console.log(data)
  return request({
  	method: 'post',
    url: '/group/setUserGroup',
    data,
    isLoading: false
  })
}