var sql = require("mssql");
const BaseDA = require("./baseDA.js");

class FormsReportDA extends BaseDA {
	constructor(ambient) {
		super(ambient);
	}

	getCompletedForms(filter, success, error) {
		sql.connect(this.sqlConfig)
			.then(function () {
				let storedProcedure = new sql.Request()
					.input("IdForm", sql.Int, filter.id)
					.input("DateFrom", sql.Date, filter.dateFrom)
					.input("DateTo", sql.Date, filter.dateTo)
					.input("PersonsOfInterestIds", sql.VarChar, filter.persons)
					.input("PointsOfInterestIds", sql.VarChar, filter.points)
					.input("IdUser", sql.Int, filter.idUser);
				storedProcedure.multiple = true;
				storedProcedure.execute("GetFormReportAnalizer")
					.then(function (reader) {
						if (reader.length == 2 && reader[0].length > 0) {
							let rq = reader[0];
							let ra = reader[1];

							let form = {
								id: rq[0].Id,
								name: rq[0].Name,
								questions: [],
								completedForms: []
							};
							let q = null,
								a = null,
								question = null,
								completedForm = null;
							for (let i = 0; i < rq.length; ++i) {
								q = rq[i];
								if (question == null || question.Id != q.QuestionId) {
									question = {
										Id: q.QuestionId,
										Type: q.Type,
										Text: q.Text,
										Required: q.Required,
										Options: []
									};
									form.questions.push(question);
								}

								if (q.QuestionOptionId == null) {
									delete q.Options;
								} else {
									question.Options.push({
										Id: q.QuestionOptionId,
										Text: q.QuestionOptionText
									});
								}
							}

							for (let i = 0; i < ra.length; ++i) {
								a = ra[i];
								if (completedForm == null || completedForm.Id != a.Id) {
									completedForm = {
										Id: a.Id,
										name: a.PointOfInterestName,
										pointOfInterestId: a.PointOfInterestId,
										answers: []
									};
									form.completedForms.push(completedForm);
								}

								let base64Image = a.AnswerImageArray != null
									? new Buffer(a.AnswerImageArray, "binary").toString("base64")
									: "";

								completedForm.answers.push({
									Id: a.AnswerId,
									QuestionId: a.QuestionId,
									Type: a.QuestionType,
									Text: a.QuestionText,
									YesNoValue: a.AnswerYesNoOption,
									FreeText: a.AnswerFreeText,
									SelectedOptionId: a.AnswerOptionId,
									SelectedOptionName: a.AnswerOptionText,
									ImageBase64: base64Image,
									DateReply: a.AnswerDateReply,
									value: getAnswerValue(a)
								});
							}

							success(form);
						} else {
							success(reader);
						}
					})
					.catch(error);
			})
			.catch(error);
	}
}

const getAnswerValue = a => {
	switch (a.QuestionType) {
		case "CK":
			return a.AnswerCheck;
		case "YN":
			return a.AnswerYesNoOption;
		case "MO":
			return a.AnswerOptionId;
		case "CAM":
			return !a.AnswerSkipped && a.AnswerImageArray != null;
		case "DATE":
			return !a.AnswerSkipped && a.AnswerDateReply != null
				? a.AnswerDateReply.getTime() + 3 * 60 * 60 * 1000
				: null;
		case "NUM":
			const value = parseFloat(a.AnswerFreeText);
			return !a.AnswerSkipped && value ? value : 0;
		case "FT":
		case "CODE":
		case "SIG":
		case "IMG":
			return !a.AnswerSkipped;
	}
};

module.exports = FormsReportDA;
