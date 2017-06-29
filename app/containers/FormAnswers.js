import { connect } from "react-redux";
import { toggleAnswerFilter, clearFilters } from "../actions";
import { filteredFormsSelector } from "../selectors";

const mapStateToProps = (state, props) => {
  let questions = [];
  let completedForms = [];
  if (state.form.result !== undefined) {
    const result = filteredFormsSelector(state);
    questions = result.questions;
    completedForms = result.completedForms;
  }

  return {
    questions,
    completedForms,
    isLoading: state.form.isLoading
  };
};

const container = connect(mapStateToProps);

export default container;
