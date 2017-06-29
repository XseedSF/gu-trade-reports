import { connect } from "react-redux";
import { toggleAnswerFilter, clearFilters } from "../actions";
import { questionsFiltersSelector } from "../selectors";

const mapStateToProps = (state, ownProps) => {
  let isFiltered = false;
  let questionsFilters = [];
  if (state.form.result) {
    questionsFilters = questionsFiltersSelector(state);
    isFiltered = questionsFilters.some(q => q.filter !== undefined);
  }

  return {
    isFiltered,
    questionsFilters,
    isLoading: state.form.isLoading
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleFilter: (id, type, value) => {
      dispatch(toggleAnswerFilter(id, type, value));
    },
    clearFilters: () => {
      dispatch(clearFilters());
    }
  };
};

const FiltersContainer = connect(mapStateToProps, mapDispatchToProps);

export default FiltersContainer;
