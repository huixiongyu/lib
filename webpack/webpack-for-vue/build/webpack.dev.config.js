const merge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.base.config');
const webpack = require('webpack');

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        open: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
})