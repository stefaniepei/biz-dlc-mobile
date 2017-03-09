import Vue from 'vue'

export const SHOW_HEADER_NAV = 'SHOW_HEADER_NAV' //显示头部
export const HIDE_HEADER_NAV = 'HIDE_HEADER_NAV' //隐藏头部
export const EDIT_TITLE = 'EDIT_TITLE' //编辑头部

export default {
    state: {
        headerDisplay: true,
        headerTitle: '点理财'
    },
    mutations: {
        [SHOW_HEADER_NAV](state) {
            state.headerDisplay = true
        },
        [HIDE_HEADER_NAV](state) {
            state.headerDisplay = false
        },
        [EDIT_TITLE](state, title = '点理财') {
            state.headerTitle = title
        }
    },
    actions: {
        [SHOW_HEADER_NAV]({ commit }) {
            commit(SHOW_HEADER_NAV)
        },
        [HIDE_HEADER_NAV]({ commit }) {
            commit(HIDE_HEADER_NAV)
        },
        [EDIT_TITLE]({ commit }, title) {
            commit(EDIT_TITLE, title)
        }
    },
    getters: {
        headerDisplay(state) {
            return state.headerDisplay
        },
        headerTitle(state) {
            return state.headerTitle
        }
    }
}