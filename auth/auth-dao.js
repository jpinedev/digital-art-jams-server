const model = require('../user/user-model');
const userDao = require('../user/user-dao');

const createAuth = (auth) => userDao.createUser(auth);
const findAuth = ({username, password}) => model.findOne({username, password});

module.exports = {
  createAuth,
  findAuth
};