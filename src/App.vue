<template>
  <div id="app">
		<div class="nav">
		<ul>
	    	<router-link to="/home" tag="li" active-class="active">
	    		<a href="javascript:;">首页</a>
	    	</router-link>
	    	<router-link to="/login" tag="li" active-class="active">
	    		<a href="javascript:;">登录</a>
	    	</router-link>
	    	<router-link to="/signup" tag="li" active-class="active">
	    		<a href="javascript:;">注册</a>
	    	</router-link>
				<router-link to="/account" tag="li" active-class="active">
	    		<a href="javascript:;">我的账户</a>
	    	</router-link>
	    </ul>
	</div>
	<keep-alive>
		<router-view class="router-view"></router-view>
	</keep-alive>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
		data() {
            return {}
    },
    computed:mapGetters([
			'headerState'
		]),
		mounted(){
			// var path=this.$route.path.substring(1);
			// this.headerChange(path);
		},
		watch:{
			$route(to){
				// var path=to.path.substring(1);
				// this.headerChange(path);
			}
		},
		methods:{
			headerChange(path){
				// if(path=='user-info' || path=='user-reg' || path=='user-login' || path.indexOf('article')!=-1){
				// 	this.$store.dispatch('SHOW_HEAD_FAIL')
				// }else{
				// 	this.$store.dispatch('SHOW_HEAD_SUCC')
				// }
			}
		},
		components:{
			
		}
  }

</script>

<style scoped>

</style>