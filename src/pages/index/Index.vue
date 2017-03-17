<template>
    <div class="content">
        <dlc-swiper></dlc-swiper>
    </div>
</template>
<script>
    import dlcSwiper from 'components/dlc-swiper.vue'
    export default{
        data() {
            return {
                msg:'首页'
            }
        },
		components:{
			dlcSwiper
		},
    }
</script>