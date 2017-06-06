//const viewspath = __dirname + "/views/";
const BaseController = require('./baseController.js');
const DataAccess = require('../dataAccess');

var sess;
class FormsReportController extends BaseController {
	constructor(app) {
		super(app);
	}

	/// API
	getCompletedForms(req, res) {
		sess = req.session;
		let filter = {
			id: req.query.formId,
			dateFrom: new Date(req.query.dateFrom),
			dateTo: new Date(req.query.dateTo),
			points: req.query.points == '' ? null : req.query.points,
			persons: req.query.persons == '' ? null : req.query.persons,
			idUser: sess.userId
		};
		let frda = new DataAccess.formReportDA(sess.ambient);
		frda.getCompletedForms(filter,
			(data) => {
				res.send({ error: false, data: data });
			},
			(err) => {
				res.send({ error: true, data: null });
			}
		);
	}
}


module.exports = FormsReportController;