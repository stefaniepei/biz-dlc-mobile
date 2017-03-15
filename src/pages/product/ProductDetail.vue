<template>
    <div class="product-detail container">
        <div class="row prod-info">
            <div class="prod-earnings">
                <section class="prod-earnings-left">
                    <div class="col-xs-12">
                        <p class="text-center">预期年化收益<span id="prodIconInfo"></span></p>
                    </div>
                    <div class="col-xs-12 text-center">
                        <span class="earnings">{{productDetail.expectYearReturn}}</span>
                        <span v-if="productDetail.invest2YearReturn > 0" class="earnings">~{{productDetail.invest2YearReturn}}</span>
                        <span style="color:#ff7742">%</span>
                    </div>
                </section>
                <div id="prodStatus" class="prod-earnings-right"></div>
            </div>
            <div class="prod-coupons">

            </div>
            <section class="prod-invest">
                <div class="col-xs-5">
                    <p>{{productDetail.prodPeriod}}天</p>
                    <p>投资期限</p>
                </div>
                <div class="col-xs-2 text-center">
                    <div class="line"></div>
                </div>
                <div class="col-xs-5 text-right">
                    <p>{{productDetail.maxRaisedAmount|toMillion}}万</p>
                    <p>项目金额</p>
                </div>
            </section>
        </div>
         <section class="row" style="color:#a1a1a1;">
            <div class="col-xs-6">剩余可投(元)</div>
            <div class="col-xs-6 text-right">预计收益(元)</div>
        </section>
        <section class="row" style="color:#f08e68;">
            <div class="col-xs-6">{{productDetail.availableAmount|formatCurrency}}</div>
            <div id="exprctYearInterest" class="col-xs-6 text-right">{{exprctYearInterest}}</div>
        </section>

        <section class="input-group input-group-lg line">
            <span class="input-group-addon line-btn" @click="subtraction">&nbsp;&nbsp;-&nbsp;&nbsp;</span>
            <input id="buyAmount" type="text" class="form-control line-input text-center" :placeholder="Number.parseInt(productDetail.minApplyAmount)+'元起投,'+Number.parseInt(productDetail.minAddAmount)+'元递增'" v-model="buyAmount" @keyup="boolAmount">
            <span class="input-group-addon line-btn" @click="addition">&nbsp;&nbsp;+&nbsp;&nbsp;</span>
        </section>

        <section class="prod-explain">
            <div>
                <span>还款方式：</span><span class="invest-type">{{productDetail.interestType|productDict('interestTypeList')}}</span>
            </div>
            <CountDown></CountDown>
        </section>
        <section class="prod-fill">
        </section>
        <router-link :to="{name:'productInfo',params:{id:productDetail.prodCodeId,source:this.$route.params.source}}" class="prod-arrow-line" tag="section">
            <span>项目介绍</span>
            <span class="arrow-right"></span>
        </router-link>
        <router-link :to="{name:'productIntroduce',params:{id:productDetail.prodCodeId,source:this.$route.params.source}}" class="prod-arrow-line" tag="section">
            <span>产品介绍</span>
            <span class="arrow-right"></span>
        </router-link>
        <router-link :to="{name:'productRecords',params:{id:productDetail.prodCodeId,source:this.$route.params.source}}" class="prod-arrow-line" tag="section">
            <span>投资记录</span>
            <span class="arrow-right"></span>
        </router-link>
        <section style="height:1rem;margin-top:0.5rem">
        </section>
        <section>
            <button id="createOrderBtn" type="button" class="btn btn-primary btn-lg btn-block pay-timer" :disabled="btnDisabled" v-on:btnState="toDisabled">{{btnVal}}</button>
        </section>
        <section class="row login-info">
            <span class="col-xs-9">
                账户余额（元）：
                <span v-show="!loginOut">{{balance}}</span>
                <span v-show="loginOut"><a href="/login">登录可见</a></span>
            </span>
            <span class="col-xs-3 text-right"><a href="/recharge">充值 > </a></span>
        </section>
    </div>
</template>
<script>
    import {mapGetters,mapState} from 'vuex'
    import CountDown from 'components/CountDown.vue'

    export default{
        data(){
            return {
                loginOut:true,
                balance:'0.00',
                productDetail:{},
                exprctYearInterest:'0.00',
                buyAmount:'',
                btnDisabled:false,
                btnVal:'立即购买'
            }
        },
        // computed: mapState({ 
        //     user: (state) => state.user
        // }),

        // header:(state,title) => state.header
        computed:mapGetters([
			'user'
		]),
        watch: {
            
        },
        beforeRouteEnter (to, from, next) {
            next(vm=>{
                vm.getProductDetail(vm.$route.params.id)
            })
        },
        beforeRouteLeave (to, from, next) {
            next(vm=>{
                 vm.$store.dispatch('EDIT_TITLE')
            })
        },
        mounted () {
            
        },
        methods: {
            getProductDetail(id){
                let _this = this
                this.$http.get('/products/'+id).then(function(res){
                    _this.productDetail = res.data.data
                    _this.$store.dispatch('EDIT_TITLE',_this.productDetail.prodName)
                    _this.$store.dispatch('START_TIMER',Number.parseInt(_this.productDetail.ttl/1000))
                }).catch(function(err){
                    console.log(err)
                });
            },
            addition(){
                if(this.buyAmount === '')   this.buyAmount = 0
                let res = Number.parseInt(this.buyAmount) +  Number.parseInt(this.productDetail.minAddAmount)
                this.calu(res)
            },
            subtraction(){
                if(this.buyAmount === '')   this.buyAmount = 0
                let res = Number.parseInt(this.buyAmount) -  Number.parseInt(this.productDetail.minAddAmount)
                this.calu(res)
            },
            calu(res){
                if(res > Number.parseInt(this.productDetail.availableAmount)){
                    this.buyAmount = Number.parseInt(this.productDetail.availableAmount)
                }else if(res < Number.parseInt(this.productDetail.minApplyAmount)){
                    this.buyAmount = Number.parseInt(this.productDetail.minApplyAmount)
                }else{
                    if(res == '' || isNaN(res)){
                        this.buyAmount = ''
                    }else{
                        this.buyAmount = res
                    }
                }
                if(this.buyAmount !== ''){
                    this.exprctYearInterest = (Number.parseInt(this.buyAmount)*Number.parseInt(this.productDetail.expectYearReturn)/100/Number.parseInt(this.productDetail.yearDays)*Number.parseInt(this.productDetail.prodPeriod)).toFixed(2)
                }else{
                    this.exprctYearInterest = '0.00'
                }
            },
            boolAmount(){
                this.calu(Number.parseInt(this.buyAmount))
            },
            toEnabled(){
                this.btnDisabled = false
                this.btnVal = '立即购买'
            },
            toDisabled(){
                this.btnDisabled = 'disabled'
                this.btnVal = '已过期'
            }
        },
        components: {
            CountDown
        }
    }
</script>
<style scoped>
.product-detail {
    background: #fff;
}
.product-detail .line-btn{
    color:#398be1;
    /*width: 4rem;*/
    background: #fff;
    border-color: #eee;
}
.product-detail .line-input{
    border-color: #eee;
    box-shadow: none;
    font-size: 1.4rem;
}

.product-detail .line input::-webkit-input-placeholder {
    color: #8d8d8d;
    text-align: center;
    /* WebKit browsers */
}

.product-detail .line input:-moz-placeholder {
    color: #8d8d8d;
    text-align: center;
    /* Mozilla Firefox 4 to 18 */
}

.product-detail .line input::-moz-placeholder {
    color: #8d8d8d;
    text-align: center;
    /* Mozilla Firefox 19+ */
}

.product-detail .line input:-ms-input-placeholder {
    color: #8d8d8d;
    text-align: center;
    /* Internet Explorer 10+ */
}

.product-detail .prod-info {
    background: #346faf;
    color: #fff;
}

.product-detail section {
    padding-left: 10%;
    padding-right: 10%;
    margin-top: 1rem;
    white-space: nowrap;
}

.product-detail .prod-info .prod-earnings {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
}

.product-detail .prod-info .prod-earnings .earnings {
    font-size: 2.2rem;
    color: #ff7742;
}

.product-detail .prod-info .prod-coupons {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
}

.product-detail .prod-info .prod-invest {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
}

.product-detail .prod-explain div{
    color: #a1a1a1;
    font-size: 1.2rem;
}

.product-detail .prod-fill {
    width: 100%;
    height: 0.5rem;
    background: #f5f5f5;
}

.product-detail .prod-arrow-line {
    border-bottom: 1px solid #eee;
    font-size: 1.5rem;
    color: #999;
    height: 5rem;
    line-height: 5rem;
    margin-top: 0rem;
}

.product-detail .prod-arrow-line .arrow-right {
    background: url("../../assets/images/product/arrow_right.png") no-repeat;
    background-size: cover;
    background-position: center center;
    width: 40px;
    height: 20px;
    line-height: 20px;
    margin-top: 2rem;
    float:right;
}

.product-detail .login-info {
    padding-bottom: 1rem;
}

.product-detail .login-info a {
    color: #3892C2;
}




.product-detail .prod-info .prod-coupons .prod-coupons-fx {
    background: url("../../assets/images/product/aim_coupon_fx_white.png") no-repeat;
    background-size: cover;
    display: inline-block;
    margin-left: 5px;
    width: 50px;
    height: 18px;
}

.product-detail .prod-info .prod-coupons .prod-coupons-mj {
    background: url("../../assets/images/product/aim_coupon_mj_white.png") no-repeat;
    background-size: cover;
    display: inline-block;
    margin-left: 5px;
    width: 50px;
    height: 18px;
}

.product-detail .prod-info .prod-coupons .prod-coupons-jx {
    background: url("../../assets/images/product/aim_coupon_jx_white.png") no-repeat;
    background-size: cover;
    display: inline-block;
    margin-left: 5px;
    width: 50px;
    height: 18px;
}

.product-detail .prod-info .prod-coupons .prod-coupons-jj {
    background: url("/images/jjsx/img_voucher05@3x.png") no-repeat;
    background-size: cover;
    display: inline-block;
    margin-left: 5px;
    width: 112px;
    height: 18px;
}


.product-detail .prod-info .prod-earnings .prod-status-used {
    background: url("../../assets/images/product/newstate_img.png") no-repeat;
    background-size: cover;
}

.product-detail .prod-info .prod-earnings .prod-status-overdue {
    background: url("../../assets/images/product/aim_newerexp_overdue.png") 0px 50% no-repeat;
    background-size: cover;
}

.product-detail .prod-info .prod-earnings .prod-status-none {
    background: url("../../assets/images/product/aim_newerexp_none.png") 0px 50% no-repeat;
    background-size: cover;
}

.product-detail .prod-info .prod-earnings .product_payment {
    background: url("../../assets/images/product/product_payment.png") no-repeat;
    background-size: cover;
}

.product-detail .prod-info .prod-earnings .product_settlement {
    background: url("../../assets/images/product/product_settlement.png") 0px 50% no-repeat;
    background-size: cover;
}

.product-detail .prod-info .prod-earnings .product_sold {
    background: url("../../assets/images/product/product_sold.png") 0px 50% no-repeat;
    background-size: cover;
}

.product-detail .prod-info .prod-earnings .product_standard {
    background: url("../../assets/images/product/product_standard.png") 0px 50% no-repeat;
    background-size: cover;
}
</style>