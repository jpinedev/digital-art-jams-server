const mongoose = require('mongoose');
const schema = mongoose.Schema({
  id: {type: String, unique: true, require: true},
  title: {type: String, default: '(Untitled)'},
  url: {type: String, require: true},
  date: {type: String, default: new Date().toISOString()},
  username: {type: String, unique: true, require: true},
  gallery: {type: String, require: true},
  hideFromDefaultUser: {type: Boolean, default: false}
}, {collection: 'images'});
module.exports = schema;
