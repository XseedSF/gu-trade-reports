import React from 'react';
import ReactDOM from 'react-dom';
import App from './dist/app';

import configureStore from './dist/configureStore'
import { fetchForm, toggleAnswerFilter, clearFilters } from './dist/actions';
import { questionsFiltersSelector } from './dist/selectors';

const initialData = document.getElementById('initial-data');
const form = JSON.parse(initialData.text);

ReactDOM.render(
  <App form={form}/>,
  document.getElementById('root')
);

var store = configureStore();
store.dispatch(fetchForm(form));

store.subscribe(function() {
	const state = store.getState();
	if(state.form && state.form.result > 0){
		const filters = questionsFiltersSelector(state);
		console.log(filters);
	}
});
//var questionFilters = questionsFiltersSelector(store.getState());

initialData.remove(); 
