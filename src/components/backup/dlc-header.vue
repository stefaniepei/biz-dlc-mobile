<template>
    <div>
        <div class="WeChat-header" id="header">
            <div class="prev" id="headerBack" @click="back"></div>
            <div class="header-title" id="headerTitle">{{headerTitle}}</div>
            <div class="header-nav" id="login" v-show="loginIn">
                <span class="header-only"></span>
                <span class="header-bar"></span>
                <span class="header-bar"></span>
                <span class="header-bar"></span>
            </div>
            <div class="header-reg-log" id="logout" v-show="loginOut">
                <router-link to="/signin">登录</router-link> |
                <router-link to="/regup">注册</router-link>
            </div>
        </div>
        <div class="wa-mask" id="waMask"></div>
        <div class="navmenu" id="navmenu" v-show="loginIn">
            <ul>
                <li>
                    <router-link to="/financialList">
                        <i class="lc"></i>
                        <p>我的理财</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/orderList">
                        <i class="zjgl"></i>
                        <p>我的订单</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/capitalList">
                        <i class="tz"></i>
                        <p>资金明细</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/account">
                        <i class="zh"></i>
                        <p>我的账户</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/recharge">
                        <i class="cz"></i>
                        <p>充值</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/cash">
                        <i class="tx"></i>
                        <p>提现</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/invite">
                        <i class="yqyl"></i>
                        <p>邀请有礼</p>
                    </router-link>
                </li>
                <li>
                    <span id="logoutBut">
                        <i class="tc"></i>
                        <p>退出登录</p>
                    </span>
                </li>
            </ul>
        </div>
        <div class="margin-top-header"></div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            loginIn: false,
            loginOut: true
        }
    },
    computed: mapGetters([
        'headerTitle'
    ]),
    mounted() {

    },
    watch: {
        $route(to) {
            this.$store.dispatch('EDIT_TITLE')
        }
    },
    methods: {
        back() {
            this.$router.back()
        }
    }
}
</script>
<style scoped>
.WeChat-header {
    width: 100%;
    height: 50px;
    background: #346faf;
    line-height: 50px;
    color: #fff;
    top: 0;
    position: fixed;
    z-index: 99;
    box-sizing: border-box;
}

.WeChat-header .prev {
    position: fixed;
    width: 40px;
    height: 48px;
    background: url('../assets/images/headerNav/back_icon2.png') no-repeat center center;
    background-size: 40%;
    left: 0px;
    top: 1px;
}

.WeChat-header .prev a {
    display: inline-block;
    width: 40px;
    height: 48px;
}

.WeChat-header .header-title {
    text-align: center;
    font-size: 1.6rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 80%;
    padding-left: 20%;
}

.WeChat-header .header-but {
    position: fixed;
    width: 25px;
    height: 25px;
    right: 10px;
    top: 13px;
    background: url('../assets/images/headerNav/menu.png') no-repeat;
    background-size: 100% 100%;
}

.WeChat-header .header-reg-log {
    position: fixed;
    right: 15px;
    top: 0px;
}

.WeChat-header .header-reg-log a {
    color: #fff;
}

.wa-mask {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.2);
    z-index: 2015;
    display: none;
}

.navmenu {
    position: fixed;
    top: 4.5rem;
    right: 0;
    background: #fff;
    width: 100%;
    z-index: 2050;
    display: none;
}

.navmenu ul {
    padding: 0.5rem 0;
    position: relative;
}

.navmenu ul li {
    display: inline-block;
    width: 25%;
    float: left;
    text-align: center;
    margin: 0.5rem 0;
}

.navmenu ul li>a,
.navmenu ul li>span {
    display: inline-block;
}

.navmenu ul li i {
    display: inline-block;
    width: 2.9rem;
    height: 2.9rem;
}

.navmenu ul li i.lc {
    background: url("../assets/images/headerNav/myfinancial_icon.png") no-repeat center center;
    background-size: auto 100%;
}

.navmenu ul li i.cz {
    background: url("../assets/images/headerNav/recharge_icon.png") no-repeat center center;
    background-size: auto 100%;
}

.navmenu ul li i.tx {
    background: url("../assets/images/headerNav/withdrawals_icon.png") no-repeat center center;
    background-size: auto 100%;
}

.navmenu ul li i.zh {
    background: url("../assets/images/headerNav/myaccount_icon.png") no-repeat center center;
    background-size: auto 100%;
}

.navmenu ul li i.tz {
    background: url("../assets/images/headerNav/financial_details_icon.png") no-repeat center center;
    background-size: auto 100%;
}

.navmenu ul li i.tc {
    background: url("../assets/images/headerNav/signout_icon.png") no-repeat center center;
    background-size: auto 100%;
}

.navmenu ul li i.yqyl {
    background: url("../assets/images/headerNav/invitation_icon.png") no-repeat center center;
    background-size: auto 100%;
}

.navmenu ul li i.zjgl {
    background: url("../assets/images/headerNav/myorder_icon.png") no-repeat center center;
    background-size: auto 100%;
}

.navmenu ul li p {
    padding: 0.3rem 0;
    font-size: 1.3rem;
    color: #6c6c6c;
}

.margin-top-header {
    width: 100%;
    margin-top: 50px;
}

.header-nav {
    position: fixed;
    float: right;
    padding: 10px;
    border-radius: 4px;
    right: 5px;
    top: 8px;
}

.header-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
}

.header-nav .header-bar {
    display: block;
    width: 23px;
    height: 2px;
    background-color: #fff;
    border-radius: 1px;
    margin-bottom: 5px;
}
</style>