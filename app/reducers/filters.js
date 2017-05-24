

const filter = (state = {}, action) => {
	switch (action.type){
		case 'TOGGLE_ANSWER_FILTER':
			const { id, type, value } = action.payload;
			const { selected = [] } = state;

			const alreadySelected = selected.includes(value);

			switch(type){
				case 'SINGLE_SELECT':
					return { id, selected: alreadySelected ? selected.filter((e) => e!= value) : [ value ] };
				case 'MULTI_SELECT': 
					return { id, selected: alreadySelected ? selected.filter((e) => e!= value) : [ ...selected, value ] };
				default:
					return state;
			}
		default:
			return state;
	}

};

const filters = (state = {}, action) => {
	switch (action.type){
		case 'TOGGLE_ANSWER_FILTER':
			const { id } = action.payload;
			const existingFilter = state[id];
			const newFilter = filter(existingFilter, action);

			const shouldRemove = newFilter.selected.length === 0;

			if (shouldRemove) return (({ [id]: deleted, ...state }) => state)(state);
			else return { ...state, [id]: newFilter };
		case 'CLEAR_FILTERS':
			return {};
		default:
			return state;
	}

};

export default filters;

