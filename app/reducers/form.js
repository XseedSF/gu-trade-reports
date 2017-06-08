import { actions } from '../constants';

const form = (state = {}, action) => {
	switch (action.type) {
		case actions.REQUEST_FORM:
			return {
				...state,
				isLoading: true
			}
		case actions.REQUEST_FORM_SUCCESS:
			if (action.response) {
				return {
					...state,
					...action.response,
					isLoading: false
				}
			}
		default:
			return state;
	}
};

export default form;