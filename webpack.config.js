'use strict';

const webpack = require('webpack');
var path = require('path');
// var HtmlWebpackPlugin = require('html-webpack-plugin');

// Config options
// https://webpack.github.io/docs/configuration.html

module.exports = {
	// TODO: fix bug with not finding index module on initial load
	entry: [
		// 'webpack-dev-server/client?http://127.0.0.1:8080/',
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
	plugins: [
		// new webpack.optimize.CommonsChunkPlugin('common.js'),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		// TODO: make this work
		// new HtmlWebpackPlugin({
		// 	template: 'index.html',
		// 	inject: true,
		// }),
	],

	// below section seems to fix webpack stale cache issue after js error
	// FIXME: doesn't always work
	devServer: {
		contentBase: './client',
		inline: true,
	},

	devtool: 'eval',
};
