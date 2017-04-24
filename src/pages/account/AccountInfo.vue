<template>
    <div class="page account">
        <mt-header title="我的账户"
                   class="header-bg-color">
            <router-link to="/"
                         slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="account-money">
            <router-link to="/setting" style="text-align:right;margin-right: 2.5rem;" tag="div">
                <span class="setting-icon"></span><span>设置</span>
            </router-link>
            <section>
                <p class="text-center fz-biggest">{{this.userAccount.balance.available}}</p>
                <p class="text-center fz-small">账户余额（元）</p>
            </section>
            <section class="profit-all">
                <div class="profit-all-1">
                    <p class="text-center fz-biggest">{{this.userAccount.asset.totalProfit}}</p>
                    <p class="text-center fz-small">累计收益</p>
                </div>
                <div class="profit-all-2">
                    <p class="text-center fz-biggest">{{this.userAccount.totalAsset}}</p>
                    <p class="text-center fz-small">总资产（元）</p>
                </div>
            </section>
        </div>

        <div class="cash_withdrawal">
            <router-link to="/recharge" class="withdrawal" tag="div">
                <span class="icon"></span><span>充值</span>
            </router-link>
            <router-link to="/cash" class="cash" tag="div">
                <span class="icon"></span><span>提现</span>
            </router-link>
        </div>

        <div style="height:1rem;background-color:#f5f5f5;"></div>

        <div class="icon-div">
            <router-link to="/financialList" tag="div">
                <p><span class="record-icon"></span></p>
                <p class="label">投资记录</p>
            </router-link>
            <router-link to="/capitalList" tag="div">
                <p><span class="detail-icon"></span></p>
                <p class="label">资金明细</p>
            </router-link>
            <router-link to="/coupon" class="last" tag="div">
                <p><span class="coupon-icon"></span></p>
                <p class="label">我的优惠券</p>
            </router-link>
        </div>
        <div class="icon-div">
            <router-link to="/coin" tag="div">
                <p><span class="coin-icon"></span></p>
                <p class="label">我的点币</p>
            </router-link>
            <router-link to="/safe" tag="div">
                <p><span class="safe-icon"></span></p>
                <p class="label">安全中心</p>
            </router-link>
            <router-link to="/invite" class="last" tag="div">
                <p><span class="invite-icon"></span></p>
                <p class="label">邀请有礼</p>
            </router-link>
        </div>

        <div style="height:1rem;background-color:#f5f5f5;"></div>

        <bottomMenu></bottomMenu>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { Toast } from 'mint-ui'
import bottomMenu from 'components/bottom-menu.vue'

export default {
    data() {
        return {

        }
    },
    computed: mapGetters([
        'userAccount'
    ]),
    mounted() {

    },
    methods: {

    },
    components: {
        bottomMenu
    }
}
</script>
<style scoped>

.account .account-money {
    background: url("../../assets/images/account/bg-img.png") no-repeat;
    background-size: 100% 100%;
    color: #fff;
    padding: 1rem 0 5rem;
}
.account .setting-icon {
    background: url("../../assets/images/account/setting.png") no-repeat;
    background-size: 100% 100%;
    width: 1.4rem;
    height: 1.4rem;
    display: inline-block;
    vertical-align: middle;
    margin-right: 3px;
}
.account-link em {
    display: inline-block;
    margin-left: 20px;
    margin-right: 10px;
}
.account-link em img{
    width: 1.5rem;
    height: 1.5rem;
    vertical-align: middle;
}


.profit-all {
    text-align: center;
    margin-top: 3rem;
    white-space: nowrap;
}

.profit-all-1 {
    display: inline-block;
    float: left;
    width: 50%;
    border-right: 1px solid #fff;
    box-sizing: border-box;
}

.profit-all-2 {
    display: inline-block;
    float: right;
    width: 50%;
}

.profit-all .amountprofit,
.profit-all .amountall {
    font-size: 1.8rem;
    margin-bottom: 2px;
}


.cash_withdrawal {
    height: 4rem;
    line-height: 4rem;
    font-size: 1.4rem;
    white-space: nowrap;
    text-align: center;
}

.cash_withdrawal .withdrawal {
    width: 50%;
    height: 2rem;
    line-height: 2rem;
    margin: 1rem 0rem;
    border-right: 1px solid #e5e5e5;
    display: inline-block;
    color: #346fca;
}

.cash_withdrawal .withdrawal .icon {
    background: url(../../assets/images/account/recharge.png) no-repeat;
    background-size: cover;
    width: 2rem;
    height: 2rem;
    vertical-align: middle;
    margin-right: 5px;
    display: inline-block;
}

.cash_withdrawal .cash {
    display: inline-block;
    width: 50%;
    height: 2rem;
    line-height: 2rem;
    margin: 1rem 0rem;
    color: #444;
}

.cash_withdrawal .cash .icon {
    background: url(../../assets/images/account/cash.png) no-repeat;
    background-size: cover;
    width: 2rem;
    height: 2rem;
    vertical-align: middle;
    margin-right: 5px;
    display: inline-block;
}

.icon-div {
    /*text-align: center;*/
}

.icon-div div {
    display: inline-block;
    width: 32%;
    height: 7rem;
    box-sizing: border-box;
    border-right: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
}

.icon-div div.last {
    border-right: 0;
}

.icon-div div:hover {
    background-color: #F5F5F5;
}

.icon-div div p {    
    text-align: center;
    padding-bottom: 0.5rem;
}

.icon-div .label {
    color: #888;
    font-weight: 300;
    font-size: 1.4rem;
}

.icon-div div span {
    width: 3rem;
    height: 3rem;    
    margin-top: 1rem;
    display: inline-block;
}

.icon-div .notice-icon {
    background: url(../../assets/images/more/notice.png) no-repeat;
    background-size: cover;
}

.icon-div .question-icon {
    background: url(../../assets/images/more/question.png) no-repeat;
    background-size: cover;
}

.icon-div .about-us-icon {
    background: url(../../assets/images/more/about-us.png) no-repeat;
    background-size: cover;
}

.icon-div .complaint-icon {
    background: url(../../assets/images/more/complaint.png) no-repeat;
    background-size: cover;
}

.icon-div .article-icon {
    background: url(../../assets/images/more/article.png) no-repeat;
    background-size: cover;
}

.icon-div .wechat-icon {
    background: url(../../assets/images/more/wechat.png) no-repeat;
    background-size: cover;
}

.icon-div .record-icon {
    background: url(../../assets/images/account/invest-list.png) no-repeat;
    background-size: cover;
}

.icon-div .detail-icon {
    background: url(../../assets/images/account/capital-list.png) no-repeat;
    background-size: cover;
}

.icon-div .coupon-icon {
    background: url(../../assets/images/account/coupon.png) no-repeat;
    background-size: cover;
}

.icon-div .coin-icon {
    background: url(../../assets/images/account/coin.png) no-repeat;
    background-size: cover;
}

.icon-div .safe-icon {
    background: url(../../assets/images/account/safe.png) no-repeat;
    background-size: cover;
}

.icon-div .invite-icon {
    background: url(../../assets/images/account/invite.png) no-repeat;
    background-size: cover;
}
</style>