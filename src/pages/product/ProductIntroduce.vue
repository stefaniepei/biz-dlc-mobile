<template>
    <div>
        <mt-header title="产品介绍" class="header-bg-color">
            <router-link :to="'/productDetail/'+this.$route.params.source+'/'+this.$route.params.id" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        {{msg}}
    </div>
</template>
<script>
    export default{
        data() {
            return {
                msg:'产品介绍'
            }
        },
        mounted(){
		},
    }
</script>
<style scoped>
</style>