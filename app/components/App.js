import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom';
import { HeaderContainer, FiltersContainer } from '../containers'
import queryString from 'query-string';

class App extends Component {
	componentDidMount() {
		console.log("Did mount");

		this.fetchData();
	}

	fetchData() {
		const filters = queryString.parse(this.props.location.search);
		debugger;
		// this.props.fetchForm(filters);
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