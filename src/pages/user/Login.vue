<template>
    <div class="container reg-log">
        <div class="company-logo">
            <img src="../../assets/images/login/dlc_logo.png" />
        </div>
    
        <div class="marReg">
            <input type="text"
                   maxlength="11"
                   placeholder="请输入手机号码"
                   v-model="userName">
        </div>
    
        <div class="marReg">
            <input type="password"
                   maxlength="16"
                   placeholder="请输入密码"
                   v-model="loginPassword">
        </div>
    
        <div class="marReg no-boder">
            <button type="button"
                    class="btn btn-normal btn-login"
                    @click="submitLogin">登录</button>
        </div>
    
        <div class="login-link">
            <router-link to="/signup"
                         class="fz-normal"
                         tag="a">立即注册</router-link>
            <router-link to="/forgetPwd/back"
                         class="fz-normal float-right"
                         tag="a">忘记密码？</router-link>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
import bcrypt from 'bcryptjs'
import md5 from 'md5'
import { testAccountName, testPassword } from '../../utils/validate.js'

export default {
    data() {
        return {
            userName: '13636398500',
            loginPassword: 'abcd1234'
        }
    },
    mounted() {

    },
    methods: {
        validateForm() {
            if (!testAccountName(this.userName)) {
                Toast('请输入11位正确的手机号码')
                return false
            } else if (!testPassword(this.loginPassword)) {
                Toast('请输入8-16位数字和字母组合的密码')
                return false
            }
            return true
        },
        submitLogin() {
            if (this.validateForm()) {
                let _this = this
                this.$http.get(`/user/signin/salt/${_this.userName}`).then((res) => {
                    _this.$http.post(`/user/signin`, { userName: _this.userName, password: md5(bcrypt.hashSync(this.loginPassword, res['data']['data']['salt'])) }).then((response) => {
                        _this.$store.dispatch('USER_LOGIN_IN', response['data']['data'])
                        let userAuth = 'Bearer ' + response.data.data.accessToken
                        _this.$store.dispatch('USER_AUTH', userAuth)
                        _this.$http.get(`/account`, { headers: { 'Authorization': userAuth } }).then((resolve) => {
                            _this.$store.dispatch('USER_ACCOUNT', resolve.data.data)
                            _this.$router.go(-1)
                        }).catch(function (err) {
                            Toast(err)
                        })
                    }).catch(function (error) {
                        Toast(error)
                    })
                }).catch(function (err) {
                    Toast(err)
                })
            }

        }
    }
}
</script>
<style scoped>
.reg-log {
    width: 90%;
    margin: 0 auto;
}

.company-logo {
    width: 100%;
    height: auto;
    text-align: center;
    margin: 2rem 0;
}

.company-logo img {
    width: 50%;
}

.marReg {
    margin-bottom: 1rem;
    border-bottom: 1px solid #e5e5e5;
}

.reg-log input {
    width: 100%;
    padding: 5px;
    font-size: 1rem;
    border: none;
}

.btn-login {
    width: 100%;
    height: 38px;
    letter-spacing: 4px;
    margin-top: 2rem;
    background-color: #3a80c8;
    color: #fff;
    border: 0;
    font-size: 1.2rem;
    border-radius: 5px;
}

.login-link {
    position: relative;
    font-size: 1.1rem;
    padding-left: 10px;
}

.login-link span {
    color: #8d8d8d;
}

.login-link span a {
    color: #346faf;
}
</style>