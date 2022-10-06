const fs = require('fs'),
  path = require('path'),

  genNavJson = (fromPath = '') => {
    return fs.promises.readdir(fromPath)
      .then(files => {

      })
  };

module.exports = {}
