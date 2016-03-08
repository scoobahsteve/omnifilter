const express = require('express');
const jsonParser = require('body-parser').json();
const mongoose = require('mongoose');

const basicHTTP = require(__dirname + '/../lib/basic_http');
const authCheck = require(__dirname + '/../lib/jwt_auth');

const User = require(__dirname + '/../models/user');
// const Content = require(__dirname + '/../models/Content');

var userRouter = module.exports = exports = express.Router();

userRouter.post('/newuser', jsonParser, (req, res) => {
  var newUser = new User(req.body);
  newUser.user_id = req.user._id;
  newUser.save((err, data) => {
    if (err) {
      return res.status(500).json({
        msg: 'Error creating user'
      })
    }

    res.status(200).json({
      msg: 'User created',
      createdUser: data
    });
  });
});

userRouter.get('/verify', authCheck, (req, res) => {
  User.find({
    user_id: req.user._id
  }, (err, data) => {
    if (err) {
      return res.status(500).json({
        msg: 'Error finding user'
      })
    }

    res.status(200).json({
      msg: 'User verified',
      contents: data
    });
  });
});

userRouter.put('/usersettings/:id', authCheck, jsonParser, (req, res) => {
  var updateUser = req.body;
  delete updateUser._id;
  User.update({
    _id: req.params.id
  }, updateUser, (err) => {
    if (err) {
      return res.status(500).json({
        msg: 'Error updating user'
      })
    }
    res.status(200).json({
      msg: 'User updated'
    });
  });
});

userRouter.delete('/deleteuser/:id', authCheck, (req, res) => {
  User.remove({
    _id: req.params.id
  }, (err) => {
    if (err) {
      return res.status(500).json({
        msg: 'Error deleting user'
      })
    }
    res.status(200).json({
      msg: 'User deleted'
    });
  });
});
