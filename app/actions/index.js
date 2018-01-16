import { normalize } from "normalizr";
import * as schema from "./schema";
import * as api from "../api";
import { actions } from "../constants";

export const toggleAnswerFilter = (id, type, value) => ({
  type: actions.TOGGLE_ANSWER_FILTER,
  payload: { id, value, type }
});

export const clearFilters = () => ({ type: actions.CLEAR_FILTERS });

export const requestForm = () => ({ type: actions.REQUEST_FORM });

export const requestFormSuccess = response => ({
  type: actions.REQUEST_FORM_SUCCESS,
  response
});

export const fetchForm = filtersQuery => dispatch => {
  dispatch(requestForm());
  api.fetchForm(filtersQuery).then(form => {
    dispatch(requestFormSuccess(normalize(form, schema.form)));
  });
};

export const setAnswerImage = (answerId, imageBase64) => ({
  type: actions.SET_ANSWER_IMAGE,
  answerId,
  imageBase64
});

export const fetchAnswerImage = answerId => dispatch => {
  api.fetchAnswerImage(answerId).then(imageBase64 => {
    dispatch(setAnswerImage(answerId, imageBase64));
  });
};
