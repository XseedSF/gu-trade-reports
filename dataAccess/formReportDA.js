var sql = require('mssql');
const BaseDA = require('./baseDA.js');

class FormsReportDA extends BaseDA {
	constructor(ambient) {
		super(ambient);
	}

	getCompletedForms(filter, success, error) {
		//console.log('filter', filter);
		// Stored Procedure
		sql.connect(this.sqlConfig).then(function () {
			let sp = new sql.Request()
				.input('IdForm', sql.Int, filter.id)
				.input('DateFrom', sql.Date, filter.dateFrom)
				.input('DateTo', sql.Date, filter.dateTo)
				.input('PersonsOfInterestIds', sql.VarChar, filter.persons)
				.input('PointsOfInterestIds', sql.VarChar, filter.points)
				.input('IdUser', sql.Int, filter.idUser);
			sp.multiple = true;
			sp.execute('GetFormReportAnalizer').then(function (reader) {
				//console.log('recordsets', r);

				if (reader.length == 2 && reader[0].length > 0) {
					let rq = reader[0];
					let ra = reader[1];

					let form = { id: rq[0].Id, name: rq[0].Name, questions: [], completedForms: [] };
					let q = null, a = null, question = null, completedForm = null;
					for (let i = 0; i < rq.length; ++i) {
						q = rq[i];
						if (question == null || question.Id != q.QuestionId) {
							question = {
								id: q.QuestionId,
								type: q.Type,
								text: q.Text,
								required: q.Required,
								options: []
							};
							form.questions.push(question);
						}

						if (q.QuestionOptionId == null) {
							delete q.Options;
						} else {
							question.options.push({
								id: q.QuestionOptionId,
								text: q.QuestionOptionText
							});
						}
					}

					for (let i = 0; i < ra.length; ++i) {
						a = ra[i];
						if (completedForm == null || completedForm.Id != a.Id) {
							completedForm = {
								id: a.Id,
								name: a.PointOfInterestName,
								pointOfInterestId: a.PointOfInterestId,
								answers: []
							};
							form.completedForms.push(completedForm);
						}

						let base64Image = a.AnswerImageArray != null
							? new Buffer(a.AnswerImageArray, 'binary').toString('base64')
							: '';

						completedForm.answers.push({
							id: a.AnswerId,
							questionId: a.QuestionId,
							type: a.QuestionType,
							text: a.QuestionText,
							yesNoValue: a.AnswerYesNoOption,
							freeText: a.AnswerFreeText,
							selectedOptionId: a.AnswerOptionId,
							selectedOptionName: a.AnswerOptionText,
							imageBase64: base64Image,
							value: getAnswerValue(a),
						});
					}
					success(form);
				} else {
					success(reader);
				}
			}).catch(error);
		}).catch(error);
	}
}

const getAnswerValue = (a) => {
	switch (a.QuestionType) {
		case 'CK': return a.AnswerCheck;
		case 'YN': return a.AnswerYesNoOption;
		case 'MO': return a.AnswerOptionId;
		case 'FT': return !a.AnswerSkipped;
		case 'CODE': return !a.AnswerSkipped;
		case 'NUM': return !a.AnswerSkipped;
		case 'DATE': return !a.AnswerSkipped;
		case 'SIG': return !a.AnswerSkipped;
		case 'IMG': return !a.AnswerSkipped;
	}
}

module.exports = FormsReportDA;