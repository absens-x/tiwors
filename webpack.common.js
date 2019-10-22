const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
    dist: path.resolve(__dirname, 'dist'),
    src: path.resolve(__dirname, 'src'),
}

let isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    context: PATHS.src,
    entry: {
        app: [
            './js/index.js',
            './sass/main.scss',
        ]
    },

    output: {
        filename: 'js/[name].bundle.js',
        path: PATHS.dist,
    },

    module: {
        rules: [

            // JS

            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: '/node_modules'
            },

            // PUG

            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }

            },

             // SASS

            {  

                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {sourceMap: true, url: false}
                        },
                        {
                            loader: 'postcss-loader',
                            options: {sourceMap: true, config: {path: 'postcss.config.js'}}
                        }, 
                        {
                            loader: 'sass-loader',
                            options: {sourceMap: true, config: {path: 'postcss.config.js'}}
                        },
                    ],
                    fallback: 'style-loader'
                })
            },

           

            // IMAGES

            {
                test: /\.(png|jpe?g)$/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            emitFile: false
                        }
                    },
                    'img-loader'
                ]
            },

            // FONTS

            {
                test: /\.(woff2?|eot|ttf|otf)$/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            emitFile: false
                        }
                    },
                
                ]
            },

            /* // SVG

            {
                test: /\.svg$/,
                loader: 'svg-url-loader'
            } */
        ]
    },

    plugins: [
      
        new ExtractTextPlugin({ filename: 'css/styles.css', disable: false, allChunks: true }),

        // ---------------------------------------------------------------------------------------
        // new HtmlWebpackPlugin(generatePugTemplate('icons')),
        new HtmlWebpackPlugin(generatePugTemplate('index')),
        // ---------------------------------------------------------------------------------------

        new CopyWebpackPlugin([
            { from: './img', to: 'img' },
            { from: './assets', to: 'assets'},
            { from: './fonts', to: 'fonts'}
        ],
        // { ignore: [{glob: 'svg/*'}] }
        ),
    ]
}









function generatePugTemplate(template, filename = template) {
    return {
        template: `${PATHS.src}/views/${template}.pug`,
        filename: `${PATHS.dist}/${filename}.html`,
        // inject: false,
        // hash: true,
        cache: true
    }
}
