<template>
    <div class="login">{{msg}}2222</div>
</template>
<script>
    export default{
        data() {
            return {
                msg:'登录'
            }
        },
        mounted(){
			console.log('login')
		},
    }
</script>
<style scoped>
    .login{
        background-color:red;
    }
</style>