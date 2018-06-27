import {request} from '../require.js'



// 登录
export const loginApi = (data) => {
  return request({
    url: '/auto/login',
    data
  })
}

// 创建第一步
export const firstSignApi = (data) => {
  return request({
    method: 'put',
    url: '/cur/first',
    data
  })
}
// 创建第二步
export const secondSignApi = (data) => {
  return request({
    method: 'put',
    url: '/cur/second',
    data
  })
}
// 创建第三步
export const thirdSignApi = (data) => {
  return request({
    method: 'put',
    url: '/cur/third',
    data
  })
}


// 用户允许授权后需返回数据给该接口
export const grantInformationApi = (data) => {
  return request({
    url: '/auth/grantInformation',
    data,
    isLoading: false
  })
}
// 不需要用户允许授权后需返回数据给该接口
export const saveBaseUserInfo = (data) => {
  console.log(data)
  return request({
    url: '/auth/saveBaseUserInfo',
    data,
    isLoading: false
  })
}
// code 给后端去换session_key
export const getSessionKeyApi = (data) => {
  return request({
    url: '/auth/getSessionKey',
    data,
    isLoading: false
  })
}

// 是否绑定手机
export const isBindPhoneApi = (data) => {
  return request({
    url: '/wx/my/isBindPhone',
    data
  })
}

// 获取短信验
export const smsApi = (data) => {
  return request({
    url: '/auto/getSmsCode',
    data
  })
}

// 获取验证码图片
export const getCodeImg = (data) => {
  return request({
    url: '/wx/captchas',
    data
  })
}
