<template>
    <div class="product-detail container">
        <div class="prod-info">
            <div class="prod-earnings">
                <section class="prod-earnings-left">
                    <div>
                        <p class="text-center">预期年化收益<span id="prodIconInfo"></span></p>
                    </div>
                    <div class="text-center margin-top-05">
                        <span class="earnings">{{productDetail.expectYearReturn}}</span>
                        <span style="color:#ff7742">%</span>
                        <span v-if="productDetail.invest2YearReturn > 0"
                              class="earnings">~{{productDetail.invest2YearReturn}}<span style="color:#ff7742">%</span></span>
                    </div>
                </section>
                <div id="prodStatus"
                     class="prod-earnings-right"></div>
            </div>
            <div class="prod-coupons text-center"
                 v-show="fx || mj || jx">
                <div class="coupon"
                     v-show="fx">返现券</div>
                <div class="coupon"
                     v-show="mj">满减券</div>
                <div class="coupon"
                     v-show="jx">加息券</div>
            </div>
            <section class="prod-invest">
                <div class="inline-block w50 text-line">
                    <p>{{productDetail.prodPeriod}}天</p>
                    <p>投资期限</p>
                </div>
                <!--<div class="inline-block w002">
                        <div class="vertical-line"></div>
                    </div>-->
                <div class="inline-block w50 text-right">
                    <p>{{productDetail.maxRaisedAmount|toMillion}}万</p>
                    <p>项目金额</p>
                </div>
            </section>
        </div>
        <section style="color:#a1a1a1;">
            <div class="inline-block w50">剩余可投(元)</div>
            <div class="inline-block w50 text-right">预计收益(元)</div>
        </section>
        <section style="color:#f08e68;">
            <div class="inline-block w50">{{productDetail.availableAmount|formatCurrency}}</div>
            <div class="inline-block w50 text-right">{{exprctYearInterest}}</div>
        </section>
    
        <section class="line">
            <button class="btn line-btn-left"
                    @click="subtraction">&nbsp;&nbsp;-&nbsp;&nbsp;</button>
            <input id="buyAmount"
                   type="text"
                   class="line-input text-center"
                   :placeholder="Number.parseInt(productDetail.minApplyAmount)+'元起投,'+Number.parseInt(productDetail.minAddAmount)+'元递增'"
                   v-model="buyAmount"
                   @keyup="boolAmount">
            <button class="btn line-btn-right"
                    @click="addition">&nbsp;&nbsp;+&nbsp;&nbsp;</button>
        </section>
    
        <section class="prod-explain">
            <div>
                <span>还款方式：</span><span class="invest-type">{{productDetail.interestType|productDict('interestTypeList')}}</span>
            </div>
            <count-down></count-down>
        </section>
        <section class="prod-fill">
        </section>
    
        <router-link :to="{name:'productInfo',params:{id:productDetail.prodCodeId,source:this.$route.params.source}}"
                     class="prod-arrow-line"
                     tag="section">
            <span>项目介绍</span>
            <span class="arrow-right"></span>
        </router-link>
        <router-link :to="{name:'productIntroduce',params:{id:productDetail.prodCodeId,source:this.$route.params.source}}"
                     class="prod-arrow-line"
                     tag="section">
            <span>产品介绍</span>
            <span class="arrow-right"></span>
        </router-link>
        <router-link :to="{name:'productRecords',params:{id:productDetail.prodCodeId,source:this.$route.params.source}}"
                     class="prod-arrow-line"
                     tag="section">
            <span>投资记录</span>
            <span class="arrow-right"></span>
        </router-link>
        <section class="prod-tips">
            温馨提示：市场有风险，投资需谨慎
        </section>
        <section style="margin-top:0.5rem;">
            <button type="button"
                    class="btn btn-big pay-timer"
                    :disabled="btnDisabled"
                    v-on:btnState="toDisabled">{{btnVal}}</button>
        </section>
        <section class="login-info fz-small">
            <div class="inline-block w70">
                账户余额（元）：
                <span v-show="!loginOut"
                      class="dlc-red">{{balance|formatCurrency(2,true)}}</span>
                <span v-show="loginOut"><router-link to="/login">登录可见</router-link></span>
            </div>
            <div class="inline-block w30 text-right">
                <router-link to="/recharge">充值 > </router-link>
            </div>
        </section>
    </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import { Toast } from 'mint-ui'
import countDown from 'components/count-down.vue'

export default {
    data() {
        return {
            loginOut: true,
            productDetail: {},
            exprctYearInterest: '0.00',
            balance: '0.00',
            buyAmount: '',
            btnDisabled: 'disabled',
            btnVal: '立即购买',
            fx: false,
            mj: false,
            jx: false
        }
    },
    // computed: mapState({ 
    //     user: (state) => state.user
    // }),
    computed: mapGetters([
        'user',
        'userAccount',
        'userAuth'
    ]),
    watch: {

    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.getProductDetail(vm.$route.params.id)
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
    // beforeRouteLeave (to, from, next) {
    //     next(vm=>{
    //          vm.$store.dispatch('EDIT_TITLE')
    //     })
    // },
    mounted() {
        console.log(this)
    },
    methods: {
        getProductDetail(id) {
            let _this = this
            this.$http.get(`/products/${id}`).then((res) => {
                _this.productDetail = res.data.data
                _this.setProductCoupons(_this.productDetail)
                _this.setBuyButton(_this.productDetail)
                _this.$store.dispatch('EDIT_TITLE', _this.productDetail.prodName)
                _this.$store.dispatch('START_TIMER', Number.parseInt(_this.productDetail.ttl / 1000))
            }).catch(function (err) {
                Toast(err)
            })
        },
        setProductCoupons(productDetail) {
            if (productDetail.coupons) {
                let _this = this
                for (let value of productDetail.coupons) {
                    switch (value) {
                        case "2":
                            _this.fx = true
                            break
                        case "3":
                            _this.mj = true
                            break
                        case "4":
                            _this.jx = true
                            break
                    }
                }
            }
        },
        setBuyButton(productDetail) {
            if (productDetail.prodStatus) {
                let _this = this
                for (let value of productDetail.prodStatus) {
                    switch (value) {
                        case '1':
                            _this.btnVal = '立即购买'
                            break
                        case '2':
                            _this.btnVal = '已售罄'
                            break
                        case '3':
                            _this.btnVal = '还款中'
                            break
                        case '4':
                            _this.btnVal = '已流标'
                            break
                        case '7':
                            _this.btnVal = '已兑付'
                            break
                        default:
                            _this.btnVal = '已过期'
                            break
                    }
                }
            }
        },
        addition() {
            if (this.buyAmount === '') this.buyAmount = 0
            let res = Number.parseInt(this.buyAmount) + Number.parseInt(this.productDetail.minAddAmount)
            this.calu(res)
        },
        subtraction() {
            if (this.buyAmount === '') this.buyAmount = 0
            let res = Number.parseInt(this.buyAmount) - Number.parseInt(this.productDetail.minAddAmount)
            this.calu(res)
        },
        calu(res) {
            if (res > Number.parseInt(this.productDetail.availableAmount)) {
                this.buyAmount = Number.parseInt(this.productDetail.availableAmount)
            } else if (res < Number.parseInt(this.productDetail.minApplyAmount)) {
                this.buyAmount = Number.parseInt(this.productDetail.minApplyAmount)
            } else {
                if (res == '' || isNaN(res)) {
                    this.buyAmount = ''
                } else {
                    this.buyAmount = res
                }
            }
            if (this.buyAmount !== '') {
                this.exprctYearInterest = (Number.parseInt(this.buyAmount) * Number.parseInt(this.productDetail.expectYearReturn) / 100 / Number.parseInt(this.productDetail.yearDays) * Number.parseInt(this.productDetail.prodPeriod)).toFixed(2)
            } else {
                this.exprctYearInterest = '0.00'
            }
        },
        boolAmount() {
            this.calu(Number.parseInt(this.buyAmount))
        },
        toEnabled() {
            this.btnDisabled = false
            this.btnVal = '立即购买'
        },
        toDisabled() {
            this.btnDisabled = 'disabled'
            this.btnVal = '已过期'
        }
    },
    components: {
        countDown
    }
}
</script>
<style scoped>
.product-detail {
    background: #fff;
}

.product-detail .vertical-line {
    border: 1px solid #fff;
    height: 2rem;
}

.product-detail .line-btn-left {
    width: 20%;
    height: 3rem;
    color: #398be1;
    font-size: 1rem;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    background-color: #fff;
    border: 1px solid #eee;
    box-sizing: border-box;
    /*border-right: 0;*/
    margin-right: -.32rem;
}

.product-detail .line-btn-right {
    width: 20%;
    height: 3rem;
    color: #398be1;
    font-size: 1rem;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: #fff;
    border: 1px solid #eee;
    box-sizing: border-box;
    /*border-left: 0;*/
    margin-left: -.32rem;
}

.product-detail .line-input {
    font-size: 0.8rem;
    width: 60%;
    height: 3rem;
    border: 0;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    vertical-align: top;
    border-radius: 0;
}

.product-detail .line input::-webkit-input-placeholder {
    color: #8d8d8d;
    text-align: center;
    /* WebKit browsers */
}

.product-detail .line input:-moz-placeholder {
    color: #8d8d8d;
    text-align: center;
    /* Mozilla Firefox 4 to 18 */
}

.product-detail .line input::-moz-placeholder {
    color: #8d8d8d;
    text-align: center;
    /* Mozilla Firefox 19+ */
}

.product-detail .line input:-ms-input-placeholder {
    color: #8d8d8d;
    text-align: center;
    /* Internet Explorer 10+ */
}

.product-detail .prod-info {
    background: #346faf;
    color: #fff;
}

.product-detail section {
    width: 80%;
    margin: 0 auto;
    margin-top: 1rem;
    white-space: nowrap;
}

.product-detail .prod-info .prod-earnings {
    margin-top: -1rem;
    padding-bottom: 0.5rem;
}

.product-detail .prod-info .prod-earnings .earnings {
    font-size: 1.2rem;
    color: #ff7742;
}

.product-detail .prod-info .prod-invest {
    padding-bottom: 0.5rem;
}

.product-detail .prod-info .prod-invest .text-line {
    border-right: 2px solid #fff;
    box-sizing: border-box;
}

.product-detail .prod-explain div {
    color: #a1a1a1;
    font-size: 0.6rem;
}

.product-detail .prod-fill {
    width: 100%;
    height: 0.5rem;
    background: #f5f5f5;
}

.product-detail .prod-arrow-line {
    border-bottom: 1px solid #eee;
    font-size: 1rem;
    color: #999;
    height: 3rem;
    line-height: 3rem;
    margin-top: 0rem;
}

.product-detail .prod-arrow-line .arrow-right {
    background: url("../../assets/images/product/arrow_right.png") no-repeat;
    background-size: cover;
    background-position: center center;
    width: 40px;
    height: 20px;
    line-height: 20px;
    margin-top: 1rem;
    float: right;
}

.product-detail .prod-tips {
    height: 1rem;
    margin-top: 0.5rem;
    color: #FD7924;
    font-size: 0.6rem;
    text-align: center;
}

.product-detail .login-info {
    padding-bottom: 1rem;
}

.product-detail .login-info a {
    color: #3892C2;
}

.product-detail .prod-info .prod-coupons .coupon {
    font-size: 0.5rem;
    color: #B3C9E1;
    border: 1px solid #A3BEDB;
    border-radius: 5px;
    display: inline-block;
    margin-right: 5px;
    width: 50px;
    height: 18px;
    line-height: 18px;
}
</style>