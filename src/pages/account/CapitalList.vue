<template>
    <div class="capital-list">
        <mt-header title="资金明细" class="header-bg-color">
            <router-link to="/info" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
    
        <div class="no-record" v-if="records === null">
            暂无数据
        </div>
    
        <div class="capital-one" v-for="(value, key, index) in records">
            <div class="capital-date">{{value.createdAt|dateTimeFormat}}</div>
            <div class="capital-money">
                <span class="money">{{value.amount}}</span>
                <span :class="'co bill_'+value.tradeType"></span>
            </div>
            <div class="fill-div-05"></div>
        </div>
    
        <mugen-scroll :handler="fetchData" :should-handle="loading">
            <div class="fetch-data">{{loadingTitle}}</div>
        </mugen-scroll>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { Toast } from 'mint-ui'
import MugenScroll from 'vue-mugen-scroll'

export default {
    data() {
        return {
            records: [{}],
            page: 1,
            loading: true,
            loadingTitle: '加载中...'
        }
    },
    computed: mapGetters([
        'userAuth'
    ]),
    beforeRouteEnter(to, from, next) {
        next(vm => {
            this.fetchData()
        })
    },
    mounted() {

    },
    methods: {
        fetchData() {
            this.getCapitalList()
        },
        getCapitalList() {
            let _this = this
            let pageSize = 10
            _this.loading = false
            this.$http.get(`/trades/jour`, { params: { sort: 'created_at', asc: false, page: this.page, pageSize: pageSize }, headers: { 'Authorization': this.userAuth } }).then(function (res) {
                if (_this.page === 1) {
                    _this.records = res.data.data
                } else {
                    _this.records.push(...res.data.data)
                }
                if (res.data.data.length == pageSize) {
                    _this.loading = true
                    _this.page++
                } else {
                    _this.loadingTitle = '暂无更多数据'
                }
                console.log(_this.loading)
            }).catch(function (err) {
                Toast(err)
            })
        },
    },
    components: {
        MugenScroll
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