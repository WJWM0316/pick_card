import * as types from './mutations_types'

export default {
  needAuthorize: ({commit}, updata) => {
    return new Promise((resolve, reject) => {
      commit(types.needAuthorize, updata)
      resolve()
    })
  }
}
