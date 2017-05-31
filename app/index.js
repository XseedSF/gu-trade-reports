import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';

import configureStore from './configureStore'
import { fetchForm, toggleAnswerFilter, clearFilters } from './actions';
import { questionsFiltersSelector } from './selectors';

const initialData = document.getElementById('initial-data');
const form = JSON.parse(initialData.text);


// <App form={form}/>,

var store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

store.dispatch(fetchForm(form));

store.subscribe(function () {
	const state = store.getState();
	if (state.form && state.form.result > 0) {
		const filters = questionsFiltersSelector(state);
		console.log(filters);
	}
});
// var questionFilters = questionsFiltersSelector(store.getState());

initialData.remove();