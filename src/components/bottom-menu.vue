<template>
    <div class="WeChat-footer">
        <ul>
            <router-link to="/" tag="li">
                <img src="../assets/images/account/home-on.png" v-if="'/' == this.$route.path" />
                <img src="../assets/images/account/home-off.png" v-else />
                <p class="dlc-blue" v-if="'/' == this.$route.path">首页</p>
                <p v-else>首页</p>
            </router-link>
            <router-link to="/productAllList" tag="li">
                <img src="../assets/images/account/financing-on.png" v-if="'/productAllList' == this.$route.path" />
                <img src="../assets/images/account/financing-off.png" v-else />
                <p class="dlc-blue" v-if="'/productAllList' == this.$route.path">理财</p>
                <p v-else>理财</p>
            </router-link>
            <router-link to="/more/WeChat" tag="li">
                <img src="../assets/images/account/more-on.png" v-if="'/more/WeChat' == this.$route.path" />
                <img src="../assets/images/account/more-off.png" v-else />
                <p class="dlc-blue" v-if="'/more/WeChat' == this.$route.path">服务</p>
                <p v-else>服务</p>
            </router-link>
            <router-link to="/info" tag="li">
                <img src="../assets/images/account/my-on.png" v-if="'/info' == this.$route.path" />
                <img src="../assets/images/account/my-off.png" v-else />
                <p class="dlc-blue" v-if="'/info' == this.$route.path">我的</p>
                <p v-else>我的</p>
            </router-link>
    
            <div class="clear"></div>
        </ul>
    </div>
</template>
<script>
export default {
    mounted() {

    },
}
</script>
<style scoped>
.WeChat-footer {
    width: 100%;
    background: #F9F9F9;
    border-top: 1px solid #d8d8d8;
    box-sizing: border-box;
    overflow: hidden;
    bottom: 0;
    right: 0;
    left: 0;
    position: fixed;
    z-index: 1;
}

.WeChat-footer li {
    float: left;
    width: 25%;
    text-align: center;
    padding-top: 2%;
}

.WeChat-footer li img {
    width: 20px;
    height: 20px;
}

.WeChat-footer li p {
    width: 100%;
    font-size: 1.2rem;
    color: #666;
}

.WeChat-footer li p.dlc-blue {
    color: #346FCA;
}
</style>