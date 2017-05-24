import { createSelector } from 'reselect'

const formSelector = state => state.form;
const filtersSelector = state => state.filters;

export const questionsFiltersSelector = createSelector(
  formSelector,
  filtersSelector,
  (formSelect, filters) => {
    const { entities, result } = formSelect;
  	const { questions, options, completedForms, answers, forms } = entities;
    const form = forms[result];

  	const questionFilters = form.questions.map((q) => {
      const question = questions[q];
  		const { Id, Text, Type, Options: questionOptions } = question;

      // Me fijo que tipo de filtro es
  		const type = Type === 'MO' ? 'MULTI_SELECT' : 'SINGLE_SELECT';

      // Creo las opciones posibles
  		let filterOptions = createFitlerOptions(question, options);
      if(!filterOptions) return null;

      // Cuanto cantidad de formularios filtrados hay por opción
      countFilteredFormsFilterOptions(form, entities, filters, filterOptions, q);

      // Quito opciones con valor 0
      // TODO

  		return { id: Id, text: Text, type, options: filterOptions };
  	})
    .filter((f) => f );

    return questionFilters;
  }
);

const countFilteredFormsFilterOptions = (form, { completedForms, answers }, filters, filterOptions, q) => {

  const filterForm = (cf) =>  cf.questions.reduce((ac, a) => {
        const answer = answers[a];
        const filter = filters[answer.Id];
        return ac && (!filter || filter.id === q || filter.selected.includes(answer.value)); 
      }, true);

  const countForm = (cf) => {
      // sumar en la pregunta, ojo con los indices creo que uno es de anwer y el otro de question
      const value = cf.questions
        .map((a) => answers[a] )
        .filter((a) => a.Id === q)
        .reduce((ac, a) => a.value ,null);
      filterOptions[value].count += 1;
  };

  form.completedForms
    .map((cf) =>  completedForms[cf] )
    .filter(filterForm)
    .forEach(countForm);

}

const createFitlerOptions = (question, optionsById) => {
  const { Type, Options, Required } = question;
  let options = null;

  switch(Type){
    // Una opción por opción de pregunta, numeros van a entrar aca en el futuro
    case 'MO':
      options = Options.reduce((ac,e) => {
        ac[e] = createFilterOption(optionsById[e].Text);
        return ac;
      }, {});
    break;
    // Opción si o no
    case 'YN': case 'CK':
      options = { 
        true: createFilterOption("Si"),
        false: createFilterOption("No"),
      };
      if(!Required) 
        options[null] = createFilterOption("No Completado");
    break;
    // Opción completado y no completado
    case 'CODE': case 'DATE': case 'FT': case 'IMG': case 'NUM': case 'SIG':
      // Si es requerido no hay opciones de filtro
      if(!Required) 
        options = { 
          true: createFilterOption("Completado"),
          false: createFilterOption("No Completado"),
        };
    break;
  }
  return options;
}

const createFilterOption = (text) => ({ text, count: 0})