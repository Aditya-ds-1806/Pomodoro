/* eslint-disable global-require */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    plugins: [new MiniCssExtractPlugin({
        filename: 'index.css',
    })],
    entry: './public/src/index.scss',
    output: {
        path: path.resolve(__dirname, 'public', 'dist'),
        filename: 'index.js',
    },
    mode: 'production',
    module: {
        rules: [{
            test: /\.(scss)$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        }],
    },
};
