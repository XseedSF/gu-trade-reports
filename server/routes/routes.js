var controllers = require("../controllers");
var views = new controllers.views();
var formController = new controllers.formController();
var answerController = new controllers.answerController();
var jwt = require("jsonwebtoken");
var config = require("config");
var path = require("path");

const jwtConfig = config.get("jwtConfig");

var sess;
module.exports = function(app, compiler) {
  /// Login
  app.get("/login/:token", function(req, res) {
    verifyTokenParam(req, res, function(decoded) {
      // Set data to session
      sess = req.session;
      sess.userId = decoded.userId;
      sess.userName = decoded.userName;
      sess.clientCode = decoded.clientCode;
      sess.serverDomain = decoded.serverDomain;

      views.redirect(req, res, "");
    });
  });

  /// API
  app.get("/api/getCompletedForms", function(req, res) {
    sess = req.session;
    if (sess.userId) {
      formController.getCompletedForms(req, res);
    }
  });

  app.get("/api/getAnswerImage", function(req, res) {
    sess = req.session;
    if (sess.userId) {
      answerController.getImage(req, res);
    }
  });

  /// Errors
  app.get("/401", function(req, res) {
    views.unauthorized(req, res);
  });

  // All remaining requests return the React app, so it can handle routing.
  app.get("*", function(req, res) {
    var filename = path.join(compiler.outputPath, "index.html");
    res.sendFile(filename);
  });
};

var verifyTokenParam = function(req, res, callback) {
  let token = req.params.token;
  jwt.verify(token, jwtConfig.secret, jwtConfig, function(err, decoded) {
    if (err) {
      console.log(err);
      res.redirect("/401");
    } else {
      callback(decoded);
    }
  });
};
