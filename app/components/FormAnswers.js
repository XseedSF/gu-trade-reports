import React from 'react';
import PropTypes from 'prop-types';
import FormAnswer from './FormAnswer';
import NoDataMatching from './NoMatchingData';
import container from '../containers/FormAnswers';
import { compose, setPropTypes } from 'recompose';
import { Table, Column, Cell } from 'fixed-data-table';
import withSpinnerWhileLoading from '../hocs/withSpinnerWhileLoading';

const FormAnswers = ({ questions, completedForms }) =>
	<div className='table-centered'>
		<Table
			rowsCount={completedForms.length}
			rowHeight={50}
			headerHeight={50}
			width={1000}
			maxHeight={500}>
			<Column
				flexGrow={1}
				width={200}
				header={<Cell>Nombre del punto de venta</Cell>}
				cell={props => (
					<Cell {...props}>
						{completedForms[props.rowIndex].name}
					</Cell>
				)}
			/>
			{questions.map(question =>
				<Column key={question.Id}
					flexGrow={1}
					width={200}
					header={<Cell>{question.Text}</Cell>}
					cell={props => (
						<Cell {...props}>
							{completedForms[props.rowIndex].answers
								.filter(answer => answer.QuestionId === question.Id)
								.map(answer =>
									<FormAnswer key={answer.Id} answer={answer} />
								)}
						</Cell>
					)}
				/>
			)}
		</Table>
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