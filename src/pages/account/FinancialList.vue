<template>
    <div class="page financial-list">
        <mt-header title="投资记录" class="header-bg-color">
            <router-link to="/info" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="fill-div-05"></div>
        <div class="financial-total">
            <p>
                <em></em>当前总投资额（元）：
                <span class="dlc-red">{{this.userAccount['asset']['totalCapital']|formatCurrency(2,true)}}</span>
            </p>
        </div>
        <div class="fill-div-05"></div>
    
        <div class="no-record" v-if="records === null">
            暂无数据
        </div>
    
        <div class="financial-one" v-for="(value, key, index) in records">
            <div :class="'chapter chapter_'+value.status"></div>
            <div class="f-header">
                <div class=" prodName">{{value.productName}}</div>
            </div>
            <div class="f-content">
                <div class="flex">
                    <div class="data1">
                        <p class="num-t">{{value.productPeriod}}天</p>
                        <p>投资期限</p>
                    </div>
                    <div class="data1">
                        <p class="num-t" v-if="value.addedRate > 0">{{value.productRate}}+{{value.addedRate}}%</p>
                        <p class="num-t" v-else>{{value.productRate}}</p>
                        <p>年化利率</p>
                    </div>
                    <div class="data2">
                        <p class="num-t">{{value.sumSettled}}</p>
                        <p>投资金额</p>
                    </div>
                    <div class="data2">
                        <p class="num-t evt">{{value.expectedProfit}}</p>
                        <p>投资收益</p>
                    </div>
                </div>
            </div>
            <div class="f-footer">
                <div class="inline-block w49">投资日期：{{value.updatedAt|dateFormat}}</div>
                <div v-if="value.status!=0 && value.status!=3 && value.status!=4" class="inline-block w49">结束日期：{{value.cashInAt|dateFormat}}</div>
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
import routeData from 'mixins/routeData.js'

export default {
    mixins: [routeData],
    routeData() {
        return {
            records: [{}],
            page: 1,
            loading: false,
            loadingTitle: '加载中...'
        }
    },
    computed: mapGetters([
        'userAccount',
        'userAuth'
    ]),
    created() {
        this.fetchData()
    },
    mounted() {
        console.log(this)
    },
    methods: {
        fetchData() {
            this.getFinancialList()
        },
        getFinancialList() {
            let _this = this
            if (!_this.loading && _this.page != 1) {
                return
            }
            _this.loading = false
            let pageSize = 10
            this.$http.get(`/biz/accounts/share`, { params: { sort: 'created_at', asc: false, status: '', page: this.page, pageSize: pageSize }, headers: { 'Authorization': this.userAuth } })
                .then((res) => {
                    if (_this.page === 1) {
                        _this.records = res.data
                    } else {
                        _this.records.push(...res.data)
                    }
                    if (res.data.length == pageSize) {
                        _this.loading = true
                        _this.page++
                    } else {
                        _this.loadingTitle = '暂无更多数据'
                    }

                }).catch((err) => Toast(err))
        },
    },
    components: {
        MugenScroll
    }
}
</script>
<style scoped>
.financial-total {
    background: #fff;
    text-align: center;
    height: 3rem;
}

.financial-total p {
    line-height: 3rem;
    font-size: 0.9rem;
}

.financial-total p em {
    display: inline-block;
    width: 20px;
    height: 23px;
    margin-right: 5px;
    vertical-align: middle;
    background: url("../../assets/images/account/total_investment_icon.png") no-repeat;
    background-size: 100%;
}

.financial-one {
    background: #fff;
    margin-top: 8px;
    color: #999;
    position: relative;
}

.chapter {
    position: absolute;
    width: 80px;
    height: 37px;
    right: 10px;
    top: 5px;
    z-index: 10;
}


.chapter_1 {
    background: url(../../assets/images/order/o_1.png) no-repeat;
    background-size: 100%;
}

.chapter_2 {
    background: url(../../assets/images/order/o_2.png) no-repeat;
    background-size: 100%;
}

.chapter_3 {
    background: url(../../assets/images/order/o_3.png) no-repeat;
    background-size: 100%;
}

.chapter_4 {
    background: url(../../assets/images/order/o_4.png) no-repeat;
    background-size: 100%;
}

.financial-one .f-header {
    font-size: 1rem;
    line-height: 30px;
    height: 30px;
    border-bottom: 1px solid #eee;
}

.financial-one .prodName {
    font-size: 0.8rem;
    line-height: 30px;
    height: 30px;
    width: 90%;
    margin: 0 auto;
}

.financial-one .f-content {
    border-bottom: 1px solid #eee;
    font-size: 0.8rem;
    padding: 15px 0 10px;
}

.financial-one .f-content .flex {
    width: 90%;
    margin: 0 auto;
}

.financial-one .f-content .data1 {
    display: inline-block;
    width: 23%;
    white-space: nowrap;
}

.financial-one .f-content .data2 {
    display: inline-block;
    width: 24%;
    white-space: nowrap;
}

.financial-one .f-content .num-t {
    color: #346faf;
    font-size: 0.9rem;
}

.financial-one .f-content .evt {
    color: #ff7742;
}

.financial-one .f-footer {
    font-size: 0.8rem;
    line-height: 1.5rem;
    height: 1.5rem;
    width: 90%;
    margin: 0 auto;
}
</style>