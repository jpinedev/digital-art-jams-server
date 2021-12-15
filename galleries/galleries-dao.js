const model = require('./galleries-model');

const createGallery = (gallery) => model.create(gallery);
const findGalleries = () => model.find();
const findGalleryById = (id) => model.findOne({id});
const updateGalleryById = (id, gallery) => model.updateOne({id}, gallery);
const incGallerySubmissions = (id) => model.updateOne({id}, {$inc: {submissionCount: 1}});

module.exports = {
  createGallery,
  findGalleries,
  findGalleryById,
  updateGalleryById,
  incGallerySubmissions
};