'use strict';

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var models = require('../models/');
var Page = models.Page;
var User = models.User;

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/", function(req, res, next){
	res.redirect('/');
});

router.post("/", function(req, res, next) {
	var page = new Page({
		title: req.body.title,
		content: req.body.content
	});
	console.log(req.method);
	page.save().then(function(success) {
		res.redirect('/');
	}, function(err) {
		console.log(err);
		res.render('error', {
			status: '400',
			error: err
		})
	});
});

router.get("/add", function(req, res, next) {
	res.render('addpage', {
			
	});
});

module.exports = router;