<template>
    <div class="success-page page" :style="fullHeight">
    
        <mt-header title="支付成功" class="header-bg-color" fixed>
            <router-link to="/recharge" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="header-margin">
            <div class="success-top">
                <img src="../assets/images/pay/pay-success.png">
                <p>充值成功</p>
            </div>
            <div class="success-middle">
                <p>
                    <span class="left">银行卡</span>
                    <span class="right">{{this.childData.bankName}} 尾号{{this.childData.cardNo|lastChar}}</span>
                </p>
                <p>
                    <span class="left">充值金额</span>
                    <span class="right">￥{{this.childData.rechargeAmount}}</span>
                </p>
            </div>
            <div class="success-bottom">
                <router-link to="/recharge" class="re-recharge" tag="button">继续充值</router-link>
                <router-link to="/productAllList" class="buy" tag="button">立即购买</router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        childData: {
            bankName: '',
            cardNo: '',
            rechargeAmount: "0.00",
        }
    },
    data() {
        return {
            fullHeight: {
                height: window.innerHeight + 'px',
            },
        }
    }
}
</script>
<style scoped>

</style>
