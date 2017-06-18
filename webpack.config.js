var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: './js/ui-core.js',
    output: {
        filename: './dist/--ui-core.js'
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