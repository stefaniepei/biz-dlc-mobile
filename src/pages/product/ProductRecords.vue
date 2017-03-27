<template>
    <div class="product-records">
        <ul>
            <li class="no-record"
                v-if="records === null">
                暂无数据
            </li>
            <li class="item"
                v-for="(record,index) in records">
                <div class="item-left">
                    <span class="s1">{{record.cellphone}}</span>
                    <span class="s2">{{record.investedAt|dateTimeFormat}}</span>
                </div>
                <div class="item-right">
                    <span class="s3">{{record.amount}}</span>
                </div>
            </li>
        </ul>
        <mugen-scroll :handler="fetchData"
                      :should-handle="loading">
            <div class="fetch-data">{{loadingTitle}}</div>
        </mugen-scroll>
    </div>
</template>
<script>
import MugenScroll from 'vue-mugen-scroll'

export default {
    data() {
        return {
            records: [{}],
            page: 1,
            loading: false,
            loadingTitle: '加载中...'
        }
    },
    mounted() {

    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.$parent.toEditTitle('投资记录')
            vm.fetchData()
        })
    },
    methods: {
        fetchData() {
            this.getProductRecords(this.$route.params.id)
        },
        getProductRecords(id) {
            let _this = this;
            let pageSize = 20
            this.$http.get(`/trades/invest/list`, { params: { prodCodeId: id, page: this.page, pageSize: pageSize } }).then(function (res) {
                if (_this.page === 1) {
                    _this.records = res.data.data
                } else {
                    _this.records.push(...res.data.data)
                }
                if (res.data.data.length == pageSize) {
                    _this.loading = true
                    _this.page++
                } else {
                    _this.loading = false
                    _this.loadingTitle = '暂无更多数据'
                }

            }).catch(function (err) {
                console.log(err)
            });
        },
    },
    components: {
        MugenScroll
    }
}
</script>
<style scoped>

.product-records .item {
    border-bottom: 1px solid #dedede;
    display: -moz-box;
    display: -webkit-box;
    display: box;
    width: 100%;
    height: 4.5rem;
    box-sizing: border-box;
}

.product-records .item .item-left {
    -moz-box-flex: 1;
    -webkit-box-flex: 1;
    box-flex: 1;
    padding-left: 10%;
    width: 45%;
}

.product-records .item .s1 {
    padding-top: 0.5rem;
    font-size: 1.2rem;
    box-sizing: border-box;
    display: block;
    line-height: 2rem;
}

.product-records .item .s2 {
    font-size: 1.1rem;
    color: #8d8d8d;
    display: block;
}

.product-records .item .s3 {
    font-size: 1.2rem;
}

.product-records .item .item-right {
    -moz-box-flex: 1;
    -webkit-box-flex: 1;
    box-flex: 1;
    padding-top: 1.7rem;
    box-sizing: border-box;
    width: 10%;
}

</style>