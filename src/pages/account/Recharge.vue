<template>
    <div class="page recharge">
        <mt-header title="充值" class="header-bg-color" fixed>
            <router-link to="/info" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="banktop header-margin">
            <div :class="'bankico bank_icon_'+this.userAccount.cards[0]['bankNo']"></div>
            <div class="bankinfo">
                <p>
                    <span>{{this.userAccount.cards[0]['bankName']}}</span>
                    <span>（尾号</span>
                    <span>{{this.userAccount.cards[0]['cardNo']|lastChar}}</span>
                    <span>）</span>
                </p>
                <p>
                    <span>单笔限额</span>
                    <span>{{this.perLimit}}</span>
                    <span>每日限额</span>
                    <span>{{this.dayLimit}}</span>
                </p>
            </div>
        </div>
        <section class="fill-div-05">
        </section>
        <div class="bankinput">
            <div class="tradeamount">
                <span>金额</span>
                <span>￥</span>
                <input type="text" v-model="rechargeAmount" placeholder="请输入充值金额" />
            </div>
    
            <div class="fast-input text-center">
                <span @click="fastInput(5000)" v-if="this.perLimit >= 5000" :class="this.rechargeAmount == 5000 ? 'active' : ''">￥5,000</span>
                <span @click="fastInput(10000)" v-if="this.perLimit >= 10000" :class="this.rechargeAmount == 10000 ? 'active' : ''">￥10,000</span>
                <span @click="fastInput(20000)" v-if="this.perLimit >= 20000" :class="this.rechargeAmount == 20000 ? 'active' : ''">￥20,000</span>
                <span @click="fastInput(30000)" v-if="this.perLimit >= 30000" :class="this.rechargeAmount == 30000 ? 'active' : ''">￥30,000</span>
                <span @click="fastInput(40000)" v-if="this.perLimit >= 40000" :class="this.rechargeAmount == 40000 ? 'active' : ''">￥40,000</span>
                <span @click="fastInput(50000)" v-if="this.perLimit >= 50000" :class="this.rechargeAmount == 50000 ? 'active' : ''">￥50,000</span>
            </div>
            <div class="wxips">提示：该卡本次最多充值
                <font>{{this.perLimit}}</font>元
            </div>
            <div class="withopt">
                <input type="text" class="opt" maxlength="6" placeholder="请输入验证码" />
                <button class="sendCode" @click="sendOtp" ref="otpCodeDOM">发送验证码</button>
            </div>
    
        </div>
        <div class="bankbutton rechbutton">
            <button class="btn btn-default btn-recharge" id="rechButton">确定充值</button>
            <p>温馨提示：</p>
            <p> 1、充值免费，单笔充值金额必须大于等于2元。</p>
            <p> 2、一般情况下完成充值操作后，资金会立即到用户账户中，不排除在充值高峰期，到账时间会推迟，请以实际到账时间为准。</p>
        </div>
    </div>
    <!--<div class="success-page" style="display:none;">
            <div class="success-top">
            <img src="../images/account/recharge-success.png">
            <p>充值成功</p>
            </div>
            <div class="success-middle">
            <p>
            <span class="left">银行卡</span>
            <span class="right" id="cardInfo">中国民生银行 尾号8928</span>
            </p>
            <p>
            <span class="left">充值金额</span>
            <span class="right" id="tradeAmount">￥10</span>
            </p>
            </div>
            <div class="success-bottom">
            <button class="re-recharge">继续充值</button>
            <button class="buy">立即购买</button>
            </div>
            </div>-->
</template>
<script>
import { mapGetters } from 'vuex'
import { Toast } from 'mint-ui'

export default {
    data() {
        return {
            perLimit: 20000,
            dayLimit: 50000,
            rechargeAmount: '',
        }
    },
    computed: mapGetters([
        'user',
        'userAccount',
        'userAuth'
    ]),
    methods: {
        fastInput(num) {
            this.rechargeAmount = num
            if (num >= this.perLimit) {
                this.rechargeAmount = this.perLimit;
            }
        },
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

                    }).catch(function (otpError) {
                        Toast(otpError)
                        this.getCaptchaImg()
                    })
                }).catch(function (signError) {
                    Toast(signError)
                })
            }
        },
    }
}
</script>
<style scoped>
.fast-input .active {
    color: #fff;
    background-color: #346FCA;
}

.recharge {
    width: 100%;
    height: 100%;
    background-color: #F4F4F7;
    margin: 0 auto;
    overflow: hidden;
}

.banktop {
    background: #fff;
    padding: .5rem 0;
}

.bankico {
    width: 3rem;
    height: 3rem;
    vertical-align: text-bottom;
    display: inline-block;
    background-size: 100%;
    background-position: center;
    margin-left: 5%;
}

.bankinfo {
    display: inline-block;
    height: 3rem;
}

.tradeamount {
    margin-bottom: 10px;
    border-bottom: 1px solid #f1f1f1;
    padding-bottom: 10px;
    padding-top: 10px;
    background: #fff;
}

.tradeamount span {
    font-size: 1.5rem;
    margin-left: 5%;
}

.tradeamount input {
    width: 73%;
    border: 0;
}

.fast-input span {
    border: 1px solid #E6E6E8;
    background-color: #FFF;
    text-align: center;
    display: inline-block;
    width: 27%;
    margin: 2%;
    height: 3rem;
    line-height: 3rem;
}

.wxips {
    font-size: 1.2rem;
    color: #999;
    margin: .5rem 5%;
}

.withopt {
    margin-top: 10px;
}

.withopt input {
    height: 40px;
    line-height: 40px;
    width: 60%;
    text-indent: 15px;
    border-bottom: 1px solid #f1f1f1;
    border-radius: 0;
}

.withopt button {
    width: 40%;
    float: right;
    background: #fff;
    border: 0;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #f1f1f1;
    font-size: 1.2rem;
    color: #346faf;
}

.rechbutton {
    margin: 0 auto;
    padding-top: 5px;
    padding-bottom: 10px;
}

.rechbutton .btn-recharge {
    display: block;
    background-color: #346FCA;
    color: #fff;
    width: 90%;
    height: 38px;
    margin: 1rem auto;
}

.rechbutton p {
    width: 90%;
    margin: 0.3rem auto;
    font-size: 1.2rem;
    color: #999;
}
</style>