import { questionTypes } from "../constants";
import moment from "moment";

// State selectors
export const formSelector = state => state.form;
export const filtersSelector = state => state.filters;

export const filterFormIgnoringQuestions = (
  answers,
  filters,
  ignoredQuestion
) => {
  return completedForm =>
    completedForm.answers.reduce((previousValue, answerId) => {
      const answer = answers[answerId];
      const filter = filters[answer.QuestionId];

      let matchesFilter;
      switch (answer.Type) {
        case questionTypes.DATE:
        case questionTypes.NUMERIC:
          matchesFilter =
            filter != null && isValueInRange(answer.value, filter.selected);
          break;
        default:
          matchesFilter =
            filter != null && filter.selected.includes(answer.value);
          break;
      }

      return (
        previousValue &&
        (!filter || filter.id === ignoredQuestion || matchesFilter)
      );
    }, true);
};

const isValueInRange = (value, range) => {
  const min = range[0];
  const max = range[1];
  return value >= min && value <= max;
};
