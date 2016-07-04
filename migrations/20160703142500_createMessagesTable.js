exports.up = function(knex, Promise) {
	console.log('Create messages table')
	return knex.schema.createTableIfNotExists('messages', function(table) {
		table.increments('id').primary()
		table.string('message', 1000)
		table.integer('user_id')
	})
  
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('messages').then(function() {
		console.log('messages table was dropped')
	})
  
};
