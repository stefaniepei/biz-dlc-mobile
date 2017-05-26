<template>
    <div class="page recharge">
        <div v-show="!rechargeSuccessDisplay">
            <mt-header title="充值" class="header-bg-color" fixed>
                <router-link to="/info" slot="left">
                    <mt-button icon="back"></mt-button>
                </router-link>
            </mt-header>
            <div class="banktop header-margin">
                <div :class="'bankico bank_icon_'+this.userAccount['cards'][0]['bankNo']"></div>
                <div class="bankinfo">
                    <p>
                        <span>{{this.userAccount['cards'][0]['bankName']}}</span>
                        <span>（尾号</span>
                        <span>{{this.userAccount['cards'][0]['cardNo']|lastChar}}</span>
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
                    <input type="text" v-model='verifyCode' class="opt" maxlength="6" placeholder="请输入验证码" />
                    <button class="sendCode" @click="sendOtp" :disabled="otpDisabled">{{otpBtnVal}}</button>
                </div>
    
            </div>
            <div class="bankbutton rechbutton">
                <button class="btn btn-default btn-recharge" @click="rechargeBtn">确定充值</button>
                <p>温馨提示：</p>
                <p> 1、充值免费，单笔充值金额必须大于等于2元。</p>
                <p> 2、一般情况下完成充值操作后，资金会立即到用户账户中，不排除在充值高峰期，到账时间会推迟，请以实际到账时间为准。</p>
            </div>
        </div>
        <recharge-success v-show="rechargeSuccessDisplay" :child-data="rechargeTradeData">
        </recharge-success>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { Toast, MessageBox } from 'mint-ui'
import bcrypt from 'bcryptjs'
import md5 from 'md5'
import routeData from 'mixins/routeData.js'
import { testMoney, testOtpCode } from 'utils/validate.js'
import rechargeSuccess from 'components/recharge-success.vue'

export default {
    mixins: [routeData],
    routeData() {
        return {
            perLimit: 20000,
            dayLimit: 50000,
            rechargeAmount: '',
            verifyCode: '',
            otpBtnVal: '发送验证码',
            otpDisabled: false,
            rechargeSuccessDisplay: false,
            rechargeTradeData: {},
        }
    },
    components: {
        rechargeSuccess
    },
    computed: mapGetters([
        'user',
        'userAccount',
        'userAuth'
    ]),
    mounted() {
        console.log(this)
    },
    methods: {
        fastInput(num) {
            this.rechargeAmount = num
            if (num >= this.perLimit) {
                this.rechargeAmount = this.perLimit;
            }
        },
        sendOtp() {
            let _this = this
            this.$http.get(`/account/deposit/otp`, { params: { cellphone: this.user['userName'] }, headers: { 'Authorization': this.userAuth } })
                .then((otp) => {
                    let times = 60
                    _this.otpBtnVal = times + " s"
                    _this.otpDisabled = 'disabled'
                    times--
                    let timeClear = setInterval(() => {
                        if (_this.otpBtnVal == '发送验证码') {
                            clearInterval(timeClear)
                            return
                        }
                        _this.otpBtnVal = times + " s"
                        if (times == 0) {
                            clearInterval(timeClear)
                            _this.otpBtnVal = "发送验证码"
                            _this.otpDisabled = false
                            times = 60
                        }
                        times--
                    }, 1000)
                    _this.verifyCode = otp['data']['otp']
                }).catch((otpError) => Toast(otpError))
        },
        rechargeBtn() {
            if (!testMoney(this.rechargeAmount)) {
                Toast('金额是正数且精度不能大于两位小数')
            } else if (!testOtpCode(this.verifyCode)) {
                Toast('请输入6位短信验证码')
            } else {
                let _this = this
                MessageBox.prompt(' ', '请输入交易密码', { inputPlaceholder: '请输入交易密码' })
                    .then(({ value, action }) => {
                        if ('confirm' == action) {
                            let param = {
                                acceptTos: true,
                                totalAmount: _this.rechargeAmount,
                                password: value,
                                smsCode: _this.verifyCode
                            }
                            _this.$http.get(`/user/signin/salt/${_this.user['userName']}`)
                                .then((saltRes) => {
                                    param.password = bcrypt.hashSync(value, saltRes['data']['salt'])
                                    _this.$http.post(`/account/deposit`, param, { headers: { 'Authorization': _this.userAuth } })
                                        .then((payRes) => {
                                            _this.rechargeTradeData = {
                                                bankName: _this.userAccount['cards'][0]['bankName'],
                                                cardNo: _this.userAccount['cards'][0]['cardNo'],
                                                rechargeAmount: _this.rechargeAmount
                                            }
                                            if (0 == payRes['error']) {
                                                _this.rechargeSuccessDisplay = true
                                            } else {
                                                _this.rechargeSuccessDisplay = false
                                            }

                                        }).catch((payErr) => Toast(payErr))
                                }).catch((saltErr) => Toast(saltErr))
                        }
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