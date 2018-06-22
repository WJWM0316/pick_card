import * as types from './mutations_types'

export default {
  [types.needAuthorize] (state, updata) {
    state.needAuthorize = updata
  }
}
