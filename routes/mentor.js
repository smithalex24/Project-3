require('dotenv').config();
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var bcrypt = require('bcrypt');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var db = require ('../models/mentor')

//set up student profile route
router.get('/mentor', is LoggedIn, function(req, res) {
	db.Mentor.find({'userId': req.user.id}, function(err, Mentor) {
		if(err) {
			console.log(err);
		}
		else {
			res.render('mentor', { Mentor })
		}
	})
});
//find specific user id
router.get('/:id', (req, res) => {
  db.Mentor.findOne({_id:req.params.id}).then(data =>{
    res.send(data)
  })
})

//create student info
router.post('/create', function(req, res) {
	console.log(req.body);
	let createMentor = {
		userId: req.body.userId,
	    field: req.body.field,
	    experience: req.body.experience
	}
	Mentor.create(createMentor, function(err) {
		if(err) {
			console.log(err);
		}
	})
 	res.send();
});

module.exports = router;