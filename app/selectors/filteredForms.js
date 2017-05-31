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
      .map((cf) => completedForms[cf])
      .filter(filterForm);
  }
);
