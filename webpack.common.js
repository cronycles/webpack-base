const webpack = require("webpack");
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const OUTPUT_PATH = path.resolve(__dirname, 'public/assets');

module.exports = {
    entry: {
        "dist": path.resolve(__dirname, 'src/js/app.js') //con il nome "dist" gli dico che l'output voglio che si chiami dist
    },
    output: {
        filename: '[name].js',
        path: OUTPUT_PATH,
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    context: path.resolve(__dirname, 'src', 'json'),
                    from: '**/*',
                    to: OUTPUT_PATH + '/json'
                },
            ],
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/, /test\.js$/],
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /test\.js$/,
                use: 'mocha-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            reloadAll: true,
                            publicPath: '/assets',
                        },
                    },
                    'css-loader',
                    'postcss-loader'
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    outputPath: 'images',
                },
                
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    outputPath: 'fonts',
                },
            },
        ],

    },
};