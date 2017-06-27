import { createSelector } from "reselect";
import { filterTypes, questionTypes } from "../constants";
import {
  formSelector,
  filtersSelector,
  filterFormIgnoringQuestions
} from "./common";

//--------- Selector questionsFilters ---------//
// Create the filters that are going to be used
export const questionsFiltersSelector = createSelector(
  formSelector,
  filtersSelector,
  (formSelect, filters) => {
    const { entities, result } = formSelect;
    const { questions, options, completedForms, answers, forms } = entities;
    const form = forms[result];

    return form.questions
      .map(questionid => {
        const question = questions[questionid];
        const { Id, Text, Type, Options: questionOptions } = question;

        // Creo las opciones posibles
        let filterOptions = createFitlerOptions(
          question,
          options,
          filters,
          answers
        );
        if (!filterOptions) return null;

        // Cuanto cantidad de formularios filtrados hay por opción
        countFilteredFormsFilterOptions(
          form,
          entities,
          filters,
          filterOptions,
          questionid
        );

        // Quito opciones con valor 0
        // TODO

        const type = getFilterTypeFromQuestionType(Type);

        return {
          id: Id,
          text: Text,
          type,
          options: filterOptions,
          filter: filters[questionid]
        };
      })
      .filter(f => f);
  }
);

const getFilterTypeFromQuestionType = questiontype => {
  switch (questiontype) {
    case questionTypes.NUMERIC:
      return filterTypes.NUMERIC_RANGE_SELECT;
    case questionTypes.DATE:
      return filterTypes.DATE_RANGE_SELECT;
    case questionTypes.MULTIPLE_OPTION:
      return filterTypes.MULTI_SELECT;
    default:
      return filterTypes.SINGLE_SELECT;
  }
};

const countFilteredFormsFilterOptions = (
  form,
  { completedForms, answers },
  filters,
  filterOptions,
  questionId
) => {
  const hasFilters = filters[questionId] !== undefined;
  const alwaysTrue = () => true;
  const filterForm = hasFilters
    ? alwaysTrue
    : filterFormIgnoringQuestions(answers, filters, questionId);

  const countForm = completedForm => {
    const value = completedForm.answers
      .map(id => answers[id])
      .filter(answer => answer.QuestionId === questionId)
      .reduce((prev, answer) => answer.value, null);
    if (filterOptions[value] !== undefined) {
      filterOptions[value].value += 1;
    }
  };

  form.completedForms
    .map(id => completedForms[id])
    .filter(filterForm)
    .forEach(countForm);
};

const createFitlerOptions = (question, optionsById, filters, answers) => {
  const { Id, Type, Options, Required } = question;
  const filter = filters[Id];
  const createOption = getCreateOption(Type, filter);
  let options = null;

  switch (Type) {
    // Una opción por opción de pregunta, numeros van a entrar aca en el futuro
    case questionTypes.MULTIPLE_OPTION:
      options = Options.reduce((ac, e) => {
        ac[e] = createOption(optionsById[e].Text, e);
        return ac;
      }, {});
      break;
    // Opción si o no
    case questionTypes.YES_NO:
    case questionTypes.CHECKBOX:
      options = {
        true: createOption("Si", true),
        false: createOption("No", false)
      };
      break;
    // Opción completado y no completado
    case questionTypes.BAR_CODE:
    case questionTypes.FREE_TEXT:
    case questionTypes.IMAGE:
    case questionTypes.SIGNATURE:
    case questionTypes.CAMERA:
      // Si es requerido no hay opciones de filtro
      if (!Required)
        options = {
          true: createOption("Completado", true),
          false: createOption("No Completado", false)
        };
      break;
    case questionTypes.DATE:
      options = Object.keys(answers)
        .map(id => answers[id])
        .filter(answer => answer.QuestionId == Id && answer.DateReply != null)
        .map(answer => answer.value)
        .reduce((acum, elem) => {
          acum[elem] = createOption(elem, elem);
          return acum;
        }, {});
      break;
    case questionTypes.NUMERIC:
      options = Object.keys(answers)
        .map(id => answers[id])
        .filter(answer => answer.QuestionId == Id && answer.FreeText != null)
        .map(answer => answer.value)
        .reduce((acum, elem) => {
          acum[elem] = createOption(elem, elem);
          return acum;
        }, {});
      break;
  }
  return options;
};

const getCreateOption = (type, filter) => {
  switch (type) {
    case questionTypes.DATE:
    case questionTypes.NUMERIC:
      return createRangeFilterOption(filter);
    default:
      return createValueFilterOption(filter);
  }
};

const createValueFilterOption = filter => (name, option) => ({
  name,
  selected: isFilterSelected(filter, option),
  value: 0,
  key: option
});

const isFilterSelected = (filter, option) =>
  filter !== undefined && filter.selected.includes(option);

const createRangeFilterOption = filter => (name, option) => ({
  name,
  selected: isFilterIncluded(filter, option),
  value: 0,
  key: option
});

const isFilterIncluded = (filter, option) =>
  filter !== undefined &&
  filter.selected !== undefined &&
  option >= filter.selected[0] &&
  option <= filter.selected[1];
