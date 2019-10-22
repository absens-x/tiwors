const merge = require('webpack-merge');
const commom = require('./webpack.common.js');

module.exports = merge(commom, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        overlay: true,
        contentBase: './dist',
        publicPath: '/',
        // watchContentBase: true,
    }
});


