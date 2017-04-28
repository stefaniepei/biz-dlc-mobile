<template>
    <div class="inline-block">
        <span class="time">{{days}}</span><span>天</span>
        <span class="time">{{hours}}</span><span>小时</span>
        <span class="time">{{minutes}}</span><span>分</span>
        <span class="time">{{seconds}}</span><span>秒</span>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        }
    },
    computed: mapGetters([
        'timer',
        'leftSeconds'
    ]),
    watch: {
        'leftSeconds': 'clocking'
    },
    mounted() {

    },
    methods: {
        clocking() {
            this.$parent.toEnabled()
            let intDiff = Number.parseInt(this.leftSeconds)
            let { day, hour, minute, second } = 0
            let _this = this
            let colck
            clearInterval(colck)
            colck = setInterval(function () {
                if (intDiff >= 0) {
                    day = Math.floor(intDiff / (60 * 60 * 24))
                    hour = Math.floor(intDiff / (60 * 60)) - (day * 24)
                    minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60)
                    second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60)

                    if (minute <= 9) minute = '0' + minute;
                    if (second <= 9) second = '0' + second;

                    _this.days = day
                    _this.hours = hour
                    _this.minutes = minute
                    _this.seconds = second
                    intDiff--
                } else {
                    clearInterval(colck)
                    _this.$parent.toDisabled()
                }
            }, 1000)
            return true
        }
    }
}
</script>
<style scoped>
.time {
    color: #a1a1a1
}
</style>