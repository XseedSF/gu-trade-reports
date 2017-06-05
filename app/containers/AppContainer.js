import { connect } from 'react-redux';
import { fetchForm } from '../actions';
import { filteredFormsSelector } from '../selectors';
import { App } from '../components';

const mapStateToProps = (state, ownProps) => {
	return {
		//form: state.form.result !== undefined ? filteredFormsSelector(state) : {},
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		fetchForm: (filters) => {
			dispatch(fetchForm(filters));
		},
	}
}

const AppContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
)(App);

export default AppContainer;