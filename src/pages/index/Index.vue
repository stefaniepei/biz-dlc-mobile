<template>
    <div class="content">
        <mt-swipe :style="{width:''+imgW,height:''+imgH}" :speed="1000">
            <mt-swipe-item v-for="(value, key, index) in imgData" :key="key">
                <a :href="value.fileUrl">
                    <div :style="{width:''+imgW,height:''+imgH,background:'url('+value.originUrl+') 0% 0% / 100% 100% no-repeat'}"></div>
                </a>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
    import { Swipe, SwipeItem, Toast } from 'mint-ui'
    import Vue from 'vue'

    Vue.component(Swipe.name, Swipe)
    Vue.component(SwipeItem.name, SwipeItem)

    export default{
        data() {
            return {
                msg:'首页',
                imgData:{},
                imgW:window.innerWidth + 'px',
                imgH:window.innerWidth  * (480 / 1080) + 'px'
            }
        },
		components:{
            Swipe, 
            SwipeItem
		},
        mounted(){
            this.getSwiperData()
        },
        methods:{
            getSwiperData(){
                let _this = this
                this.$http.get('/utils/bulletin',{params:{createdFrom:'2016-12-01',type:3,page:1,pageSize:5}}).then(function(res){
                    _this.imgData = res.data.data
                }).catch(function(err){
                    Toast(err)
                });
            }
        }
    }
</script>