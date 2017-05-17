<template>
    <div class="page more" ref="more">
        <div class="banner" :style="{width:''+bgW,height:''+bgH}"></div>
        <div class="icon-div">
            <router-link :to="'/insurance/'+this.$route.params.type" tag="div">
                <p>
                    <span class="complaint-icon"></span>
                </p>
                <p class="label">安全保障</p>
            </router-link>
            <router-link :to="'/articleList/0/'+this.$route.params.type" tag="div">
                <p>
                    <span class="notice-icon"></span>
                </p>
                <p class="label">最新公告</p>
            </router-link>
            <router-link :to="'/articleList/1,2,3/'+this.$route.params.type" tag="div" class="last">
                <p>
                    <span class="article-icon"></span>
                </p>
                <p class="label">新闻动态</p>
            </router-link>
        </div>
        <div class="icon-div last">
            <router-link :to="'/questionList/'+this.$route.params.type" tag="div">
                <p>
                    <span class="question-icon"></span>
                </p>
                <p class="label">常见问题</p>
            </router-link>
    
            <router-link :to="'/aboutUs/'+this.$route.params.type" tag="div">
                <p>
                    <span class="about-us-icon"></span>
                </p>
                <p class="label">关于我们</p>
            </router-link>
    
            <div class="last">
                <a href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIwNzQ0ODQ1Mw==&scene=124#wechat_redirect">
                    <p>
                        <span class="wechat-icon"></span>
                    </p>
                    <p class="label">关注微信</p>
                </a>
            </div>
        </div>
        <div class="more-fill-div" :style="{height:''+fillH}">
            <p class="bottom-p">
                <span>客服电话：</span>
                <span style="color:#346fca">400-820-2450</span>
                <span>（工作日9:00-18:00）</span>
            </p>
        </div>
        <bottomMenu></bottomMenu>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
import Vue from 'vue'

// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
import bottomMenu from 'components/bottom-menu.vue'

export default {
    data() {
        return {
            msg: '首页',
            bgW: window.innerWidth + 'px',
            bgH: window.innerWidth * (950 / 1242) + 'px',
            fillH: '24px',
        }
    },
    components: {
        bottomMenu
    },
    mounted() {
        console.log(this.$refs.more)
        this.fillH = window.innerHeight - this.$refs.more.offsetHeight - 44 + 'px'
    },
    methods: {

    }
}
</script>
<style scoped>
.more .banner {
    background: url(../../assets/images/more/banner.png) no-repeat;
    background-size: contain;
}

.more-fill-div {
    width: 100%;
    background: #F5F5F5;
}

.more .bottom-p {
    position: fixed;
    bottom: 44px;
    z-index: 1;
    text-align: center;
    color: #666;
    width: 100%;
    font-size: 1.2rem;
    height: 2rem;
    line-height: 2rem;
    background: #F5F5F5;
}
</style>