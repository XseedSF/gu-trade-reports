import formReportApp from './reducers';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

const configureStore = () => {
	const middlewares = [thunkMiddleware];
	if (process.env.NODE_ENV !== 'production') {
		middlewares.push(logger);
	}

	const store = createStore(
		formReportApp,
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
		applyMiddleware(...middlewares),
	);

	return store;
}

export default configureStore;