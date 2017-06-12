import { createSelector } from 'reselect'
import { formSelector, filtersSelector, filterFormIgnoringQuestions } from './common';

//--------- Selector filteredForms ---------//
// Filter completed forms
export const filteredFormsSelector = createSelector(
	formSelector,
	filtersSelector,
	(formSelect, filters) => {
		const { entities, result } = formSelect;
		const { completedForms, answers, forms, questions } = entities;
		const form = forms[result];

		const filterForm = filterFormIgnoringQuestions(answers, filters, -1);

		const filteredCompletedForms = form.completedForms
			.map((id) => {
				const completedForm = completedForms[id];
				const completdFormAnswers = completedForm.answers
					.map(answerId => answers[answerId]);

				return {
					...completedForm,
					answers: completdFormAnswers
				}
			})
			.filter(filterForm);

		const formQuestions = form.questions.map(id => questions[id]);

		return {
			completedForms: filteredCompletedForms,
			questions: formQuestions
		}
	}
);