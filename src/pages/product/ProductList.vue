<template>
    <div class="page product-list">
        <mt-header title="产品列表" class="header-bg-color" fixed>
            <router-link to="/productAllList" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="product-list-title header-margin">
            <img src="../../assets/images/product/yxd.png">
            <span>鑫盈精选</span>
        </div>
        <div class="product-list">
            <div class="item detailSrc" v-for="(product,index) in this.productList">
                <p class="item-title">
                    <span class="name cursor_pointer">{{product.prodName}}</span>
                    <span class="icon-fx" v-show="new Set(product.coupons).has('2')">返现券</span>
                    <span class="icon-mj" v-show="new Set(product.coupons).has('3')">满减券</span>
                    <span class="icon-jx" v-show="new Set(product.coupons).has('4')">加息券</span>
                </p>
                <div class="context">
                    <div class="b1">
                        <div class="w">
                            <div class="num-item mun-one">
                                <p class="word word-one"></p>
                                <p class="num word-one">
                                    <span class="rem-22">{{product.expectYearReturn}}</span>
                                    <span class="s">%</span>
                                    <span v-show="product.invest2YearReturn >0">+{{product.invest2YearReturn}}%</span>
                                </p>
                            </div>
                            <div class="num-item mun-two color6c">
                                <p class="word">投资期限</p>
                                <p class="num">
                                    <span class="s">{{product.prodPeriod}}天</span>
                                </p>
                            </div>
                            <div class="num-item last">
                                <p class="word">项目金额</p>
                                <p class="num">
                                    <span class="s">{{product.maxRaisedAmount|toMillion}}万</span>
                                </p>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="progress-div">
                            <router-link :to="'/productDetail/WeChat/'+product.prodCodeId" tag="div" class="progressBut" v-if="'1' == product.prodStatus">
                                {{product.prodStatus|productDict('prodStatus')}}
                            </router-link>
                            <router-link :to="'/productDetail/WeChat/'+product.prodCodeId" tag="div" class="progressBut disabled" v-else>
                                {{product.prodStatus|productDict('prodStatus')}}
                            </router-link>
                            <div class="progress-bar-bg">
                                <p class="progress-bar" :style="{width:''+product.quotaProgress+'%'}"></p>
                            </div>
                            <div class="progressNo">{{product.quotaProgress}}%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <mugen-scroll :handler="fetchData" :should-handle="loading">
            <div class="fetch-data">{{loadingTitle}}</div>
        </mugen-scroll>
        <bottomMenu></bottomMenu>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
import MugenScroll from 'vue-mugen-scroll'
import routeData from 'mixins/routeData.js'
import bottomMenu from 'components/bottom-menu.vue'

export default {
    mixins: [routeData],
    routeData() {
        return {
            productList: [{}],
            page: 1,
            loading: false,
            loadingTitle: '加载中...'
        }
    },
    components: {
        MugenScroll,
        bottomMenu
    },
    created() {
        this.fetchData()
    },
    mounted() {

    },
    methods: {
        fetchData() {
            this.getProductList()
        },
        getProductList() {
            let _this = this
            let pageSize = 10
            if (!_this.loading && _this.page != 1) {
                return
            }
            _this.loading = false
            this.$http.get('/products', { params: { page: _this.page, pageSize: pageSize } }).then((res) => {
                if (_this.page === 1) {
                    _this.productList = res.data
                } else {
                    _this.productList.push(...res.data)
                }
                if (res.data.length == pageSize) {
                    _this.loading = true
                } else {
                    _this.loadingTitle = '暂无更多数据'
                }
                _this.page++
            }).catch((err) => Toast(err))
        },
    }
}
</script>
<style>

</style>