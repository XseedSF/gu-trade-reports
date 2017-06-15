import React from 'react';
import ImageAnswer from './ImageAnswer';

const FormAnswer = ({ answer }) => {
	const renderReponse = (answer) => {
		switch (answer.Type) {
			case 'MO':
				return <span> {answer.SelectedOptionName} </span>;
			case 'YN':
				return <span> {answer.YesNoValue ? 'Sí' : 'No'} </span>;
			case 'FT':
				return <span> {answer.FreeText} </span>;
			case 'CAM':
				return answer.ImageBase64 ? <ImageAnswer image={answer.ImageBase64} /> : <span> Sin imagen </span>;
			default:
				return <span> </span>;
		}
	}

	return renderReponse(answer);
}

export default FormAnswer;