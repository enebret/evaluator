const fs = require('fs');
const fileB = require ('./filename.js');
const fileSize = require ('./filesize.js');
const contactdetails = require ('./contactdata.js');
const wordcount = require ('./wordcount.js');
const pagecount = require ('./pagecount.js');
const filetype = require ('./filetype.js');
const pdf = require ('./pdfgen.js')
const path = require('path');
const linknD = require ('./linkfinder.js');
const { clearInterval } = require( 'timers' );
const testFile = 'c:/Users/LENOVO/Documents/E.I.O.pdf';
const docxFile5 = 'c:/Users/a_cb/Downloads/HARRY AKHALUODE CV.docx';
const docxFile = 'c:/Users/LENOVO/Downloads/HARRY AKHALUODE CV.docx';

var d = async function (x) {
   try {
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
    var txtPath2 = './'+filename+'.txt';
    //const txt = './HARRY AKHALUODE CV.txt'
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
            pdf(txtPath2)
          }, 38000);
         
          
    
          

      
      /*setTimeout(() => {
        fs.unlinkSync(txtPath2);
        console.log(".txt file removed.");
      }, 20000);*/
   } catch (error) {
     console.log (error)
   }

};


d(docxFile)