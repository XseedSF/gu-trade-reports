const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8081;
const app = express();

const webpack = require("webpack");
const env = process.env.NODE_ENV === "production" ? "prod" : "dev";
const webpackConfig = require("./webpack.config")(env);
const compiler = webpack(webpackConfig);

if (process.env.NODE_ENV !== "production") {
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");

  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    })
  );
  app.use(webpackHotMiddleware(compiler));
}

app.use(
  session({
    secret: "f4026ef7-a937-4572-8265-d5895ab7c663",
    resave: false,
    saveUninitialized: false
  })
);

app.use(bodyParser.json());
app.set("views", __dirname + "\\public");

require("./server/").setRoutes(app, compiler);

var server = app.listen(port, function() {
  var port = server.address().port;
  console.log(`==> Listening on port ${port}.`);
});
