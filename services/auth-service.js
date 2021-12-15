const AUTH_URL = '/api/auth';
const authDao = require('../auth/auth-dao');

module.exports = (app) => {
  
  const login = (req, res) => {
    const login = req.body;
    authDao.findAuth(login)
      .then(user => {
        if (!user) return res.sendStatus(403);
        
        req.session['user'] = user;
        return res.json(user)
      })
      .catch(() => res.sendStatus(403));
  };
  app.post(`${AUTH_URL}/login`, login);

  const register = (req, res) => {
    const newAuth = req.body;
    authDao.createAuth(newAuth)
      .then(user => {
        req.session['user'] = user;
        res.json(user);
      })
      .catch(() => res.sendStatus(403));
  };
  app.post(`${AUTH_URL}/register`, register);

  const auth = (req, res) => res.json(req.session['user']);
  app.post(AUTH_URL, auth);

  const logout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };
  app.post(`${AUTH_URL}/logout`, logout);

};