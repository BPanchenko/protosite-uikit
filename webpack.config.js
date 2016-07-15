var webpack = require('webpack');

module.exports = {
    output: {
        // Where to build results
        path: __dirname,

        // Filename to use in HTML
        filename: 'ui-core.js',

        // Path to use in HTML
        publicPath: '/js/ui/'
    },
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules|vendor)/,
				loader: 'babel',
				query: {
					presets: ['es2015']
				}
			}
		]
	},
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};