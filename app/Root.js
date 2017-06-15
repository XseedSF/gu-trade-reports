import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { App } from './components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

const Root = ({ store }) => (
	<MuiThemeProvider>
		<Provider store={store}>
			<Router>
				<Route path='/' component={App} />
			</Router>
		</Provider>
	</MuiThemeProvider>
);

export default Root;