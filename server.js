var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var engine = require('ejs-mate');

var app = express();

app.use(session({
	secret: 'f4026ef7-a937-4572-8265-d5895ab7c663',
	resave: false,
	saveUninitialized: false
}));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', __dirname + '\\views');

require('./routes.js')(app);

var server = app.listen(8081, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log("ws listening http://$s:$s", host, port);
})

/// TODO: Old package.json babel script
 // "dev": "babel app -d dist && node dist/node"