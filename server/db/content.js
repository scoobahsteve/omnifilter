const mongoose = require('mongoose');

var contentSchema = new mongoose.Schema({
  author_id: String,
  title: String,
  createdOn: String,
  tags: [String],
  location: String,
});

module.exports = mongoose.model('Content', contentSchema);
