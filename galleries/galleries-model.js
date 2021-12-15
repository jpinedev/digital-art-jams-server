const mongoose = require('mongoose');
const schema = require('./galleries-schema');
const model = mongoose.model('GalleriesModel', schema);
module.exports = model;
