import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import configureStore from './configureStore';
import './index.css';
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

var store = configureStore();

ReactDOM.render(
	<Root store={store} />,
	document.getElementById('root')
);