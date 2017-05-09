<template>
    <div class="page pay-order">
        <mt-header title="订单支付" class="header-bg-color" fixed>
            <a @click="this.$route.go(-1)" slot="left">
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
        <section class="order-info header-margin">
            <div class="w50 inline-block float-left">
                <span class="margin-left10">产品名称：</span>
            </div>
            <div class="w50 inline-block float-left text-right">
                <span class="margin-right10">{{order.productName}}</span>
            </div>
    
            <div class="w35 inline-block float-left">
                <p class="margin-left10">
                    <span class="expected" id="annualYield">{{order.productRate}}</span>
                    <span class="expected" id="annualYieldJX"></span>
                </p>
                <p class="margin-left10"><span class="expected-desc">预期年化收益</span></p>
            </div>
            <div class="w30 inline-block float-left text-center">|</div>
            <div class="w35 inline-block float-left">
                <p class="margin-right10">
                    <span class="expected" id="anticipatedIncome">{{order.expectedProfit}}</span>
                    <span class="expected" id="anticipatedIncomeJX"></span>
                </p>
                <p class="margin-right10"><span class="expected-desc">预计收益(元)</span></p>
            </div>
        </section>
        <section class="prod-fill"></section>
        <section class="pay-list" id="pay-redBag" style="background: #fff;">
            <div class="pay-list-left">
                <span class="rem-15" style="display: inline-block;">优惠券</span>
                <span class="red-bag-wenhao" id="showCouponRule"></span>
            </div>
            <div class="pay-list-right" id="pay-redBag-show">
                <span id="redBagAmount" style="color:#346faf" class="rem1-4">无可用券</span>
                <span class="arrow-right" id="arrow-coin"></span>
            </div>
        </section>
        <section class="prod-fill"></section>
        <section class="pay-list" id="pay-coin" style="background: #fff;">
            <div class="pay-list-left" style="width:4rem">
                <span class="rem-15">点币</span>
            </div>
            <div class="pay-list-right" id="pay-coin-show">
                <span id="coinText" style="font-size:1.4rem;display:inline-block;">无点币</span>
                <input type="checkbox" class="hide" id="chkCoin" />
                <span class="checkboxIcon" style="display:none;margin-left:10px;" id="chkCoinIcon"></span>
            </div>
        </section>
        <section class="prod-fill"></section>
        <section class="pay-list" style="background: #fff;">
            <div class="pay-list-left">
                <span class="rem-15">订单金额</span>
            </div>
            <div class="pay-list-right" id="pay-list-right-coupon">
                <span id="orderTotal" class="rem-15" style="color:#346faf"></span>
            </div>
        </section>
        <section class="pay-list" style="background: #fff;">
            <div class="pay-list-left">
                <span class="rem-15" id="purposeField"></span>
            </div>
            <div class="pay-list-right" id="pay-list-right-coupon">
                <span id="coinAmount" class="rem-15" style="color:#346faf"></span>
            </div>
        </section>
        <section style="background: #f5f5f5;height:0.6rem;"></section>
        <section style="fixed bottom w100">
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
                    <span id="needPay" style="color:#ff0036;font-size:1.4rem">￥0.00</span>
                </div>
                <button type="button" id="pay" @click="payOrderTrade" :disabled="btnDisabled" v-on:btnState="toDisabled" class="pay-btn pay-timer">{{buyBtnVal}}</button>
            </section>
        </section>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { Toast } from 'mint-ui'
export default {
    data() {
        return {
            order: [{}],
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
                _this.order = res.data.data
                if (_this.order.orderStatus == 0 || _this.order == 2) {
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
                _this.trade = res.data.data
            }).catch((err) => Toast(err))
        },
        payOrderTrade() {

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
    line-height: 10.2rem;
    height: 10.2rem;
}
</style>