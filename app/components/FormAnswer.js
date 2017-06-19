import React from 'react';
import ImageAnswer from './ImageAnswer';
import DateText from './DateText';

const FormAnswer = ({ answer, name }) => {
	const renderReponse = (answer) => {
		switch (answer.Type) {
			case 'MO':
				return <span> {answer.SelectedOptionName} </span>;
			case 'YN':
				return <span> {answer.YesNoValue ? 'Sí' : 'No'} </span>;
			case 'FT':
				return <span> {answer.FreeText} </span>;
			case 'CAM':
				return answer.ImageBase64 ? <ImageAnswer image={answer.ImageBase64} title={name} /> : <span> Sin imagen </span>;
			case 'DATE':
				return <span> {<DateText value={answer.DateReply} />} </span>;
			default:
				return <span> </span>;
		}
	}

	return renderReponse(answer);
}

export default FormAnswer;