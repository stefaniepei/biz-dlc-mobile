/**
 * auth true登录才能访问，false不需要登录，默认true
 */
export default [
    {
        path: '/login', //登录
        component: resolve => require(['../pages/user/Login.vue'], resolve)
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
        path: '/forgetPwd/:source', //忘记密码
        component: resolve => require(['../pages/user/ForgetPwd.vue'], resolve)
    },



    {
        path: '/productList', //产品列表
        component: resolve => require(['../pages/product/ProductList.vue'], resolve)
    },
    {
        path: '/productDetail/:source/:id', //产品详情
        component: resolve => require(['../pages/product/ProductDetail.vue'], resolve)
    },
    {
        name:'productInfo',
        path: '/productInfo/:source/:id', //项目介绍
        component: resolve => require(['../pages/product/ProductInfo.vue'], resolve)
    },
    {
        name: 'productIntroduce',
        path: '/productIntroduce/:source/:id', //产品介绍
        component: resolve => require(['../pages/product/ProductIntroduce.vue'], resolve)
    },
    {
        name:'productRecords',
        path: '/productRecords/:source/:id', //投资记录
        component: resolve => require(['../pages/product/ProductRecords.vue'], resolve)
    },



    {
        path: '/account', //账户中心
        meta: { auth: false },
        component: resolve => require(['../pages/account/Info.vue'], resolve)
    },
    {
        path: '/financialList', //我的理财
        meta: { auth: false },
        component: resolve => require(['../pages/account/FinancialList.vue'], resolve)
    },
    {
        path: '/orderList', //订单列表
        meta: { auth: false },
        component: resolve => require(['../pages/account/OrderList.vue'], resolve)
    },
    {
        path: '/capitalList', //资金明细
        meta: { auth: false },
        component: resolve => require(['../pages/account/CapitalList.vue'], resolve)
    },
    {
        path: '/recharge', //充值
        meta: { auth: false },
        component: resolve => require(['../pages/account/Recharge.vue'], resolve)
    },
    {
        path: '/cash', //提现
        meta: { auth: false },
        component: resolve => require(['../pages/account/Cash.vue'], resolve)
    },
    {
        path: '/invite', //邀请有礼
        meta: { auth: false },
        component: resolve => require(['../pages/account/Invite.vue'], resolve)
    },



    {
        path: '/', //首页
        component: resolve => require(['../pages/index/Index.vue'], resolve)
    },
    {
        path: '*', //其他页面
        redirect: '/'
    }
]