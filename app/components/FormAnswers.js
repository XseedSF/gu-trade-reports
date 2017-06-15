import React from 'react';
import PropTypes from 'prop-types';
import FormAnswer from './FormAnswer';
import NoDataMatching from './NoMatchingData';
import container from '../containers/FormAnswers';
import { compose, setPropTypes } from 'recompose';
import withSpinnerWhileLoading from '../hocs/withSpinnerWhileLoading';

const FormAnswers = ({ questions, completedForms }) =>
	<div>
		<table>
			<thead>
				<tr>
					<th>Nombre del punto de venta</th>
					{questions.map(question => <th key={question.id}>{question.text}</th>)}
				</tr>
			</thead>
			<tbody>
				{completedForms.map(completedForm =>
					<tr key={completedForm.id}>
						<td>{completedForm.name}</td>
						{completedForm.answers.map(answer =>
							<td key={answer.id}>
								<FormAnswer answer={answer} />
							</td>
						)}
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
	withSpinnerWhileLoading,
);

export default enhance(FormAnswers);