'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import h from 'react-hyperscript';

console.log('hello');

const App = h('h1', 'hello');

ReactDOM.render(App, document.getElementById('app'));
