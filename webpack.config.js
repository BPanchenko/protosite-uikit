var webpack = require('webpack');

module.exports = {
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
	}
};