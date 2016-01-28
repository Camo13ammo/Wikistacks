'use strict';

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var models = require('../models/');
var Promise = require('bluebird');
var Page = models.Page;
var User = models.User;

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.get("/", function(req, res, next){
	User.find({}).exec()
	.then(function(users){
		res.render('userlist', {users: users})
	})
	.then(null, function(err){
		console.error(err);
	})

})

router.get('/:userId', function(req, res, next){
	console.log(req.params.userId)
	var findUser = User.findById(req.params.userId).exec();
	var findPages = Page.find({ author: req.params.userId }).exec();

	Promise.all([findUser, findPages])
	.then(function(info){
		var foundUser = info[0];
		var foundPages = info[1];
		console.log(foundPages);
		res.render('userpage', { pages: foundPages, 
			user: foundUser });
	})
	.then(null, function(err){
		console.error(err);
	})

})

module.exports = router;



