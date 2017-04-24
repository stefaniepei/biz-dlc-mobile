<template>
    <div class="WeChat-footer">
    <ul>
        <router-link to="/" class="" tag="li">
            <img src="../assets/images/account/home-on.png" v-if="'/' == this.$route.path" />
            <img src="../assets/images/account/home-off.png" v-else />
            <p>首页</p>
        </router-link>
        <router-link to="/productAllList" class="" tag="li">
            <img src="../assets/images/account/my-on.png" v-if="'/productAllList' == this.$route.path" />
            <img src="../assets/images/account/my-off.png" v-else />
            <p>理财</p>
        </router-link>
        <router-link to="/info" class="" tag="li">
            <img src="../assets/images/account/home-on.png" v-if="'/info' == this.$route.path" />
            <img src="../assets/images/account/home-off.png" v-else />
            <p>我</p>
        </router-link>
        <router-link to="/more/WeChat" class="" tag="li">
            <img src="../assets/images/account/more-on.png" v-if="'/more/WeChat' == this.$route.path" />
            <img src="../assets/images/account/more-off.png" v-else />
            <p>更多</p>
        </router-link>

        <div class="clear"></div>
    </ul>
</div>
</template>
<script>
    export default{
        mounted() {
            console.log(this)
        },
    }
</script>
<style scoped>
.WeChat-footer {
    width: 100%;
    background: #F9F9F9;
    border-top: 1px solid #d8d8d8;
    bottom: 0;
    position: fixed;
    z-index: 99;
    box-sizing: border-box;
    overflow: hidden;
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
</style>