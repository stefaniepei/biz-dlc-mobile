<template></template>
<script>
export default {
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.$store.dispatch('USER_LOGIN_OUT')
            vm.$router.push({ path: '/' })
        })
    },

}
</script>