const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const path = require('path');
// const SRC = path.resolve(__dirname, './sound/sound.mp3');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.[contenthash].js',
    },
    plugins: [
        // new BundleAnalyzerPlugin(),
        // new MiniCssExtractPlugin({
        //     filename: '[name].[contenthash].css'
        // }),
        new HtmlWebpackPlugin({
            template: resolve(__dirname, 'index.html')
        })
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },

            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'img-optimize-loader',
                        options: {
                            compress: {
                                mode: 'high',
                                webp: true,
                                gifsicle: true,
                                disableOnDevelopment: false
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(mp[3|4])$/i,
                use: [
                    'file-loader',
                ]
            }
        ]
    },
    devServer: {
        port: 3000
    }
};