const state = {
    translation: {},
    selectedLanguage: {}
}

const mutations = {
    setTranslation(state, payload) {
        state.translation = payload
    },
    setSelectedLanguage(state, payload) {
        state.selectedLanguage = payload
    },
}

const getters = {
    getTranslation(state) {
        return state.translation
    },
    getSelectedLanguage(state) {
        return state.selectedLanguage
    },
}

export default {
    state,
    mutations,
    getters,
}
