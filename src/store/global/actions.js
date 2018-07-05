import * as types from './mutations_types'

export default {
  needAuthorize: ({commit}, updata) => {
    return new Promise((resolve, reject) => {
      commit(types.needAuthorize, updata)
      resolve()
    })
  },
  userInfo: ({commit}, updata) => {
    return new Promise((resolve, reject) => {
      commit(types.userInfo, updata)
      resolve()
    })
  },
  shareInfo: ({commit}, updata) => {
    return new Promise((resolve, reject) => {
      commit(types.shareInfo, updata)
      resolve()
    })
  },
}
