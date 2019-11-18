const merge = require('webpack-merge');
const common = require('./common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = merge(common,{
    mode:'production', // 压缩代码
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader:MiniCssExtractPlugin.loader // 提取css到外部文件中
                    },
                    'css-loader'
                ]
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename:'[name].[hash].css'
        })
    ]
})