<template>
    <div class="page reg-log">
        <div class="company-logo">
            <img src="../../assets/images/login/dlc_logo.png" />
        </div>
    
        <div class="marReg">
            <input type="text" v-model='phone' maxlength="11" placeholder="请输入手机号码">
        </div>
    
        <div class="marReg">
            <input type="password" v-model='password' maxlength="16" placeholder="请设置密码">
        </div>
    
        <div class="marReg">
            <input type="text" class="short-input" v-model='picVerifyCode' maxlength="4" placeholder="请输入图片验证码">
            <div class="reg-border">
                <img :src="captchaUrl" @click="changeImg" title="点击更换验证码">
            </div>
        </div>
    
        <div class="marReg">
            <input type="text" class="short-input" v-model='verifyCode' maxlength="6" placeholder="请输入验证码">
            <div class="reg-border padding-10">
                <button class="sendCode" @click="sendOtp" ref="otpCodeDOM">发送验证码</button>
            </div>
        </div>
    
        <div class="marReg no-boder">
            <button type="button" class="btn btn-normal btn-login" @click="regBtn" :disabled="regupDisabled">注册</button>
        </div>
    
        <div class="reg-agree">
            <span class="checkboxIcon checked" @click="chkAgree" ref="agree"></span>
            <span>我同意
                <a href="/regAgreement">《点理财金融服务协议》</a>
            </span>
        </div>
    
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
import bcrypt from 'bcryptjs'
import md5 from 'md5'
import { testAccountName, testPassword, testCaptcha, testOtpCode } from '../../utils/validate.js'

export default {
    data() {
        return {
            phone: '13543433333',
            password: 'aaaa1111',
            picVerifyCode: 'zwjr',
            verifyCode: '',
            captchaUrl: '',
            captchaToken: '',
            chkContarct: true,
            regupDisabled: false
        }
    },
    mounted() {
        //获取图片验证码
        this.getCaptchaImg();
    },
    methods: {
        //更换图片验证码
        changeImg() {
            this.getCaptchaImg();
        },
        //验证输入内容
        validateForm() {
            if (!testAccountName(this.phone)) {
                Toast('请输入11位正确的手机号码')
                return false
            } else if (!testPassword(this.password)) {
                Toast('请输入8-16位数字和字母组合的密码')
                return false
            } else if (!testCaptcha(this.picVerifyCode)) {
                Toast('请输入4位字母的图片密码')
                return false
            }
            return true
        },
        //获取手机验证码
        sendOtp() {
            if (this.validateForm()) {
                let _this = this
                this.$http.post(`/user/captcha/validate`, { token: this.captchaToken, value: this.picVerifyCode }).then((response) => {
                    _this.$http.get(`/user/signup/quick/otp`, { params: { cellphone: _this.phone, token: _this.captchaToken } }).then((otp) => {
                        let times = 60
                        let otpDom = _this.$refs.otpCodeDOM
                        otpDom.innerHTML = times + " s"
                        otpDom.disabled = 'disabled'
                        times--
                        let timeClear = setInterval(function () {
                            if (otpDom.innerHTML == '发送验证码') {
                                clearInterval(timeClear);
                                return;
                            }
                            otpDom.innerHTML = times + " s";
                            if (times == 0) {
                                clearInterval(timeClear);
                                otpDom.innerHTML = "发送验证码";
                                otpDom.disabled = false
                                times = 60;
                            }
                            times--
                        }, 1000)

                        _this.verifyCode = otp['data']['otp']

                    }).catch(function (otpError) {
                        Toast(otpError)
                        this.getCaptchaImg()
                    })
                }).catch(function (signError) {
                    Toast(signError)
                    this.getCaptchaImg()
                })
            }
        },
        //提交注册
        regBtn() {
            if (!this.chkContarct) {
                Toast('请先阅读《点理财金融服务协议》')
                return
            }
            if (this.validateForm()) {
                let _this = this
                if (!testOtpCode(this.verifyCode)) {
                    Toast('请输入6位短信验证码')
                    return false
                }
                _this.regupDisabled = true
                _this.$http.post(`/user/signup/quick`, {
                    cellphone: _this.phone, password: md5(bcrypt.hashSync(_this.password, undefined)),
                    smsCode: _this.verifyCode, acceptTos: true, captcha: _this.picVerifyCode, captchaToken: _this.captchaToken
                }).then((response) => {
                    Toast('注册成功');
                }).catch(function (regupError) {
                    Toast(regupError)
                    _this.regupDisabled = false
                })
            }

        },
        //获取图片验证码
        getCaptchaImg() {
            let _this = this
            this.$http.get(`/user/captcha`).then((res) => {
                _this.captchaToken = res['data']['token']
                _this.captchaUrl = res['data']['url']
            }).catch((saltError) => Toast(saltError))
        },
        //checkbox of contarct
        chkAgree() {
            this.chkContarct = !this.chkContarct
            if (this.chkContarct) {
                this.$refs.agree.className = 'checkboxIcon checked'
            } else {
                this.$refs.agree.className = 'checkboxIcon'
            }
        },
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
    padding: 10px 0;
    font-size: 1.5rem;
    border: none;
}

input.short-input {
    width: 60%;
}

.reg-border {
    width: 40%;
    float: right;
}

.padding-10 {
    padding: 10px 0;
}

button.sendCode {
    width: 100%;
    font-size: 1.2rem;
    color: #346faf;
    border: none;
    background: none;
}

#captchaImg {
    width: 100%;
    height: 38px;
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
    border-radius: 3px;
}

.reg-agree {
    position: relative;
    font-size: 1.1rem;
    text-align: center;
}

.reg-agree span {
    color: #8d8d8d;
}

.reg-agree span a {
    color: #346faf;
}

.reg-agree input.input-ck {
    position: absolute;
    display: block;
    width: 4.5%;
    margin: 0;
    padding: 0;
    top: 2px;
    height: 1.5rem;
    border-radius: 3px;
    border: 1px solid #666;
}

.no-boder {
    border: none;
}
</style>