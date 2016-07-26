'use strict';

// import koa from 'koa';
const app = require('koa')();   // TODO: change to import
const proxy = require('koa-proxy');
const mount = require('koa-mount');
const router = require('koa-router')();

const PORT = 3000;

console.log(`app environment is: '${app.env}'`);

if (app.env === 'development') {
	const webpack = require('webpack');
	const webpackMiddleware = require('koa-webpack-dev-middleware');
	const webpackConfig = require('./webpack.config.js');

	app.use(webpackMiddleware(webpack(webpackConfig), {
		noInfo: false,
		publicPath: '/build/',  // output.publicPath in webpack config
		// quiet: false,
		stats: {
			colors: true,
		},
	}));

} else {
	console.error('no production setting specified');
	process.exit(1);

}

router.get('/', function* () {
	this.body = 'hello';
});

app.use(router.middleware());

// Ticktick proxy
app.use(mount('/tt', proxy({
  host: 'https://www.ticktick.com/',
})));

app.listen(PORT);

console.log('listening on:', PORT);
