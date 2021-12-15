const IMAGES_URL = '/api/images';
const imagesDao = require('../images/images-dao');
const galleriesDao = require('../galleries/galleries-dao');
const userDao = require('../user/user-dao');

module.exports = (app) => {

  const getImage = (req, res) => 
    imagesDao.findImage(req.params.id)
      .then(image => {
        if (!image.hideFromDefaultUser || !!req.session['user']) 
          res.json(image)
        else
          res.sendStatus(403)
      })
      .catch(() => res.sendStatus(403));
  app.get(`${IMAGES_URL}/:id`, getImage);
  
  const getImagesByUser = (req, res) => 
    imagesDao.findImagesByUser(req.params.username)
      .then(images =>
        res.json(!!req.session['user'] ? images : images.filter(image => !image.hideFromDefaultUser)))
      .catch(() => res.sendStatus(403));
  app.get(`${IMAGES_URL}/user/:username`, getImagesByUser);

  const getImagesByGallery = (req, res) => 
    imagesDao.findImagesByGallery(req.params.gallery)
      .then(images =>
        res.json(!!req.session['user'] ? images : images.filter(image => !image.hideFromDefaultUser)))
      .catch(() => res.sendStatus(403));
  app.get(`${IMAGES_URL}/gallery/:gallery`, getImagesByGallery);

  const postImageToGallery = (req, res) => {
    console.log(req.body);
    return imagesDao.createImage({
        ...req.body,
        title: !req.body.title ? '(Untitled)': req.body.title,
        hideFromDefaultUser: req.session['user']?.hideFromDefaultUser
      })
      .then(() => req.body.gallery)
      .then(galleriesDao.incGallerySubmissions)
      .then(() => req.body.username)
      .then(userDao.incUserSubmissions)
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(400));
  }
  app.post(`${IMAGES_URL}/upload/:gallery`, postImageToGallery);
};