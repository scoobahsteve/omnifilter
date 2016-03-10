'use strict';

module.exports = exports = function(err, res) {
  console.log('db error' + err);
  res.status(500).json({ msg: 'server error' });
};
