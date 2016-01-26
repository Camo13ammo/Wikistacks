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
	Page.find().exec().then(function(foundPages) {
		res.render('index', {
			pages: foundPages
		});
	});
});

router.post("/", function(req, res, next) {
	var page = new Page({
		title: req.body.title,
		content: req.body.content,
		tagsStr: req.body.tags
	});

	page.save().then(function(success) {
		res.redirect(success.route);
	}, function(err) {
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

router.get('/search', function(req, res, next) {
	var tags = req.query.tagSearch;
});

router.get("/:urlTitle", function(req, res, next) {
	var url = req.params.urlTitle;
	Page.findOne({'urlTitle': url}).exec()
	.then(function(success){
		if (success == null) {
			res.render('error', {
				status: '404',
				error: {
					message: "Page was not found!",
					stack: "The url entered was not a valid page."
				}
			});
		} else {
			res.render('wikipage', {
				page: success
			});

		}
	});

});

module.exports = router;