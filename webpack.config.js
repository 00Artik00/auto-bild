const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');
const SRC = path.resolve(__dirname, './sound/sound.mp3');

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'main.bundle.js',
    },
    plugins: [
        new BundleAnalyzerPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            template: resolve(__dirname, 'index.html')
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },

            {
                test: /\.mp3$/,
                include: SRC,
                loader: 'file-loader'
            }
        ]
    },
    devServer: {
        port: 3000
    }
};