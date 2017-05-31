import { connect } from 'react-redux'
import { toggleAnswerFilter, clearFilters } from '../actions'
import { questionsFiltersSelector } from '../selectors';
import { Filters } from '../components'

const mapStateToProps = (state, ownProps) => {
	return {
		questionsFilters: state.form.result !== undefined ? questionsFiltersSelector(state) : [],
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
)(Filters)

export default FiltersContainer