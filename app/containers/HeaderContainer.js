import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
	return {
		formName: state.form.result !== undefined ? state.form.entities.forms[state.form.result].name : "",
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
	}
}

const HeaderContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
);

export default HeaderContainer;