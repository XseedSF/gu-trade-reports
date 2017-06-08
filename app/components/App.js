import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom';
import { HeaderContainer } from '../containers';
import { Filters } from '../components';
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
				<HeaderContainer />
				<Filters />
			</div>
		);
	}
}

export default App;