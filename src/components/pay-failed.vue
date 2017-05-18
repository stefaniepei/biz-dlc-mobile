<template>
    <div class="success-page page" :style="fullHeight">
    
        <mt-header title="支付失败" class="header-bg-color" ref="header" fixed>
            <router-link to="/productAllList" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="header-margin">
            <div class="success-top">
                <img src="../assets/images/pay/pay-failed.png">
                <p>支付失败</p>
            </div>
            <div class="success-middle">
                <p>
                    <span class="left">交易单号</span>
                    <span class="right" id="orderNo">{{this.childData.orderSerialNo}}</span>
                </p>
                <p>
                    <span class="left">产品名称</span>
                    <span class="right" id="prodName">{{this.childData.prodName}}</span>
                </p>
                <p>
                    <span class="left">购买金额</span>
                    <span class="right" id="totalAmount">￥{{this.childData.payAmount}}</span>
                </p>
                <p>
                    <span class="left">支付总额</span>
                    <span class="right" id="payTotal">￥{{this.childData.totalAmount}}</span>
                </p>
            </div>
            <div class="success-bottom">
                <router-link to="/productAllList" class="re-recharge" tag="button">查看更多</router-link>
                <router-link to="/financialList" class="buy" tag="button">投资记录</router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        childData: {
            fee: "0.00",
            orderSerialNo: "",
            paidAt: "",
            payAmount: "0.00",
            prizes: [],
            prodCodeId: 0,
            prodName: "",
            totalAmount: "0.00",
            tradeSerialNo: "",
            tradeStatus: 2
        }
    },
    data() {
        return {
            fullHeight: {
                height: window.innerHeight //- this.$refs.header.offsetHeight + 'px',
            },
        }
    }
}
</script>
<style scoped>

</style>
