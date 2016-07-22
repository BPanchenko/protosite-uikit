var webpack = require('webpack');

module.exports = {
    entry: __dirname + '/js/ui/core.js',
    output: {
        path: __dirname + '/assets/',
        filename: 'core.bundle.js',
        publicPath: '/assets/'
    },
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules|vendor)/,
				loader: 'babel',
				query: {
					presets: ['es2015'],
                    plugins: ['transform-class-properties']
				}
			}
		]
	},
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};