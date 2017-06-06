import axios from 'axios';

export const fetchForm = (filtersQuery) => {
	return axios.get(`/api/getCompletedForms${filtersQuery}`)
		.then(({ data: response }) => {
			return response.error ? {} : response.data;
		});
}