import React from 'react'
import Header from './Header';
import Filters from './Filters';
import { AppContainer } from '../containers';
import { compose, lifecycle } from 'recompose';
import '../App.css';
import '../fixed-data-table.css';

const App = () =>
	<div className='App'>
		<Header />
		<Filters />
	</div>;

const withFetchForm = lifecycle({
	componentDidMount() {
		const filtersQuery = this.props.location.search;
		this.props.fetchForm(filtersQuery);
	}
});

export default compose(
	AppContainer,
	withFetchForm,
)(App);