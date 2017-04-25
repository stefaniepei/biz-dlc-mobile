<template>
	<div id="app">
		<transition enter-active-class="animated slideInLeft" leave-active-class="">
			<keep-alive>
				<router-view class="router-view"></router-view>
			</keep-alive>
		</transition>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	data() {
		return {
			title: '点理财'
		}
	},
	computed: mapGetters([
		'headerDisplay'
	]),
	mounted() {
		// var path=this.$router.path.substring(1);
		// this.headerChange(path);
	},
	watch: {
		$route(to) {
			// var path=to.path.substring(1);
			// console.log(to)
			// this.headerChange(path);
		}
	},
	methods: {
		headerChange(path) {
			// if(path=='user-info' || path=='user-reg' || path=='user-login' || path.indexOf('article')!=-1){
			// 	this.$store.dispatch('SHOW_HEAD_FAIL')
			// }else{
			// 	this.$store.dispatch('SHOW_HEAD_SUCC')
			// }
		},
	},
	components: {

	}
}

</script>

<style>

</style>