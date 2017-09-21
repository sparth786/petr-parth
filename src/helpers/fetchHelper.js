const BASE_URL = 'https://api.pleasepay.co.uk';

export const makeRequest = ({ url, method = 'GET', header = {}, data = {} }) => {

	const headers = Object.assign(header, {
		'Content-Type': 'application/json',
		'AUTH-HEADER': localStorage.getItem('token'),
	});

	const params = { method, headers };

	if (method === 'POST' || method === 'PUT') params.body = JSON.stringify(data);

	return fetch(`${BASE_URL}/${url}`, params)
		.then((response) => {
			if (response.status >= 200 && response.status < 400) {
				return response.json();
			}
			return response.statusText;
		})
		.then((data) => data)
		.catch((err) => Promise.reject(err));
};