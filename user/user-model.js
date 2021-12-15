const mongoose = require('mongoose');
const schema = require('./user-schema');
const model = mongoose.model('UserModel', schema);
module.exports = model;
