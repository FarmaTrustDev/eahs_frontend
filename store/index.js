import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from './modules/auth'
import user from './modules/user'
import translations from './modules/translations'
export const strict = false

const persistedStateOptions = {
  paths: ['user', 'auth', 'translations'],
}

const store = () =>
  new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    getters: {},
    modules: { auth, user, translations },
    plugins: [createPersistedState(persistedStateOptions)],
  })

export default store
