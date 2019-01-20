// Webpack v4

const path = require('path');
const webpack = require('webpack');

let config = {
    entry: ['./src/js/uikit.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'protosite-uikit.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: []
};

module.exports = (env, argv) => {
    let inDevelopment = argv.mode === 'development';
    let inProduction = argv.mode === 'production';

    if (inDevelopment) {
        config.devServer = {
            contentBase: __dirname,
            hot: true,
            inline: true,
            open: 'Chrome',
            publicPath: '/dist/',
            watchContentBase: true,
            watchOptions: {
                poll: true
            }
        };
        config.devtool = 'eval-source-map';
        config.plugins.push(new webpack.HotModuleReplacementPlugin());
    }

    if (inProduction) {
        config.devtool = 'source-map';
    }

    return config;
};