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
export const getIndexUsers = (data) => {
  return request({
    method: 'get',
    url: `/users`,
    data
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


//首页卡片喜欢
export const indexLike = (data) => {
  return request({
    method: 'post',
    url: `/cur/applys`,
    data
  })
}

//处理卡片喜欢 0 等待处理 1 已同意 2 已拒绝 3 忽略
export const putLike = (data) => {
  return request({
    method: 'put',
    url: `/cur/applys/${data.id}`,
    data
  })
}

//删除申请
export const delLike = (data) => {
  return request({
    method: 'delete',
    url: `/cur/applys/${data.id}`,
    data
  })
}

//首页卡片不喜欢
export const indexUnlike = (data) => {
  return request({
    method: 'post',
    url: `/cur/applys`,
    data
  })
}


//获取申请记录列表
export const getLikeList = (data) => {
  return request({
    method: 'get',
    url: `/cur/applys`,
    data
  })
}