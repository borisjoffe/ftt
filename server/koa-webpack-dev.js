'use strict';

function init({app}) {
	// doesn't work - maybe fix later
	// see: https://github.com/dayAlone/koa-webpack-hot-middleware
	if (app.env === 'development') {
		const webpack = require('webpack');

		const webpackConfig = require('../webpack.config.js');
		webpackConfig.entry.unshift('webpack-hot-middleware/client');
		const compiler = webpack(webpackConfig);

		const webpackMiddlewareOptions = {
			noInfo: false,
			publicPath: webpackConfig.output.publicPath,
			stats: {
				colors: true,
			},
		};

		app.use(require('koa-webpack-dev-middleware')(compiler, webpackMiddlewareOptions));
		app.use(require('koa-webpack-hot-middleware')(compiler));
	}
}

module.export = init;
