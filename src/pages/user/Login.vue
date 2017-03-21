<template>
    <div class="container reg-log">
    <div class="company-logo">
        <img src="../../assets/images/register/logo.png">
    </div>
    
    <div class="marReg">
        <input type="text" maxlength="11" placeholder="请输入手机号码" :value="userName">
    </div>
    
    <div class="marReg">
        <input type="password" maxlength="16" placeholder="请输入密码" :value="loginPassword">
    </div>
    
    <div class="errInfo">
        <p class="loginP" id="showError"></p>
    </div>

    <div class="marReg no-boder">
        <button type="button" class="btn btn-normal btn-login" id="loginBtn">登录</button>
    </div>
    
    <div class="login-link">
        <router-link to="/signup" class="fz-normal" tag="a">立即注册</router-link>
        <router-link to="/forgetPwd/back" class="fz-normal float-right" tag="a">忘记密码？</router-link>
    </div>
</div>
</template>
<script>
    import { Toast } from 'mint-ui'

    export default{
        data() {
            return {
                userName:'15103160001',
                loginPassword:'q1111111'
            }
        },
        mounted(){
			console.log(this)
            Toast('Upload Complete')
            Toast({
                message: 'operation success',
                iconClass: 'icon icon-success',
                position: 'bottom',
           });
		},
    }
</script>
<style scoped>
.reg-log{
    width: 90%;
    margin: 0 auto;
}
.company-logo {
    width: 100%;
    height: auto;
    text-align: center;
    margin: 2rem 0;
}

.company-logo img {
    width: 50%;
}

.marReg {
    margin-bottom: 1rem;
    border-bottom: 1px solid #e5e5e5;
}

.reg-log input {
    width: 100%;
    padding: 5px;
    font-size: 1rem;
    border: none;
}

.btn-login {
    width: 100%;
    height: 38px;
    letter-spacing: 4px;
    margin-top: 2rem;
    background-color: #3a80c8;
    color: #fff;
    border: 0;
    font-size: 1.2rem;
    border-radius: 5px;
}

.login-link {
    position: relative;
    font-size: 1.1rem;
    padding-left: 10px;
}

.login-link span {
    color: #8d8d8d;
}

.login-link span a {
    color: #346faf;
}


</style>