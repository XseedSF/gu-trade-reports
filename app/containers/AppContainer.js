import { connect } from "react-redux";
import { fetchForm } from "../actions";
import { filteredFormsSelector } from "../selectors";

const mapStateToProps = (state, ownProps) => {
  return {
    //form: state.form.result !== undefined ? filteredFormsSelector(state) : {},
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchForm: filters => {
      dispatch(fetchForm(filters));
    }
  };
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps);

export default AppContainer;
