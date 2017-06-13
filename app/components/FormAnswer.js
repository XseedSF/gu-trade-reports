import React from 'react';

const FormAnswer = ({ answer }) => {
	const renderReponse = (answer) => {
		switch (answer.Type) {
			case 'MO':
				return <span> {answer.SelectedOptionName} </span>;
			case 'YN':
				return <span> {answer.YesNoValue ? 'Sí' : 'No'} </span>;
			case 'FT':
				return <span> {answer.FreeText} </span>;
			default:
				return <span> </span>;
		}
	}

	return renderReponse(answer);
}

export default FormAnswer;