const mongoose = require('mongoose');
const schema = require('./images-schema');
const model = mongoose.model('ImagesModel', schema);
module.exports = model;
