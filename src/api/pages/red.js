import {request} from '../require.js'

// 获取当前用户红点信息
export const redDot = () => {
  return request({
    method: 'get',
    url: '/cur/red_dot',
  })
}
// 删除当前用户所有的好友红点
export const deleteRedFriends = () => {
  return request({
    method: 'delete',
    url: '/cur/red_dot/friends',
  })
}
// 删除当前用户某一个群的所有的新增好友的红点
export const deleteRedFlock = (id) => {
  return request({
    method: 'delete',
    url: `/cur/red_dot/groups/${id}/members`,
  })
}

// 获取当前用户被申请红点信息
export const redDotApplys = () => {
  return request({
    method: 'get',
    url: '/cur/red_dot/applys',
  })
}
// 删除当前用户所有的好友红点
export const deleteRedDot = () => {
  return request({
    method: 'delete',
    url: '/cur/red_dot/applys',
  })
}

