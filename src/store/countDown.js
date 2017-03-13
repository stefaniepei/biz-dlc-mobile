import Vue from 'vue'

export const START_TIMER = 'START_TIMER'

export default {
    state: {
        timer:{
            'leftSeconds':0
        },
        leftSeconds:0
    },
    mutations: {
        [START_TIMER](state, time = 0) {
            state.timer.leftSeconds = time
            state.leftSeconds = time
        }
    },
    actions: {
        [START_TIMER]({ commit }, time) {
            commit(START_TIMER, time)
        }
    },
    getters: {
        timer(state) {
            return state.timer
        },
        leftSeconds(state){
            return state.leftSeconds
        }
    }
}