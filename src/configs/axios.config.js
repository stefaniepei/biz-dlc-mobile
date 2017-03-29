import axios from 'axios'
import { Indicator } from 'mint-ui'

var debug = true
//request to show loading
axios.interceptors.request.use(function (config) {
    Indicator.open()
    return config
}, function (error) {
    Indicator.close()
    console.log('requestError',error)
    return Promise.reject(error)
})

//response to hide loading
axios.interceptors.response.use(function (response) {
    Indicator.close()
    console.log('responseSuccess',response)
    if(401 == response.status){
        window.location.href = '/login'
    }else{
        return response
    }
}, function (error) {
    Indicator.close()
    console.log('responseError',error)
    return Promise.reject(error)
})

axios.defaults.baseURL = debug ? 'https://unstable-m.dianlc.com' : 'https://{{mobile}}.{{dns_name}}'

axios.defaults.headers.get['Content-Type'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'


axios.defaults.validateStatus = (status) =>{
    return (status >= 200 && status < 300) || status == 401;
}
// console.log(axios.defaults)
export default axios