import React, { Component } from 'react';

export default class QuestionResponse extends Component {

	render() {
		const renderReponse = (question) => {
			switch(question.Type) {
				case 'MO':
					return <td> {question.SelectedOptionName} </td>
				case 'YN':
					return <td> {question.YesNoValue ? 'Sí' : 'No' } </td>
				case 'FT':
					return <td> {question.FreeText} </td>
				default:
					return <td> </td>; 
			}
		}
		
		return (
			renderReponse(this.props.question)
		)
	}

}