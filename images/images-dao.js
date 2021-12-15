const model = require('./images-model');

const findAllImages = () => model.find();
const findImage = (id) => model.findOne({id});
const findImagesByUser = (username) => model.find({username});
const findImagesByGallery = (gallery) => model.find({gallery});
const updatePrivacyByUser = (username, hideFromDefaultUser) =>
  model.updateMany({username}, { $set: {hideFromDefaultUser} });

const createImage = (imageInfo) => model.create({
  ...imageInfo,
  date: new Date().toISOString()
});

module.exports = {
  findAllImages,
  findImage,
  findImagesByUser,
  findImagesByGallery,
  updatePrivacyByUser,
  createImage
};