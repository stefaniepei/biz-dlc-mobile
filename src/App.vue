<template>
  <div id="app">
	
	<mt-header title="点理财" :style="{backgroundColor:'#346FAF'}">
		<router-link to="/" slot="left">
			<mt-button icon="back"></mt-button>
		</router-link>
		<mt-button icon="more" slot="right"></mt-button>
	</mt-header>
	<keep-alive>
		<router-view class="router-view"></router-view>
	</keep-alive>
	<div class="nav" style="margin-top:2rem;">
		<ul>
			<li><hr/></li>
			<li style="text-align:center">
			<router-link to="/home" tag="span" active-class="active">
				<a href="javascript:;">首页</a> | 
			</router-link>
			<router-link to="/login" tag="span" active-class="active">
				<a href="javascript:;">登录</a> | 
			</router-link>
			<router-link to="/signup" tag="span" active-class="active">
				<a href="javascript:;">注册</a> | 
			</router-link>
				<router-link to="/productDetail/home/100049660" tag="span" active-class="active">
				<a href="javascript:;">项目详情</a>
			</router-link>
			</li>
			<li><hr/></li>
		</ul>
	</div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

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
			// console.log(to)
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