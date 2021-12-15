const express = require('express');
const app = express();
const session = require('express-session')
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'dajamsid'
}));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(_req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/digital-art-jams');

require('./services/auth-service')(app);
require('./services/user-service')(app);
require('./services/galleries-service')(app);
require('./services/images-service')(app);

app.listen(process.env.PORT || 5000);
