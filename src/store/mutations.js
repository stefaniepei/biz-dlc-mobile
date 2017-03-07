import * as types from './types'

const state = {
    headerState: true,
    loadingState: false,
    loginState: false
}

const mutations = {
    //header
    [types.SHOW_HEAD](state) {
        state.headerState = true
    },
    [types.HIDE_HEAD]: (state) => {
        state.headerState = false
    },
    //loading
    [types.SHOW_LOADING]: (state) => {
        state.loadingState = true
    },
    [types.HIDE_LOADING]: (state) => {
        state.loadingState = false
    },
    //login
    [types.LOGIN_IN]: (state) => {
        state.loginState = true
    },
    [types.LOGIN_OUT]: (state) => {
        state.loginState = false
    },
}

const getters = {
    headerState(state) {
        return state.headerState
    },
    loadingState(state) {
        return state.loadingState
    },
    loginState(state) {
        return state.loginState
    }
}

export default {
    state,
    mutations,
    getters
}