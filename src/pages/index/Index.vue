<template>
    <div class="page home">
        <mt-swipe :style="{width:''+imgW,height:''+imgH}" :speed="1000">
            <mt-swipe-item v-for="(value, key, index) in imgData" :key="key">
                <a :href="value.fileUrl">
                    <div :style="{width:''+imgW,height:''+imgH,background:'url('+value.originUrl+') 0% 0% / 100% 100% no-repeat'}"></div>
                </a>
            </mt-swipe-item>
        </mt-swipe>
        <div class="home-icon">
            <ul>
                <router-link to="/luckDraw/WeChat" tag="li">
                    <img src="../../assets/images/dlc/draw.png" />
                    <p>点币抽奖</p>
                </router-link>
                <router-link to="/invitePolite/WeChat" tag="li" v-if="this.user && this.user['accessToken']">
                    <img src="../../assets/images/dlc/invite.png" />
                    <p>邀请有礼</p>
                </router-link>
                <router-link to="/signin" tag="li" v-else>
                    <img src="../../assets/images/dlc/regLogin.png" />
                    <p>注册登录</p>
                </router-link>
                <li>
                    <a href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIwNzQ0ODQ1Mw==&scene=124#wechat_redirect">
                        <img src="../../assets/images/dlc/wechat.png" />
                        <p>关注微信</p>
                    </a>
                </li>
                <li>
                    <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.finnovate.dianlc">
                        <img src="../../assets/images/dlc/download.png" />
                        <p>下载App</p>
                    </a>
                </li>
            </ul>
            <div class="clear"></div>
        </div>
        <div class="novice-mark product-list">
            <div class="item" style="margin-bottom: 0rem;">
                <p class="item-title">
                    <span class="name cursor_pointer">新手福利标</span>
                    <span class="limit-invest">限量发布</span>
                </p>
                <div class="context">
                    <div class="b1">
                        <div class="w">
                            <div class="num-item mun-one">
                                <p class="word word-one"></p>
                                <p class="num word-one">
                                    <span class="rem-22">{{this.newHand.expectYearReturn}}</span>
                                    <span class="s">%</span>
                                    <span class="addX">+{{this.newHand.invest1IncReturn}}</span>
                                    <span class="s">%</span>
                                </p>
                            </div>
                            <div class="num-item mun-two color6c">
                                <p class="word">投资期限</p>
                                <p class="num">
                                    <span>{{this.newHand.prodPeriod}}天</span>
                                </p>
                            </div>
                            <div class="num-item last">
                                <p class="word">项目金额</p>
                                <p class="num">
                                    <span id="people">{{this.newHand.maxRaisedAmount|toMillion}}万</span>
                                </p>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="progress-div">
                            <router-link :to="'/experienceProductDetail/WeChat/'+this.newHand.prodCodeId" tag="div" class="btn new-hand">
                                立即抢购
                            </router-link>
                            <div class="progress-line">
                                <p class="progress-title">每位新用户限投一次</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <router-link to="/productAllList" tag="div" class="product-title">
            <em>推荐</em>
            <span>
                <img src="../../assets/images/dlc/safe-blue.png" /> 资金交易过程由太平洋保险提供安全保障</span>
        </router-link>
    
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
        <div class="home-end">
            <p>Copyright © 2015-2016 众网金融科技(上海) </p>
            <p>版权所有备案号 沪ICP备15055080号-2</p>
        </div>
        <bottomMenu></bottomMenu>
    </div>
</template>
<script>
import { Swipe, SwipeItem, Toast } from 'mint-ui'
import Vue from 'vue'
import { mapGetters } from 'vuex'

Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
import bottomMenu from 'components/bottom-menu.vue'

export default {
    data() {
        return {
            imgData: {},
            newHand: {},
            productList: [{}],
            imgW: window.innerWidth + 'px',
            imgH: window.innerWidth * (480 / 1080) + 'px'
        }
    },
    components: {
        Swipe,
        SwipeItem,
        bottomMenu
    },
    computed: mapGetters([
        'user'
    ]),
    mounted() {
        this.getSwiperData()
        this.getNewHand()
        this.getProductList()
    },
    methods: {
        getSwiperData() {
            let _this = this
            this.$http.get('/utils/bulletin', { params: { createdFrom: '2016-12-01', type: 3, page: 1, pageSize: 5 } })
                .then((res) => _this.imgData = res.data)
                .catch((err) => Toast(err))
        },
        getNewHand() {
            let _this = this
            this.$http.get('/products', { params: { tag: 'newbie', page: 1, pageSize: 1 } })
                .then((res) => _this.newHand = res['data'][0])
                .catch((err) => Toast(err))
        },
        getProductList() {
            let _this = this
            this.$http.get('/products', { params: { page: 1, pageSize: 4 } })
                .then((res) => _this.productList = res.data)
                .catch((err) => Toast(err))
        }
    }
}
</script>
<style scoped>
.home {
    background: #f7f7f7;
}

.home .product-list {
    margin-bottom: 0px;
}

.home-icon {
    width: 100%;
    background: #fff;
}

.home-icon li {
    width: 25%;
    float: left;
    text-align: center;
    padding: 2% 0%;
}

.home-icon li img {
    width: 30%;
    height: auto;
}

.home-icon li p {
    font-size: 1.2rem;
    color: #666;
}

.product-list {
    width: 100%;
    background: #f7f7f7;
}

.novice-mark {
    margin-top: 1rem;
    position: relative;
}

.novice-mark .limit-invest {
    border: 1px solid #ff7742;
    font-size: 1.2rem;
    color: #ff7742;
    width: 50%;
    padding: 1% 2%;
    border-radius: 3px;
}

.novice-mark .new-hand {
    display: inline-block;
    text-align: center;
    height: 2rem;
    line-height: 2rem;
    float: right;
    width: 29%;
    color: #fff;
    background: #346FAF;
    border: none;
    border-radius: 3px;
    font-size: 1.2rem;
}

.novice-mark .progress-line {
    background: #e5e5e5;
    height: 0.1rem;
    margin-top: 0.7rem;
    width: 53%;
    float: left;
}

.novice-mark .progress-title {
    color: #ff7742;
    font-size: 1.2rem;
    margin-top: 0.5rem;
}

.home .product-title {
    font-size: 1.2rem;
    padding: 3% 3% 3%;
    color: #666;
    background: #fff;
    border-bottom: 1px solid #e5e5e5;
    margin-top: 1rem;
}

.home .product-title em {
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 400;
}

.home .product-title span {
    float: right;
}

.home .product-title img {
    width: 1.2rem;
    height: 1.2rem;
    display: inline-block;
    vertical-align: top;
}

.home-end {
    width: 100%;
    padding: 5% 0;
    text-align: center;
    color: #ababab;
    font-size: 1.2rem;
    background: #f7f7f7;
    margin-bottom: 43px;
}
</style>