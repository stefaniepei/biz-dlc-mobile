<template>
    <div class="page pay-order">
        <div v-show="orderShow">
            <mt-header title="订单支付" class="header-bg-color" fixed>
                <a @click="routerBack" slot="left">
                    <mt-button icon="back"></mt-button>
                </a>
            </mt-header>
            <section class="order-info header-margin">
                <div class="w30 inline-block float-left height-4 line-height-4 margin-left5">
                    <span>产品名称：</span>
                </div>
                <div class="w60 inline-block float-left text-right height-4 line-height-4 margin-right5 nowrap">
                    <span>{{order.productName}}</span>
                </div>
            </section>
            <section class="fill-div-05"></section>
    
            <section class="bgc-fff height-4 line-height-4">
                <div class="w30 inline-block float-left height-4 line-height-4 margin-left5">
                    <span>优惠券</span>
                    <span class="red-bag-wenhao"></span>
                </div>
                <div class="w60 inline-block float-left text-right height-4 line-height-4">
                    <span>{{couponTxt}}</span>
                    <span class="arrow-right"></span>
                </div>
            </section>
            <section class="fill-div-05"></section>
    
            <section class="bgc-fff height-4 line-height-4">
                <div class="w30 inline-block float-left height-4 line-height-4 margin-left5">
                    <span class="">订单金额</span>
                </div>
                <div class="w60 inline-block float-left text-right height-4 line-height-4 margin-right5">
                    <span class="" style="color:#346faf">{{order.total}}</span>
                </div>
            </section>
            <section class="fill-div-05"></section>
    
            <section class="fixed bottom w100 bgc-fff">
                <section class="pay-xys-2">
                    <section class="reg-agree">
                        <span class="checkboxIcon checked" @click="chkAgree" ref="agree"></span>
                        <span>已阅读并同意
                            <a href="javascript:;" id="dqsqs">《点理财平台委托代扣授权书》</a>
                        </span>
                    </section>
                </section>
                <section>
                    <div class="pay-btn-left">
                        <span style="color:#333;font-size:1.4rem;">应付总额：</span>
                        <span style="color:#ff0036;font-size:1.4rem">￥{{balancePamount}}</span>
                    </div>
                    <button type="button" id="pay" @click="payOrderTrade" :disabled="btnDisabled" v-on:btnState="toDisabled" class="pay-btn pay-timer">{{buyBtnVal}}</button>
                </section>
            </section>
        </div>
        <pay-success v-show="!orderShow && paySuccess" :child-data="payTradeData"></pay-success>
        <pay-failed v-show="!orderShow && !paySuccess" :child-data="payTradeData"></pay-failed>
    </div>
</template>
<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import bcrypt from 'bcryptjs'
import md5 from 'md5'
import { Toast, MessageBox, Popup } from 'mint-ui'
import paySuccess from 'components/pay-success.vue'
import payFailed from 'components/pay-failed.vue'

Vue.component(Popup.name, Popup)

export default {
    data() {
        return {
            orderShow: true,
            paySuccess: false,
            order: [{}],
            btnDisabled: 'disabled',
            buyBtnVal: '立即支付',
            chkContarct: true,
            balancePamount: 0.00,
            jxBite: '',
            jxMoney: '',
            couponTxt: '无可用券',
            useCoupon: false,
            couponList: [{}],
            coupon: {
                assetId: 0,
                amount: 0.00,
                categoryType: '0'
            },
            payTradeData: {
                fee: "0.00",
                orderSerialNo: "1705110001508628",
                paidAt: "2017-05-11T15:15:00",
                payAmount: "1.00",
                prizes: [],
                prodCodeId: 100058097,
                prodName: "30天产品测试",
                totalAmount: "1.00",
                tradeSerialNo: "1017051100000021",
                tradeStatus: 2
            },
        }
    },
    computed: mapGetters([
        'user',
        'userAccount',
        'userAuth'
    ]),
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.orderShow = true
            vm.getOrderDetail(vm.$route.params.order)
            if (vm.userAccount != null && vm.userAccount.balance && vm.userAccount.balance.available) {
                vm.balance = vm.userAccount.balance.available
            }
        })
    },
    mounted() {
        console.log(this)
    },
    components: {
        paySuccess, payFailed
    },
    methods: {
        getOrderDetail(order) {
            let _this = this
            this.$http.get(`/biz/orders/${order}`, { headers: { 'Authorization': this.userAuth } }).then((res) => {
                _this.order = res.data
                if (_this.order.status == 0 || _this.order.status == 2) {
                    _this.toEnabled()
                    _this.createOrderTrade(order)
                    _this.balancePamount = _this.order.total
                } else {
                    _this.toDisabled()
                }
            }).catch((err) => Toast(err))
        },
        createOrderTrade(order) {
            let _this = this
            this.$http.post(`/biz/orders/${order}/trade`, {}, { headers: { 'Authorization': this.userAuth } }).then((res) => {
                _this.trade = res.data
                _this.getProdutCouponList()
            }).catch((err) => Toast(err))
        },
        getProdutCouponList() {
            let _this = this
            this.$http.get(`/account/coupons`, { params: { prodCodeId: this.order.productId, categoryId: 2, amount: this.order.total }, headers: { 'Authorization': this.userAuth } })
                .then((res) => {
                    if (res.data.length > 0) {
                        _this.couponList = res.data
                        _this.useCoupon = true
                        _this.selectCoupon()
                    }
                }).catch((err) => Toast(err))
        },
        selectCoupon() {
            if (0 == this.couponList.length) {
                return
            } else if (false === this.useCoupon) {
                return
            } else {
                for (let [key, value] of this.couponList) {
                    if (key == 0 && this.coupon.assetId == 0) {
                        this.coupon = value
                        break
                    } else if (key == this.coupon.assetId) {
                        this.coupon = value
                        break
                    }
                }
                this.couponCalu()
            }
        },
        couponCalu() {
            switch (this.coupon.categoryType) {
                case '2':
                    this.couponTxt = this.coupon.amount + '元返现券'
                    break
                case '3':
                    this.couponTxt = this.coupon.amount + '元满减券'
                    this.balancePamount = this.order.total - this.coupon.amount
                    break
                case '4':
                    this.couponTxt = this.coupon.amount + '元加息券'
                    this.jxBite = '+' + this.coupon.amount + '%'
                    this.jxMoney = '+' + Math.floor(this.order.expectedProfit / this.order.productRate * this.coupon.amount * 100) / 100
                    break
            }
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
        payOrderTrade() {
            let _this = this
            if (!this.chkContarct) {
                Toast('请先阅读《定向委托投资管理协议》')
                return
            }
            MessageBox.prompt(' ', '请输入交易密码', { inputPlaceholder: '请输入交易密码' })
                .then(({ value, action }) => {
                    if ('confirm' == action) {
                        // this.needPay
                        let param = {
                            acceptTos: true,
                            tradeSerialNo: _this.trade.tradeSerialNo,
                            password: value,
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
                        if (_this.useCoupon) {
                            param.items.push({
                                assetType: '3',
                                assetId: _this.coupon.couponId,
                                amount: Number.parseFloat(_this.coupon.amount)
                            })
                        }
                        _this.$http.get(`/user/signin/salt/${_this.user.userName}`)
                            .then((saltRes) => {
                                param.password = bcrypt.hashSync(value, saltRes['data']['salt'])
                                _this.$http.post(`/trades/pay`, param, { headers: { 'Authorization': _this.userAuth } })
                                    .then((payRes) => {
                                        _this.payTradeData = payRes['data']
                                        if (0 == payRes['error']) {
                                            //paySuccess
                                            // Toast("paySuccess")
                                            _this.paySuccess = true
                                        } else {
                                            _this.paySuccess = false
                                        }
                                        _this.orderShow = false
                                    }).catch((payErr) => Toast(payErr))
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
        },
        routerBack() {
            this.$router.go(-1);
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
    line-height: 4rem;
    height: 4rem;
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

.arrow-right {
    margin-right: 0;
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