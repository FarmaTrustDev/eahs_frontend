const state = {
  user: {},
  token: null,
  isAuthorize: false,
}

const actions = {}

const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
  setToken(state, payload) {
    state.token = payload.token
    state.isAuthorize = payload.status
  },
}

const getters = {
  isAuthorize(state) {
    return state.isAuthorize
  },
  getUser(state) {
    return state.user
  },
}

export default {
  state,
  actions,
  mutations,
  getters,
}
