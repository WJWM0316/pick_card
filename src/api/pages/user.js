import {request} from '../require.js'

// 更新或获取当前用户信息
export const getUserInfoApi = (method,data) => {
  return request({
    method: 'get',
    url: '/cur/user_info',
    data
  })
}
// 更新或获取当前用户更多信息
export const getMoreUserInfoApi = (method,data) => {
  return request({
    method,
    url: '/cur/more_user_info',
    data
  })
}


// 获取当前用户教育经历
export const getEducationsInfoApi = (method,data) => {
  return request({
    method: 'get',
    url: '/cur/educations',
    data
  })
}

// 获取当前工作经历
export const getWorkInfoApi = (method,data) => {
  return request({
    method: 'get',
    url: '/cur/careers',
    data
  })
}

// 获取其他人用户信息
export const getUserInfo2Api = (data) => {
  return request({
    method: 'get',
    url: `/users/${data}`,
    data
  })
}

// 获取首页用户信息
export const getIndexUsers = () => {
  return request({
    method: 'get',
    url: `/users`,
  })
}



// 用户第一步注册
export const saveSignFirst = (data) => {
  return request({
    method: 'post',
    url: `/users/first`,
    data
  })
}

// 当前用户申请添加
export const applyApi = (data) => {
  return request({
    method,
    url: `/cur/applys`,
    data
  })
}



