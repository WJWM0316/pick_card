import { request } from '../require'

/**
 * 首页精选列表内容
 * @param {*} data
 */
export const getIndexPictureApi = data => request({
  url: '/wx/currency/getIndexPicture',
  needUserInfo: false,
  data
})

// ******************* 精选 Tab **********************
/**
 * 首页精选列表内容
 * @param {*} data
 */
export const getBeaconsApi = data => request({
  method: 'get',
  url: '/wx/beacon',
  needUserInfo: false,
  data
})

/**
 * 首页 banner 项
 * @param {*} data
 */
export const getBannersApi = data => request({
  url: '/wx/beacon/banners',
  needUserInfo: false,
  data
})

/**
 * 首页标签项
 * @param {*} data
 */
export const getTagsListApi = data => request({
  url: '/wx/beacon/tags',
  needUserInfo: false,
  data
})

// ******************* 已加入 Tab **********************

/**
 * 首页已加入列表
 * @param {*} data
 */
export const getJoineListdApi = data => request({
  url: '/wx/beacon/joined',
  data
})

// ******************* 分销 **********************

/**
 * 获取邀请图片
 * @param {*} data
 */
export const getInviteImageApi = data => request({
  url: '/wx/beacon/getFenImage',
  data
})

// ******************* 发现 Tab **********************
/**
 * 首页发现列表内容
 * @param {*} data
 */
export const getSelectionApi = data => request({
  url: '/wx/beacon/selection',
  data
})
/**
 * 发现列表内容详情项
 * @param {*} data
 */
export const getSelectionDetailsApi = data => request({
  url: '/wx/beacon/selectionDetails',
  data
})

/**
 * 首页红点消息
 * @param {*} data
 */
export const getTabBardApi = data => request({
  url: '/wx/beacon/tabBar',
  data
})

/**
 * 首页广告位
 * @param {*} data
 */
export const getAdvertisingApi = data => request({
  url: '/wx/currency/ad',
  data
})




