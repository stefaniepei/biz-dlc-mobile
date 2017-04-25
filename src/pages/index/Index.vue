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
                <router-link to="/invitePolite/WeChat" tag="li" v-if="this.user && this.user.accessToken">
                    <img src="../../assets/images/dlc/invite.png" />
                    <p>邀请有礼</p>
                </router-link>
                <router-link to="/login" tag="li" v-else>
                    <img src="../../assets/images/dlc/regLogin.png" />
                    <p>注册登录</p>
                </router-link>
                <router-link to="/insurance/WeChat" tag="li">
                    <img src="../../assets/images/dlc/safe.png" />
                    <p>安全保障</p>
                </router-link>
                <router-link to="/invitePolite/WeChat" tag="li">
                    <img src="../../assets/images/dlc/bank.png" />
                    <p>银行存管</p>
                </router-link>
            </ul>
            <div class="clear"></div>
        </div>
        <div class="noviceMark product-list">
            <div class="item" style="margin-bottom: 0rem;">
                <p class="item-title">
                    <span class="name cursor_pointer">新手福利标</span><span class="limit-invest">限量发布</span></p>
                <div class="context">
                    <div class="b1">
                        <div class="w">
                            <div class="num-item mun-one">
                                <p class="word word-one">预期年化收益</p>
                                <p class="num word-one">
                                    <span style="font-size: 2.2rem;">{{this.newHand.expectYearReturn}}</span><span class="s">%</span>
                                    <span class="addX">+{{this.newHand.invest1IncReturn}}</span><span class="s">%</span>
                                </p>
                            </div>
                            <div class="num-item mun-two color6c">
                                <p class="word">投资期限</p>
                                <p class="num"><span>{{this.newHand.prodPeriod}}天</span></p>
                            </div>
                            <div class="num-item last">
                                <p class="word">项目金额</p>
                                <p class="num"><span id="people">{{this.newHand.maxRaisedAmount|toMillion}}万</span></p>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="progress-div">
                            <div id="newHandBuy" class="btn new-hand">立即抢购</div>
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
            <span><img src="../../assets/images/dlc/safe-blue.png" /> 资金交易过程由太平洋保险提供安全保障</span>
        </router-link>
    
        <div class="noviceMark product-list">
            <div class="item detailSrc" v-for="(product,index) in this.productList">
                <p class="item-title">
                    <span class="name cursor_pointer">{{product.name}}</span>one_icon fx mj jx sxlp</p>
                <div class="context">
                    <div class="b1">
                        <div class="w">
                            <div class="num-item mun-one">
                                <p class="word word-one">预期年化收益</p>
                                <p class="num word-one"><span>{{product.expectYearReturn}}</span><span class="s">%</span>{{product.invest2YearReturn}}</p>
                            </div>
                            <div class="num-item mun-two color6c">
                                <p class="word">投资期限</p>
                                <p class="num"><span class="s">{{product.prodPeriod}}天</span></p>
                            </div>
                            <div class="num-item last">
                                <p class="word">项目金额</p>
                                <p class="num"><span class="s">{{product.maxRaisedAmount}}万</span></p>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="progress-div">
                            <div class="progressBut bgBlue detailSrc">butWord</div>
                            <div class="progress-bar-bg">
                                <p class="width progressWidth progress-bar"></p>
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
            this.$http.get('/utils/bulletin', { params: { createdFrom: '2016-12-01', type: 3, page: 1, pageSize: 5 } }).then(function (res) {
                _this.imgData = res.data.data
            }).catch(function (err) {
                Toast(err)
            });
        },
        getNewHand() {
            let _this = this
            this.$http.get('/products', { params: { tag: 'newbie', page: 1, pageSize: 1 } }).then(function (res) {
                _this.newHand = res.data.data[0]
                console.log(res.data.data)
            }).catch(function (err) {
                Toast(err)
            });
        },
        getProductList() {
            let _this = this
            this.$http.get('/products', { params: { page: 1, pageSize: 3 } }).then(function (res) {
                console.log(res.data.data)
                _this.productList = res.data.data
            }).catch(function (err) {
                Toast(err)
            });
        }
    }
}
</script>
<style scoped>
.home {
    background: #f7f7f7;
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

.noviceMark {
    margin-top: 1rem;
    position: relative;
}

.product-list .item {
    background: #fff;
    display: inline-block;
    margin-bottom: 1rem;
    width: 100%;
    position: relative;
}

.product-list .item-title {
    border-bottom: 1px solid #eee;
    height: 4rem;
    line-height: 4.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.product-list .item-title .name {
    color: #666;
    font-weight: 300;
    font-size: 1.6rem;
    margin: 0 1.0rem;
}

.noviceMark .limit-invest {
    border: 1px solid #ff7742;
    font-size: 1.2rem;
    color: #ff7742;
    width: 50%;
    padding: 1% 2%;
    border-radius: 6px;
}

.product-list .item .context {
    display: inline-block;
    height: auto;
    width: 100%;
}

.product-list .item .b1 {
    display: inline-block;
    width: 100%;
}

.product-list .item .b1 .w {
    margin: 0.7rem auto;
    white-space: nowrap;
    width: 95%;
}

.product-list .item .b1 .mun-one {
    width: 44%;
}

.product-list .item .b1 .mun-two {
    width: 38%;
}

.product-list .item .b1 .last {
    width: 18%;
    color: #6C6C6C;
}

.product-list .item .b1 .num-item {
    color: #ff7742;
    display: inline-block;
    float: left;
    font-size: 1.6rem;
}

.product-list .item .b1 .w .word-one {
    padding-left: 2px;
}

.product-list .item .b1 .w .word {
    color: #6C6C6C;
    font-size: 1.2rem;
    white-space: nowrap;
}

.product-list .item .b1 .w .num {
    height: 2.0rem;
    line-height: 1.8rem;
    margin-top: 0.5rem;
}

.product-list .item .b1 .progress-div {
    width: 95%;
    margin: 0 auto;
    margin-bottom: 2%;
    overflow: hidden;
}

.noviceMark .new-hand {
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

.noviceMark .progress-line {
    background: #e5e5e5;
    height: 0.1rem;
    margin-top: 0.7rem;
    width: 53%;
    float: left;
}

.noviceMark .progress-title {
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