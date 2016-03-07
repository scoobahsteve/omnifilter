const express = require('express');
const jsonParser = require('body-parser').json();
const mongoose = require('mongoose');

const basicHTTP = require(__dirname + '/../lib/basic-http');
const authCheck = require(__dirname + '/../lib/check-token');

const User = require(__dirname + '/../models/user');
const Content = require(__dirname + '/../models/Content');

var userRouter = module.exports = exports = express.Router();

userRouter.get('/contents', authCheck, (req, res) => {
  Content.find({
    author_id: req.user._id
  }, (err, data) => {
    if (err) {
      return res.status(500).json({
        msg: 'Error finding contents'
      })
    }

    res.status(200).json({
      msg: 'All contents retrieved',
      contents: data
    });
  });
});

userRouter.content('/new', authCheck, jsonParser, (req, res) => {
  var newContent = new Content(req.body);
  newContent.author_id = req.user._id;
  newContent.save((err, data) => {
    if (err) {
      return res.status(500).json({
        msg: 'Error creating content'
      })
    }

    res.status(200).json({
      msg: 'Content created',
      createdContent: data
    });
  });
});

userRouter.put('/content/:id', authCheck, jsonParser, (req, res) => {
  var updateContent = req.body;
  delete updateContent._id;
  Content.update({
    _id: req.params.id
  }, updateContent, (err) => {
    if (err) {
      return res.status(500).json({
        msg: 'Error updating content'
      })
    }
    res.status(200).json({
      msg: 'Content updated'
    });
  });
});

userRouter.delete('/content/:id', authCheck, (req, res) => {
  Content.remove({
    _id: req.params.id
  }, (err) => {
    if (err) {
      return res.status(500).json({
        msg: 'Error deleting content'
      })
    }
    res.status(200).json({
      msg: 'Content deleted'
    });
  });
});
