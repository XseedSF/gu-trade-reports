import { combineReducers } from 'redux';
import filters from './filters';
import form from './form';
import app from './app';

const formReportApp = combineReducers({
	app,
	form,
	filters,
});

export default formReportApp;