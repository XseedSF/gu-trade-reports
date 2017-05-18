const BaseController = require('./baseController.js');
const DataAccess = require('../dataAccess');

// react
var React = require('react');
var ReactDOMServer = require('react-dom/server');
// react App
var App = React.createFactory(require('../dist/app').default);

var sess;
class ViewsController extends BaseController{
	constructor(app){
		super(app);
	}

	redirect(req, res, redirection){
		let query = req._parsedOriginalUrl.query;
		query = query == '' || query == null ? '' : ('?' + query);
		res.redirect('/' + redirection + query);
	}

	formReport(req,res){
		sess = req.session;

		let filter = { 	id: req.query.formId ,
			dateFrom: new Date(req.query.dateFrom) ,
			dateTo: new Date(req.query.dateTo) ,
			points: req.query.points == '' ? null: req.query.points ,
			persons: req.query.persons == '' ? null: req.query.persons,
			idUser: sess.userId 
		};

		// Get initial state (DB)
		let frda = new DataAccess.formReportDA(sess.ambient);
		frda.getCompletedForms(filter, 
			(data)=>{
				// Generate Html of rendered react app
				//let reactHtml = ReactDOMServer.renderToString(App({form: data}));
				// Render view with the rendered react app
				res.render('formReport.ejs', { reactOutput: '', initialData: JSON.stringify(data) });
			},
			(err)=> {
				console.log('err', err);
				res.render('formReport.ejs', { reactOutput: '', initialData: '' });
			}
		);
		//let form = config.get("form");
		// let reactHtml = ReactDOMServer.renderToString(App({form: data}));
		// res.render('formReport.ejs', { reactOutput: reactHtml, initialData: JSON.stringify(data) });
	}

	unauthorized(req, res){
		this.returnView(res, "401.ejs");
	}
}

module.exports = ViewsController;