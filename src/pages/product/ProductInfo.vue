<template>
    <div class="product-info" style="padding-bottom: 5%;">
        <mt-header title="产品介绍" class="header-bg-color">
            <router-link :to="'/productDetail/'+this.$route.params.source+'/'+this.$route.params.id" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="introduce" style="margin-top:0">
            <div class="introduce-title">
                <span class="introduce-icon"></span><span class="words">产品介绍</span>
            </div>
            <div class="introduce-content" id="prodIntroduce">
            </div>
        </div>
        <div class="introduce">
            <div class="introduce-title">
                <span class="usage-icon"></span><span class="words">资金用途</span>
            </div>
            <div class="introduce-content" id="prodUsage">
            </div>
        </div>
        <div class="introduce">
            <div class="introduce-title">
                <span class="information-icon"></span><span class="words">借款人基本信息</span>
            </div>
            <div class="introduce-content" id="prodInformation">
            </div>
        </div>
        <div class="introduce">
            <div class="introduce-title">
                <span class="archives-icon"></span><span class="words">借款档案</span>
            </div>
            <div class="introduce-content" id="prodArchives">
            </div>
        </div>
        <div class="introduce">
            <div class="introduce-title">
                <span class="attacheds-icon"></span><span class="words">产品附件</span>
            </div>
            <div class="introduce-content" id="prodAttacheds">
            </div>
        </div>
        <div class="introduce">
            <div class="introduce-title">
                <span class="strengths-icon"></span><span class="words">投资亮点</span>
            </div>
            <div class="introduce-content" id="prodStrengths">
            </div>
        </div>
        <div class="introduce">
            <div class="introduce-title">
                <span class="risk-icon"></span><span class="words">风险告知</span>
            </div>
            <div class="introduce-content" id="prodRisk">
                投资有风险，理财需谨慎！<span style="color:#40AEE7">【查看点理财安全保障计划】</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            productInfo: {}
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.getProductInfo(vm.$route.params.id)
        })
    },
    mounted() {

    },
    computed: {
    },
    methods: {
        getProductInfo(id) {
            let _this = this
            this.$http.get(`/products/${id}`).then((res) => {
                _this.productInfo = res.data.details
            }).catch((err) => Toast(err))
        },
    }
}
</script>
<style scoped>
.product-info {
    background: #EAEAEA;
}

.product-info .introduce {
    /*display: none;*/
    width: 98%;
    margin: 0 auto;
    background: #fff;
    border: 1px solid #d8d8d8;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-top: 5%;
}

.product-info .introduce .prodArchivesRow1 {
    width: 44%;
    display: inline-block;
    height: 25px;
    line-height: 25px;
    border-right: 1px solid #C2DDF9;
    border-top: 1px solid #C2DDF9;
    vertical-align: top;
}

.product-info .introduce .prodArchivesRow2 {
    width: 28%;
    display: inline-block;
    height: 25px;
    line-height: 25px;
    border-right: 1px solid #C2DDF9;
    border-top: 1px solid #C2DDF9;
    vertical-align: top;
}

.product-info .introduce .prodArchivesRow3 {
    width: 28%;
    display: inline-block;
    height: 25px;
    line-height: 25px;
    border-top: 1px solid #C2DDF9;
    vertical-align: top;
}

.product-info .introduce .prodArchivesTh {
    text-align: center;
    background: #C6DFF9;
}

.product-info .introduce .prodArchivesTd {
    text-align: center;
    background: #EDF6FE;
}

.product-info .introduce .prodArchivesTd .icon-audit-success {
    background: url("../../assets/images/product/icon_item_intro.png") no-repeat;
    background-size: cover;
    background-position: center center;
    width: 15px;
    height: 15px;
    margin-top: 4px;
    line-height: 25px;
    display: inline-block;
}

.product-info .introduce .introduce-title {
    height: 4rem;
    border-bottom: 1px solid #d8d8d8;
}

.product-info .introduce .introduce-title .introduce-icon {
    background: url("../../assets/images/product/aim_product_introduce.png") 0 50% no-repeat;
    background-size: cover;
    float: left;
    width: 1.8rem;
    height: 1.8rem;
    line-height: 4rem;
    display: inline-block;
    vertical-align: middle;
    margin: 1.2rem 0rem 0rem 1rem;
}

.product-info .introduce .introduce-title .usage-icon {
    background: url("../../assets/images/product/aim_product_fund.png") 0 50% no-repeat;
    background-size: cover;
    float: left;
    width: 1.8rem;
    height: 1.8rem;
    line-height: 4rem;
    display: inline-block;
    vertical-align: middle;
    margin: 1.2rem 0rem 0rem 1rem;
}

.product-info .introduce .introduce-title .information-icon {
    background: url("../../assets/images/product/icon_information.png") 0 50% no-repeat;
    background-size: cover;
    float: left;
    width: 1.5rem;
    height: 1.5rem;
    line-height: 4rem;
    display: inline-block;
    vertical-align: middle;
    margin: 1.28rem 0rem 0rem 1rem;
}

.product-info .introduce .introduce-title .archives-icon {
    background: url("../../assets/images/product/icon_archives.png") 0 50% no-repeat;
    background-size: cover;
    float: left;
    width: 1.8rem;
    height: 1.8rem;
    line-height: 4rem;
    display: inline-block;
    vertical-align: middle;
    margin: 1.2rem 0rem 0rem 1rem;
}

.product-info .introduce .introduce-title .attacheds-icon {
    background: url("../../assets/images/product/aim_product_file.png") 0 50% no-repeat;
    background-size: cover;
    float: left;
    width: 1.8rem;
    height: 1.8rem;
    line-height: 4rem;
    display: inline-block;
    vertical-align: middle;
    margin: 1.2rem 0rem 0rem 1rem;
}

.product-info .introduce .introduce-title .strengths-icon {
    background: url("../../assets/images/product/aim_product_invest.png") 0 50% no-repeat;
    background-size: cover;
    float: left;
    width: 1.5rem;
    height: 1.5rem;
    line-height: 4rem;
    display: inline-block;
    vertical-align: middle;
    margin: 1.28rem 0rem 0rem 1rem;
}

.product-info .introduce .introduce-title .risk-icon {
    background: url("../../assets/images/product/icon_risk.png") 0 50% no-repeat;
    background-size: cover;
    float: left;
    width: 1.5rem;
    height: 1.5rem;
    line-height: 4rem;
    display: inline-block;
    vertical-align: middle;
    margin: 1.28rem 0rem 0rem 1rem;
}

.product-info .introduce .words {
    height: 2rem;
    line-height: 4rem;
    color: #666;
    font-size: 1.4rem;
    margin-top: 1rem;
    margin-left: 1rem;
}

.product-info .introduce .words2 {
    color: #666;
    font-size: 1.2rem;
}

.product-info .introduce .words3 {
    height: 2rem;
    line-height: 2rem;
    color: #346faf;
    font-size: 1.3rem;
    margin-top: 1rem;
}

.product-info .introduce .cpms {
    background: url("../../assets/images/product/detail_img01.png") no-repeat;
    background-size: cover;
    width: 120px;
    height: 80px;
    margin: 0 auto;
}

.product-info .introduce .rhsy {
    background: url("../../assets/images/product/detail_img02.png") no-repeat;
    background-size: cover;
    width: 250px;
    height: 43px;
    margin: 0 auto;
}

.product-info .introduce .zlds {
    background: url("../../assets/images/product/detail_img03.png") no-repeat;
    background-size: cover;
    width: 120px;
    height: 80px;
    margin: 0 auto;
}

.product-info .introduce .introduce-content {
    font-size: 1rem;
    margin: 1rem 0rem 1rem 0rem;
    padding-left: 5%;
    padding-right: 5%;
}
</style>