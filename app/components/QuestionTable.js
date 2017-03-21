import React, { Component } from 'react';

import QuestionResponse from './QuestionResponse.js'
import {NoDataMatching} from './NoDataMatching.js'
import {filterForms} from '../lib/utils'

export default class QuestionTable extends Component {

	filterResponses() {
		let forms = this.props.forms;
		let formsFiltered = this.props.filters.length > 0 ? filterForms(forms, this.props.filters) : forms;

		return formsFiltered;
	}

	render() {
		const formResponses = this.filterResponses();
		return (
			<div className=''> 
				<table className='table'>
					<thead>
						<tr> 
							<th>Nombre del Punto</th>
							{this.props.questions
								.map(ques => <th key={ques.Id}> {ques.Text} </th> )}
						</tr>
					</thead>					
					<tbody>
						{formResponses
							.map(form => {
								return (
									<tr key={form.pointOfInterestId}>
										<td>{form.name}</td>
										{form.questions
											.map(question => <QuestionResponse key={question.questionId} question={question} />)}
									</tr>	
								)							
							})}
						
					</tbody>					
				</table>
				{ formResponses.length === 0 && <NoDataMatching /> }		
			</div>
		)
	}
}

QuestionTable.propTypes = {
  questions: React.PropTypes.array.isRequired,
  forms: React.PropTypes.array.isRequired,
  filters: React.PropTypes.array.isRequired
}