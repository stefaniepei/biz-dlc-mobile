<template>
	<div id="app">
	
		<mt-header :title="title"
		           :style="{backgroundColor:'#346FAF'}">
			<router-link to="/"
			             slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<keep-alive>
			<router-view class="router-view"></router-view>
		</keep-alive>
		<div class="nav"
		     style="margin-top:2rem;">
			<ul>
				<li>
					<hr/>
				</li>
				<li style="text-align:center">
					<router-link to="/home"
					             tag="span"
					             active-class="active">
						<a href="javascript:;">首页</a> |
					</router-link>
					<router-link to="/login"
					             tag="span"
					             active-class="active">
						<a href="javascript:;">登录</a> |
					</router-link>
					<router-link to="/signup"
					             tag="span"
					             active-class="active">
						<a href="javascript:;">注册</a> |
					</router-link>
					<router-link to="/productDetail/home/100049660"
					             tag="span"
					             active-class="active">
						<a href="javascript:;">项目详情</a> |
					</router-link>
				</li>
				<li style="text-align:center">
					<router-link to="/financialList"
					             tag="span"
					             active-class="active">
						<a href="javascript:;">我的理财</a> |
					</router-link>
					<router-link to="/orderList"
					             tag="span"
					             active-class="active">
						<a href="javascript:;">我的订单</a> |
					</router-link>
					<router-link to="/capitalList"
					             tag="span"
					             active-class="active">
						<a href="javascript:;">资金明细</a> |
					</router-link>
					<router-link to="/account"
					             tag="span"
					             active-class="active">
						<a href="javascript:;">我的账户</a>
					</router-link>
				</li>
				<li style="text-align:center">
					<router-link to="/recharge"
					             tag="span"
					             active-class="active">
						<a href="javascript:;">充值</a> |
					</router-link>
					<router-link to="/cash"
					             tag="span"
					             active-class="active">
						<a href="javascript:;">提现</a> |
					</router-link>
					<router-link to="/invite"
					             tag="span"
					             active-class="active">
						<a href="javascript:;">邀请有礼</a> |
					</router-link>
					<router-link to="/logout"
					             tag="span"
					             active-class="active">
						<a href="javascript:;">退出登录</a>
					</router-link>
				</li>
				<li>
					<hr/>
				</li>
			</ul>
		</div>
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
		
	]),
	mounted() {

	},
	watch: {
		$route(to) {

		}
	},
	methods: {
		toEditTitle(title){
			this.title = title
		}
	},
	components: {

	}
}

</script>

<style scoped>

</style>