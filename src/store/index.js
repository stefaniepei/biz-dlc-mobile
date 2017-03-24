import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import countDown from './countDown'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true, //使用严格模式
    modules: {
        user,
        countDown
    }
})