'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import h from 'react-hyperscript';
import * as proxy from './proxy.js';

if (module.hot) {
	module.hot.accept();
}

console.log(proxy.apiUrl);
console.log(proxy);

function downloadJson() {
	fetch(proxy.settings, {
		credentials: 'include',   // or same-origin
	}).then((data) => {
		console.log(data);
	}).catch((err) => {
		// TODO: display error
		console.error(err);
	});
}

const App = React.createClass({
	getInitialState: function () {
		return { counter: 0 };
	},

	downloadJson: downloadJson, // TODO: move?

	handleClick: function () {
		this.setState({counter: this.state.counter + 1});
	},

	render: function() {
		var error = this.props.error;

		return h('div', [
			h('h1', {onClick: this.handleClick}, 'hello'),
			h('p', 'counter is: ' + this.state.counter),
			h('button', {onClick: this.downloadJson}, 'download JSON'),
			h('span', error ? 'error:' + error : ''),
		]);
	},

});


ReactDOM.render(h(App), document.getElementById('app'));

export default App;
