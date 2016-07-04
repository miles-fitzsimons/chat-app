var request = require('superagent')
var express = require('express')
var router = express.Router()
var config = require('../knexfile.js')['development']
var knex = require('knex')(config)
var cookie = require('cookie')

router.get('/', function(req, res) {
	res.render('home')
})

router.post('/', function(req, res) {
	var userName = req.body.userName
	knex('users')
		.then(function(users) {
			for (var i = 0; i < users.length; i++) {
				if (userName === users[i].user) {
					// user exists, return 1
					return 1
				} 
			}
			// user does not exist, return 0
			return 0
		})
		.then(function(result) {
			if (result === 0) {
				// user does not exist
				knex('users')
					.insert({user: userName})
					.catch(logError)
				res.setHeader('Set-Cookie', cookie.serialize('userName', userName))
				res.render('home', {newUser: true, userName: userName})
			}
			else {
				// user already exists
				res.render('home', {oldUser: true, userName: userName})
			}
		})
		.catch(logError)	
})

function logError(err) {
	console.log('knex ERR::', err)
}

module.exports = router
