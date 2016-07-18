'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import h from 'react-hyperscript';

console.log('hello');

const App = React.createClass({
	getInitialState: function () {
		return { counter: 0 };
	},

	handleClick: function () {
		this.setState({counter: this.state.counter + 1});
	},

	render: function() {
		return h('div', [
			h('h1', {onClick: this.handleClick}, 'hello'),
			h('p', 'counter is: ' + this.state.counter),
		]);
	},

});


ReactDOM.render(h(App), document.getElementById('app'));
