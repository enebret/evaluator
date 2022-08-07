const fs = require('fs');
const path = require('path');
var filesize = require('file-size');
const testFile = 'c:/Users/LENOVO/Documents/design.pdf';

function fileS (x, y) {
    var stats = fs.statSync(x);
    var humanSize = filesize(stats.size).human();
    console.log(filesize(stats.size).human())
    fs.appendFile(y, humanSize+'\n', function (err) {
        if (err) throw err;
        console.log('File size written successfully.');
      });
}

module.exports = fileS