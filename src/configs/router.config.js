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
        component: resolve => require(['../pages/account/FinancialList.vue'], resolve)
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
        component: resolve => require(['../pages/index/index.vue'], resolve)
    },
    {
        path: '*', //其他页面
        redirect: '/'
    }
]