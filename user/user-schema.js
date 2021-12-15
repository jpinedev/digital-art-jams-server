const mongoose = require('mongoose');
const schema = mongoose.Schema({
  username: {type: String, unique: true, require: true, immutable: true},
  password: {type: String, require: true},

  joinDate: {type: String, default: new Date().toISOString().substring(0, 10), immutable: true},
  admin: {type: Boolean, default: false},
  displayName: String,
  profileImg: {type: String, default: 'https://img.icons8.com/color/344/test-account.png'},
  bio: {type: String, default: ''},

  hideSubmissionsFromDefaultUser: {type: Boolean, default: false},
  hideBioFromDefaultUser: {type: Boolean, default: false},
  
  submissions: {type: Number, default: 0},
}, {collection: 'users'});
module.exports = schema;
