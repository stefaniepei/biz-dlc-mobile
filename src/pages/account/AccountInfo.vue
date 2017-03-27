<template>
    <div class="capital-list">
        <mt-header title="账户中心"
                   class="header-bg-color">
            <router-link to="/"
                         slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
    
        <div class="no-record"
             v-if="records === null">
            暂无数据
        </div>
    
        
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { Toast } from 'mint-ui'

export default {
    data() {
        return {
            records: [{}],
        }
    },
    computed: mapGetters([
        'userAuth'
    ]),
    mounted() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            this.getCapitalList()
        },
        getCapitalList() {
            let _this = this;
        },
    },
    components: {

    }
}
</script>
<style scoped>
.capital-one {
    width: 90%;
    margin: 0 auto;
    height: 4.5rem;
    line-height: 4.5rem;
}

.capital-date {
    width: 60%;
    display: inline-block;
    vertical-align: middle;
    height: 4rem;
    line-height: 4rem;
    color: #999;
}

.capital-money {
    width: 38%;
    display: inline-block;
    text-align: right;
    height: 4rem;
    line-height: 4rem;
}

.capital-money .money {
    vertical-align: middle;
    color: #346faf;
}

.capital-money span.co {
    display: inline-block;
    width: 18px;
    height: 20px;
    font-size: 12px;
    text-align: center;
    vertical-align: middle;
}

.bill_0 {
    background: url(../../assets/images/order/bill_0.png) no-repeat center 0;
    background-size: 100%;
}

.bill_1 {
    background: url(../../assets/images/order/bill_1.png) no-repeat center 0;
    background-size: 100%;
}

.bill_2 {
    background: url(../../assets/images/order/bill_2.png) no-repeat center 0;
    background-size: 100%;
}

.bill_3 {
    background: url(../../assets/images/order/bill_3.png) no-repeat center 0;
    background-size: 100%;
}

.bill_5 {
    background: url(../../assets/images/order/bill_5.png) no-repeat center 0;
    background-size: 100%;
}

.bill_7 {
    background: url(../../assets/images/order/bill_7.png) no-repeat center 0;
    background-size: 100%;
}

.bill_10 {
    background: url(../../assets/images/order/bill_10.png) no-repeat center 0;
    background-size: 100%;
}

.bill_15 {
    background: url(../../assets/images/order/bill_15.png) no-repeat center 0;
    background-size: 100%;
}

.bill_16 {
    background: url(../../assets/images/order/bill_16.png) no-repeat center 0;
    background-size: 100%;
}
</style>