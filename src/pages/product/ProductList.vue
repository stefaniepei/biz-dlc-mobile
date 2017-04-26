<template>
    <div class="page product-list">
        <mt-header title="产品列表" class="header-bg-color2" fixed>
            <router-link to="/productAllList" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="product-list-title header-margin">
            <img src="../../assets/images/product/yxd.png"><span>优信贷</span>
        </div>
        <div class="product-list">
            <div class="item detailSrc" v-for="(product,index) in this.productList">
                <p class="item-title">
                    <span class="name cursor_pointer">{{product.prodName}}</span>
                    <span class="icon-you">优</span>
                    <span class="icon-fx" v-show="new Set(product.coupons).has('2')">返现券</span>
                    <span class="icon-mj" v-show="new Set(product.coupons).has('3')">满减券</span>
                    <span class="icon-jx" v-show="new Set(product.coupons).has('4')">加息券</span>
                </p>
                <div class="context">
                    <div class="b1">
                        <div class="w">
                            <div class="num-item mun-one">
                                <p class="word word-one">预期年化收益</p>
                                <p class="num word-one"><span>{{product.expectYearReturn}}</span><span class="s">%</span><span v-show="product.invest2YearReturn >0">+{{product.invest2YearReturn}}%</span></p>
                            </div>
                            <div class="num-item mun-two color6c">
                                <p class="word">投资期限</p>
                                <p class="num"><span class="s">{{product.prodPeriod}}天</span></p>
                            </div>
                            <div class="num-item last">
                                <p class="word">项目金额</p>
                                <p class="num"><span class="s">{{product.maxRaisedAmount|toMillion}}万</span></p>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="progress-div">
                            <router-link :to="'/productDetail/WeChat/'+product.prodCodeId" tag="div" class="progressBut">
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
import bottomMenu from 'components/bottom-menu.vue'

export default {
    data() {
        return {
            productList: [{}],
            page: 1,
            loading: true,
            loadingTitle: '加载中...'
        }
    },
    components: {
        MugenScroll,
        bottomMenu
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            this.getProductList()
        },
        getProductList() {
            let _this = this;
            let pageSize = 10
            _this.loading = false
            this.$http.get('/products', { params: { page: 1, pageSize: pageSize } }).then((res) => {
                if (_this.page === 1) {
                    _this.productList = res.data.data
                } else {
                    _this.productList.push(...res.data.data)
                }
                if (res.data.data.length == pageSize) {
                    _this.loading = true
                    _this.page++
                } else {
                    _this.loadingTitle = '暂无更多数据'
                }

            }).catch((err) => Toast(err))
        },
    }
}
</script>
<style>

</style>