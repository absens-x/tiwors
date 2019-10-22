const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const uglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
})

// module.exports.plugins.push( new uglifyJSPlugin({ sourceMap: true }) )

// module.exports.plugins.push( new ImageminPlugin( { test: /\.(png|jpe?g)/i }) )