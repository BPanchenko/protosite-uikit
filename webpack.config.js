const webpack = require('webpack'),
      path = require('path');

module.exports = {
    entry: './js/ui/core.js',
    output: {
        path: path.join(__dirname, "dist"),
        filename: 'ui-core.js?bust=' + (new Date),
        publicPath: './dist/'
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
	}
};