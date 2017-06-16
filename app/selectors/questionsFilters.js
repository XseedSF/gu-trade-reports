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
			const { Id, Text, Type, Options: questionOptions } = question;

			// Me fijo que tipo de filtro es
			const type = Type === 'MO' ? 'MULTI_SELECT' : 'SINGLE_SELECT';

			// Creo las opciones posibles
			let filterOptions = createFitlerOptions(question, options, filters);
			if (!filterOptions) return null;

			// Cuanto cantidad de formularios filtrados hay por opción
			countFilteredFormsFilterOptions(form, entities, filters, filterOptions, q);

			// Quito opciones con valor 0
			// TODO

			return { id: Id, text: Text, type, options: filterOptions };
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
			.filter((a) => a.QuestionId === q)
			.reduce((ac, a) => a.value, null);
		filterOptions[value].value += 1;
	};

	form.completedForms
		.map((id) => completedForms[id])
		.filter(filterForm)
		.forEach(countForm);

}

const createFitlerOptions = (question, optionsById, filters) => {
	const { Id, Type, Options, Required } = question;
	const filter = filters[Id];
	const createOption = createFilterOption(filter);
	let options = null;

	switch (Type) {
		// Una opción por opción de pregunta, numeros van a entrar aca en el futuro
		case 'MO':
			options = Options.reduce((ac, e) => {
				ac[e] = createOption(optionsById[e].Text, e);
				return ac;
			}, {});
			break;
		// Opción si o no
		case 'YN': case 'CK':
			options = {
				true: createOption("Si", true),
				false: createOption("No", false),
			};
			break;
		// Opción completado y no completado
		case 'CODE': case 'DATE': case 'FT': case 'IMG': case 'NUM': case 'SIG': case 'CAM':
			// Si es requerido no hay opciones de filtro
			if (!Required)
				options = {
					true: createOption("Completado", true),
					false: createOption("No Completado", false),
				};
			break;
	}
	return options;
}

const createFilterOption = (filter) => ((name, option) => ({ name, selected: isFilterSelected(filter, option), value: 0, key: option }))
const isFilterSelected = (filter, option) => filter !== undefined && filter.selected.includes(option)