<template>
    <div class="content">
        <bottomMenu></bottomMenu>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
import Vue from 'vue'

// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
import bottomMenu from 'components/bottom-menu.vue'

export default {
    data() {
        return {
            msg: '首页',
        }
    },
    components: {
        bottomMenu
    },
    mounted() {
        
    },
    methods: {
        
    }
}
</script>