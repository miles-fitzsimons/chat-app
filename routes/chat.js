var request = require('superagent')
var express = require('express')
var router = express.Router()
var config = require('../knexfile.js')['development']
var knex = require('knex')(config)
var home = require('./home')
var cookie = require('cookie')

router.get('/', function(req, res) {
	var cookies = cookie.parse(req.headers.cookie)
	var userName = cookies.userName
	renderPage(userName, res)
})

router.post('/random', function(req, res) {
	console.log("DDDDDD", req.body)
})

router.post('/', function(req, res) {
	// Pull username from cookie
	var cookies = cookie.parse(req.headers.cookie)
	var userName = cookies.userName
	var message = ''
	// Pull mesage from user input
	if(req.body.send) {
		message = req.body.message
		updateDB(userName, message, res)
	}
	// Pull message from random quote API
	else {
		request.get('https://quoteapi.herokuapp.com/random', function(err, resp) {
			if(err) {
				console.log('superagent error in chat.js::', err)
			}
			else {
				message = '"' + resp.body.quote + '" ~ ' + resp.body.quotee
				updateDB(userName, message, res)
			}
		})
	}
})

// Insert message into DB with associated user_id (REFACTOR??)
function updateDB (userName, message, res) {
	knex('users')
	.where({user: userName})
	.select('id')
	.then(function(id) {
		knex('messages')
			.insert({
				message: message,
				user_id: id[0].id
			})
			.then(function () {
				renderPage(userName, res)
			})
			.catch(logError)
	})
	.catch(logError)
}

// Builds an object to be passed to chat.hbs for rendering the page with username and all of the messages
// Refactor this so res isn't passed? Could make function fetchMessages that returns promise to route handler
function renderPage (userName, res) {
	var obj = {userName: userName}
	knex
		.from('messages')
		.innerJoin('users', 'users.id', 'messages.user_id')
		.orderBy('messages.id', 'asc')
		.then(function (data) {
			obj.messages = data
			res.render('chat', obj)
		})
		.catch(logError)
}

function logError(err) {
	console.log('Knex error in chat.js::', err)
}

module.exports = router


// ----------- RANDOM QUOTE CODE -------------------
	// 	console.log("RANDOM QUOTTTE")
	// 	request.get('https://quoteapi.herokuapp.com/random', function(err, resp) {
	// 		if (err) {
	// 			console.log('Superagent Err::', err)
	// 		}
	// 		else {
	// 		var quote = resp.body.quote
	// 		var quotee = resp.body.quotee
	// 		res.render('home', {quote: quote, quotee: quotee})
	// 		}
	// 	})
	// }

// 	var userName = req.body.userName
// 	knex('users')
// 		.then(function(users) {
// 			for (var i = 0; i < users.length; i++) {
// 				if (userName === users[i].user) {
// 					// user exists, return 1
// 					return 1
// 				} 
// 			}
// 			// user does not exist, return 0
// 			return 0
// 		})
// 		.then(function(result) {
// 			if (result === 0) {
// 				// user does not exist
// 				knex('users')
// 					.insert({user: userName})
// 					.catch(logError)
// 				res.render('home', {newUser: true, userName: userName})
// 			}
// 			else {
// 				// user already exists
// 				res.render('home', {oldUser: true, userName: userName})
// 			}
// 		})
// 		.catch(logError)	
// })

// function logError(err) {
// 	console.log('knex ERR::', err)
// }

