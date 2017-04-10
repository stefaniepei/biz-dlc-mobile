<template>
    <div class="setting">
        <mt-header title="账户设置"
                   class="header-bg-color">
            <router-link to="/info"
                         slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
    
        <div class="accountInfo">
            <h5>个人信息</h5>
            <div class="container">
                <section class="arrow-line">
                    <em><img src="../../assets/images/account/phone_icon.png" /></em>
                    <span>手机号</span>
                    <span class="float-right margin-right-15">137****2216</span>
                </section>
    
                <section class="arrow-line">
                    <em><img src="../../assets/images/account/name_authentication_icon.png" /></em>
                    <span>实名认证</span>
                    <span class="float-right margin-right-15">王**(092X)</span>
                </section>
    
                <section class="arrow-line">
                    <em><img src="../../assets/images/account/bank_card_icon.png" /></em>
                    <span>银行卡</span>
                    <div class="bank-N-O">
                        <div class="inline-block float-right">
                            <span class="bank-top">中国银行</span>
                            <span class="dlc-blue bank-bottom">尾号<em>9629</em></span>
                        </div>
                        <div class="inline-block bank-icon bank_icon_104"></div>
                    </div>
                </section>
            </div>
        </div>
        <div class="accountInfo">
            <h5>账户安全</h5>
            <div class="container">
                <router-link to="/changePwd/back"
                             class="arrow-line"
                             tag="section">
                    <em><img src="../../assets/images/account/changePwd_icon.png" /></em>
                    <span>登录密码</span>
                    <span class="arrow-right"></span>
                </router-link>
    
                <router-link to="/transactionPwd"
                             class="arrow-line"
                             tag="section">
                    <em><img src="../../assets/images/account/transactionPwd_icon.png" /></em>
                    <span>交易密码</span>
                    <span style="color: #ff7742;float: right;">默认与初始登录密码一致
                                                                                <span class="arrow-right"></span>
                    </span>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    }
}
</script>
<style scoped>
.accountInfo h5 {
    padding: 1.5rem 1.5rem 1rem;
    color: #999;
    font-size: 1.4rem;
    background: #eee;
}

.arrow-line {
    border-bottom: 1px solid #eee;
    font-size: 1.4rem;
    color: #999;
    height: 4rem;
    line-height: 4rem;
    margin-top: 0rem;
}

.arrow-line em {
    padding-left: 1.5rem;
    padding-right: 0.8rem;
}

.arrow-line em img {
    width: 1.5rem;
    height: 1.5rem;
    vertical-align: middle;
}

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