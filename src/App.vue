<template>
  <div id="app">
	<HeaderNav v-show="headerDisplay"></HeaderNav>
	<keep-alive>
		<router-view class="router-view"></router-view>
	</keep-alive>
	<div class="nav">
		<ul>
			<li>----------------------</li>
			<router-link to="/home" tag="li" active-class="active">
				<a href="javascript:;">首页</a>
			</router-link>
			<router-link to="/login" tag="li" active-class="active">
				<a href="javascript:;">登录</a>
			</router-link>
			<router-link to="/signup" tag="li" active-class="active">
				<a href="javascript:;">注册</a>
			</router-link>
				<router-link to="/productDetail/100049660/home" tag="li" active-class="active">
				<a href="javascript:;">项目详情</a>
			</router-link>
		</ul>
	</div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import HeaderNav from 'components/HeaderNav.vue'

  export default {
		data() {
            return {}
    },
    computed:mapGetters([
			'headerDisplay'
	]),
	mounted(){
		// var path=this.$router.path.substring(1);
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
		HeaderNav
	}
  }

</script>

<style scoped>

</style>