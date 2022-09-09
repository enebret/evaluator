const fs = require('fs');
const fileB = require ('./filename.js');
const fileSize = require ('./filesize.js');
const contactdetails = require ('./contactdata.js');
const wordcount = require ('./wordcount.js');
const pagecount = require ('./pagecount.js');
const filetype = require ('./filetype.js');
const spellcheck = require ('./spellChecker.js')
const rs = require ('./rSect.js')
const ats = require ('./ats.js')
const pdf = require ('./pdfgen.js')
const path = require('path');
const linknD = require ('./linkfinder.js');
const { clearInterval } = require( 'timers' );

const testFile = 'c:/Users/LENOVO/Documents/E.I.O.pdf';
const docxFile5 = 'c:/Users/a_cb/Downloads/SALAHU AHMED CV-3 (1).pdf';
const txt2 = 'c:/Users/a_cb/Downloads/sulaman ubrahum cv ga.docx';
const docxFile = 'c:/Users/LENOVO/Downloads/SALAHU AHMED CV-3 (1).pdf';
const txt4 = 'c:/Users/LENOVO/Downloads/sulaman ubrahum cv ga.docx';
const txt3 = 'c:/Users/LENOVO/Downloads/HARRY AKHALUODE CV.docx';


//console.log(doc)
var d = function (x) {
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
      
      contactdetails(x, txtPath);
      linknD(x, txtPath);
      filetype(x, txtPath);
      pagecount(x, txtPath);
      wordcount(x, txtPath);
      fileSize(x, txtPath);
      spellcheck(x,txtPath);
      rs(x, txtPath);
      ats(x, txtPath);
      setTimeout(() => {
        pdf(txtPath2)
      }, 70000);
         
          
   setTimeout(() => {
    const yf = path.resolve(__dirname, '..');
    fs.readdir(yf, (err, files) => {
    files.forEach(file=>{
    if(path.extname(file)=='.pdf' || path.extname(file)=='.txt'){
      let op = path.resolve(file)
      fs.unlinkSync(op);
      console.log("file removed.");
          }
        })
      });
   }, 120000);
          

      setTimeout(() => {
        fs.unlinkSync(txtPath2);
        console.log(".txt file removed.");
      }, 70000);
   } 


d(docxFile5)

//module.exports = d

   

      