'use strict';

// import koa from 'koa';
const koa = require('koa');   // TODO: change to import

const app = koa();
const proxy = require('koa-proxy');

const PORT = 3000;

app.use(proxy({
  host: 'https://www.ticktick.com/api/v2'
}));

// app.use(function *(){
//   this.body = 'Hello World';
// });
//
app.listen(PORT);

console.log('listening on:', PORT);
