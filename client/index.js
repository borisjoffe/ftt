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

function downloadJson(url) {
	return fetch(url, {
		method: 'GET',
		credentials: 'include',   // or same-origin
	}).then((resp) => {
		if (resp.ok) {
			console.log(resp);
			return resp.json();
		} else {
			console.error('resp not ok:', resp);
		}
	}).catch((err) => {
		// TODO: display error
		console.error(err);
	});
}

const getLists = () => {
	downloadJson(proxy.lists())
		.then(lists => { data.lists = lists; })
		.catch(console.error);
};

var data = {};
window.data = data;

const App = React.createClass({
	getInitialState: function () {
		return { counter: 0 };
	},

	// TODO: move?
	downloadJson: getLists,

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
