import { combineReducers } from 'redux';
import filters from './filters';
import form from './form';

const formReportApp = combineReducers({
  form,
  filters,
});

export default formReportApp;