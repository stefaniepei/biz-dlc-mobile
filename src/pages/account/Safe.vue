<template>
    <div class="page safe">
        <mt-header title="安全中心"
                   class="header-bg-color">
            <router-link to="/info"
                         slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
    
        <div>
            <section class="arrow-line">
                <em><img src="../../assets/images/account/real-name.png" /></em>
                <span>实名认证</span>
                
                <span class="float-right margin-right-15" v-if="this.userAccount && this.userAccount.name && this.userAccount.idNo">{{this.userAccount.name}}({{this.userAccount.idNo|lastChar}})</span>
                <span style="float: right;" v-else>未实名
                        <span class="arrow-right"></span>
                </span>
            </section>

            <section class="arrow-line">
                <em><img src="../../assets/images/account/bank-card.png" /></em>
                <span>银行卡</span>
                <div class="bank-N-O" v-if="this.userAccount && this.userAccount.hasCard && this.userAccount.cards && this.userAccount.cards[0]">
                    <div class="inline-block float-right">
                        <span class="bank-top">{{this.userAccount.cards[0].bankName}}</span>
                        <span class="dlc-blue bank-bottom">尾号<em>{{this.userAccount.cards[0].cardNo|lastChar}}</em></span>
                    </div>
                    <div class="inline-block bank-icon bank_icon_104"></div>
                </div>
                <span style="float: right;" v-else>未绑卡
                        <span class="arrow-right"></span>
                </span>
            </section>

            <router-link to="/transactionPwd" class="arrow-line" tag="section">
                <em><img src="../../assets/images/account/trade-pwd.png" /></em>
                <span>交易密码</span>
                <span style="float: right;">默认与初始登录密码一致
                        <span class="arrow-right"></span>
                </span>
            </router-link>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    computed:mapGetters([
        'userAccount'
    ]),
}
</script>
<style scoped>
.bank-N-O {
    float: right;
    line-height: 4rem;
    margin-right: 1.5rem;
}

.bank-top,
.bank-bottom {
    display: block;
    line-height: 2rem;
    padding-left: 0.5rem;
}

.bank-bottom em {
    padding: 0;
}
</style>