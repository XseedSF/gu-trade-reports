import { actions } from "../constants";

const form = (state = {}, action) => {
  switch (action.type) {
    case actions.REQUEST_FORM:
      return {
        ...state,
        isLoading: true
      };
    case actions.REQUEST_FORM_SUCCESS:
      if (action.response) {
        return {
          ...state,
          ...action.response,
          isLoading: false
        };
      }
    case actions.SET_ANSWER_IMAGE:
      const { imageBase64, answerId } = action;
      if (imageBase64) {
        var answer = state.entities.answers[answerId];

        return {
          ...state,
          entities: {
            ...state.entities,
            answers: {
              ...state.entities.answers,
              [answerId]: {
                ...answer,
                ImageBase64: imageBase64
              }
            }
          }
        };
      }
    default:
      return state;
  }
};

export default form;
