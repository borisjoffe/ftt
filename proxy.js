'use strict';

// auth by cookies?
export const baseUrl = 'https://www.ticktick.com';
export const apiPath = '/api/v2';
export const apiUrl = baseUrl + apiPath;

export const makeUrl = (path) => {
	return apiUrl + path + '?' +
		['_', Date.now()].join('=');
};

// settings
export const settings = makeUrl('/user/preferences/settings');
console.log(settings);

// lists
export const lists = makeUrl('/projects');
