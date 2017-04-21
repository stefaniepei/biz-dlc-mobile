import axios from 'axios'
import store from '../store'
import router from '../router/router.config'
import {
    Indicator
} from 'mint-ui'

var debug = true

axios.defaults.timeout = 5000
axios.defaults.baseURL = debug ? 'https://unstable-m.dianlc.com' : 'https://{{mobile}}.{{dns_name}}'

axios.defaults.headers.get['Content-Type'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'


// axios.defaults.validateStatus = (status) => {
//     return (status >= 200 && status < 300) || status == 401;
// }

//request to show loading
axios.interceptors.request.use((config) => {
    Indicator.open()
    return config
}, (error) => {
    Indicator.close()
    console.log('requestError', error)
    return Promise.reject(error)
})

//response to hide loading
// axios.interceptors.response.use((response) => {
//     Indicator.close()
//     console.log('responseSuccess', response)
//     if (401 == response.status) {
//         store.dispatch('USER_LOGIN_OUT')
//         router.replace({
//             path: '/login'
//         })
//     } else {
//         return response
//     }
// }, (error) => {
//     Indicator.close()
//     console.log('responseError', error)
//     return Promise.reject(error)
// })

axios.interceptors.response.use((response) => {
    Indicator.close()
    return response
}, (error) => {
    Indicator.close()
    if (error.response) {
        switch (error.response.status) {
            case 401:
                store.dispatch('USER_LOGIN_OUT')
                router.replace({
                    path: '/login'
                })
        }
    }
    return Promise.reject(error.response.data)
})

// console.log(axios.defaults)
export default axios
