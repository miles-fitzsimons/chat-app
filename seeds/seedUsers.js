
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({user: 'Miles'}),
        knex('users').insert({user: 'Ellie'}),
        knex('users').insert({user: 'Lolly'})
      ]);
    });
};
