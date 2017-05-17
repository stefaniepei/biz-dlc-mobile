import axios from './api/axios.config'
import {
    Toast
} from 'mint-ui'

export default getUserSalt = (name, success) => {
    axios.get(`/user/signin/salt/${name}`)
        .then((res) => success(res['data']['salt']))
        .catch((err) => Toast(err))
}

// 待整合，api单独存放
