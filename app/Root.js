import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AppContainer } from './containers';

const Root = ({ store }) => (
	<Provider store={store}>
		<Router>
			<Route path='/' component={AppContainer} />
		</Router>
	</Provider>
);

export default Root;