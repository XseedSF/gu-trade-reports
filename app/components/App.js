import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom';
import Header from './Header';
import Filters from './Filters';
import { AppContainer } from '../containers';
import '../App.css';
import '../fixed-data-table.css';

class App extends Component {
	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
		const filtersQuery = this.props.location.search;
		this.props.fetchForm(filtersQuery);
	}

	render() {
		return (
			<div className='App'>
				<Header />
				<Filters />
			</div>
		);
	}
}

export default AppContainer(App);