import { connect } from 'react-redux'
import { toggleAnswerFilter, clearFilters } from '../actions'
import { questionsFiltersSelector } from '../selectors';

const mapStateToProps = (state, ownProps) => {
	console.log(state.form.result !== undefined ? questionsFiltersSelector(state) : []);
	return {
		questionsFilters: state.form.result !== undefined ? questionsFiltersSelector(state) : [],
		isLoading: state.app.isLoading
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		toggleFilter: (id, type, value) => {
			dispatch(toggleAnswerFilter(id, type, value));
		},
		clearFilters: () => {
			dispatch(clearFilters());
		},
	}
}

const FiltersContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
);

export default FiltersContainer;