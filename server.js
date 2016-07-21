'use strict';

// import koa from 'koa';
const koa = require('koa');   // TODO: change to import
const proxy = require('koa-proxy');
const mount = require('koa-mount');

const app = koa();

const PORT = 3000;

// Ticktick proxy
app.use(mount('/tt', proxy({
  host: 'https://www.ticktick.com/',
})));

// app.use(function *(){
//   this.body = 'Hello World';
// });

app.listen(PORT);

console.log('listening on:', PORT);
