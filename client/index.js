'use strict';

import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import h from 'react-hyperscript';
import * as proxy from './proxy.js';

if (module.hot) {
	module.hot.accept();
}

console.log(proxy.apiUrl);
console.log(proxy);

const data = {
	lists: [],
	errors: [],
	settings: {},
}
window.data = data

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
	})
}

/**
 * @this {React.Component}
 */
function getLists(e) {
	/*jshint validthis:true */
	console.log('getLists args:', ...arguments)
	console.log('e:', e)
	console.log('this:', this)

	downloadJson(proxy.lists())
		.then(lists => { data.lists = lists })
		.then(() => { this.setState({data}) })
		.catch(function (err) {
			this.setState({errors: this.state.data.errors.concat(err)})
			console.error(err)
		})
}

class List extends React.Component {
	render() {
		const list = this.props.list
		const attrs = {
			title: JSON.stringify(list, null, '    '),
			style: { backgroundColor: list.color }
		}

		return h('div', attrs, [
			h('strong', list.name),
			' (' + list.id + ')',
			h('br'),
			'modified: ' + list.modifiedTime,
			h('br'),
			'inAll: ' + list.inAll,
			h('br'),
			h('br'),
		])
	}
}

/**
 * @this {React.Component}
 */
function getSettings() {
	downloadJson(proxy.settings())
		.then(settings => { data.settings = settings })
		.then(() => { this.setState({data}) })
		.catch(function (err) {
			this.setState({errors: this.state.data.errors.concat(err)})
			console.error(err)
		})
}

const JsonComponent = (props) => {
	const s = JSON.stringify(props, null, '   ')

	return h('div', [
		h('br'),
		h('pre', {title: s}, s)
	])
}

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			counter: 0,
			data,
		}

		this.downloadJson = _.flow(
			getLists.bind(this),
			getSettings.bind(this)
		)
	}

	componentDidMount() {
		this.downloadJson()
	}

	render() {
		const { errors, lists, settings } = this.state.data
		console.log('errs:', errors)
		console.log('lists:', lists)
		console.log('lists[0]:', lists[0])

		return h('div', [
			h('button', {onClick: this.downloadJson}, 'download JSON'),
			h('div', errors.length ? 'error:' + errors.join(', ') : ''),
			h('br'),
			h('div', [
				h('h2', 'Lists'),
				(lists ?
				lists.map((list, key) =>
					h(List, {list, key})) :
				''),
			]),

			h(JsonComponent, {settings}),
		])
	}

}


ReactDOM.render(h(App), document.getElementById('app'));

export default App;
