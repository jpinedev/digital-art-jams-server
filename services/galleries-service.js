const GALLERIES_URL = '/api/galleries';
const galleriesDao = require('../galleries/galleries-dao');

module.exports = (app) => {
  
  const getGalleries = (req, res) => 
    galleriesDao.findGalleries()
      .then(galleries => res.json(galleries))
      .catch(() => res.sendStatus(403));
  app.get(GALLERIES_URL, getGalleries);

  const getGalleryById = (req, res) => 
    galleriesDao.findGalleryById(req.params.id)
      .then(gallery => res.json(gallery))
      .catch(() => res.sendStatus(403));
  app.get(`${GALLERIES_URL}/:id`, getGalleryById);

  const postGallery = (req, res) => {
    if (!req.session['user'] || !req.session['user'].admin) {
      res.sendStatus(403);
      return;
    }
    
    galleriesDao.createGallery(req.body)
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(403))
  };
  app.post(GALLERIES_URL, postGallery);

  const editGallery = (req, res) => {
    if (!req.session['user'] || !req.session['user'].admin) {
      res.sendStatus(403);
      return;
    }
    
    galleriesDao.updateGalleryById(req.params.id, req.body)
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(403))
  };
  app.put(`${GALLERIES_URL}/:id`, editGallery);

};