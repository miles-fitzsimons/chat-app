exports.up = function(knex, Promise) {
	console.log('Create users table')
	return knex.schema.createTableIfNotExists('users', function(table) {
		table.increments('id').primary()
		table.string('user')
	})
  
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('users').then(function() {
		console.log('users table was dropped')
	})
  
};
