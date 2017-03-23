import Vue from 'vue'

export const USER_LOGIN_IN = 'USER_LOGIN_IN' //登录成功
export const USER_LOGIN_OUT = 'USER_LOGIN_OUT' //退出登录
export const USER_ACCOUNT = 'USER_ACCOUNT' //用户账户信息

export default {
    state: {
        user: JSON.parse(sessionStorage.getItem('user')) || {},
        userAuth: '',
        userAccount: {}
    },
    mutations: {
        [USER_LOGIN_IN](state, user) {
            sessionStorage.setItem('user', JSON.stringify(user))
            state.user = user
        },
        [USER_LOGIN_OUT](state) {
            sessionStorage.removeItem('user')
            Object.keys(state).forEach(k => Vue.delete(state, k))
        },
        [USER_ACCOUNT](state, userAccount){
            state.userAccount = userAccount
        }
    },
    actions: {
        [USER_LOGIN_IN]({ commit }, user) {
            commit(USER_LOGIN_IN, user)
        },
        [USER_LOGIN_OUT]({ commit }) {
            commit(USER_LOGIN_OUT)
        },
        [USER_ACCOUNT]({ commit }, userAccount) {
            commit(USER_ACCOUNT, userAccount)
        },
    },
    getters: {
        user(state) {
            return state.user
        },
        userAuth(state) {
            return 'Bearer ' + state.user.accessToken
        },
        userAccount(state) {
            return state.userAccount
        },

    }
}