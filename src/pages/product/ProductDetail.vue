<template>
    <div class="page product-detail">
        <mt-header :title="productDetail.prodName" class="header-bg-color" fixed>
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="prod-info header-margin">
            <div class="prod-coupons text-center" v-show="fx || mj || jx">
                <div class="coupon" v-show="fx">返现券</div>
                <div class="coupon" v-show="mj">满减券</div>
                <div class="coupon" v-show="jx">加息券</div>
            </div>
            <div class="prod-earnings">
                <section class="prod-earnings-left text-center">
                    <div>
                        <span class="earnings">{{productDetail.expectYearReturn}}</span>
                        <span style="color:#ff7742">%</span>
                        <span v-if="productDetail.invest2YearReturn > 0" class="earnings">~{{productDetail.invest2YearReturn}}<span style="color:#ff7742">%</span></span>
                    </div>
                    <div class="margin-top-05">
                        <p>平均历史年化收益<span id="prodIconInfo"></span></p>
                    </div>
                </section>
                <div id="prodStatus" class="prod-earnings-right"></div>
            </div>
            <div class="progress-div">
                <span class="progressWord">当前进度</span>
                <span class="progressNo">{{productDetail.quotaProgress}}%</span>
            </div>
            <div class="progress-div margin-bottom-15">
                <div class="progress-bar-bg">
                    <p :style="{width:''+productDetail.quotaProgress+'%'}" class="progress-bar"></p>
                </div>
            </div>
            <section class="prod-invest">
                <div class="inline-block w35">
                    <p>{{productDetail.maxRaisedAmount|toMillion}}万</p>
                    <p>项目金额</p>
                </div>
                <div class="inline-block w26 text-center">
                    <p>{{productDetail.prodPeriod}}天</p>
                    <p>投资期限</p>
                </div>
                <div class="inline-block w35 text-right">
                    <p>{{productDetail.availableAmount|formatCurrency}}</p>
                    <p>剩余可投</p>
                </div>
            </section>
        </div>
        <section class="prod-explain">
            <section class="w100">
                <span class="prod-explain-left"><img src="../../assets/images/product/repayment.png">还款方式</span>
                <span class="invest-type prod-explain-right">{{productDetail.interestType|productDict('interestTypeList')}}</span>
            </section>
            <section class="w100">
                <span class="prod-explain-left"><img src="../../assets/images/product/start.png">起息时间</span>
                <span class="prod-explain-right">T（满标日）+1天</span>
            </section>
            <section class="w100">
                <span class="prod-explain-left"><img src="../../assets/images/product/last.png">剩余时间</span>
                <span class="prod-explain-right"><count-down></count-down></span>
            </section>
        </section>
    
        <section class="prod-fill">
        </section>
    
        <router-link :to="{name:'productInfo',params:{id:productDetail.prodCodeId,source:this.$route.params.source}}" class="arrow-line" tag="section">
            <span>项目介绍</span>
            <span class="arrow-right"></span>
        </router-link>
        <router-link :to="{name:'productIntroduce',params:{id:productDetail.prodCodeId,source:this.$route.params.source}}" class="arrow-line" tag="section">
            <span>产品介绍</span>
            <span class="arrow-right"></span>
        </router-link>
        <router-link :to="{name:'productRecords',params:{id:productDetail.prodCodeId,source:this.$route.params.source}}" class="arrow-line" tag="section">
            <span>投资记录</span>
            <span class="arrow-right"></span>
        </router-link>
        <section style="height:85px;">
        </section>
        <section class="prod-to-pay fixed bottom" v-show="showBuy">
            <section class="prod-tips">
                温馨提示：市场有风险，投资需谨慎
            </section>
            <span class="buy-amount show-amount" @click="showAmountView">{{buyAmount}}</span>
            <button class="btn btn-detail pay-timer" @click="buy" :disabled="btnDisabled" v-on:btnState="toDisabled">{{btnVal}}</button>
        </section>
        <div class="keyboard" v-show="amountView" :style="bottomView" @touchmove.prevent @scroll.prevent>
            <div class="overlay" :style="fillOverlay" @click="hideAmountView"></div>
            <div class="adjust-buy-info">
                <p>
                    <span class="sps1">起投金额</span>
                    <span class="sps2">账户余额</span>
                </p>
                <p>
                    <span class="sps1" id="min">{{Number.parseInt(productDetail.minApplyAmount)}}</span>
                    <span class="sps2" id="login-info">{{balance|formatCurrency(2,true)}}元</span>
                </p>
                <p>
                    <span class="sps1">递增金额</span>
                    <span class="sps2">预计收益</span>
                </p>
                <p>
                    <span class="sps1" id="minAdd">{{Number.parseInt(productDetail.minAddAmount)}}</span>
                    <span class="sps2" id="exprctYearInterest">{{exprctYearInterest}}元</span>
                </p>
            </div>
            <section class="prod-to-pay">
                <span class="buy-amount show-amount">{{buyAmount}}</span>
                <button class="btn btn-detail pay-timer" @click="buy" :disabled="btnDisabled" v-on:btnState="toDisabled">{{btnVal}}</button>
            </section>
            <section class="contarct-agree">
                <input type="checkbox" style="display:none" id="chkContract" checked="checked" />
                <span class="checkboxIcon checked" id="zfxy"></span>
                <span>已阅读并同意<a href="javascript:;" id="dqsqs">《定向委托投资管理协议》</a></span>
            </section>
            <div class="numkey">
                <ul>
                    <li class="num top" @click="inputNum('1')">
                        <div>1</div>
                        <span></span>
                    </li>
                    <li class="num top" @click="inputNum('2')">
                        <div>2</div>
                        <span>ABC</span>
                    </li>
                    <li class="num top" @click="inputNum('3')">
                        <div>3</div>
                        <span>DEF</span>
                    </li>
                    <li class="num" @click="inputNum('4')">
                        <div>4</div>
                        <span>GHI</span>
                    </li>
                    <li class="num" @click="inputNum('5')">
                        <div>5</div>
                        <span>JKL</span>
                    </li>
                    <li class="num" @click="inputNum('6')">
                        <div>6</div>
                        <span>MNO</span>
                    </li>
                    <li class="num" @click="inputNum('7')">
                        <div>7</div>
                        <span>PQRS</span>
                    </li>
                    <li class="num" @click="inputNum('8')">
                        <div>8</div>
                        <span>TUV</span>
                    </li>
                    <li class="num" @click="inputNum('9')">
                        <div>9</div>
                        <span>WXYZ</span>
                    </li>
                    <li class="num othernum" @click="inputNum('00')">
                        <div>00</div>
                    </li>
                    <li class="num" style="line-height: 50px;" @click="inputNum('0')">
                        <div>0</div>
                    </li>
                    <li class="delete" @click="inputNum('-1')"></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import { Toast, MessageBox } from 'mint-ui'
import countDown from 'components/count-down.vue'

export default {
    data() {
        return {
            loginOut: true,
            productDetail: {},
            exprctYearInterest: '0.00',
            balance: '0.00',
            buyAmount: '投资金额',
            btnDisabled: 'disabled',
            btnVal: '立即购买',
            showBuy: true,
            bottomView: {
                position: 'absolute',
                bottom: 0,
                zIndex: 3
            },
            fillOverlay: {
                position: 'absolute',
                height: window.innerHeight - 401 + 85 + 'px',
                width: '100%',
                bottom: 401 + 'px',
                zIndex: 2
            },
            fx: false,
            mj: false,
            jx: false,
            amountView: false,
            rechargeView: false
        }
    },
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
    //          
    //     })
    // },
    mounted() {
        console.log(this)
    },
    methods: {
        getProductDetail(id) {
            let _this = this
            this.$http.get(`/products/${id}`).then((res) => {
                _this.productDetail = res.data
                _this.setProductCoupons(_this.productDetail)
                _this.setBuyButton(_this.productDetail)
                _this.$store.dispatch('START_TIMER', Number.parseInt(_this.productDetail.ttl / 1000))
            }).catch((err) => Toast(err))
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
        showAmountView() {
            var bottomVal = '-' + window.scrollY + 'px'
            this.bottomView = {
                position: 'absolute',
                bottom: bottomVal
            }
            this.amountView = true
            this.showBuy = false
        },
        hideAmountView() {
            this.amountView = false
            this.showBuy = true
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
        buy() {
            if (this.buyAmount === '投资金额') this.buyAmount = 0
            if (this.buyAmount > 0) {
                let _this = this
                console.log(this.userAuth)
                if (this.buyAmount > this.productDetail.availableAmount) {
                    Toast('对不起，您输入的投资金额大于该项目剩余可投资金额')
                    return
                } else if (this.buyAmount > this.balance) {
                    //no enough to show recharge dialog
                    MessageBox({
                        title: '',
                        message: '余额不足，请先充值',
                        showCancelButton: true,
                        cancelButtonText: '取消',
                        confirmButtonText: '立即充值'
                    }).then(action => {
                        if ('confirm' === action) {
                            _this.$router.push({ path: '/recharge' })
                        }
                    })
                } else {
                    //create order no
                    this.$http.post(`/biz/orders`, { productId: this.$route.params.id, amount: this.buyAmount }, { headers: { 'Authorization': this.userAuth } }).then((res) => {
                        let orderNo = res.data.orderNo
                        console.log(res.data, orderNo)
                        _this.$router.push({ path: '/pay/' + orderNo })
                    }).catch((err) => Toast(err))
                }
            } else {
                Toast('请输入投资金额')
            }
        },
        inputNum(num) {
            if (this.buyAmount === '投资金额') this.buyAmount = 0
            let val = 0
            if (Number.parseInt(num) >= 0) {
                val = String(this.buyAmount) + String(num)
            } else {
                val = String(this.buyAmount).substr(0, String(this.buyAmount).length - 1)
            }
            console.log(val)
            val = isNaN(Number.parseInt(val)) ? '' : Number.parseInt(val)
            console.log(val)
            this.buyAmount = val
            this.calu(val)
        },
        calu(res) {
            if (res == '' || isNaN(res)) {
                this.buyAmount = '投资金额'
            } else if (res > Number.parseInt(this.productDetail.availableAmount)) {
                this.buyAmount = Number.parseInt(this.productDetail.availableAmount)
            } else if (res < Number.parseInt(this.productDetail.minApplyAmount)) {
                this.buyAmount = Number.parseInt(this.productDetail.minApplyAmount)
            } else {
                this.buyAmount = res
            }
            if (this.buyAmount !== '投资金额') {
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

.product-detail .prod-info {
    background: #346FCA;
    color: #fff;
}

.product-detail section {
    width: 80%;
    margin: 0 auto;
    margin-top: 1rem;
    white-space: nowrap;
}

.product-detail .prod-info .prod-earnings {
    padding-bottom: 0.5rem;
}

.product-detail .prod-info .prod-earnings .earnings {
    font-size: 2.2rem;
    color: #ff7742;
}

.product-detail .prod-info .prod-invest {
    padding-bottom: 0.5rem;
}

.product-detail .prod-info .prod-invest .text-line {
    border-right: 2px solid #fff;
    box-sizing: border-box;
}

.product-detail .prod-explain {
    color: #a1a1a1;
    font-size: 0.6rem;
}

.product-detail .prod-explain img {
    width: 1.5rem;
    height: 1.5rem;
    vertical-align: middle;
}

.product-detail .prod-fill {
    width: 100%;
    height: 0.5rem;
    background: #f5f5f5;
}

.product-detail .prod-tips {
    height: 2rem;
    line-height: 2rem;
    margin-top: 0.5rem;
    font-size: 1.2rem;
    color: #999;
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

.product-detail .prod-info .progressWord {
    font-size: 1rem;
    color: #fff;
    text-align: left;
    width: 78%;
    display: inline-block;
}

.product-detail .prod-info .progressNo {
    font-size: 1rem;
    color: #fff;
    display: inline-block;
    text-align: right;
    width: 20%;
}

.product-detail .prod-info .progress-div {
    overflow: hidden;
    padding: 0 10%;
}

.product-detail .prod-info .progress-div .progress-bar-bg {
    background: #ddd;
    height: 0.1rem;
    width: 100%;
    float: left;
}

.product-detail .prod-info .progress-div .progress-bar-bg .progress-bar {
    background: #398be1;
    height: 0.1rem;
}

.product-detail .prod-explain .prod-explain-left {
    display: inline-block;
    text-align: left;
    width: 45%;
}

.product-detail .prod-explain .prod-explain-right {
    display: inline-block;
    text-align: right;
    width: 53%;
}

.product-detail .prod-to-pay {
    border-top: 1px solid #F1F1F1;
    width: 100%;
    background-color: #fff;
}

.product-detail .prod-to-pay .buy-amount {
    text-align: center;
    display: inline-block;
    border: 1px solid #DFDFDF;
    border-radius: 5px;
    box-sizing: border-box;
    width: 60%;
    height: 3rem;
    line-height: 3rem;
    margin: 0.5rem 5%;
}

.product-detail .prod-to-pay .btn-detail {
    width: 28%;
    border: 0;
    padding: 0;
    border-radius: 0;
    font-size: 1.4rem;
    height: 4rem;
    line-height: 4rem;
    background: #3871C7;
    color: #fff;
    float: right;
    display: inline-block;
}

.product-detail .adjust-buy-info {
    margin: 0.5rem 5%;
    font-size: 1.2rem;
    color: #000;
    /*color: #9E9E9E;*/
}

.adjust-buy-info p {
    margin: 0.5rem 0;
}

.product-detail .adjust-buy-info .sps1 {
    width: 49%;
    display: inline-block;
}

.product-detail .adjust-buy-info .sps2 {
    width: 49%;
    display: inline-block;
}

.product-detail .contarct-agree {
    margin-left: 5%;
    font-size: 1.3rem;
    line-height: 2rem;
    margin-top: 0rem;
}
</style>