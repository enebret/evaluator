const fs = require('fs');
const fileB = require ('./filename.js');
const fileSize = require ('./filesize.js');
const contactdetails = require ('./contactdata.js');
const wordcount = require ('./wordcount.js');
const pagecount = require ('./pagecount.js');
const filetype = require ('./filetype.js');
const path = require('path');
const linknD = require ('./linkfinder.js');
const testFile = 'c:/Users/LENOVO/Documents/E.I.O.pdf';
const docxFile5 = 'c:/Users/a_cb/Downloads/HARRY AKHALUODE CV.docx';

var d = async function (x) {
    function fileN (x) {
        if (path.extname(x)=='.docx') {
            var filename = path.basename(x, '.docx');
            var extN = filename + '.docx'
            return {filename, ext: extN}
            
        } else if (path.extname(x)=='.pdf') {
            var filename = path.basename(x, '.pdf');
            var extN = filename + '.pdf'
            return {filename, ext: extN}
            
        }
    };
    var file = fileN (x);
    var {filename} = file;
    var {ext} = file;
    var txtPath = filename+'.txt';
    fs.writeFile(txtPath, `cv review for ${filename}`+'\n', function (err) {
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
      
      setTimeout(() => {
        fs.unlinkSync('./'+filename+'.pdf');
        console.log("File removed:", ext);
      }, 20000);

};

d(docxFile5)