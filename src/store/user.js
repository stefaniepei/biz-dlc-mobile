import Vue from 'vue'

export const USER_LOGIN_IN = 'USER_LOGIN_IN' //登录成功
export const USER_LOGIN_OUT = 'USER_LOGIN_OUT' //退出登录

export default {
    state: JSON.parse(localStorage.getItem('user')) || {},
    mutations: {
        [USER_LOGIN_IN](state, user) {
            localStorage.setItem('user', JSON.stringify(user))
            Object.assign(state, user)
        },
        [USER_LOGIN_OUT](state) {
            localStorage.removeItem('user')
            Object.keys(state).forEach(k => Vue.delete(state, k))
        }
    },
    actions: {
        [USER_LOGIN_IN]({commit}, user) {
            commit(USER_LOGIN_IN, user)
        },
        [USER_LOGIN_OUT]({commit}) {
            commit(USER_LOGIN_OUT)
        }
    }
}