//const viewspath = __dirname + "/views/";
const BaseController = require('./baseController.js');
const DataAccess = require('../dataAccess');

class FormsReportController extends BaseController{
	constructor(app){
		super(app);
	}

	/// API
	getCompletedForms(req,res){
		let filter = { 	id: req.query.id ,
			dateFrom: new Date(req.query.dateFrom) ,
			dateTo: new Date(req.query.dateTo) ,
			points: req.query.points == '' ? null: req.query.points ,
			persons: req.query.persons == '' ? null: req.query.persons,
			idUser: null  };

		let frda = new DataAccess.formReportDA("GeoV31");
		frda.getCompletedForms(filter, 
			(data)=>{
				console.log('ok', data);
				res.send({ error: false, data: data });
			},
			(err)=> {
				console.log('err', err);
				res.send({error: true, data: null});
			}
		);
	}
}


module.exports = FormsReportController;