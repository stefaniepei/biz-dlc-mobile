import Vue from 'vue'
import VueRouter from 'vue-router'
import {
    routes,
    axios
} from './configs'
import store from './store'
import MintUI from 'mint-ui'

import 'normalize.css'
import 'mint-ui/lib/style.css'
import './assets/css/index'

Vue.use(MintUI)
Vue.use(VueRouter)
Vue.prototype.$http = axios
Vue.config.debug = true


const router = new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior: () => ({
        y: 0
    }),
    base: __dirname
})

router.beforeEach(({
    meta,
    path
}, from, next) => {
    let {
        auth = false
    } = meta
    let isLogin = false
    if (Boolean(store.state.user) && Boolean(store.state.user.user) && Boolean(store.state.user.user.accessToken)) {
        isLogin = true //true用户已登录， false用户未登录
    }
    console.log(auth, isLogin)
    if (auth && !isLogin) {
        return next({
            path: '/login'
        })
    }
    next()
})


import * as filters from './filters/'
Object.keys(filters).forEach(key => Vue.filter(key, filters[key])) //install filters

import App from './App.vue'
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
// new Vue({ store, router }).$mount('#app')
