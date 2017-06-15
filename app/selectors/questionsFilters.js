import { createSelector } from 'reselect'
import { formSelector, filtersSelector, filterFormIgnoringQuestions } from './common';

//--------- Selector questionsFilters ---------//
// Create the filters that are going to be used
export const questionsFiltersSelector = createSelector(
	formSelector,
	filtersSelector,
	(formSelect, filters) => {
		const { entities, result } = formSelect;
		const { questions, options, completedForms, answers, forms } = entities;
		const form = forms[result];

		return form.questions.map((q) => {
			const question = questions[q];
			const { id, text, type, options: questionOptions } = question;

			// Me fijo que tipo de filtro es
			const filterType = type === 'MO' ? 'MULTI_SELECT' : 'SINGLE_SELECT';

			// Creo las opciones posibles
			let filterOptions = createFitlerOptions(question, options, filters);
			if (!filterOptions) return null;

			// Cuanto cantidad de formularios filtrados hay por opción
			countFilteredFormsFilterOptions(form, entities, filters, filterOptions, q);

			// Quito opciones con valor 0
			// TODO

			return { id, text, filterType, options: filterOptions };
		})
			.filter((f) => f);
	}
);

const countFilteredFormsFilterOptions = (form, { completedForms, answers }, filters, filterOptions, q) => {
	const hasFilters = filters[q] !== undefined;
	const alwaysTrue = () => true;
	const filterForm = hasFilters ? alwaysTrue : filterFormIgnoringQuestions(answers, filters, q);

	const countForm = (cf) => {
		const value = cf.answers
			.map((a) => answers[a])
			.filter((a) => a.questionId === q)
			.reduce((ac, a) => a.value, null);
		filterOptions[value].value += 1;
	};

	form.completedForms
		.map((id) => completedForms[id])
		.filter(filterForm)
		.forEach(countForm);

}

const createFitlerOptions = (question, optionsById, filters) => {
	const { id, type, options, required } = question;
	const filter = filters[id];
	const createOption = createFilterOption(filter);
	let filterOptions = null;

	switch (type) {
		// Una opción por opción de pregunta, numeros van a entrar aca en el futuro
		case 'MO':
			filterOptions = options.reduce((ac, e) => {
				ac[e] = createOption(optionsById[e].Text, e);
				return ac;
			}, {});
			break;
		// Opción si o no
		case 'YN': case 'CK':
			filterOptions = {
				true: createOption("Si", true),
				false: createOption("No", false),
			};
			break;
		// Opción completado y no completado
		case 'CODE': case 'DATE': case 'FT': case 'IMG': case 'NUM': case 'SIG':
			// Si es requerido no hay opciones de filtro
			if (!required)
				filterOptions = {
					true: createOption("Completado", true),
					false: createOption("No Completado", false),
				};
			break;
	}
	return filterOptions;
}

const createFilterOption = (filter) => ((name, option) => ({ name, selected: isFilterSelected(filter, option), value: 0, key: option }))
const isFilterSelected = (filter, option) => filter !== undefined && filter.selected.includes(option)