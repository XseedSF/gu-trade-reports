import React from 'react';

const FormAnswer = ({ answer }) => {
	const renderReponse = (answer) => {
		switch (answer.Type) {
			case 'MO':
				return <td> {answer.SelectedOptionName} </td>;
			case 'YN':
				return <td> {answer.YesNoValue ? 'Sí' : 'No'} </td>;
			case 'FT':
				return <td> {answer.FreeText} </td>;
			default:
				return <td> </td>;
		}
	}

	return renderReponse(answer);
}

export default FormAnswer;