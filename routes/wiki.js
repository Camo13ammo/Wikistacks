'use strict';

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.get("/", function(req, res, next){
	res.send("Got route to get /wiki");
});

router.post("/", function(req, res, next) {
	res.send('Got route to POST /wiki');
});

router.get("/add", function(req, res, next) {
	res.render('addpage', {
			
	});
});

module.exports = router;