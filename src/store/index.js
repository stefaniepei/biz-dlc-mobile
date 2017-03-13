import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import headerNav from './headerNav'
import countDown from './countDown'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true, //使用严格模式
    modules: {
        user,
        headerNav,
        countDown
    }
})