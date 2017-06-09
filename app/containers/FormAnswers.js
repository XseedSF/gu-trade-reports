import { connect } from 'react-redux';
import { toggleAnswerFilter, clearFilters } from '../actions'
import { filteredFormsSelector } from '../selectors';

const mapStateToProps = (state, props) => {
	return {
		completedForms: state.form.result !== undefined ? filteredFormsSelector(state) : [],
	}
}

const container = connect(
	mapStateToProps,
);

export default container;