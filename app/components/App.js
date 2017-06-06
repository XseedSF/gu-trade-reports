import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom';
import { HeaderContainer, FiltersContainer } from '../containers';
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
			<div>
				<HeaderContainer />
				<FiltersContainer />
			</div>
		);
	}
}

export default App;