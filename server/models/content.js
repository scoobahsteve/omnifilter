'use strict';

const mongoose = require('mongoose');
require('/../../../node_modules/mongoose/lib/schema/mixed.js');

var schema = new Schema({ mixed: Schema.Types.Mixed });
schema.path('mixed').default(function () {
  return {};
});


var contentSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  title: String,
  createdOn: String,
  tags: [String],
  location: String,
  content: {},
  // timestamps: { createdAt: 'created_at' }
});

module.exports = mongoose.model('Content', contentSchema);
