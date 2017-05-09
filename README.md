# yes

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

#
带有<mt-header>头部的请在下一个div加class="header-margin"

#axios用法
this.$http.get(`/trades/jour`, { params: { sort: 'created_at', asc: false, page: this.page, pageSize: pageSize }, headers: { 'Authorization': this.userAuth } }).then((res) => {
    let records = res.data.data
}).catch((err) => Toast(err))

this.$http.post(`/biz/orders`, { productId: this.$route.params.id, amount: this.buyAmount }, { headers: { 'Authorization': this.userAuth } }).then((res) => {
    let orderNo = res.data.data.orderNo
}).catch((err) => Toast(err))