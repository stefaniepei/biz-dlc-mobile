<template>
    <div class="page setting">
        <mt-header title="账户设置"
                   class="header-bg-color">
            <router-link to="/info"
                         slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
    
        <div>
            <section class="arrow-line">
                <em><img src="../../assets/images/account/me.png" /></em>
                <span>手机号</span>
                <span class="float-right margin-right-15">{{this.cellphone}}</span>
            </section>

            <router-link to="/changePwd/back"
                            class="arrow-line"
                            tag="section">
                <em><img src="../../assets/images/account/login-pwd.png" /></em>
                <span>登录密码</span>
                <span style="float: right;">修改
                        <span class="arrow-right"></span>
                </span>
            </router-link>

            <router-link to="/transactionPwd" class="arrow-line" tag="section">
                <em><img src="../../assets/images/account/login-out.png" /></em>
                <span>退出</span>
                <span style="float: right;">退出
                        <span class="arrow-right"></span>
                </span>
            </router-link>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            cellphone:''
        }
    },
    computed:mapGetters([
        'userAccount'
    ]),
    mounted(){
        this.cellphone = this.userAccount.cellphone
    }
}
</script>
<style scoped>


.bank-N-O {
    float: right;
    line-height: 4rem;
    margin-right: 1.5rem;
}

.bank-top,
.bank-bottom {
    display: block;
    line-height: 2rem;
    padding-left: 0.5rem;
}

.bank-bottom em {
    padding: 0;
}
</style>