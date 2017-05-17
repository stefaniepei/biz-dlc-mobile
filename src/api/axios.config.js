import axios from 'axios'
import store from '../store'
import router from '../router/router.config'
import {
    Indicator,
    Toast
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

//request to show loading
axios.interceptors.request.use((config) => {
    Indicator.open()
    return config
}, (error) => {
    Indicator.close()
    return Promise.reject(error)
})

const ErrorMessageList = {
    '401': '请登录',
    '429': '获取otp密码次数过多',
    '600': '验证码出错',
    '601': '验证码过期',
    '602': 'Otp验证出错',
    '603': '用户名已经存在',
    '604': '手机号已经存在',
    '605': '邮箱已经存在',
    '606': '认证失败',
    '607': '注册失败',
    '608': '无效的密码修改token',
    '609': '密码修改出错',
    '610': '认证token无效',
    '700': '用户和密码不匹配',
    '701': '密码输错超出次数限制',
    '702': '用户不存在',
    '703': '用户已注销',
    '704': '用户已锁定',
    '41000': '产品未找到',
    '41002': '用户未绑卡',
    '41001': '产品已下架',
    '41005': '产品已售罄',
    '41004': '已达用户最大购买限额',
    '41003': '已达用户单日最大购买限额',
    '41006': '小于起购金额',
    '41008': '已购买过新手产品,暂不能购买',
    '41010': '购买新手产品未实名认证',
    '41011': '订单已经过期',
    '41012': '订单已支付',
}

//response to hide loading
axios.interceptors.response.use((response) => {
    Indicator.close()
    return response.data
}, (error) => {
    Indicator.close()
    // console.log(error.response, 'response-error')
    let errorCode = error.response.status
    if (error.response) {
        switch (errorCode) {
            case 401:
                store.dispatch('USER_LOGIN_OUT')
                router.replace({
                    path: '/login'
                })
        }
    }
    if (ErrorMessageList.hasOwnProperty(String(errorCode))) {
        return Promise.reject(ErrorMessageList[String(errorCode)])
    } else {
        return Promise.reject(error.response.statusText)
    }
    // return Promise.reject(error.response.data)
})

// console.log(axios.defaults)
export default axios
