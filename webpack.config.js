'use strict';

var path = require('path');
// var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	// TODO: fix bug with not finding index module on initial load
	entry: [
		// 'webpack-dev-server/client?http://localhost:8080/',
		// 'webpack/hot/dev-server',
		// '/webpack-dev-server/',
		'./client/index.js',
	],
	output: {
		path: path.resolve(__dirname, 'build'),
		publicPath: '/build/',
		filename: 'bundle.js',
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel',
			exclude: /node_modules/,
			query: {
				cacheDirectory: true,
				presets: ['es2015', 'react'],
				plugins: ['transform-runtime'],
			},
		}],
	},
	// TODO: make this work
	// plugins: [new HtmlWebpackPlugin({
	// 	template: 'index.html',
	// 	inject: true,
	// })],
};
