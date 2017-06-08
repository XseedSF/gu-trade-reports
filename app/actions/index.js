import { normalize } from 'normalizr';
import * as schema from './schema';
import * as api from '../api';
import { actions } from '../constants';

export const toggleAnswerFilter = (id, type, value) => ({
	type: actions.TOGGLE_ANSWER_FILTER,
	payload: { id, value, type },
});

export const clearFilters = () => ({ type: actions.CLEAR_FILTERS });

/// Fetch data
export const requestForm = () => ({ type: actions.REQUEST_FORM });

export const requestFormSuccess = (response) => ({
	type: actions.REQUEST_FORM_SUCCESS,
	response,
});

export const fetchForm = (filtersQuery) => (
	(dispatch) => {
		dispatch(requestForm());
		api.fetchForm(filtersQuery)
			.then(form => {
				dispatch(requestFormSuccess(normalize(form, schema.form)))
			});
	}
);