import axios from 'axios'

var debug = true
//request to show loading
axios.interceptors.request.use(function (config) {
    // stores.dispatch('showLoading')
    return config
}, function (error) {
    return Promise.reject(error)
})

//response to hide loading
axios.interceptors.response.use(function (response) {
    // stores.dispatch('hideLoading')
    return response
}, function (error) {
    return Promise.reject(error)
})

// console.log(axios.defaults)

axios.defaults.baseURL = debug ? 'https://unstable-m.dianlc.com' : 'https://{{mobile}}.{{dns_name}}'

axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded'
/*
axios.defaults.baseURL = (process.env.NODE_ENV !=='production' ? config.dev.httpUrl:config.build.httpUrl);
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL='http://localhost:8082/';
*/
export default axios