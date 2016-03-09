'use strict';

const mongoose = require('mongoose');

var contentSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  title: String,
  createdOn: String,
  tags: [String],
  location: String,
  content: {type: mongoose.Schema.Types.Mixed, required: true }
  // timestamps: { createdAt: 'created_at' }
});

module.exports = mongoose.model('Content', contentSchema);
