<template>
    <div class="page coin-list">
        <mt-header title="我的点币" class="header-bg-color">
            <router-link to="/info" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
    
        <div class="coin-header">
            <section>当前点币：</section>
            <section class="coin-balance">{{this.userAccount.asset.availablePoint}}</section>
            <section>温馨提示：点币有效期至每年公历12月31日，过期将自动清零。</section>
        </div>
    
        <mt-navbar v-model="selected" :style="{top:'40px'}">
            <mt-tab-item id="1">全部</mt-tab-item>
            <mt-tab-item id="2">收入</mt-tab-item>
            <mt-tab-item id="3">支出</mt-tab-item>
        </mt-navbar>
    
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <div class="no-record" v-if="records1 === null">
                    暂无数据
                </div>
    
                <div class="coin" v-for="(value,key,index) in records1">
                    <div class="coin-data w30">{{value.createdAt|dateFormat}}</div>
                    <div class="coin-data w40">{{value.subject}}</div>
                    <div class="coin-data w20">{{value.deltaAmount}}</div>
                </div>
                <mugen-scroll :handler="fetchData1" :should-handle="loading1">
                    <div class="fetch-data">{{loadingTitle1}}</div>
                </mugen-scroll>
            </mt-tab-container-item>
    
            <mt-tab-container-item id="2">
                <div class="no-record" v-if="records2 === null">
                    暂无数据
                </div>
                <div class="coin" v-for="(value,key,index) in records2">
                    <div class="coin-data w30">{{value.createdAt|dateFormat}}</div>
                    <div class="coin-data w40">{{value.subject}}</div>
                    <div class="coin-data w20">{{value.deltaAmount}}</div>
                </div>
                <mugen-scroll :handler="fetchData2" :should-handle="loading2">
                    <div class="fetch-data">{{loadingTitle2}}</div>
                </mugen-scroll>
            </mt-tab-container-item>
    
            <mt-tab-container-item id="3">
                <div class="no-record" v-if="records3 === null">
                    暂无数据
                </div>
                <div class="coin" v-for="(value,key,index) in records3">
                    <div class="coin-data w30">{{value.createdAt|dateFormat}}</div>
                    <div class="coin-data w40">{{value.subject}}</div>
                    <div class="coin-data w20">{{value.deltaAmount}}</div>
                </div>
                <mugen-scroll :handler="fetchData3" :should-handle="loading3">
                    <div class="fetch-data">{{loadingTitle3}}</div>
                </mugen-scroll>
            </mt-tab-container-item>
        </mt-tab-container>
    
    </div>
</template>
<script>
import { Navbar, TabItem, Toast } from 'mint-ui'
import { mapGetters } from 'vuex'
import MugenScroll from 'vue-mugen-scroll'

export default {
    data() {
        return {
            selected: '1',
            records1: [{}],
            records2: [{}],
            records3: [{}],
            page1: 1,
            page2: 1,
            page3: 1,
            pageSize: 10,
            loading1: true,
            loading2: false,
            loading3: false,
            loadingTitle1: '加载中...',
            loadingTitle2: '加载中...',
            loadingTitle3: '加载中...',
        }
    },
    computed: mapGetters([
        'userAuth',
        'userAccount'
    ]),
    beforeRouteEnter(to, from, next) {
        next(vm => {
            this.fetchData1()
        })
    },
    mounted() {

    },
    watch: {
        'selected': 'watchNavBar'
    },
    methods: {
        watchNavBar() {
            if ('1' == this.selected) {
                this.fetchData1()
            } else if ('2' == this.selected) {
                this.fetchData2()
            } else if ('3' == this.selected) {
                this.fetchData3()
            }
        },
        fetchData1() {
            let _this = this
            _this.loading1 = false
            this.$http.get(`/account/points/jour`, { params: { page: this.page1, pageSize: this.pageSize }, headers: { 'Authorization': this.userAuth } })
                .then((res) => {
                    let souce = res.data.data
                    if (_this.page1 === 1) {
                        _this.records1 = souce
                    } else {
                        _this.records1.push(...souce)
                    }
                    if (_this.pageSize == souce.length) {
                        _this.loading1 = true
                        _this.page1++
                    } else {
                        _this.loadingTitle1 = '暂无更多数据'
                    }
                }).catch((err) => Toast(err))
        },
        fetchData2() {
            let _this = this
            _this.loading2 = false
            this.$http.get(`/account/points/jour`, { params: { type: 0, page: this.page2, pageSize: this.pageSize }, headers: { 'Authorization': this.userAuth } })
                .then((res) => {
                    let souce = res.data.data
                    if (_this.page2 === 1) {
                        _this.records2 = souce
                    } else {
                        _this.records2.push(...souce)
                    }
                    if (_this.pageSize == souce.length) {
                        _this.loading2 = true
                        _this.page2++
                    } else {
                        _this.loadingTitle2 = '暂无更多数据'
                    }
                }).catch((err) => Toast(err))
        },
        fetchData3() {
            let _this = this
            _this.loading3 = false
            this.$http.get(`/account/points/jour`, { params: { type: 2, page: this.page3, pageSize: this.pageSize }, headers: { 'Authorization': this.userAuth } })
                .then((res) => {
                    let souce = res.data.data
                    if (_this.page3 === 1) {
                        _this.records3 = souce
                    } else {
                        _this.records3.push(...souce)
                    }
                    if (_this.pageSize == souce.length) {
                        _this.loading3 = true
                        _this.page3++
                    } else {
                        _this.loadingTitle3 = '暂无更多数据'
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
.coin-header {
    background-image: url("../../assets/images/account/coin-bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: 15px 0 10px;
    color: #fff;
    font-size: 1.2rem;
}

.coin-header section {
    height: 3rem;
    width: 90%;
    margin: 0 auto;
}

.coin-header .coin-balance {
    text-align: center;
    font-size: 2.2rem;
    height: 4rem;
}

.coin-list .coin {
    height: 4rem;
    line-height: 4rem;
    border-bottom: 1px solid #eee;
    white-space: nowrap;
}

.coin .coin-data {
    display: inline-block;
    text-align: center;
    font-size: 1.2rem;
    line-height: 4rem;
    color: #999;
}
</style>