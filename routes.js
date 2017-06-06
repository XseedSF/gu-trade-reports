var controllers = require('./controllers');
var views = new controllers.views();
var formReport = new controllers.formReport();
var jwt = require('jsonwebtoken');
var config = require('config');
var path = require('path');

const jwtConfig = config.get("jwtConfig");

var sess;
module.exports = function (app, compiler) {

	/// Login
	app.get('/login/:token', function (req, res) {
		verifyTokenParam(req, res, function (decoded) {

			// Set data to session
			sess = req.session;
			sess.userId = decoded.userId;
			sess.userName = decoded.userName;
			sess.ambient = decoded.ambient;

			views.redirect(req, res, '');
		});
	});

	/// Pages
	// app.get('/formReport', function (req, res) {
	// 	sess = req.session;
	// 	if (sess.userId) {
	// 		views.formReport(req, res);
	// 	}
	// });

	/// API
	app.get('/api/getCompletedForms',
		function (req, res) {
			sess = req.session;
			if (sess.userId) {
				formReport.getCompletedForms(req, res);
			}
		});

	/// Errors
	app.get('/401', function (req, res) {
		views.unauthorized(req, res);
	});

	// All remaining requests return the React app, so it can handle routing.
	app.get('*', function (req, res) {
		var filename = path.join(compiler.outputPath, 'index.html');
		compiler.outputFileSystem.readFile(filename, function (err, result) {
			if (err) {
				return next(err);
			}
			res.set('content-type', 'text/html');
			res.send(result);
			res.end();
		});
	});
}

var verifyTokenParam = function (req, res, callback) {
	let token = req.params.token;
	jwt.verify(token, jwtConfig.secret, jwtConfig, function (err, decoded) {
		if (err) {
			console.log(err);
			res.redirect("/401");
		}
		else {
			callback(decoded);
		}
	});
}