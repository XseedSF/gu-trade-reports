import React from 'react';

const FormAnswer = ({ answer }) => {
	const renderReponse = (answer) => {
		switch (answer.type) {
			case 'MO':
				return <span> {answer.selectedOptionName} </span>;
			case 'YN':
				return <span> {answer.yesNoValue ? 'Sí' : 'No'} </span>;
			case 'FT':
				return <span> {answer.freeText} </span>;
			default:
				return <span> </span>;
		}
	}

	return renderReponse(answer);
}

export default FormAnswer;