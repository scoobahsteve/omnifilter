'use strict';

const User = require(__dirname + '/../models/user');
const jwt = require('jsonwebtoken');

module.exports = exports = (req, res, next) => {
  let decoded;
  try {
    decoded =
      jwt.verify(req.headers.token, process.env.APP_SECRET || 'changethis');
  } catch (e) {
    return res.status(401).json({ msg: 'could not authenticate user' });
  }
  if (!decoded) res.status(401).json({ msg: 'could not authenticate user' });

  User.findOne({ _id: decoded._id }, (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: 'DB error' });
    }
    if (!user) return res.status(401).json({ msg: 'user not found' });
    console.log(req.user);
    delete user.authentication.password;
    req.user = user;
    next();
  });
};
