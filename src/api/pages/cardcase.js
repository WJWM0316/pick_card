import {request} from '../require.js'

//===========个人
// 获取个人名片列表
export const getFriends = (data) => {
  return request({
  	method: 'get',
    url: '/cur/friends',
    data,
    isLoading: true
  })
}

// 删除个人名片
export const deleteFriends = (data) => {
  return request({
  	method: 'delete',
    url: '/cur/firends',
    data,
  })
}
// 获取个人好友行业TAB排序
export const getFriendTabelList = () => {
  return request({
    method: 'post',
    url: `/cur/friends/getFriendTabelList`,
    isLoading: false
  })
}



//===========群
// 获取群名片列表
export const getUserGroupList = (data) => {
  return request({
  	method: 'get',
    url: '/group/getUserGroupList',
    data,
  })
}

// 获取群名片详情
export const getUserGroupInfo = (data) => {
  return request({
  	method: 'get',
    url: `/group/${data.id}?page=${data.page}&count=${data.count}`,
    isLoading: false
  })
}

// 加入群名片
export const joinUserGroup = (data) => {
  return request({
  	method: 'post',
    url: '/group/joinUserGroup',
    data,
  })
}
// 创建群名片
export const setUserGroup = (data) => {
  return request({
  	method: 'post',
    url: '/group/setUserGroup',
    data,
  })
}

// 编辑群名片
export const editGroupInfo = (data) => {
  return request({
  	method: 'put',
    url: `/group/${data.id}`,
    data,
  })
}

//退出群名片
export const quitGroup = (data) => {
  return request({
  	method: 'delete',
    url: `/group/${data.id}`,
    data,
  })
}

//判断是否加入
export const isJoinUserGroup = (data) => {
  return request({
  	method: 'post',
    url: `/group/isJoinUserGroup`,
    data,
    isLoading: false
  })
}

// 获取小程序码
export const getShareCode = (data) => {
  return request({
    method: 'post',
    url: `/share/getShareCode`,
    data,
    isLoading: false
  })
}


