const register = require('./register');
const login = require('./login');
const update = require('./update');
const getUserById = require('./getUserById');
const logout = require('./logout');

const getUser = require('./getUser');

module.exports = {
  register,
  login,
  update,
  getUser,
  getUserById,
  logout
}