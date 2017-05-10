<template>
    <div class="page pay-order">
        <mt-header title="订单支付" class="header-bg-color" fixed>
            <a @click="this.$router.go(-1)" slot="left">
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
        <section class="order-info header-margin">
            <div class="w50 inline-block float-left height-4 line-height-4">
                <span class="margin-left10">产品名称：</span>
            </div>
            <div class="w50 inline-block float-left text-right height-4 line-height-4">
                <span class="margin-right10">{{order.productName}}</span>
            </div>
    
            <div class="w50 inline-block float-left height-4 line-height-4 v-line">
                <p class="margin-left10 height-2 line-height-2">
                    <span class="expected" id="annualYield">{{order.productRate}}</span>
                    <span class="expected" id="annualYieldJX"></span>
                </p>
                <p class="margin-left10 height-2 line-height-2"><span class="expected-desc">预期年化收益</span></p>
            </div>
            <div class="w50 inline-block float-left text-right height-4 line-height-4">
                <p class="margin-right10 height-2 line-height-2">
                    <span class="expected" id="anticipatedIncome">{{order.expectedProfit}}</span>
                    <span class="expected" id="anticipatedIncomeJX"></span>
                </p>
                <p class="margin-right10 height-2 line-height-2"><span class="expected-desc">预计收益(元)</span></p>
            </div>
        </section>
        <section class="fill-div-05"></section>
    
        <section class="bgc-fff height-4 line-height-4">
            <div class="w50 inline-block float-left height-4 line-height-4">
                <span class="margin-left10">优惠券</span>
                <span class="red-bag-wenhao" id="showCouponRule"></span>
            </div>
            <div class="w50 inline-block float-left text-right height-4 line-height-4">
                <span>无可用券</span>
                <span class="arrow-right"></span>
            </div>
        </section>
        <section class="fill-div-05"></section>
    
        <section class="bgc-fff height-4 line-height-4">
            <div class="w50 inline-block float-left height-4 line-height-4">
                <span class="margin-left10">订单金额</span>
            </div>
            <div class="w50 inline-block float-left text-right height-4 line-height-4">
                <span class="margin-right10" style="color:#346faf">{{order.total}}</span>
            </div>
        </section>
        <section class="fill-div-05"></section>
    
        <section class="fixed bottom w100 bgc-fff">
            <section class="pay-xys-2">
                <section class="reg-agree">
                    <input type="checkbox" style="display:none" id="chkContract" checked="checked" />
                    <span class="checkboxIcon checked" id="zfxy"></span>
                    <span>已阅读并同意<a href="javascript:;" id="dqsqs">《点理财平台委托代扣授权书》</a></span>
                </section>
            </section>
            <section>
                <div class="pay-btn-left">
                    <span style="color:#333;font-size:1.4rem;">应付总额：</span>
                    <span id="needPay" style="color:#ff0036;font-size:1.4rem">￥{{order.total}}</span>
                </div>
                <button type="button" id="pay" @click="payOrderTrade" :disabled="btnDisabled" v-on:btnState="toDisabled" class="pay-btn pay-timer">{{buyBtnVal}}</button>
            </section>
        </section>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { Toast, MessageBox } from 'mint-ui'
export default {
    data() {
        return {
            order: [{}],
            needPay: 0.00,
            btnDisabled: 'disabled',
            buyBtnVal: '立即支付',
        }
    },
    computed: mapGetters([
        'user',
        'userAccount',
        'userAuth'
    ]),
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.getOrderDetail(vm.$route.params.order)
            if (vm.user != null && vm.user.accessToken) {
                vm.loginOut = false
            } else {
                vm.loginOut = true
            }
            if (vm.userAccount != null && vm.userAccount.balance && vm.userAccount.balance.available) {
                vm.balance = vm.userAccount.balance.available
            }
        })
    },
    methods: {
        getOrderDetail(order) {
            let _this = this
            this.$http.get(`/biz/orders/${order}`, { headers: { 'Authorization': this.userAuth } }).then((res) => {
                _this.order = res.data
                if (_this.order.status == 0 || _this.order.status == 2) {
                    _this.toEnabled()
                    _this.createOrderTrade(order)
                } else {
                    _this.toDisabled()
                }
            }).catch((err) => Toast(err))
        },
        createOrderTrade(order) {
            let _this = this
            this.$http.post(`/biz/orders/${order}/trade`, {}, { headers: { 'Authorization': this.userAuth } }).then((res) => {
                _this.trade = res.data
            }).catch((err) => Toast(err))
        },
        payOrderTrade() {
            let _this = this
            MessageBox({
                title: '',
                message: '请输入交易密码',
                showCancelButton: true,
                cancelButtonText: '取消',
                confirmButtonText: '确认',
                showInput: true,
                inputPlaceholder: '请输入交易密码'
            }).then(({ value, action }) => {
                if ('confirm' === action) {
                    // this.needPay
                    let param = {
                        acceptTos: true,
                        tradeSerialNo: _this.trade.tradeSerialNo,
                        tradePassword: value,
                        items: []
                    }
                    //balance
                    if (Number.parseFloat(_this.balancePamount) > 0) {
                        param.items.push({
                            assetType: '1',
                            amount: Number.parseFloat(_this.balancePamount)
                        })
                    }
                    //coupon
                    if (Number.parseFloat(_this.redBagPamount) > 0) {
                        param.items.push({
                            assetType: '3',
                            assetId: _this.coupon.couponId,
                            amount: Number.parseFloat(_this.redBagPamount)
                        })
                    }

                    _this.$http.get(`/user/signin/salt/${_this.userName}`)
                    .then((saltRes) => {
                        let salt = saltRes.data.salt
                        _this.$http.post(`/user/password/validate`, { productId: this.$route.params.id, amount: this.buyAmount }, { headers: { 'Authorization': this.userAuth } })
                        .then((pwdRes) => {
                            let orderNo = pwdRes.data.orderNo
                        }).catch((pwdErr) => Toast(pwdErr))
                    }).catch((saltErr) => Toast(saltErr))
                }
            })
        },
        toEnabled() {
            this.btnDisabled = false
            this.buyBtnVal = '立即支付'
        },
        toDisabled() {
            this.btnDisabled = 'disabled'
            this.buyBtnVal = '已过期'
        }
    }
}
</script>
<style scoped>
.pay-order {
    background-color: #f5f5f5;
    height: 100%;
}

.order-info {
    background-color: #fff;
    line-height: 9rem;
    height: 9rem;
}

.pay-xys-2 {
    height: 3.5rem;
    line-height: 3.5rem;
    background: #E6E6E6;
    margin-bottom: 2px;
}

.reg-agree {
    position: relative;
    font-size: 1.1rem;
    text-align: center;
}

.pay-btn-left {
    float: left;
    display: inline-block;
    height: 4.2rem;
    line-height: 4.2rem;
    text-align: center;
    width: 70%;
    margin-top: -2px;
}

.pay-btn {
    width: 30%;
    float: right;
    display: inline-block;
    height: 4.2rem;
    line-height: 0rem;
    color: #fff;
    border: none;
    font-size: 1.4rem;
    border-radius: 0px;
    background-color: #346faf;
    margin-top: -2px;
}

.red-bag-wenhao {
    background: url(../../assets/images/pay/wenhao.png) no-repeat;
    width: 15px;
    height: 15px;
    background-size: cover;
    display: inline-block;
    vertical-align: super;
}
</style>