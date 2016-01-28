'use strict';

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var models = require('../models/');
var Page = models.Page;
var User = models.User;
var mongoose = require('mongoose');

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
	User.findOrCreate({
		name: req.body.name,
		email: req.body.email
	})
	.then(function(user){
		var page = new Page({
			title: req.body.title,
			content: req.body.content,
			tags: req.body.tags.split(" "),
			author: user._id
		});
	page.save()
	.then(function(success) {
			res.redirect(success.route);
		},function(err) {
			res.render('error', {
			status: '400',
			error: err
			})
		});
	})
});

router.get("/add", function(req, res, next) {
	res.render('addpage', {	
	});
});

router.get("/:urlTitle/similar", function(req, res, next) {
	var url = req.params.urlTitle;
	Page.findOne({'urlTitle': url}).exec()
	.then(function(success){
		if (success == null) {
			res.render('error', {
				status: '404',
				error: {
					message: "Page was not found!",
					stack: url + " was not a valid page."
				}
			}).end();
		}
		else{
			return success.findSimilar();
		}
	})
	.then(function(pages){
		res.render('index', { pages: pages })
	})
	.then(null, function(err){
		console.error(err);
	})
});

router.get("/search/", function(req, res, next){
	Page.findByTag(req.query.search)
	.then(function(pages){
		res.render("index",{ 
			pages: pages
			})
	})
	.then(null, function(err){
		console.error(err);
	});
})

router.get("/:urlTitle", function(req, res, next) {
	var url = req.params.urlTitle;
	Page.findOne({'urlTitle': url})
	.populate('author')
	.then(function(success){
		if (success == null) {
			res.render('error', {
				status: '404',
				error: {
					message: "Page was not found!",
					stack: url + " was not a valid page."
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