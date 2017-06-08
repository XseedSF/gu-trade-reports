import { actions } from '../constants';

const initialState = {
	isLoading: false
}

const app = (state = initialState, action) => {
	switch (action.type) {
		case actions.TOGGLE_IS_LOADING:
			const isLoading = action.value === 'undefined'
				? !state.isLoading
				: action.value;
			return { ...state, isLoading };
		default:
			return state;
	}
}

export default app;
