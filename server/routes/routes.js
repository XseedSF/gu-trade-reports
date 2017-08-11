const controllers = require("../controllers");
const formReport = new controllers.formReport();
const path = require("path");

const jwt = require("jsonwebtoken");
const config = require("config");
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
      sess.ambient = decoded.ambient;

      redirect(req, res, "");
    });
  });

  /// API
  app.get("/api/getCompletedForms", function(req, res) {
    sess = req.session;
    if (sess.userId) {
      formReport.getCompletedForms(req, res);
    }
  });

  // All remaining requests return the React app, so it can handle routing.
  // app.get("*", function(req, res) {
  //   var filename = path.join(compiler.outputPath, "index.html");
  //   compiler.outputFileSystem.readFile(filename, function(err, result, next) {
  //     if (err) {
  //       return next(err);
  //     }
  //     res.set("content-type", "text/html");
  //     res.send(result);
  //     res.end();
  //   });
  // });
};

const redirect = (req, res, redirection) => {
  let query = req._parsedOriginalUrl.query;
  query = query == "" || query == null ? "" : "?" + query;
  res.redirect("/" + redirection + query);
};

const verifyTokenParam = (req, res, callback) => {
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
