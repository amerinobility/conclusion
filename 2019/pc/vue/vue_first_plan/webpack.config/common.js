const {join:pathJoin} = require('path');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:{
        app:'./src/index.js'
    },
    output:{
        filename:'[name].[hash].js',
        path:pathJoin(__dirname,'./dist')
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'index.html',
            filename:'index.html'
        }),
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(['dist'])
    ]
}