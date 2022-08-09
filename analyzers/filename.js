const fs = require('fs');
const path = require('path');
const testFile = 'c:/Users/LENOVO/Downloads/HARRY AKHALUODE CV.docx';

function fileN (x, y) {
    if (path.extname(x)=='.docx') {
        var filename = path.basename(x, '.docx');
        fs.appendFile(y, `Filename: ${filename}`+'\n', function (err) {
            if (err) throw err;
            console.log('File name copied successfully.');
          });
        console.log(filename)
        //write to txt file
    } else if (path.extname(x)=='.pdf') {
        var filename = path.basename(x, '.pdf');
        fs.appendFile(y, `Filename: ${filename}`+'\n', function (err) {
            if (err) throw err;
            console.log('File name copied successfully.');
          });
        console.log(filename)
        //write to txt file
    }
};

module.exports = fileN 