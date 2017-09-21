import React from 'react';
import ReactDOM from 'react-dom';

import { makeRequest } from './helpers/fetchHelper';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';

import App from './App';

const authToken = localStorage.getItem('token');
if (!authToken) {
	makeRequest({
		url: 'auth',
		method: 'POST',
		data: { email: 'sparth786@gmail.com', password: 'sparth786' }
	}).then((res) => {
		if (res.token) localStorage.setItem('token', res.token);
	});
}
ReactDOM.render(<App />, document.getElementById('root'));
