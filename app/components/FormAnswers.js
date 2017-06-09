import React from 'react';
import PropTypes from 'prop-types';
import Response from './Response';
import NoDataMatching from './NoMatchingData';
import { filterForms } from '../lib/utils';
import container from '../containers/FormAnswers';
import { compose, setPropTypes } from 'recompose';

const FormAnswers = ({ questions, completedForms }) =>
	<div className=''>
		<table className='table'>
			<thead>
				<tr>
					{questions && <th>Nombre del Punto</th>}
					{questions && questions.map(question =>
						<th key={question.Id}> {question.Text} </th>)}
				</tr>
			</thead>
			<tbody>
				{completedForms && completedForms.map(form =>
					<tr key={form.pointOfInterestId}>
						<td>{form.name}</td>
						{form.questions.map(question =>
							<Response key={question.questionId} question={question} />)}
					</tr>
				)}
			</tbody>
		</table>
		{completedForms && completedForms.length === 0 && <NoDataMatching />}
	</div>;

const enhance = compose(
	container,
	setPropTypes({
		questions: React.PropTypes.array.isRequired,
		forms: React.PropTypes.array.isRequired,
		filters: React.PropTypes.array.isRequired
	})
);

export default FormAnswers;