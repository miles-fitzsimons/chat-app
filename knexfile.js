module.exports = {
	// DATABASE NAME = chatApp
	// Table1 = users
	// Table2 = messages
	development: {
		client: 'pg',
		connection: {
			host: 'localhost',
			user: 'chatappuser',
			password: 'password',
			database: 'chatapp'
		}
	}

}