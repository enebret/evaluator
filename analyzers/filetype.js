const fs = require('fs');
const path = require('path');

let fileT = function (x, y) {
  if (path.extname(x)=='.docx') {
    fs.appendFile(y, 'type: DOCX'+'\n', function (err) {
      if (err) throw err;
      console.log('File type copied successfully');
    });
    //write file type to txt file
  } else if (path.extname(x)=='.pdf') {
    fs.appendFile(y, 'type: PDF'+'\n', function (err) {
      if (err) throw err;
      console.log('File type copied successfully');
    });
  }
};

module.exports = fileT