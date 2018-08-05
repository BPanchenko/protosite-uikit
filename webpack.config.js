// Webpack v4

let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let path = require('path');
let webpack = require('webpack');

let config = {
    entry: ['./src/js/uikit.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'uikit.js'
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
        config.entry.push('./src/less/uikit.less');
        config.module = {
            rules: []
        };
        config.module.rules.push(
            {
                test: /\.less$/,
                use: [
                // MiniCssExtractPlugin.loader,
                {
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader',
                    options: {
                        relativeUrls: true,
                        sourceMap: true
                    }
                }]
            },
            {
                test: /\.(ttf|eot|otf|woff(2)?)(\?[a-z0-9-]+)?$/,
                loader: 'null-loader'
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            }
        );
        config.plugins.push(new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }));
    }

    return config;
};

