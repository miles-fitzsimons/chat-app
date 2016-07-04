var path = require('path')
var bodyParser = require('body-parser')
var home = require('./routes/home')
var chat = require('./routes/chat')


var http = require('http')
var express = require('express')
var app = express()
var server = http.createServer(app)
var io = require('socket.io')(server)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/home', home)
app.use('/chat', chat)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
console.log('dfd', __dirname + '/public')
app.use('/public', express.static(__dirname + '/public'))

io.on('connection', function(socket) {
	socket.on('event', function(data) {
		console.log("SOMETHING CONNECT", data)
	})
	socket.on('disconnect', function(){})
})

module.exports = app