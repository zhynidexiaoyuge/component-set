const path = require('path')

// 拼接路径
function resolve (dir) {
    return path.join(__dirname, dir)
}

// 基础路径 注意发布之前要先修改这里
const baseUrl = '/'

module.exports = {
    publicPath: baseUrl, // 根据你的实际情况更改这里

    lintOnSave: true,

    configureWebpack: {
            externals: {
                // "CKEDITOR": "window.CKEDITOR",
                "VUE_CONFIG": "window.VUE_CONFIG"
            }
    },

    devServer: {
        /*port: 8801, // 自定义修改8080端口*/
        publicPath: baseUrl, // 和 baseUrl 保持一致
        // 代理设置
        proxy: {
           
            '/service': {
                target: 'http://192.168.101.23:20001/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/service': ''
                }
            }
        }
    },

    // webpack 设置
    // 默认设置: https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-service/lib/config/base.js
    chainWebpack: config => {
        // svg
        const svgRule = config.module.rule('svg')
        svgRule.uses.clear()
        svgRule.include
            .add(resolve('src/assets/svg-icons/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'd2-[name]'
            })
            .end()

        // image exclude
        const imagesRule = config.module.rule('images')
        imagesRule
            .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
            .exclude
            .add(resolve('src/assets/svg-icons/icons'))
            .end()

        // 重新设置 alias
        config.resolve.alias.set('@', resolve('src'))
        // babel-polyfill 加入 entry
        const entry = config.entry('app')
        entry.add('babel-polyfill').end()
    }
}
