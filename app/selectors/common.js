// State selectors
export const formSelector = state => state.form;
export const filtersSelector = state => state.filters;

export const filterFormIgnoringQuestions = (answers, filters, ignoredQuestion) => {
  return (cf) => cf.answers.reduce((ac, a) => {
    const answer = answers[a];
		if (answer === undefined) return ac;
    const filter = filters[answer.Id];
    return ac && (!filter || filter.id === ignoredQuestion || filter.selected.includes(answer.value));
  }, true);
};