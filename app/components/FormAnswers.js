import React from 'react';
import PropTypes from 'prop-types';
import FormAnswer from './FormAnswer';
import NoDataMatching from './NoMatchingData';
import { filterForms } from '../lib/utils';
import container from '../containers/FormAnswers';
import { compose, setPropTypes } from 'recompose';

const FormAnswers = ({ questions, completedForms }) =>
	<div className=''>
		<table className='table'>
			<thead>
				<tr>
					{questions.length > 0 && <th>Nombre del Punto</th>}
					{questions.length > 0 && questions.map(question =>
						<th key={question.Id}> {question.Text} </th>)}
				</tr>
			</thead>
			<tbody>
				{completedForms && completedForms.map(form =>
					<tr key={form.Id}>
						<td>{form.name}</td>
						{form.questions.map(question =>
							<FormAnswer key={question.Id} question={question} />)}
					</tr>
				)}
			</tbody>
		</table>
		{completedForms && completedForms.length === 0 && <NoDataMatching />}
	</div>;

const enhance = compose(
	container,
	setPropTypes({
		questions: React.PropTypes.array,
		completedForms: React.PropTypes.array.isRequired,
	}),
);

export default enhance(FormAnswers);