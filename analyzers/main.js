const fs = require('fs');
const fileB = require ('./filename.js');
const fileSize = require ('./filesize.js');
const contactdetails = require ('./contactdata.js');
const wordcount = require ('./wordcount.js');
const pagecount = require ('./pagecount.js');
const filetype = require ('./filetype.js');
const path = require('path');
const linknD = require ('./linkfinder.js');
const testFile = 'c:/Users/LENOVO/Documents/design.pdf';

var d = async function (x) {
    function fileN (x) {
        if (path.extname(x)=='.docx') {
            var filename = path.basename(x, '.docx');
            return filename
            
        } else if (path.extname(x)=='.pdf') {
            var filename = path.basename(x, '.pdf');
            return filename
            
        }
    };
    var file = fileN (x)
    var txtPath = file+'.txt';
    fs.writeFile(txtPath, `cv review for ${txtPath}`+'\n', function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
      });

      fileB(x, txtPath);
      fileSize(x, txtPath);
      contactdetails(x, txtPath);
      linknD(x, txtPath);
      wordcount(x, txtPath);
      filetype(x, txtPath);
      pagecount(x, txtPath);

};

d(testFile)