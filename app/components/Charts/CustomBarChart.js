import React, { Component } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import PropTypes from 'prop-types';


 const CustomBarChart = ({ questionFilter, toggleFilter }) => {
	const { id, type, options } = questionFilter;
	const dataForChart = Object.keys(options).map((f) => options[f] );
	const onClickHandler = ({ value }) => {
		toggleFilter(value);
	}
	
	return (
		<BarChart className='chart-centered' width={600} height={300} data={dataForChart}
			margin={{top: 5, right: 30, left: 20, bottom: 5}} >
			<XAxis dataKey="name"/>
			<YAxis/>
			<CartesianGrid strokeDasharray="3 3"/>
			<Tooltip/>
			
			<Bar name="Cantidad de respuestas" dataKey="value" fill="#3f71b7" onClick={onClickHandler}>
			{
			  	dataForChart.map((filterOption) => (
				<Cell cursor="pointer" 
					fill={filterOption.selected ? '#69bb76' : '#3f71b7' } 
					stroke={filterOption.selected ? '#3e3d44' : '#00FFFFFF'} 
				  	strokeWidth={filterOption.selected ? 3 : 1}
					key={`cell-${id}-${filterOption.key}`}/>
			  ))
			}
			</Bar>
		</BarChart>		
	);
  	
}

CustomBarChart.propTypes = {
	questionFilter: PropTypes.object.isRequired,
	toggleFilter: PropTypes.func.isRequired,
}

export default CustomBarChart;