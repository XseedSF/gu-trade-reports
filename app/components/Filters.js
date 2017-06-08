import React from 'react';
import PropTypes from 'prop-types';
import { filterTypes } from '../constants';
import { CustomBarChart, CustomPieChart } from './Charts';
import { compose } from 'recompose';
import FiltersContainer from '../containers/FiltersContainer';
import withSpinnerWhileLoading from '../hocs/withSpinnerWhileLoading';

const Filters = ({ questionsFilters, toggleFilter, clearFilters }) =>
	<div>
		<button className='button-clean-filter' onClick={clearFilters}> Limpiar filtros </button>
		<div className="question-charts-container">
			{questionsFilters.map((f) => (
				<Filter key={`filter-${f.id}`}
					questionFilter={f}
					toggleFilter={toggleFilter}
				/>
			))}
		</div>
	</div>

Filters.propTypes = {
	questionsFilters: PropTypes.array.isRequired,
	toggleFilter: PropTypes.func.isRequired,
	clearFilters: PropTypes.func.isRequired,
}

const enhance = compose(
	FiltersContainer,
	withSpinnerWhileLoading,
);

export default enhance(Filters);

const Filter = ({ questionFilter, toggleFilter }) => {
	let specificFilter = null;
	switch (questionFilter.type) {
		case filterTypes.MULTI_SELECT:
			specificFilter = <CustomBarChart key={questionFilter.id}
				questionFilter={questionFilter}
				toggleFilter={toggleFilter}
			/>;
			break;
		case filterTypes.SINGLE_SELECT:
			specificFilter = <CustomPieChart key={questionFilter.id}
				questionFilter={questionFilter}
				toggleFilter={toggleFilter}
			/>
			break;
	}

	return (
		<div className="question-chart-box">
			<FilterTitle text={questionFilter.text} />
			{specificFilter}
		</div>
	);
}

Filter.propTypes = {
	questionFilter: PropTypes.object.isRequired,
	toggleFilter: PropTypes.func.isRequired,
}

const FilterTitle = ({ text }) => (
	<div className='question-title-container'>
		<label className='question-title'> Pregunta: <span className="question-title-text"> {text} </span> </label>
	</div>
)

FilterTitle.propTypes = {
	text: PropTypes.string.isRequired,
}