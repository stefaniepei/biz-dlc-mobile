<template>
    <div class="success-page page">
    
        <mt-header title="支付成功" class="header-bg-color" fixed>
            <router-link to="/productAllList" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="header-margin">
            <div class="success-top">
                <img src="../assets/images/pay/pay-success.png">
                <p>支付成功</p>
            </div>
            <div class="success-middle">
                <p>
                    <span class="left">交易单号</span>
                    <span class="right" id="orderNo"></span>
                </p>
                <p>
                    <span class="left">产品名称</span>
                    <span class="right" id="prodName"></span>
                </p>
                <p>
                    <span class="left">购买金额</span>
                    <span class="right" id="totalAmount">￥10</span>
                </p>
                <p>
                    <span class="left">支付总额</span>
                    <span class="right" id="payTotal">￥10</span>
                </p>
            </div>
            <div class="success-bottom">
                <router-link to="/productAllList" class="re-recharge" tag="button">查看更多</router-link>
                <router-link to="/financialList" class="buy" tag="button">我的投资</router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>

</style>
