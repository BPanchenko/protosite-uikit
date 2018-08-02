// Webpack v4

let path = require('path');

let config = {
    entry: {
        main: './src/js/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    plugins: []
};

module.exports = (env, argv) => {
    let inDevelopment = argv.mode === 'development';
    let inProduction = argv.mode === 'production';

    if (inDevelopment) {
        config.devServer = {
            hot: true,
            inline: false,
            open: 'Chrome',
            publicPath: '/dist/'
        };
        config.devtool = 'eval-source-map';
    }

    if (inProduction) {
        config.devtool = 'source-map';
    }

    return config;
};

