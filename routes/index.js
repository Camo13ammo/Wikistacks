'use strict';

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.get("/", function(req, res, next){
	res.send("Sup");
})

module.exports = router;