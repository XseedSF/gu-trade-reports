import React from 'react';
import PropTypes from 'prop-types';
import { filterTypes } from '../constants';
import { CustomBarChart, CustomPieChart } from './Charts';

const Filters = ({ questionsFilters, toggleFilter, clearFilters }) => (
	<div>
		<button className='button-clean-filter' onClick={clearFilters}> Limpiar filtros </button>
		<div>
			{questionsFilters.map((f) => (
				<Filter key={`filter-${f.id}`}
					questionFilter={f}
					toggleFilter={toggleFilter}
				 />
			))}
		</div>
	</div>
)

Filters.propTypes = {
	questionsFilters: PropTypes.array.isRequired,
	toggleFilter: PropTypes.func.isRequired,
	clearFilters: PropTypes.func.isRequired,
}

export default Filters;

const Filter = ({ questionFilter, toggleFilter }) => {	
	let specificFilter = null;
  	switch(questionFilter.type) {
		case filterTypes.MULTI_SELECT:		  
			specificFilter = <CustomBarChart  key={questionFilter.id}
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
  		<div>
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
		<label className='question-title'> Pregunta: { text } </label>
	</div>
)


FilterTitle.propTypes = {
	text: PropTypes.string.isRequired,
}


/*
compnents/
	app/
		index.js
		app.js
		header.js
		descriptions.js
		title.js
	filters/
		index.js
		filtersGrid.js



app/
	header/
		components/
			index.js
			header.js
			description.js //Quitar clearFitlers de acá
			title.js
	filters/
		components/
			index.js
			filtersGrid.js
			filter.js
			barChart.js
			pieChart.js
		actions/
			index.js
			schema.js
		reducers/
			index.js
*/