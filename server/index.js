'use strict';

// TODO: change to imports
// import koa from 'koa';

const app = require('koa')();
const proxy = require('koa-proxy');
const mount = require('koa-mount');
const router = require('koa-router')();
const serve = require('koa-static');

const PORT = 3000;

console.log(`app environment is: '${app.env}'`);


// Regular routes
router.get('/hello', function* () {
	this.body = 'hello';

});

app.use(router.middleware());


// Ticktick proxy
app.use(mount('/tt', proxy({
  host: 'https://www.ticktick.com/',
})));


// Static route
// mounted at root so add it last to make sure above routes are accessible
var staticMiddleware;

if (app.env === 'development') {
	// proxy to webpack-dev-server instance
	staticMiddleware = proxy({
		host: 'http://localhost:8080/'
	});
} else {
	staticMiddleware = serve('./client', {
		// See https://github.com/koajs/static for options
	});
}

app.use(staticMiddleware);


app.listen(PORT);

console.log('listening on:', PORT);
