const mongoose = require('mongoose');
const schema = mongoose.Schema({
  id: {type: String, unique: true},
  title: {type: String, require: true},
  logo: {type: String, require: true},
  description: {type: String, default: ''},
  submissionOpenDate: {type: String, default: new Date().toISOString()},
  submissionCloseDate: {type: String, default: new Date().toISOString()},
  submissionCount: {type: Number, default: 0}
}, {collection: 'galleries'});
module.exports = schema;
