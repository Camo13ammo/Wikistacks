'use strict';

var express = require('express');
var app = express();
var routes = require('./routes/wiki.js');
var morgan = require('morgan');
var swig = require('swig');
var path = require('path');

// Initialize SWIG
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);
swig.setDefaults({cache: false});

app.use(morgan('dev'));

app.get('/', function(req, res, next) {
	res.render('index');
})

app.use("/wiki", routes);

app.use(express.static(path.join(__dirname,'/public')));

app.listen(3000, function() {
	console.log('Listening on port 3000');
});