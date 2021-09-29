const knex = require('../connection');

function getAllUsers() {
  return knex('users')
  .select('*');
}

function addUser(user) {
  return knex('users')
  .insert(user);
}

function getSingleUser(nome) {
  return knex('users')
  .select('*')
  .where({ nome: nome })
  .first()
  .then((row) => row);
}

function deleteUser(nome) {
  return knex('users')
  .del()
  .where({ nome: nome });
}

module.exports = {
  getAllUsers,
  addUser,
  getSingleUser,
  deleteUser
};