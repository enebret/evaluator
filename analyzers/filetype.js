const fs = require('fs');
const path = require('path');

let fileT = function (x, y) {
  if (path.extname(x)=='.docx') {
    //write file type to txt file
  } else if (path.extname(x)=='.pdf') {
    fs.appendFile(y, 'The filetype is PDF'+'\n', function (err) {
      if (err) throw err;
      console.log('File type copied successfully');
    });
  }
};

module.exports = fileT