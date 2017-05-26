var path = require('path')
var webpack = require('webpack')
var debug = true

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.less/,
                exclude: /^node_modules$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.sass/,
                exclude: /^node_modules$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.(png|jpg)$/,
                exclude: /^node_modules$/,
                loader: 'url-loader?limit=8192&name=[name].[ext]?v=[hash]',
            },
            {
                test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
                exclude: /^node_modules$/,
                loader: 'file-loader?name=[name].[ext]?v=[hash]'
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'assets': path.resolve(__dirname, './src/assets/'),
            'css': path.resolve(__dirname, './src/assets/css/'),
            'js': path.resolve(__dirname, './src/assets/js/'),
            'images': path.resolve(__dirname, './src/assets/images/'),
            'components': path.resolve(__dirname, './src/components/'),
            'configs': path.resolve(__dirname, './src/configs/'),
            'filters': path.resolve(__dirname, './src/filters/'),
            'pages': path.resolve(__dirname, './src/pages/'),
            'store': path.resolve(__dirname, './src/store/'),
            'utils': path.resolve(__dirname, './src/utils/'),
            'mixins': path.resolve(__dirname, './src/mixins/'),
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        proxy: {
            // "**": 'https://unstable-m.dianlc.com'
        }
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}
