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
            <section>
                <p class="text-center fz-biggest">{{this.userAccount.balance.available}}</p>
                <p class="text-center fz-small">账户余额（元）</p>
            </section>
            <section class="prod-invest">
                <div class="inline-block w48">
                    <p class="text-center fz-biggest">{{this.userAccount.asset.totalProfit}}</p>
                    <p class="text-center fz-small">累计收益</p>
                </div>
                <div class="inline-block w48">
                    <p class="text-center fz-biggest">{{this.userAccount.totalAsset}}</p>
                    <p class="text-center fz-small">总资产（元）</p>
                </div>
            </section>
        </div>
        <div class="fill-div-05"></div>
        <div class="account-link">
            <router-link to="/coupon"
                         class="arrow-line"
                         tag="section">
                <em><img src="../../assets/images/account/red_Pk.png" /></em>
                <span>我的优惠券</span>
                <span class="arrow-right"></span>
            </router-link>

            <router-link to="/coin"
                         class="arrow-line"
                         tag="section">
                <em><img src="../../assets/images/account/coins_icon.png" /></em>
                <span>我的点币</span>
                <span class="arrow-right"></span>
            </router-link>

            <router-link to="/invite"
                         class="arrow-line"
                         tag="section">
                <em><img src="../../assets/images/account/invitation_icon.png" /></em>
                <span>邀请有礼</span>
                <span class="arrow-right"></span>
            </router-link>
    
            <div class="fill-div-05"></div>

            <router-link to="/setting"
                         class="arrow-line"
                         tag="section">
                <em><img src="../../assets/images/account/settings_icon.png" /></em>
                <span>账户设置</span>
                <span class="arrow-right"></span>
            </router-link>

            <router-link to="/logout"
                         class="arrow-line"
                         tag="section">
                <em><img src="../../assets/images/account/login-out.png" /></em>
                <span>退出</span>
                <span class="arrow-right"></span>
            </router-link>
    
        </div>
    
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { Toast } from 'mint-ui'

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

    }
}
</script>
<style scoped>
.account .account-money {
    background: url("../../assets/images/account/account_bg.png") no-repeat;
    background-size: 100% 100%;
    color: #fff;
    padding: 15px 0 10px;
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
</style>