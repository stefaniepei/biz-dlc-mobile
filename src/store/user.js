import Vue from 'vue'

export const USER_LOGIN_IN = 'USER_LOGIN_IN' //登录成功
export const USER_LOGIN_OUT = 'USER_LOGIN_OUT' //退出登录

export default {
    state: {
        user:JSON.parse(sessionStorage.getItem('user')) || {},
        accessToken:'',
        userAuth:''
    },
    mutations: {
        [USER_LOGIN_IN](state, user) {
            sessionStorage.setItem('user', JSON.stringify(user))
            sessionStorage.setItem('accessToken', JSON.stringify(user).accessToken)
            Object.assign(state, user)
        },
        [USER_LOGIN_OUT](state) {
            sessionStorage.removeItem('user')
            sessionStorage.removeItem('accessToken')
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
    },
    getters: {
        user(state){
            return state.user
        },
        accessToken(state){
            return state.user.accessToken
        },
        userAuth(state){
            return 'Bearer ' + state.user.accessToken
        }
    }
}