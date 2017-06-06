import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const COLORS = ['#3f71b7', '#dfaa5e'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
			{(index === 0 ? 'Si - ' : 'No - ') + `${(percent * 100).toFixed(0)}%`}
		</text>
	);
};

const CustomPieChart = ({ questionFilter, toggleFilter }) => {
	const { id, type, options } = questionFilter;
	const optionsKeys = Object.keys(options);
	const dataForChart = optionsKeys.map((f) => options[f]);
	const activeIndex = optionsKeys.findIndex((e) => options[e].selected);
	const onClickHandler = (value) => {
		debugger;
		toggleFilter(id, type, value.key);
	}
	
	return (
		<PieChart className='chart-centered' width={300} height={300} onClick={onClickHandler}>
			<Pie
				activeIndex={activeIndex}
				isAnimationActive={true}
				data={dataForChart}
				cx={150}
				cy={150}
				outerRadius={115}
				fill="#8884d8"
				paddingAngle={0}
				valueKey="Amount"
				label={renderCustomizedLabel}
				labelLine={false}>
				{
					dataForChart.map((filterOption, index) =>
						<Cell stroke={filterOption.selected ? '#3e3d44' : '#00FFFFFF'}
							strokeWidth={filterOption.selected ? 3 : 1}
							fill={filterOption.selected ? '#69bb76' : COLORS[index % COLORS.length]}
							key={`cell-${id}-${filterOption.value}`} />
					)
				}
			</Pie>
			<Tooltip />
		</PieChart>
	);
};

CustomPieChart.propTypes = {
	questionFilter: PropTypes.object.isRequired,
	toggleFilter: PropTypes.func.isRequired,
}

export default CustomPieChart;