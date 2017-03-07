import * as types from './types'

export default {
    //header
    SHOW_HEAD: ({commit}) => {
        commit(types.SHOW_HEAD)
    },
    HIDE_HEAD: ({commit}) => {
        commit(types.HIDE_HEAD)
    },
    //loading
    SHOW_LOADING: ({commit}) => {
        commit(types.SHOW_LOADING)
    },
    HIDE_LOADING: ({commit}) => {
        commit(types.HIDE_LOADING)
    },
    //login
    LOGIN_IN: ({commit}) => {
        commit(types.LOGIN_IN)
    },
    LOGIN_OUT: ({commit}) => {
        commit(types.LOGIN_OUT)
    },
}