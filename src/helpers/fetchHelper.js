const BASE_URL = 'https://api.pleasepay.co.uk';

export const makeRequest = ({ url, method = 'GET', header = {}, data = {} }) => {

	const headers = Object.assign(header, {
		'Content-Type': 'application/json',
		'AUTH-HEADER': 'i34dacdjhe7g5ko1emt7ebc8kijqdn217ikuqrm1klk1l3tpe64gqclo0ito53l9',
	});

	const params = { method, headers };

	if (method === 'POST') params.body = JSON.stringify(data);

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