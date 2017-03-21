import React, { Component } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


export default class BarChartQuestion extends Component {

		render() {
			return (
				<BarChart className='chart-centered' width={600} height={300} data={this.props.data}
				    margin={{top: 5, right: 30, left: 20, bottom: 5}} >
					<XAxis dataKey="selectedOptionName"/>
					<YAxis/>
					<CartesianGrid strokeDasharray="3 3"/>
					<Tooltip/>
					<Legend />
					<Bar name="Cantidad de respuestas" dataKey="amount" fill="#8884d8" onClick={this.props.handleClick.bind(this)}>
					{
		              this.props.data.map((entry, index) => (
		                <Cell cursor="pointer" fill={this.props.activeIndexes.indexOf(index) !== -1 ? '#82ca9d' : '#8884d8' } key={`cell-${index}`}/>
		              ))
		            }
					</Bar>
				</BarChart>
			)
		}
}