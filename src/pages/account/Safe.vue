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
                <span class="float-right margin-right-15">王**(092X)</span>
            </section>

            <section class="arrow-line">
                <em><img src="../../assets/images/account/bank-card.png" /></em>
                <span>银行卡</span>
                <div class="bank-N-O">
                    <div class="inline-block float-right">
                        <span class="bank-top">中国银行</span>
                        <span class="dlc-blue bank-bottom">尾号<em>9629</em></span>
                    </div>
                    <div class="inline-block bank-icon bank_icon_104"></div>
                </div>
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
    data() {
        return {
            cellphone:''
        }
    },
    computed:mapGetters([
        'userAccount'
    ]),
    mounted(){
        this.cellphone = this.userAccount.cellphone
    }
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