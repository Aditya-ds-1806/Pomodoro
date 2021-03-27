/* eslint-disable global-require */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'production',
    entry: {
        home: ['./public/src/scss/home.scss', './public/src/js/home.js'],
        subjects: ['./public/src/scss/subjects.scss', './public/src/js/subjects.js'],
    },
    output: {
        path: path.resolve(__dirname, 'public', 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [{
            test: /\.(scss)$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        }],
    },
    plugins: [new MiniCssExtractPlugin({
        filename: '[name].css',
    })],
};
