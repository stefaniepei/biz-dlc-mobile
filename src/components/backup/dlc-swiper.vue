<template>
    <div class="swiper-container">
        <swiper :options="swiperOption" ref="indexSwiper">
            <!-- 幻灯内容 -->
            <swiper-slide v-for="(value, key, index) in imgData" :key="key">
                <a :href="''+value.fileUrl">
                    <div :style="{width:''+imgW,height:''+imgH,background:'url('+value.originUrl+') 0% 0% / 100% 100% no-repeat'}"></div>
                </a>
            </swiper-slide>
            <!-- ... -->
            <!-- 以下控件元素均为可选（使用具名slot来确定并应用一些操作控件元素） -->
            <div class="swiper-pagination" slot="pagination"></div>
            <!--<div class="swiper-button-prev" slot="button-prev"></div>
                    <div class="swiper-button-next" slot="button-next"></div>-->
            <div class="swiper-scrollbar" slot="scrollbar"></div>
        </swiper>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    data() {
        return {
            imgData: {},
            imgW: window.innerWidth + 'px',
            imgH: window.innerWidth * (480 / 1080) + 'px',
            swiperOption: {
                // 所有配置均为可选（同Swiper配置） 
                // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true) 
                // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象（假如你需要使用获取swiper对象来做什么事，那么这个属性一定要是true） 
                notNextTick: true,
                autoplay: 3000,
                // direction : 'vertical',
                grabCursor: true,
                // setWrapperSize :true,
                autoHeight: true,
                pagination: '.swiper-pagination',
                paginationClickable: true,
                prevButton: '.swiper-button-prev',
                nextButton: '.swiper-button-next',
                scrollbar: '.swiper-scrollbar',
                mousewheelControl: true,
                observeParents: true,
                // if you need use plugins in the swiper, you can config in here like this 
                // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger 
                debugger: true,
                // swiper callbacks 
                // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样 
                // onTransitionStart(swiper){
                // console.log(swiper)
                // },
                // more Swiper config ... 
                // ... 
            }
        }
    },
    components: {
        swiper,
        swiperSlide
    },
    mounted() {
        this.getSwiperData()
        // console.log('this is current swiper object', this.swiper)
        // this.swiper.slideTo(3, 1000, false)
    },
    computed: {
        swiper() {
            return this.$refs.indexSwiper.swiper
        }
    },
    methods: {
        getSwiperData() {
            let _this = this
            this.$http.get('/utils/bulletin', { params: { createdFrom: '2016-12-01', type: 3, page: 1, pageSize: 5 } })
                .then((res) => _this.imgData = res.data.data)
                .catch((err) => Toast(err))
        }
    }
}
</script>