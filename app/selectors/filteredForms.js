import { createSelector } from 'reselect'
import { formSelector, filtersSelector, filterFormIgnoringQuestions } from './common';

//--------- Selector filteredForms ---------//
// Filter completed forms
export const filteredFormsSelector = createSelector(
	formSelector,
	filtersSelector,
	(formSelect, filters) => {
		const { entities, result } = formSelect;
		const { completedForms, answers, forms } = entities;
		const form = forms[result];

		const filterForm = filterFormIgnoringQuestions(answers, filters, -1);

		return form.completedForms
			.map((id) => {
				// debugger;
				const completedForm = completedForms[id];
				const questions = completedForm.questions
					.map(questionId => answers[questionId]);

				return {
					...completedForm,
					questions
				}
			})
			.filter(filterForm);
	}
);

export const filteredQuestionsSelector = createSelector(
	formSelector,
	filtersSelector,
	(formSelector, filters) => {
		const { entities, result } = formSelector;
		const { questions, forms } = entities;
		const form = forms[result];

		return form.questions.map(id => questions[id]);
	}
);