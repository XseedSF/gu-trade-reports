const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const engine = require('ejs-mate');
const port = process.env.PORT || 8081;
const app = express();
const path = require('path');

const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig);

console.log(`process.env.NODE_ENV = ${process.env.NODE_ENV}`);
if (process.env.NODE_ENV !== 'production') {
	const webpackDevMiddleware = require('webpack-dev-middleware');
	const webpackHotMiddleware = require('webpack-hot-middleware');

	app.use(webpackDevMiddleware(compiler, {
		noInfo: true, publicPath: webpackConfig.output.publicPath
	}));
	app.use(webpackHotMiddleware(compiler));
}

app.use(session({
	secret: 'f4026ef7-a937-4572-8265-d5895ab7c663',
	resave: false,
	saveUninitialized: false
}));

app.use(bodyParser.json());
app.set('views', __dirname + '\\views');

require('./routes.js')(app, compiler);

var server = app.listen(port, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log(`==> Listening on port ${port}. Visit http://localhost:${port}.`);
})