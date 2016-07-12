var path = require('path')
var bodyParser = require('body-parser')
var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)
var home = require('./routes/home')
var chat = require('./routes/chat')
var cookie = require('cookie')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/home', home)
app.use('/chat', chat)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.use('/public', express.static(__dirname + '/public'))

var port = 3000
server.listen(port, function() {
	console.log('Listening on ' + port)
})

app.get('/', function(req, res) {
	res.redirect('/home')
})

var currentUsers = []

var chatNsp = io.of('/chat')
chatNsp.on('connection', function(socket) {
	var cookies = cookie.parse(socket.handshake.headers.cookie)
	var userName = cookies.userName
	console.log('AA', socket)
	socket.emit('chat', {userName: userName})
	socket.on('chat', function(data) {
		console.log('AT SERVER', data)
	})
})

module.exports = app