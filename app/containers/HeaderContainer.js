import { connect } from 'react-redux'
import { Header } from '../components'

const mapStateToProps = (state, ownProps) => {
	return {
		formName: state.form.result !== undefined ? state.form.entities.forms[state.form.result].name: "",
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
	}
}

const HeaderContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Header)

export default HeaderContainer