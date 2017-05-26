<template>
    <div class="invite">
        <mt-header title="邀请有礼" class="header-bg-color">
            <router-link to="/info" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
    
        <div class="politebanner">
            <img src="../../assets/images/account/polirebanner.png" class="img-responsive">
        </div>
    
        <div v-if="this.userAccount['hasCard']">
            <div>
                <div>
                    <p class="invite-title">您的个人二维码名片</p>
                    <p class="qrCode"></p>
                </div>
                <div class="share-friend">
                    <button class="btn btn-big">立即邀请</button>
                </div>
            </div>
            <div class="fill-div-05"></div>
            <div class="inviteFriend">
                <div class="bdashed">
                    <h4 class="friend-title">好友投资奖励</h4>
                    <div class="friend-content">
                        <div class="w48 inline-block">
                            <span class="margin-left-1">现金总奖励</span>
                        </div>
                        <div class="w48 inline-block total-reward">
                            <span class="margin-right-1">{{total}}元</span>
                        </div>
                    </div>
                </div>
            </div>
    
        </div>
    
        <div class="authbutton" v-else>
            <p>主人,请先
                <a href="/bindCard">实名认证和绑卡</a>,方便邀请好友和提现奖励哦！</p>
            <button class="bindCardBut">立即绑卡</button>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
import { mapGetters } from 'vuex'
import routeData from 'mixins/routeData.js'

export default {
    mixins: [routeData],
    routeData() {
        return {
            total: 0.00,
        }
    },
    computed: mapGetters([
        'userAuth',
        'userAccount'
    ]),
    created() {
        // this.fetchData()
    },
    mounted() {

    },
    methods: {
        fetchData() {
            let _this = this
            // app.account.getBizAccountInfo
            this.$http.get(`/account/points/jour`, { params: { page: this.page1, pageSize: this.pageSize }, headers: { 'Authorization': this.userAuth } })
                .then((res) => {
                    _this.total = res.data.asset.totalReward
                }).catch((err) => Toast(err))
        },
    },
    components: {

    }
}
</script>
<style scoped>
.img-responsive {
    max-width: 100%;
    height: auto;
}

.invite-title {
    font-size: 1.4rem;
    color: #0b3b6a;
    text-align: center;
}

.share-friend {
    width: 90%;
    margin: 1rem auto;
}

.bdashed {
    border: 2px dashed #CFF;
    border-radius: 3px;
    width: 90%;
    margin: 1rem auto;
}

.friend-title {
    color: #ff7742;
    font-size: 1.2rem;
    text-align: center;
    height: 3rem;
    line-height: 3rem;
}

.friend-content {
    height: 3rem;
    line-height: 3rem;
}

.total-reward {
    color: #ff7742;
    float: right;
    text-align: right;
}
</style>