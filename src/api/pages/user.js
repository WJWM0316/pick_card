import {request} from '../require.js'

// 获取当前用户信息
export const getUserInfoApi = (method) => {
  return request({
    method: 'get',
    url: '/cur/user_info',
  })
}
// 更新当前用户信息
export const upDataUserInfoApi = (data) => {
  return request({
    method: 'put',
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
export const getEducationsInfoApi = (data) => {
  return request({
    method: 'get',
    url: '/cur/educations',
    data
  })
}
// 添加当前用户教育经历
export const postEducationsInfoApi = (data) => {
  return request({
    method: 'post',
    url: '/cur/educations',
    data
  })
}
// 修改当前用户教育经历
export const putEducationsInfoApi = (data) => {
  return request({
    method: 'put',
    url: `/cur/educations/${data.id}`,
    data
  })
}
// 删除当前用户教育经历
export const deleteEducationsInfoApi = (data) => {
  return request({
    method: 'delete',
    url: `/cur/educations/${data.id}`,
    data
  })
}

// 获取当前工作经历
export const getWorkInfoApi = (data) => {
  return request({
    method: 'get',
    url: '/cur/careers',
    data
  })
}
// 添加当前工作经历
export const postWorkInfoApi = (data) => {
  return request({
    method: 'post',
    url: '/cur/careers',
    data
  })
}
// 修改当前工作经历
export const putWorkInfoApi = (data) => {
  return request({
    method: 'put',
    url: `/cur/careers/${data.id}`,
    data
  })
}
// 删除当前工作经历
export const deleteWorkInfoApi = (data) => {
  return request({
    method: 'delete',
    url: `/cur/careers/${data.id}`,
    data
  })
}



// 添加或者更新当前用户更多信息
export const putMoreApi = (data) => {
  return request({
    method: 'put',
    url: `/cur/more_user_info`,
    data
  })
}

// 更改隐私设置
export const putPrivacyApi = (data) => {
  return request({
    method: 'put',
    url: `/cur/user_info_privacy`,
    data,
    isLoading: false
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
    isLoading: false,
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
    isLoading: false,
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
    isLoading: false,
    url: `/cur/checks`,
    data
  })
}


//获取申请记录列表
export const getLikeList = (data) => {
  return request({
    method: 'get',
    isLoading: false,
    url: `/cur/applys`,
    data
  })
}

//群名片
export const getGroup = (data) => {
  return request({
    method: 'post',
    url: `/group/setUserGroup`,
    data
  })
}
