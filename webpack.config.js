/* eslint-disable global-require */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        home: ['./public/src/scss/home.scss', './public/src/js/home.js'],
        subjects: ['./public/src/scss/subjects.scss', './public/src/js/subjects.js'],
        'manage-subject': ['./public/src/js/manage-subject.js'],
        'get-started': ['./public/src/scss/get-started.scss', './public/src/js/get-started.js'],
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
    }), new CopyPlugin({
        patterns: [{ from: path.resolve(__dirname, 'public', 'src', 'images'), to: path.resolve(__dirname, 'public', 'dist', 'images') }],
    })],
};
