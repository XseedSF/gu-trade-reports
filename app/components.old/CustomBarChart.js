import React, { Component } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import {QuestionTitle} from './QuestionTitle.js'

export default class CustomBarChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedIndexes: [],
			data: this.processQuestionsForChart(this.props.filteredQuestions)
		};
	}
  	processQuestionsForChart(filteredQuestions) {
  		//Es multiple opcion, una columna por opción
  		const options = this.props.question.Options;
  		let data = options.map(o => { 
  						o.Amount = 0;
						//o.value = o.selectedOptionId;
						return o;
					});

  		filteredQuestions.forEach(q => {					
					for(let i = 0; i< data.length; i++){
						if(data[i].Id === q.SelectedOptionId) {
							data[i].Amount += 1;							
							break;
						}	
					}					
				}
			);
  		
		return data;
  	}	
	handleClick(data, index) {
		
		var selectedIndexesAux = this.state.selectedIndexes;
		//Revisamos si ya esta seleccionado
		var indexOfIndex = selectedIndexesAux.indexOf(index);
		if(indexOfIndex >= 0){
			this.setState({
				selectedIndexes: selectedIndexesAux.slice(0,indexOfIndex).concat(selectedIndexesAux.slice(indexOfIndex + 1))
			})
		}
		else {
			this.setState({
				selectedIndexes: [...selectedIndexesAux, index]
			})
		}

		this.props.handleFilter(this.props.question, this.state.data[index].Id);
	}
	checkCleanFilters(nextProps) {		
		if(nextProps.filters.length === 0)
			this.setState({ selectedIndexes: [] });
	}

	componentWillReceiveProps(nextProps) {

		let updateChart = true;
		if(this.props.filteredQuestions.length === nextProps.filteredQuestions.length) {
			nextProps.filters.forEach(f => {
				if(f.questionId === this.props.question.Id)
					updateChart = false;
			});
		}

		if(updateChart)
			this.setState({data: this.processQuestionsForChart(nextProps.filteredQuestions)});

		this.checkCleanFilters(nextProps);
  	}  	
	render() {
		const activeIndexes = this.state.selectedIndexes;
    	let dataForChart = this.state.data;
    	
		return (
			<div className='question-chart-container'>
				<QuestionTitle question={this.props.question} />
				<BarChart className='chart-centered' width={600} height={300} data={dataForChart}
				    margin={{top: 5, right: 30, left: 20, bottom: 5}} >
					<XAxis dataKey="Text"/>
					<YAxis/>
					<CartesianGrid strokeDasharray="3 3"/>
					<Tooltip/>
					
					<Bar name="Cantidad de respuestas" dataKey="Amount" fill="#3f71b7" onClick={this.handleClick.bind(this)}>
					{
		              	dataForChart.map((entry, index) => (
		                <Cell cursor="pointer" 
			                fill={activeIndexes.indexOf(index) !== -1 ? '#69bb76' : '#3f71b7' } 
			                stroke={activeIndexes.indexOf(index) !== -1 ? '#3e3d44' : '#00FFFFFF'} 
	                      	strokeWidth={activeIndexes.indexOf(index) !== -1 ? 3 : 1}
			                key={`cell-${index}`}/>
		              ))
		            }
					</Bar>
				</BarChart>				
			</div>
		);
	}
	componentDidMount() {
  		this.setState({data: this.processQuestionsForChart(this.props.filteredQuestions)});
  	}
  	
}

CustomBarChart.propTypes = {
	question: React.PropTypes.object.isRequired,
	filteredQuestions: React.PropTypes.array.isRequired,
	filters: React.PropTypes.array.isRequired,
	handleFilter: React.PropTypes.func.isRequired
}