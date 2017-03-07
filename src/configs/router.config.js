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
        path: '/', //首页
        component: resolve => require(['../pages/index/index.vue'], resolve)
    },
    {
        path: '*', //其他页面
        redirect: '/'
    }
]