<template>
    <div class="page coupon-list">
        <mt-header title="我的优惠券" class="header-bg-color">
            <router-link to="/info" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
    
        <mt-navbar v-model="selected" :style="{top:'40px'}">
            <mt-tab-item id="1">未使用</mt-tab-item>
            <mt-tab-item id="2">已使用</mt-tab-item>
            <mt-tab-item id="3">已过期</mt-tab-item>
        </mt-navbar>
    
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <div class="no-coupon-record" v-if="records1 === null">
                    暂无数据
                </div>
    
                <div class="redPack" v-for="(value,key,index) in records1">
                    <div :class="'redPacketcontent '+value.classState+' '+value.classType">
                        <div class="redPkt-act-left"></div>
                        <div class="redPkt-act-right">
                            <div class="cp-con-top">
                                <em v-if="'fx' == value.classType || 'mj' == value.classType">
                                        <span class="icon-rmb">￥</span><span class="unit">{{value.amount}}</span> 
                                    </em>
    
                                <em v-else-if="'jx' == value.classType">
                                        <span class="unit" style="margin-left:1.4rem">{{value.amount}}</span>
                                        <span class="icon-rmb" style="vertical-align: bottom;">%</span> 
                                    </em>
                            </div>
                            <div class="cp-con-bottom">
                                <p v-if="0 == Number.parseInt(value.minInvestAmount) && 2147483647 == Number.parseInt(value.maxInvestAmount)">1.单笔投资无限制</p>
                                <p v-else-if="0 < Number.parseInt(value.minInvestAmount) && 2147483647 == Number.parseInt(value.maxInvestAmount)">1.单笔投资金额≥{{value.minInvestAmount}}元可使用</p>
                                <p v-else-if="0 == Number.parseInt(value.minInvestAmount) && 0 < Number.parseInt(value.maxInvestAmount)">1.单笔投资金额≤{{value.maxInvestAmount}}元可使用</p>
                                <p v-else-if="0 < Number.parseInt(value.minInvestAmount) && Number.parseInt(value.maxInvestAmount) >= Number.parseInt(value.minInvestAmount)">1.单笔投资{{value.minInvestAmount}}~{{value.maxInvestAmount}}元可使用</p>
                                <p v-else>1.单笔投资无限制</p>
    
                                <p v-if="'jx' == value.classType">2.适用于投资期限={{value.prodTerm}}天产品</p>
                                <p v-else>2.适用于投资期限≥{{value.prodTerm}}天产品</p>
                                <p>3.有效期{{value.validFrom|dateFormat}}至{{value.validThru|dateFormat}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <mugen-scroll :handler="fetchData1" :should-handle="loading1">
                    <div class="fetch-data">{{loadingTitle1}}</div>
                </mugen-scroll>
            </mt-tab-container-item>
    
            <mt-tab-container-item id="2">
                <div class="no-coupon-record" v-if="records2 === null">
                </div>
                <div class="redPack" v-for="(value,key,index) in records2">
                    <div :class="'redPacketcontent '+value.classState+' '+value.classType">
                        <div class="redPkt-act-left"></div>
                        <div class="redPkt-act-right">
                            <div class="cp-con-top">
                                <em v-if="'fx' == value.classType || 'mj' == value.classType">
                                        <span class="icon-rmb">￥</span><span class="unit">{{value.amount}}</span> 
                                    </em>
    
                                <em v-else-if="'jx' == value.classType">
                                        <span class="unit" style="margin-left:1.4rem">{{value.amount}}</span>
                                        <span class="icon-rmb" style="vertical-align: bottom;">%</span> 
                                    </em>
                            </div>
                            <div class="cp-con-bottom">
                                <p v-if="0 == Number.parseInt(value.minInvestAmount) && 2147483647 == Number.parseInt(value.maxInvestAmount)">1.单笔投资无限制</p>
                                <p v-else-if="0 < Number.parseInt(value.minInvestAmount) && 2147483647 == Number.parseInt(value.maxInvestAmount)">1.单笔投资金额≥{{value.minInvestAmount}}元可使用</p>
                                <p v-else-if="0 == Number.parseInt(value.minInvestAmount) && 0 < Number.parseInt(value.maxInvestAmount)">1.单笔投资金额≤{{value.maxInvestAmount}}元可使用</p>
                                <p v-else-if="0 < Number.parseInt(value.minInvestAmount) && Number.parseInt(value.maxInvestAmount) >= Number.parseInt(value.minInvestAmount)">1.单笔投资{{value.minInvestAmount}}~{{value.maxInvestAmount}}元可使用</p>
                                <p v-else>1.单笔投资无限制</p>
    
                                <p v-if="'jx' == value.classType">2.适用于投资期限={{value.prodTerm}}天产品</p>
                                <p v-else>2.适用于投资期限≥{{value.prodTerm}}天产品</p>
                                <p>3.有效期{{value.validFrom|dateFormat}}至{{value.validThru|dateFormat}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <mugen-scroll :handler="fetchData2" :should-handle="loading2">
                    <div class="fetch-data">{{loadingTitle2}}</div>
                </mugen-scroll>
            </mt-tab-container-item>
    
            <mt-tab-container-item id="3">
                <div class="no-coupon-record" v-if="records3 === null">
                </div>
                <div class="redPack" v-for="(value,key,index) in records3">
                    <div :class="'redPacketcontent '+value.classState+' '+value.classType">
                        <div class="redPkt-act-left"></div>
                        <div class="redPkt-act-right">
                            <div class="cp-con-top">
                                <em v-if="'fx' == value.classType || 'mj' == value.classType">
                                        <span class="icon-rmb">￥</span><span class="unit">{{value.amount}}</span> 
                                    </em>
    
                                <em v-else-if="'jx' == value.classType">
                                        <span class="unit" style="margin-left:1.4rem">{{value.amount}}</span>
                                        <span class="icon-rmb" style="vertical-align: bottom;">%</span> 
                                    </em>
                            </div>
                            <div class="cp-con-bottom">
                                <p v-if="0 == Number.parseInt(value.minInvestAmount) && 2147483647 == Number.parseInt(value.maxInvestAmount)">1.单笔投资无限制</p>
                                <p v-else-if="0 < Number.parseInt(value.minInvestAmount) && 2147483647 == Number.parseInt(value.maxInvestAmount)">1.单笔投资金额≥{{value.minInvestAmount}}元可使用</p>
                                <p v-else-if="0 == Number.parseInt(value.minInvestAmount) && 0 < Number.parseInt(value.maxInvestAmount)">1.单笔投资金额≤{{value.maxInvestAmount}}元可使用</p>
                                <p v-else-if="0 < Number.parseInt(value.minInvestAmount) && Number.parseInt(value.maxInvestAmount) >= Number.parseInt(value.minInvestAmount)">1.单笔投资{{value.minInvestAmount}}~{{value.maxInvestAmount}}元可使用</p>
                                <p v-else>1.单笔投资无限制</p>
    
                                <p v-if="'jx' == value.classType">2.适用于投资期限={{value.prodTerm}}天产品</p>
                                <p v-else>2.适用于投资期限≥{{value.prodTerm}}天产品</p>
                                <p>3.有效期{{value.validFrom|dateFormat}}至{{value.validThru|dateFormat}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <mugen-scroll :handler="fetchData3" :should-handle="loading3">
                    <div class="fetch-data">{{loadingTitle3}}</div>
                </mugen-scroll>
            </mt-tab-container-item>
        </mt-tab-container>
    
    </div>
</template>
<script>
import { Navbar, TabItem, Toast } from 'mint-ui'
import { mapGetters } from 'vuex'
import MugenScroll from 'vue-mugen-scroll'

export default {
    data() {
        return {
            selected: '1',
            records1: [{}],
            records2: [{}],
            records3: [{}],
            page1: 1,
            page2: 1,
            page3: 1,
            pageSize: 10,
            loading1: true,
            loading2: false,
            loading3: false,
            loadingTitle1: '加载中...',
            loadingTitle2: '加载中...',
            loadingTitle3: '加载中...',
        }
    },
    computed: mapGetters([
        'userAuth'
    ]),
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.fetchData1()
        })
    },
    mounted() {

    },
    watch: {
        'selected': 'watchNavBar'
    },
    methods: {
        watchNavBar() {
            if ('1' == this.selected) {
                this.fetchData1()
            } else if ('2' == this.selected) {
                this.fetchData2()
            } else if ('3' == this.selected) {
                this.fetchData3()
            }
        },
        fetchData1() {
            let _this = this
            _this.loading1 = false
            this.$http.get(`/account/coupons`, { params: { categoryId: 2, status: 0, page: this.page1, pageSize: this.pageSize }, headers: { 'Authorization': this.userAuth } })
                .then((res) => {
                    let souce = res.data
                    for (let s of souce) {
                        if (s.status == 0) {
                            s.classState = 'noUse'
                        } else if (s.status == 1) {
                            s.classState = 'use'
                        } else {
                            s.classState = 'exp'
                        }

                        if (s.categoryType == 4) {
                            s.classType = 'jx'
                        } else if (s.categoryType == 3) {
                            s.classType = 'mj'
                        } else if (s.categoryType == 2) {
                            s.classType = 'fx'
                        }
                    }
                    if (_this.page1 === 1) {
                        _this.records1 = souce
                    } else {
                        _this.records1.push(...souce)
                    }
                    if (_this.pageSize == souce.length) {
                        _this.loading1 = true
                        _this.page1++
                    } else {
                        _this.loadingTitle1 = '暂无更多数据'
                    }
                }).catch((err) => Toast(err))
        },
        fetchData2() {
            let _this = this
            _this.loading2 = false
            this.$http.get(`/account/coupons`, { params: { categoryId: 2, status: 1, page: this.page2, pageSize: this.pageSize }, headers: { 'Authorization': this.userAuth } })
                .then((res) => {
                    let souce = res.data
                    for (let s of souce) {
                        if (s.status == 0) {
                            s.classState = 'noUse'
                        } else if (s.status == 1) {
                            s.classState = 'use'
                        } else {
                            s.classState = 'exp'
                        }

                        if (s.categoryType == 4) {
                            s.classType = 'jx'
                        } else if (s.categoryType == 3) {
                            s.classType = 'mj'
                        } else if (s.categoryType == 2) {
                            s.classType = 'fx'
                        }
                    }
                    if (_this.page2 === 1) {
                        _this.records2 = souce
                    } else {
                        _this.records2.push(...souce)
                    }
                    if (_this.pageSize == souce.length) {
                        _this.loading2 = true
                        _this.page2++
                    } else {
                        _this.loadingTitle2 = '暂无更多数据'
                    }
                }).catch((err) => Toast(err))
        },
        fetchData3() {
            let _this = this
            _this.loading3 = false
            this.$http.get(`/account/coupons`, { params: { categoryId: 2, status: 2, page: this.page3, pageSize: this.pageSize }, headers: { 'Authorization': this.userAuth } })
                .then((res) => {
                    let souce = res.data
                    for (let s of souce) {
                        if (s.status == 0) {
                            s.classState = 'noUse'
                        } else if (s.status == 1) {
                            s.classState = 'use'
                        } else {
                            s.classState = 'exp'
                        }

                        if (s.categoryType == 4) {
                            s.classType = 'jx'
                        } else if (s.categoryType == 3) {
                            s.classType = 'mj'
                        } else if (s.categoryType == 2) {
                            s.classType = 'fx'
                        }
                    }
                    if (_this.page3 === 1) {
                        _this.records3 = souce
                    } else {
                        _this.records3.push(...souce)
                    }
                    if (_this.pageSize == souce.length) {
                        _this.loading3 = true
                        _this.page3++
                    } else {
                        _this.loadingTitle3 = '暂无更多数据'
                    }
                }).catch((err) => Toast(err))
        },
    },
    components: {
        MugenScroll
    }
}
</script>
<style>
.no-coupon-record {
    background: url(../../assets/images/pay/coupon_no.png) no-repeat;
    background-size: cover;
    width: 10rem;
    height: 6rem;
    margin: 15% auto;
}

.dcoin .token-no-info {
    text-align: center;
    color: #8d8d8d;
    font-size: 1.4rem;
    margin-top: -10%;
}

.cp-con-top {
    font-size: 1.2rem;
    margin-left: 4rem;
    height: 35%;
}

.cp-con-bottom {
    font-size: 1.2rem;
}

.cp-con-top .icon-rmb {
    font-size: 1.4rem;
    line-height: 2.5rem;
    vertical-align: top;
}

.cp-con-top .unit {
    font-size: 2.5rem;
    vertical-align: top;
}

.redPack {
    width: 90%;
    margin: 0 auto;
    margin-top: 1rem;
    height: 8rem;
}

.redPack .redPkt-act-left {
    width: 22.4%;
    height: 20%;
    display: inline-block;
    vertical-align: top;
    height: 8rem;
}

.redPack .noUse.mj .redPkt-act-left {
    background: url(../../assets/images/pay/mj_enabled.png) no-repeat;
    background-size: 100%;
}

.redPack .noUse.fx .redPkt-act-left {
    background: url(../../assets/images/pay/fx_enabled.png) no-repeat;
    background-size: 100%;
}

.redPack .noUse.jx .redPkt-act-left {
    background: url(../../assets/images/pay/jx_enabled.png) no-repeat;
    background-size: 100%;
}

.redPack .use.mj .redPkt-act-left,
.redPack .exp.mj .redPkt-act-left {
    background: url(../../assets/images/pay/mj_disabled.png) no-repeat;
    background-size: 100%;
}

.redPack .use.fx .redPkt-act-left,
.redPack .exp.fx .redPkt-act-left {
    background: url(../../assets/images/pay/fx_disabled.png) no-repeat;
    background-size: 100%;
}

.redPack .use.jx .redPkt-act-left,
.redPack .exp.jx .redPkt-act-left {
    background: url(../../assets/images/pay/jx_disabled.png) no-repeat;
    background-size: 100%;
}

.redPack .redPkt-act-right {
    width: 74.6%;
    height: 8rem;
    margin-left: -0.4rem;
    display: inline-block;
    vertical-align: top;
}

.redPack .noUse.fx .redPkt-act-right {
    background: url(../../assets/images/pay/coupon_enabled_fx.png) no-repeat;
    background-size: 100%;
}

.redPack .noUse.mj .redPkt-act-right {
    background: url(../../assets/images/pay/coupon_enabled_mj.png) no-repeat;
    background-size: 100%;
}

.redPack .noUse.jx .redPkt-act-right {
    background: url(../../assets/images/pay/coupon_enabled_jx.png) no-repeat;
    background-size: 100%;
}

.redPack .use .redPkt-act-right {
    background: url(../../assets/images/pay/coupon_used.png) no-repeat;
    background-size: 100%;
}

.redPack .exp .redPkt-act-right {
    background: url(../../assets/images/pay/coupon_overdue.png) no-repeat;
    background-size: 100%;
}

.redPack .noUse.fx.coupon-selected .redPkt-act-right {
    background: url(../../assets/images/pay/coupon_selected_fx.png) no-repeat;
    background-size: 100%;
}

.redPack .noUse.mj.coupon-selected .redPkt-act-right {
    background: url(../../assets/images/pay/coupon_selected_mj.png) no-repeat;
    background-size: 100%;
}

.redPack .noUse.jx.coupon-selected .redPkt-act-right {
    background: url(../../assets/images/pay/coupon_selected_jx.png) no-repeat;
    background-size: 100%;
}

.redPack .noUse.mj .icon-rmb,
.redPack .noUse.mj .unit {
    color: #ff2872;
}

.redPack .noUse.fx .icon-rmb,
.redPack .noUse.fx .unit {
    color: #09a0df;
}

.redPack .noUse.jx .icon-rmb,
.redPack .noUse.jx .unit {
    color: #ff4444;
}

.redPack .use .icon-rmb,
.redPack .use .unit,
.redPack .exp .icon-rmb,
.redPack .exp .unit {
    color: #d8d8d8;
}

.redPack .noUse .cp-con-bottom p {
    padding-left: 1.4rem;
    color: #aeaeae;
    margin: 0.3rem 0px;
    white-space: nowrap;
}

.redPack .use .cp-con-bottom p,
.redPack .exp .cp-con-bottom p {
    padding-left: 1.4rem;
    color: #cdcdcd;
    margin: 0.3rem 0px;
    white-space: nowrap;
}
</style>