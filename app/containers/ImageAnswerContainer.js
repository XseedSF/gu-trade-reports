import { connect } from "react-redux";
import { fetchAnswerImage } from "../actions";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchAnswerImage: (answerId) => {
      dispatch(fetchAnswerImage(answerId));
    }
  };
};

const container = connect(null, mapDispatchToProps);

export default container;
