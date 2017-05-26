<template>
    <div>
        <div class="recharge-page">
            <div class="banktop">
                <div :class="'bankico ' + bankIcon"></div>
                <div class="bankinfo">
                    <p>
                        <span>{{bankName}}</span>
                        <span>（尾号</span>
                        <span>{{cardNo|lastChar}}</span>
                        <span>）</span>
                    </p>
                    <p>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </p>
                </div>
            </div>
            <section class="fill-div"></section>
            <div class="bankinput">
                <div class="withamount">
                    <ul>
                        <li class="noborder">
                            <span style="width: 10%;">金额</span>
                            <span style="width: 5%;">￥</span>
                            <input type="text" :placeholder="available" class="withamountinput" v-model="cashMoney" style="width:35%" />
                            <div class="cash-div">
                                <button class="all-cash" @click="allCash">全部金额</button>
                            </div>
                        </li>
                    </ul>
                </div>
                <section class="fill-div"></section>
                <div class="withopt">
                    <input type="text" class="opt" maxlength="6" placeholder="请输入验证码" v-model='verifyCode' />
                    <button class="withdrawgetcapt" @click="verifyCodeBtn" ref="otpCode">发送验证码</button>
                </div>
            </div>
            <div class="bankbutton withdrawbutton">
                <div class="wxips">提示：每笔提现手续费2元</div>
                <button class="btn btn-default btn-cash" @click="withButton">申请提现</button>
                <p>温馨提示：</p>
                <p>1、用户投资满100元，每月有3次的免费提现机会，超过3次则每笔收取2元提现手续费；</p>
                <p>2、用户投资未满100元，每笔提现收取2元手续费；</p>
                <p>3、单笔提现金额必须大于等于2元，提现金额上限及具体到账时间请以各自银行系统运作为准。</p>
            </div>
        </div>
        <div class="success-page" v-show="false">
            <div class="success-top">
                <img src="../../assets/images/account/cash-success.png">
                <p>提现申请已提交</p>
            </div>
            <div class="success-middle">
                <p>
                    <span class="left">预计到账时间</span>
                    <span class="right">T+1工作日</span>
                </p>
                <p>
                    <span class="left">银行卡</span>
                    <span class="right" id="cardInfo">中国民生银行 尾号8928</span>
                </p>
                <p>
                    <span class="left">提现金额</span>
                    <span class="right" id="tradeAmount">￥10</span>
                </p>
                <p>
                    <span class="left">手续费</span>
                    <span class="right" id="fee">￥0.00</span>
                </p>
            </div>
            <div class="success-bottom">
                <button class="cash-complete">完成</button>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            bankIcon: '',
            bankName: '',
            cardNo: '',
            available: '',
            cashMoney: '',
            verifyCode: '',
        }
    },
    computed: mapGetters([
        'userAuth',
        'userAccount'
    ]),
    mounted() {
        this.bizAccountInfo()
    },
    methods: {
        bizAccountInfo() {
            let _this = this
            this.$http.get(`/account`, { headers: { 'Authorization': this.userAuth } }).then((res) => {
                let result = res['data']
                if (result['cards'].length > 0) {
                    _this.bankName = result['cards'][0]['bankName']
                    _this.cardNo = result['cards'][0]['cardNo']
                    _this.bankIcon = 'bank_icon_' + result['cards'][0]['bankNo']
                    //let bankCode = result['cards'][0]['bankCode']
                }
                console.log(_this.bankIcon)
                _this.available = result['balance']['available']
            }).catch((error) => Toast(error))
        },
        allCash() {
            this.cashMoney = this.available
        },
        //获取银行预留手机验证码
        verifyCodeBtn() {
            let _this = this
            if (!testBankPhone(this.cellphone)) {
                Toast('请输入11位正确的手机号码')
                return false
            }
            this.$http.get(`/account/withdraw/otp`, { params: { cellphone: this.cellphone }, headers: { 'Authorization': this.userAuth } }).then((otp) => {
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
    }
}
</script>
<style scoped>
.recharge-page {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
    background-color: #F4F4F7;
}

.banktop {
    background: #fff;
    padding: 0.5rem 0;
}

.recharge-page .banktop .bankico {
    width: 3rem;
    height: 3rem;
    display: inline-block;
    background-size: 100%;
    background-position: center;
    margin-left: 5%;
    vertical-align: middle;
}

.recharge-page .banktop .bankinfo {
    line-height: 3rem;
    height: 3rem;
    display: inline-block;
}

.recharge-page .fill-div {
    width: 100%;
    height: 0.5rem;
    background-color: #F4F4F7;
}

.recharge-page .bankinput {
    background-color: #F4F4F7;
    margin: 0 auto;
}

.recharge-page .fast-input span {
    border: 1px solid #E6E6E8;
    background-color: #FFF;
    text-align: center;
    display: inline-block;
    width: 28%;
    margin: 2%;
    height: 3rem;
    line-height: 3rem;
}

.recharge-page .wxips {
    width: 90%;
    margin: 0.5rem auto;
}

.recharge-page .withamount {
    border-bottom: 1px solid #f1f1f1;
    background: #fff;
    padding-bottom: 0;
    margin-bottom: 0;
}

.recharge-page .withamount ul li {
    height: 3.5rem;
    line-height: 3.5rem;
}

.recharge-page .withamount span {
    font-size: 1.5rem;
    margin-left: 5%;
}

.recharge-page .withamount input {
    width: 56%;
    border: 0;
}

.recharge-page .withopt {
    margin-top: 0;
    overflow: hidden;
}

.recharge-page .withopt input {
    width: 60%;
    height: 3.5rem;
    line-height: 3.5rem;
    padding-left: 5%;
    border-bottom: 1px solid #f1f1f1;
    border-radius: 0;
    float: left;
}

.recharge-page .withopt button {
    width: 35%;
    line-height: 3.5rem;
    background: #fff;
    border-bottom: 1px solid #f1f1f1;
    font-size: 1.2rem;
    color: #a3a3a3;
    border: 0;
    float: left;
}

.recharge-page .withdrawbutton {
    margin: 0 auto;
    background-color: #F4F4F7;
}

.recharge-page .withdrawbutton p {
    width: 90%;
    margin: 0 auto;
}

.recharge-page .withdrawbutton .btn-cash {
    background-color: #346FCA;
    width: 90%;
    height: 38px;
    margin: 1rem auto;
    display: block;
    color: #fff;
}

.recharge-page .cash-div {
    width: 37%;
    text-align: center;
    display: inline-block;
}

.recharge-page .all-cash {
    background-color: #346FCA;
    color: #fff;
    border: 0;
    border-radius: 12px;
    font-size: 1.2rem;
    width: 6.5rem;
    height: 25px;
    line-height: 25px;
}

.success-page {
    background-color: #F4F4F7;
}

.success-page .success-top {
    height: 8rem;
    width: 100%;
    text-align: center;
}

.success-page .success-top img {
    height: 4rem;
    width: 4rem;
    margin: 1rem auto 0.5rem;
}

.success-page .success-top p {
    color: #4d4d4d;
    font-size: 1.6rem;
}

.success-page .success-middle {
    background-color: #fff;
    font-size: 1.4rem;
    color: #888;
}

.success-page .success-middle p {
    margin: 0 10%;
    height: 3rem;
    line-height: 3rem;
}

.success-page .success-middle .left {
    float: left;
    display: inline-block;
    height: 3rem;
    line-height: 3rem;
    white-space: nowrap;
}

.success-page .success-middle .right {
    float: right;
    text-align: right;
    display: inline-block;
    height: 3rem;
    line-height: 3rem;
    white-space: nowrap;
}

.success-page .success-bottom {
    text-align: center;
}

.success-page .success-bottom .re-recharge {
    border: 1px solid #4677C9;
    border-radius: 3px;
    background-color: transparent;
    color: #346fca;
    width: 30%;
    height: 3rem;
    line-height: 3rem;
    font-size: 1.4rem;
    margin: 2rem;
}

.success-page .success-bottom .buy {
    background-color: #346FCA;
    border: 0;
    border-radius: 3px;
    color: #fff;
    font-size: 1.4rem;
    width: 30%;
    height: 3rem;
    line-height: 3rem;
    margin: 2rem;
}

.success-page .success-bottom .cash-complete {
    background-color: #346FCA;
    border: 0;
    border-radius: 3px;
    color: #fff;
    font-size: 1.4rem;
    width: 80%;
    height: 3rem;
    line-height: 3rem;
    margin: 2rem auto;
}
</style>