const model = require('./user-model');

const findAllUsers = () => model.find({}, {password: 0});
const findAdmins = () => model.find({admin: true}, {password: 0});
const findUserById = (id) => model.findById(id, {password: 0});
const findUserByUsername = ({username}) => model.findOne({username}, {password: 0});
const createUser = ({username, password}) => {
  const newUser = { username, displayName: username, password };
  return model.create(newUser);
};
const promoteUser = (id) => model.findByIdAndUpdate(id, {$set: {admin: true}});
const updateUser = (id, user) => model.findByIdAndUpdate(id, {$set: user});
const incUserSubmissions = (username) => model.updateOne({username}, {$inc: {submissions: 1}});

module.exports = {
  createUser,
  findAllUsers,
  findAdmins,
  findUserById,
  findUserByUsername,
  promoteUser,
  updateUser,
  incUserSubmissions
};