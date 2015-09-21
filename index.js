/// <reference path="typings/express/express.d.ts" />
/// <reference path="typings/body-parser/body-parser.d.ts" />

// Load required packages
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// Express application initialize
var app = express();

app.use(express.static(__dirname + '/'));


// Use the body-parser package in the application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use('/', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  	next();
})

var server = app.listen(3000, function() {
	console.log('Express server listening on port ' + server.address().port);
});