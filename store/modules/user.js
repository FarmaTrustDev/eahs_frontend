const state = {
  patient: {},
  selectedMenu: ['1']
}

const mutations = {
  setPatient(state, payload) {
    state.patient = payload
  },
  setSelectedMenu(state, payload) {
    state.selectedMenu = payload
  }
}

const getters = {
  getPatient(state) {
    return state.patient
  },
  getSelectedMenu(state) {
    return state.selectedMenu
  },
}

export default {
  state,
  mutations,
  getters,
}
