
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'eval-source-map',
    context: path.resolve(__dirname),
    entry: {
        'ui-core': [
            'babel-polyfill',
            './src/js/ui-core.js'
        ]
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/'
    },

    watch: true,
    plugins: [
        new BrowserSyncPlugin({
            // browse to http://localhost:3000/ during development,
            // ./public directory is being served
            host: 'localhost',
            port: 3000,
            files: [
                './index.html',
                './*/*.html'
            ],
            server: { baseDir: [''] }
        })
    ]
};