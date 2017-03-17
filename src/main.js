import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes, axios } from './configs'
import store from './store'
import MintUI from 'mint-ui'

import 'normalize.css'
import 'mint-ui/lib/style.css'
import './assets/css/common.css'

Vue.use(MintUI)
Vue.use(VueRouter)
Vue.prototype.$http = axios
Vue.config.debug = true

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  base: __dirname
})

// router.beforeEach(({meta, path}, from, next) => {
//     var { auth = true } = meta
//     var isLogin = Boolean(store.state.user.accesstoken) //true用户已登录， false用户未登录
//     if (auth && !isLogin && path !== '/login') {
//         return next({ path: '/login' })
//     }
//     next()
// })


import * as filters from './filters/'
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))//install filters

import App from './App.vue'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
// new Vue({ store, router }).$mount('#app')