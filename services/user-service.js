const USER_URL = '/api/users';
const userDao = require('../user/user-dao');
const imagesDao = require('../images/images-dao');

module.exports = (app) => {
  
  const getAllUsers = (req, res) =>
    userDao.findAllUsers()
      .then(users => res.json(users));
  app.get(USER_URL, getAllUsers);

  const getAdmins = (req, res) =>
    userDao.findAdmins()
      .then(admins => res.json(admins));
  app.get(`${USER_URL}/admins`, getAdmins);

  const promoteToAdmin = (req, res) => {
    if(!req.session['user']?.admin) res.sendStatus(403);
    
    userDao.promoteUser(req.params.id)
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(400));
  };
  app.post(`${USER_URL}/admins/:id`, promoteToAdmin);

  const getUsersByUsername = (req, res) => 
    userDao.findUserByUsername({ username: req.params.username })
      .then(user => {
        if (!!user) res.json(user);
        else res.sendStatus(400);
      })
      .catch(() => res.sendStatus(400));
  app.get(`${USER_URL}/:username`, getUsersByUsername);

  const updateUser = (req, res) =>
    new Promise((resolve, reject) => {
      const id = req.params.id;
      const user = req.body;
      if (!req.session['user'] || req.session['user']._id !== id) reject('Cannot update other users.');
      else if (req.session['user'].username !== user.username) reject('Cannot change username.');
      else resolve({ id, user, updateImagePrivacy: req.session['user'] !== user.hideSubmissionsFromDefaultUser });
    }).then(({id, user, updateImagePrivacy}) => {
        if (updateImagePrivacy)
          return imagesDao.updatePrivacyByUser(user.hideSubmissionsFromDefaultUser)
            .then(() =>
              userDao.updateUser(id, user));
        else return userDao.updateUser(id, user);
      })
      .then(user => {
        req.session['user'] = user;
        res.json(user);
      });
  app.put(`${USER_URL}/:id`, updateUser);

};
