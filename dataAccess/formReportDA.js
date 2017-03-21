var sql = require('mssql');
const BaseDA = require('./baseDA.js');

class FormsReportDA extends BaseDA{
	constructor(ambient){
		super(ambient);
	}

	getCompletedForms(filter, success, error){
		//console.log('filter', filter);
		sql.connect(this.sqlConfig).then(function() {
		    // Stored Procedure
		    let sp = new sql.Request()
		    .input('IdForm', sql.Int, filter.id)
		    .input('DateFrom', sql.Date, filter.dateFrom)
		    .input('DateTo', sql.Date, filter.dateTo)
		    .input('PersonsOfInterestIds', sql.VarChar, filter.persons)
		    .input('PointsOfInterestIds', sql.VarChar, filter.points)
		    .input('IdUser', sql.Int, filter.idUser);
		    sp.multiple = true;
		    sp.execute('GetFormReportAnalizer').then(function(r) {
		    	//console.log('recordsets', r);

		    	if(r.length == 2 && r[0].length > 0){
		    		let rq = r[0];
		    		let ra = r[1];

		    		let form = { name: rq[0].Name, questions: [], completedForms: [] };
		    		let q = null, a = null, question = null, completedForm = null;
		    		for (let i = 0; i < rq.length; ++i) {
		    			q = rq[i];
		    			if(question == null || question.Id != q.QuestionId){
		    				question = { 
		    					Id: q.QuestionId,
		    					Type: q.Type,
		    					Text: q.Text,
		    					Options: []
		    				};
		    				form.questions.push(question);
		    			}

	    				if(q.QuestionOptionId == null){
	    					delete q.Options;
	    				}
	    				else{
	    					question.Options.push({
	    						Id: q.QuestionOptionId,
	    						Text: q.QuestionOptionText
	    					});
	    				}
		    		}

		    		for (let i = 0; i < ra.length ; ++i) {
		    			a = ra[i];
		    			if(completedForm == null || completedForm.Id != a.Id){
		    				completedForm = { 
		    					Id: a.Id,
		    					name: a.PointOfInterestName,
		    					pointOfInterestId: a.PointOfInterestId,
		    					questions: []
		    				};
		    				form.completedForms.push(completedForm);
		    			}
		    			
		    			let base64Image = a.AnswerImageArray != null 
		    				? new Buffer(a.AnswerImageArray, 'binary').toString('base64')
		    				: '';
		    			
    					completedForm.questions.push({
    						Id: a.QuestionId,
    						Type: a.QuestionType,
    						Text: a.QuestionText,
    						YesNoValue: a.AnswerYesNoOption,
    						FreeText: a.AnswerFreeText,
    						SelectedOptionId: a.AnswerOptionId,
    						SelectedOptionName: a.AnswerOptionText,
    						ImageBase64: base64Image
    					});
		    		}

		    		success(form);
		    	}else{
		    		success(r);
		    	}


		    }).catch(error);
		}).catch(error);
	}
}


module.exports = FormsReportDA;



