import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './dist/app';

import configureStore from './dist/configureStore'
import { fetchForm, toggleAnswerFilter, clearFilters } from './dist/actions';
import { questionsFiltersSelector } from './dist/selectors';

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

store.subscribe(function() {
	const state = store.getState();
	if(state.form && state.form.result > 0){
		const filters = questionsFiltersSelector(state);
		console.log(filters);
	}
});
var questionFilters = questionsFiltersSelector(store.getState());

initialData.remove(); 
