const webpack = require('webpack'),
      path = require('path');

module.exports = {
    entry: __dirname + '/js/ui/core.js',
    output: {
        path: path.join(__dirname, "assets"),
        filename: 'core.bundle.js',
        publicPath: './assets/'
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
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};