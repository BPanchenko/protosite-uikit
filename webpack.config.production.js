
const configDev = require('./webpack.config');

const path = require('path');
const webpack = require('webpack');

delete configDev.devServer;

configDev.devtool = 'source-map';
configDev.plugins = [
    new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        comments: false,
        compress: {
            booleans: true,
            dead_code: true,
            drop_console: false,
            collapse_vars: true,
            loops: true,
            sequences: true,
            warnings: true,
            unsafe: true,
            unused: true
        },
        sourceMap: true
    })
];

module.exports = configDev;