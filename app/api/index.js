import axios from "axios";

export const fetchForm = filtersQuery => {
  return axios
    .get(`/api/getCompletedForms${filtersQuery}`)
    .then(({ data: response }) => {
      return response.error ? {} : response.data;
    });
};

export const fetchAnswerImage = answerId => {
  return axios
    .get(`/api/getAnswerImage?answerId=${answerId}`)
    .then(({ data: response }) => {
      return response.error ? {} : response.data;
    });
};
