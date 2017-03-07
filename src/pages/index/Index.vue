<template>
    <div class="content">
        <Swiper></Swiper>
        <span>{{msg}}</span>
    </div>
</template>
<script>
    import Swiper from 'components/Swiper.vue'
    export default{
        data() {
            return {
                msg:'首页'
            }
        },
		components:{
			Swiper
		},
    }
</script>