import axios from 'axios'
import { Indicator } from 'mint-ui'

var debug = true
//request to show loading
axios.interceptors.request.use(function (config) {
    Indicator.open()
    return config
}, function (error) {
    return Promise.reject(error)
})

//response to hide loading
axios.interceptors.response.use(function (response) {
    Indicator.close();
    return response
}, function (error) {
    return Promise.reject(error)
})

axios.defaults.baseURL = debug ? 'https://unstable-m.dianlc.com' : 'https://{{mobile}}.{{dns_name}}'

axios.defaults.headers.get['Content-Type'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'

// console.log(axios.defaults)
export default axios