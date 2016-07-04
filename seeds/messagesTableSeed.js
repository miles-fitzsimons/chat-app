
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('messages').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('messages').insert({message: 'first message', user_id: 51}),
        knex('messages').insert({message: 'second message', user_id: 50}),
        knex('messages').insert({message: 'third message', user_id: 52})
      ]);
    });
};
