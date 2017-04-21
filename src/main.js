import Vue from 'vue'
import axios from './api/axios.config'
import router from './router/router.config'
import store from './store'
// import MintUI from 'mint-ui'

import 'normalize.css'
import 'mint-ui/lib/style.css'
import './assets/css/index'

// Vue.use(MintUI)
Vue.prototype.$http = axios
Vue.config.debug = true

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
