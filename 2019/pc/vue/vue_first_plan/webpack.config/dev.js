const merge = require('webpack-merge');
const common = require('./common.js');
const path=require('path');
module.exports = merge(common, {
    mode: 'development', // 不压缩代码,加快编译速度
    devtool: 'source-map', // 提供源码映射文件调试使用
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader','css-loader'] // 使用vue-style-loader直接插入到style标签中
            }
        ]
    },
    devServer:{//热重载
        contentBase: path.join(__dirname, "src"),
        //热重载需要监听的文件目录
        compress: true,
        //启用压缩
        port: 9000
        //监听的端口号码
},

})