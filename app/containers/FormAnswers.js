import { connect } from 'react-redux';
import { toggleAnswerFilter, clearFilters } from '../actions'
import { filteredFormsSelector, filteredQuestionsSelector} from '../selectors';

const mapStateToProps = (state, props) => {
	return {
		questions: state.form.result !== undefined ? filteredQuestionsSelector(state) : [],
		completedForms: state.form.result !== undefined ? filteredFormsSelector(state) : [],
	}
}

const container = connect(
	mapStateToProps,
);

export default container;