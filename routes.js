var controllers = require('./controllers');
var views = new controllers.views();
var formReport = new controllers.formReport();
var jwt = require('jsonwebtoken');
var config = require('config');

const jwtConfig = config.get("jwtConfig");
var browserify = require('browserify-middleware');

var sess;
module.exports = function(app) {

	/// Login
	app.get('/login/:redirection/:token', function(req, res){
		verifyTokenParam(req, res, function (decoded){

			// Set data to session
			sess = req.session;
			sess.userId = decoded.userId;
			sess.userName = decoded.userName;
			sess.ambient = decoded.ambient;

			views.redirect(req, res, req.params.redirection);
		});
	});

	/// Pages
	app.get('/formReport', function(req, res) {	
		sess = req.session;
		if(sess.userId){
			views.formReport(req, res);
		}
	});

	/// API
	app.get('/api/getCompletedForms',
		function(req, res) {
			sess = req.session;
			if(sess.userId){
				formReport.getCompletedForms(req, res);
			}
		});

	/// Errors
	app.get('/401', function(req, res) {
		views.unauthorized(req, res);
	});

	/// Boundle.js
	app.get('/scripts/bundle.js', browserify('./main.js', {
		debug: true,
		transform: ["babelify"],
		minify: false,
		cache: true,
		precompile: true
	}));

	// app.use('/scripts/bundle.js', function(req, res) {  
	// 	res.setHeader('content-type', 'application/javascript');
	// 	browserify('./main.js', {
	// 		debug: true
	// 	})
	// 	.transform('babelify', { presets: ["es2015", "react"] })
	// 	.bundle()
	// 	.pipe(res);
	// });
	// app.use('/reactTest', (req, res) =>{
	// 	var books = [{
	// 		title: 'Professional Node.js',
	// 		read: false
	// 	}, {
	// 		title: 'Node.js Patterns',
	// 		read: false
	// 	}];

	// 	res.setHeader('Content-Type', 'text/html');
	// 	res.end(React.renderToStaticMarkup(
	// 		React.DOM.body(
	// 			null,
	// 			React.DOM.div({
	// 				id: 'container',
	// 				dangerouslySetInnerHTML: {
	// 					__html: React.renderToString(React.createElement(Books, {
	// 						books: books
	// 					}))
	// 				}
	// 			}),
	// 			React.DOM.script({
	// 				'id': 'initial-data',
	// 				'type': 'text/plain',
	// 				'data-json': JSON.stringify(books)
	// 			}),
	// 			React.DOM.script({
	// 				src: '/bundle.js'
	// 			})
	// 			)
	// 		));
	// });

	// app.use('/bundle.js', function(req, res) {  
	// 	res.setHeader('content-type', 'application/javascript');
	// 	browserify('./app.js', {
	// 		debug: true
	// 	})
	// 	.transform('reactify')
	// 	.bundle()
	// 	.pipe(res);
	// });
}

var verifyTokenParam = function (req, res, callback){	
	let token = req.params.token;
	jwt.verify(token, jwtConfig.secret, jwtConfig, function (err, decoded){
		if(err){
			console.log(err);
			res.redirect("/401");
		}
		else{
			callback(decoded);
		}
	});
}