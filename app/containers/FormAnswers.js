import { connect } from 'react-redux';
import { toggleAnswerFilter, clearFilters } from '../actions'
import { filteredFormsSelector } from '../selectors';

const mapStateToProps = (state, props) => {
	if (state.form.result !== undefined) {
		const result = filteredFormsSelector(state)
		return {
			questions: result.questions,
			completedForms: result.completedForms
		}
	}
	return {
		questions: [],
		completedForms: [],
	}
}

const container = connect(
	mapStateToProps,
);

export default container;