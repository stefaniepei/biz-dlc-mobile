# yes
var attachFastClick = require('fastclick');  
attachFastClick(document.body);  
> yes

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

## CSS
header-margin   带有<mt-header>头部的请在下一个div加class="header-margin"
fill-div-05     分隔层

## JS
``` bash
# axios用法 https://github.com/mzabriskie/axios
axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.options(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])

this.$http.get(`/trades/jour`, { params: { sort: 'created_at', asc: false, page: this.page, pageSize: pageSize }, headers: { 'Authorization': this.userAuth } }).then((res) => {
    let records = res.data
}).catch((err) => Toast(err))

this.$http.post(`/biz/orders`, { productId: this.$route.params.id, amount: this.buyAmount }, { headers: { 'Authorization': this.userAuth } }).then((res) => {
    let orderNo = res.data.orderNo
}).catch((err) => Toast(err))


#子组件调用父组件方法 详见components/count-down.vue
_this.$parent.toDisabled()  
```