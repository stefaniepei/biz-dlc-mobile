<template>
    <div class="page reg-log">
        <div class="marReg">
            <input type="text" v-model='holderName' maxlength="11" placeholder="持卡人姓名">
        </div>
    
        <div class="marReg">
            <input type="text" v-model='idNo' maxlength="16" placeholder="持卡人身份证号">
        </div>
    
        <div class="marReg">
            <select v-model='bankNo'>
                <option value="">请选择银行</option>
                <option v-for="value in bankList" :value="value.bankNo">{{value.bankName}}</option>
            </select>
        </div>
    
        <div class="marReg">
            <input type="text" v-model='cardNo' maxlength="16" placeholder="请输入银行卡号">
        </div>
    
        <div class="marReg">
            <input type="text" v-model='cellphone' maxlength="11" placeholder="请输入银行预留手机号码">
        </div>
    
        <div class="marReg">
            <input type="text" class="short-input" v-model='verifyCode' maxlength="6" placeholder="请输入验证码">
            <div class="reg-border padding-10">
                <button class="sendCode" @click="verifyCodeBtn" ref="otpCode">发送验证码</button>
            </div>
        </div>
    
        <div class="marReg no-boder">
            <button type="button" class="btn btn-normal btn-login" @click="confirmBtn" :disable="bindCardDisable">确认</button>
        </div>
    
        <div class="w100">
            <p>若验证码收不到，请点击
                <a href="tel:4008202450">联系客服</a>
            </p>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
import { testChineseName, testIDCard, testBankNO, testBankPhone, testOtpCode } from '../../utils/validate.js'
export default {
    data() {
        return {
            holderName: '这么屌咋不上天呢',
            idNo: '',
            bankNo: '',
            cardNo: '',
            cellphone: '13636398500',
            verifyCode: '',
            bindCardDisable: false,
            bankList: {},
        }
    },
    mounted() {
        //获取银行列表
        this.getBank()
    },
    methods: {
        //输入信息验证
        validateForm() {
            if (!testChineseName(this.holderName) || this.holderName == '') {
                Toast('请输入正确的姓名')
                return false
            } else if (!testIDCard(this.idNo)) {
                Toast('请输入正确的身份证号')
                return false
            } else if (!testBankNO(this.cardNo)) {
                Toast('请输入正确的银行卡号')
                return false
            } else if (!testBankPhone(this.cellphone)) {
                Toast('请输入11位正确的手机号码')
                return false
            } else if (!testOtpCode(this.verifyCode)) {
                Toast('请输入6位短信验证码')
                return false
            }
            return true
        },
        //获取银行预留手机验证码
        verifyCodeBtn() {
            if (!testBankPhone(this.cellphone)) {
                Toast('请输入11位正确的手机号码')
                return false
            }
            this.$http.get(`/account/cards/otp`, { params: { cellphone: this.cellphone } }).then((otp) => {
                let times = 60
                let otpDom = _this.$refs.otpCode
                otpDom.innerHTML = times + " s"
                otpDom.disabled = 'disabled'
                times--
                var timeClear = setInterval(function () {
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

            }).catch((error) => Toast(error))
        },
        //确认绑定
        confirmBtn() {
            if (this.validateForm()) {
                if (this.bankNo == '') {
                    Toast('请输入银行名称')
                    return false
                }
            }
            this.bindCardDisable = true
            this.$http.post(`/account/cards`, {
                holderName: this.holderName, idNo: this.idNo, cardNo: this.cardNo,
                bankNo: this.bankNo, cellphone: this.cellphone, smsCode: this.verifyCode
            }).then((res) => {
                console.log(res)
            }).catch(function (error) {
                Toast(error)
                this.bindCardDisable = false
            })
        },
        //获取银行列表接口
        getBank() {
            let _this = this
            this.$http.get(`/payments/banks`).then((res) => {
                _this.bankList = res['data']
            }).catch((error) => Toast(error))
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

.reg-log input,
.reg-log select {
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
    border-radius: 1rem;
    border: 1px solid #666;
}

.no-boder {
    border: none;
}

p {
    text-align: center;
    font-size: 1.1rem;
}
</style>