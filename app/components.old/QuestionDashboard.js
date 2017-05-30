import React, { Component } from 'react';
import CustomBarChart from './CustomBarChart.js'
import CustomPieChart from './CustomPieChart.js'
import {filterForms} from '../lib/utils'

export default class QuestionDashboard extends Component {

	filterFormQuestions(question) {
		let forms = this.props.forms;
		let formsFiltered = this.props.filters.length > 0 ? filterForms(forms, this.props.filters, question) : forms;

		return this.flattenFormQuestions(formsFiltered, question);
	};

	flattenFormQuestions(forms, question) {
		return forms
		    .map(form => form.questions)
		    .reduce((a,b) => a.concat(b), [])
		    .filter(q => q.Id === question.Id);
	}

	isQuestionInFilters(question) {
		return this.props.filters.findIndex(filter => filter.questionId === question.Id) !== -1;
	}

	render() {
		const renderChart = (question) => {
			if(question.Type === 'MO' || question.Type === 'YN')
	      	{
	      		let filteredQuestions = this.isQuestionInFilters(question) ? 
	      		      		this.flattenFormQuestions(this.props.forms, question) : this.filterFormQuestions(question);
	      	
  		      	switch(question.Type) {
  		        case 'MO':          
  		          	return <CustomBarChart question={question} 
  		          			  filteredQuestions={filteredQuestions} 	                    
  		                      key={question.Id}
  		                      handleFilter={this.props.handleFilter.bind(this)}
  		                      filters={this.props.filters}
  		                  	/>;
  		        case 'YN':
  		          	return <CustomPieChart question={question}                       
  		                      filteredQuestions={filteredQuestions} 	                        
  		                      key={question.Id}
  		                      handleFilter={this.props.handleFilter.bind(this)}
  		                      filters={this.props.filters}
  		                  	/>
  		        default:
	            	break;
  		      	}
	        }	      	
	    }
		return (
			<div>        
		        {this.props.forms.length > 0 &&
		          this.props.questions
		            .map(question => renderChart(question))}              
			</div>
		)
	}
}