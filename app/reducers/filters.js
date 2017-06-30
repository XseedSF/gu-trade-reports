import { actions, filterTypes } from "../constants";
import { deleteAttribute } from "../utils";

const filter = (state = {}, action) => {
  switch (action.type) {
    case actions.TOGGLE_ANSWER_FILTER:
      const { id, type, value } = action.payload;
      const { selected = [] } = state;

      const clearSelection = value === null || selected.includes(value);

      switch (type) {
        case filterTypes.SINGLE_SELECT:
          return {
            id,
            selected: clearSelection
              ? selected.filter(e => e != value)
              : [value]
          };
        case filterTypes.MULTI_SELECT:
          return {
            id,
            selected: clearSelection
              ? selected.filter(e => e != value)
              : [...selected, value]
          };
        case filterTypes.DATE_RANGE_SELECT:
        case filterTypes.NUMERIC_RANGE_SELECT:
          return {
            id,
            selected: clearSelection ? [] : value
          };
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

      const shouldRemove = newFilter.selected
        ? newFilter.selected.length === 0
        : false;

      if (shouldRemove) {
        const deleteFilter = deleteAttribute(id);
        return deleteFilter(state);
      } else {
        return { ...state, [id]: newFilter };
      }
    case actions.CLEAR_FILTERS:
      return {};
    default:
      return state;
  }
};

export default filters;
