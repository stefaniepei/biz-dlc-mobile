<template>
    <div class="page order-list">
        <mt-header title="我的理财" class="header-bg-color">
            <router-link to="/info" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="no-record" v-if="records === null">
            暂无数据
        </div>
        <div class="order-one" v-for="(value,key,index) in records">
            <div class="order-top">
                <div class="inline-block order-name">{{value.productName}}</div>
                <div class="inline-block order-money">{{value.entrustAmount}}</div>
            </div>
            <div class="order-bottom">
                <div class="inline-block order-date">{{value.createdAt|dateTimeFormat}}</div>
                <div class="inline-block order-btn">
                    <span :class="'sta-'+value.status">{{value.status|accountDict('orderStatus')}}</span>
                </div>
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
import MugenScroll from 'vue-mugen-scroll'

export default {
    data() {
        return {
            total: '0.00',
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
            this.getOrderList()
        },
        getOrderList() {
            let _this = this
            let pageSize = 10
            _this.loading = false
            this.$http.get(`/biz/orders`, { params: { asc: false, page: this.page, pageSize: pageSize }, headers: { 'Authorization': this.userAuth } }).then(function (res) {
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
.order-list .order-top {
    width: 90%;
    margin: 0 auto;
    height: 2.5rem;
    line-height: 2.5rem;
}

.order-list .order-bottom {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 0.5rem;
    height: 1.5rem;
    line-height: 1.5rem;
}

.order-list .order-one {
    height: 5rem;
    line-height: 5rem;
}

.order-list .order-name {
    width: 70%;
    font-size: 0.8rem;
    color: #666;
    white-space: nowrap;
}

.order-list .order-money {
    width: 28%;
    font-size: 0.4rem;
    color: #ff7742;
    text-align: center;
}

.order-list .order-date {
    width: 70%;
    font-size: 0.4rem;
    color: #999;
    white-space: nowrap;
}

.order-btn span {
    display: inline-block;
    color: #999;
    font-size: 0.6rem;
    width: 80px;
    text-align: center;
    line-height: 25px;
    height: 25px;
    border-radius: 3px;

    background: #ccc;
    color: #fff;
}

span.sta-1 {
    background: #346faf;
}

span.sta-2,
span.sta-3 {
    background: #ff7742;
}
</style>