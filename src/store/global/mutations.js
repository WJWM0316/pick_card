import * as types from './mutations_types'

export default {
  [types.needAuthorize] (state, updata) {
    state.needAuthorize = updata
  },
  [types.userInfo] (state, updata) {
    state.userInfo = updata
  },
  [types.shareInfo] (state, updata) {
    state.shareInfo = updata
  }
}
