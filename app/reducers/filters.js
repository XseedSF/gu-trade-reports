import { actions, filterTypes } from '../constants';

const filter = (state = {}, action) => {
  switch (action.type) {
    case actions.TOGGLE_ANSWER_FILTER:
      const { id, type, value } = action.payload;
      const { selected = [] } = state;

      const alreadySelected = selected.includes(value);

      switch (type) {
        case filterTypes.SINGLE_SELECT:
          return { id, selected: alreadySelected ? selected.filter((e) => e != value) : [value] };
        case filterTypes.MULTI_SELECT:
          return { id, selected: alreadySelected ? selected.filter((e) => e != value) : [...selected, value] };
        default:
          return state;
      }
    default:
      return state;
  }
};

const filters = (state = {}, action) => {
  switch (action.type) {
    case actions.TOGGLE_ANSWER_FILTER:
      const { id } = action.payload;
      const existingFilter = state[id];
      const newFilter = filter(existingFilter, action);

      const shouldRemove = newFilter.selected ? newFilter.selected.length === 0 : false;

      if (shouldRemove) return (({ [id]: deleted, ...state }) => state)(state);
      else return { ...state, [id]: newFilter };
    case actions.CLEAR_FILTERS:
      return {};
    default:
      return state;
  }
};

export default filters;