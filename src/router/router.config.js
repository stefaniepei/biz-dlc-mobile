import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)
/**
 * auth true 需要登录才能访问，false不需要登录，默认false
 */
const routes = [
    //index and 404
    {
        path: '/', //首页
        name: 'home',
        component: resolve => require(['../pages/index/Index.vue'], resolve)
    },
    {
        path: '/index', //首页
        redirect: '/'
    },
    {
        path: '/home', //首页
        redirect: '/'
    },
    {
        path: '/404', //404
        name: '404',
        component: resolve => require(['../pages/index/404.vue'], resolve)
    },


    // login-register
    {
        path: '/login', //登录
        component: resolve => require(['../pages/user/Login.vue'], resolve)
    },
    {
        path: '/login/:source', //登录
        component: resolve => require(['../pages/user/Login.vue'], resolve)
    },
    {
        path: '/logout', //登录
        component: resolve => require(['../pages/user/LoginOut.vue'], resolve)
    },
    {
        path: '/signup', //注册
        component: resolve => require(['../pages/user/Signup.vue'], resolve)
    },
    {
        path: '/register', //注册
        component: resolve => require(['../pages/user/Register.vue'], resolve)
    },
    {
        path: '/refer', //邀请注册
        component: resolve => require(['../pages/user/Refer.vue'], resolve)
    },
    {
        path: '/regAgreement', //
        component: resolve => require(['../pages/user/RegAgreement.vue'], resolve)
    },
    {
        path: '/regSuccess', //
        component: resolve => require(['../pages/user/RegSuccess.vue'], resolve)
    },
    {
        path: '/registerAgree/:type', //
        component: resolve => require(['../pages/user/RegisterAgree.vue'], resolve)
    },
    {
        path: '/entrustAgree/:type', //
        component: resolve => require(['../pages/user/EntrustAgree.vue'], resolve)
    },


    //pwd
    {
        path: '/forgetPwd/:source', //忘记密码
        component: resolve => require(['../pages/pwd/ForgetPwd.vue'], resolve)
    },
    {
        path: '/changePwd/:source', //忘记密码
        component: resolve => require(['../pages/pwd/ChangePwd.vue'], resolve)
    },
    {
        path: '/transactionPwd/:source', //忘记密码
        component: resolve => require(['../pages/pwd/TransactionPwd.vue'], resolve)
    },
    {
        path: '/changeTstPwd/:source', //忘记密码
        component: resolve => require(['../pages/pwd/ChangeTstPwd.vue'], resolve)
    },
    {
        path: '/cardNoPwd/:source', //忘记密码
        component: resolve => require(['../pages/pwd/CardNoPwd.vue'], resolve)
    },
    {
        path: '/cardHavePwd/:source', //忘记密码
        component: resolve => require(['../pages/pwd/CardHavePwd.vue'], resolve)
    },


    //product
    {
        name: 'productAllList',
        path: '/productAllList', //产品列表
        component: resolve => require(['../pages/product/ProductAllList.vue'], resolve)
    },
    {
        name: 'productList',
        path: '/productList/:type', //产品列表
        component: resolve => require(['../pages/product/ProductList.vue'], resolve)
    },
    {
        name: 'experienceProductDetail',
        path: '/experienceProductDetail/:source/:id', //新手产品详情
        component: resolve => require(['../pages/product/ExperienceProductDetail.vue'], resolve)
    },
    {
        name: 'experienceProductInfo',
        path: '/experienceProductInfo/:source/:id', //新手产品介绍
        component: resolve => require(['../pages/product/ExperienceProductInfo.vue'], resolve)
    },
    {
        name: 'productDetail',
        path: '/productDetail/:source/:id', //产品详情
        component: resolve => require(['../pages/product/ProductDetail.vue'], resolve)
    },
    {
        name: 'productInfo',
        path: '/productInfo/:source/:id', //项目介绍
        component: resolve => require(['../pages/product/ProductInfo.vue'], resolve)
    },
    {
        name: 'productInfoPic',
        path: '/productInfoPic/:source/:id/:pic', //项目介绍-图片
        component: resolve => require(['../pages/product/ProductInfoPic.vue'], resolve)
    },
    {
        name: 'productIntroduce',
        path: '/productIntroduce/:source/:id', //产品介绍
        component: resolve => require(['../pages/product/ProductIntroduce.vue'], resolve)
    },
    {
        name: 'productRecords',
        path: '/productRecords/:source/:id', //投资记录
        component: resolve => require(['../pages/product/ProductRecords.vue'], resolve)
    },


    //pay
    {
        name: 'bindCard',
        path: '/bindCard', //绑卡
        meta: {
            auth: true
        },
        component: resolve => require(['../pages/pay/BindCard.vue'], resolve)
    },
    {
        name: 'realName',
        path: '/realName', //实名绑卡
        meta: {
            auth: true
        },
        component: resolve => require(['../pages/pay/RealName.vue'], resolve)
    },
    {
        name: 'pay',
        path: '/pay/:order', //支付
        meta: {
            auth: true
        },
        component: resolve => require(['../pages/pay/PayOrder.vue'], resolve)
    },
    {
        name: 'paySelectCoin',
        path: '/paySelectCoin/:order', //支付选择点币
        meta: {
            auth: true
        },
        component: resolve => require(['../pages/pay/PaySelectCoin.vue'], resolve)
    },
    {
        name: 'paySelectCoupon',
        path: '/paySelectCoupon/:order', //支付选择优惠券
        meta: {
            auth: true
        },
        component: resolve => require(['../pages/pay/PaySelectCoupon.vue'], resolve)
    },


    //account
    {
        path: '/financialList', //我的理财
        meta: {
            auth: true
        },
        component: resolve => require(['../pages/account/FinancialList.vue'], resolve)
    },
    {
        path: '/orderList', //订单列表
        meta: {
            auth: true
        },
        component: resolve => require(['../pages/account/OrderList.vue'], resolve)
    },
    {
        path: '/capitalList', //资金明细
        meta: {
            auth: true
        },
        component: resolve => require(['../pages/account/CapitalList.vue'], resolve)
    },
    {
        path: '/info', //账户中心
        name: 'account',
        meta: {
            auth: true
        },
        component: resolve => require(['../pages/account/AccountInfo.vue'], resolve)
    },
    {
        path: '/recharge', //充值
        meta: {
            auth: true
        },
        component: resolve => require(['../pages/account/Recharge.vue'], resolve)
    },
    {
        path: '/cash', //提现
        meta: {
            auth: true
        },
        component: resolve => require(['../pages/account/Cash.vue'], resolve)
    },
    {
        path: '/invite', //邀请有礼
        meta: {
            auth: true
        },
        component: resolve => require(['../pages/account/Invite.vue'], resolve)
    },
    {
        path: '/coin', //我的点币
        meta: {
            auth: true
        },
        component: resolve => require(['../pages/account/Coin.vue'], resolve)
    },
    {
        path: '/coupon', //我的优惠券
        meta: {
            auth: true
        },
        component: resolve => require(['../pages/account/Coupon.vue'], resolve)
    },
    {
        path: '/setting', //账户设置
        meta: {
            auth: true
        },
        component: resolve => require(['../pages/account/Setting.vue'], resolve)
    },
    {
        path: '/safe', //安全保障
        meta: {
            auth: true
        },
        component: resolve => require(['../pages/account/Safe.vue'], resolve)
    },

    //article
    {
        path: '/articleList/:type/:appType', //文章列表
        component: resolve => require(['../pages/article/ArticleList.vue'], resolve)
    },
    {
        path: '/articleContent/:id/:source/:type', //文章列表
        component: resolve => require(['../pages/article/AticleContent.vue'], resolve)
    },


    //aboutUs
    {
        path: '/more/:type', //更多
        component: resolve => require(['../pages/aboutUs/More.vue'], resolve)
    },
    {
        path: '/insurance/:type', //安全保障
        component: resolve => require(['../pages/aboutUs/Insurance.vue'], resolve)
    },
    {
        path: '/insurance/:type/:other', //安全保障
        component: resolve => require(['../pages/aboutUs/Insurance.vue'], resolve)
    },
    {
        path: '/aboutUs/:type', //关于我们
        component: resolve => require(['../pages/aboutUs/AboutUs.vue'], resolve)
    },
    {
        path: '/company/:type', //公司介绍
        component: resolve => require(['../pages/aboutUs/Company.vue'], resolve)
    },
    {
        path: '/advantage/:type', //平台优势
        component: resolve => require(['../pages/aboutUs/Advantage.vue'], resolve)
    },
    {
        path: '/media/:type', //媒体报道
        component: resolve => require(['../pages/aboutUs/Media.vue'], resolve)
    },
    {
        path: '/contact/:type', //联系我们
        component: resolve => require(['../pages/aboutUs/Contact.vue'], resolve)
    },
    {
        path: '/coinRule', //点币规则
        component: resolve => require(['../pages/contract/CoinRule.vue'], resolve)
    },
    {
        path: '/couponRule', //优惠券规则
        component: resolve => require(['../pages/contract/CouponRule.vue'], resolve)
    },
    {
        path: '/cashRule', //提现规则
        component: resolve => require(['../pages/contract/CashRule.vue'], resolve)
    },
    {
        path: '/withholdContract', //协议
        component: resolve => require(['../pages/contract/WithholdContract.vue'], resolve)
    },


    //question
    {
        path: '/questionList/:type', //问题
        component: resolve => require(['../pages/question/QuestionList.vue'], resolve)
    },
    {
        path: '/questionUser/:type', //问题
        component: resolve => require(['../pages/question/QuestionUser.vue'], resolve)
    },
    {
        path: '/questionPwd/:type', //问题
        component: resolve => require(['../pages/question/QuestionPwd.vue'], resolve)
    },
    {
        path: '/questionBank/:type', //问题
        component: resolve => require(['../pages/question/QuestionBank.vue'], resolve)
    },
    {
        path: '/questionRecharge/:type', //问题
        component: resolve => require(['../pages/question/QuestionRecharge.vue'], resolve)
    },
    {
        path: '/questionCash/:type', //问题
        component: resolve => require(['../pages/question/QuestionCash.vue'], resolve)
    },
    {
        path: '/questionInvest/:type', //问题
        component: resolve => require(['../pages/question/QuestionInvest.vue'], resolve)
    },
    {
        path: '/questionIncomeAndRedeem/:type', //问题
        component: resolve => require(['../pages/question/QuestionIncomeAndRedeem.vue'], resolve)
    },

    //activity
    {
        path: '/newcomer/:type', //
        component: resolve => require(['../pages/activity/Newcomer.vue'], resolve)
    },
    {
        path: '/luckDraw/:type', //
        component: resolve => require(['../pages/activity/LuckDraw.vue'], resolve)
    },
    {
        path: '/invitePolite/:type', //邀请有礼
        component: resolve => require(['../pages/activity/InvitePolite.vue'], resolve)
    },
    {
        path: '*', //其他页面
        redirect: '/404'
    }

]

// when page was refresh,to get user
// if (window.sessionStorage.getItem('user')) {
//     store.dispatch('USER_LOGIN_IN', window.localStorage.getItem('token'))
// }

const router = new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior: () => ({
        y: 0
    }),
    base: __dirname
})

router.beforeEach(({
    meta,
    path
}, from, next) => {
    let {
        auth = false
    } = meta
    let isLogin = false
    if (Boolean(store.state.user) && Boolean(store.state.user.user) && Boolean(store.state.user.user.accessToken)) {
        isLogin = true //true用户已登录， false用户未登录
    }
    console.log(auth, isLogin)
    if (auth && !isLogin) {
        next({
            path: '/login'
        })
    }
    next()
})

export default router
