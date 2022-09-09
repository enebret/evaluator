//function checkGrammar () {}
//function checkWordCount () {}  //min 400 max 800
//function checkFileSize () {} //max 2mb
//function checkFileType () {} //docx, html
//function checkFileName () {} //should contain fullname
//function checkPageCount () {} //min 1 page, max 2pages
//function checkRequiredSection () {}
//function checkPortFolioLink () {} // contain linkedin link or personal url
//git add ., git commit -m '', git push origin HEAD:<name-of-remote-branch>
//use "git pull origin master" (to update local repo)
const testFolder = 'c:/Users/LENOVO/Downloads';
const docxFile = 'c:/Users/LENOVO/Downloads/HARRY AKHALUODE CV.docx';
const docxFile2 = 'c:/Users/a_cb/Documents/okwute.docx';
const docxFile3 = 'c:/Users/a_cb/Documents/E.I.O.pdf';
const testFile = 'c:/Users/LENOVO/Documents/gfsv_amf_agd.docx';
const docxFile5 = 'c:/Users/a_cb/Downloads/HARRY AKHALUODE CV.docx';
const txt4 = 'c:/Users/LENOVO/Downloads/sulaman ubrahum cv ga.docx';
const fs = require('fs');
const path = require('path');
var textract = require('textract');
const pdf = require('pdf-parse');
const docxConverter = require('docx-pdf');
const doc = path.resolve(__dirname+'/evaluator-be/HARRY AKHALUODE CV.docx');
const directory = path.join(__dirname, '/analyzers/evaluator-be');

var q = function (x) {docxConverter(x,'./output.pdf',function(err,result){
if(err){
   console.log(err);
  }
 console.log('result'+result);
});}

var p = function (x, y) {
  if (path.extname(x)=='.docx') {
    q(x);
    setTimeout(() => {
      let dataBuffer = fs.readFileSync('./output.pdf');
      pdf(dataBuffer).then(function(data) {
        var pages = data.numpages
        console.log(pages)
        fs.appendFile(y, `pages: ${pages}`+'\n', function (err) {
          if (err) throw err;
          console.log('number of pages copied successfully');
        });
          //write page number to txt file (create txt file with username)
      })
  }, 45000);
  setTimeout(() => {
    fs.unlinkSync('./output.pdf');
        console.log("File removed:");
  }, 60000);
  } else {

      let dataBuffer = fs.readFileSync(x);
      pdf(dataBuffer).then(function(data) {
        var pages = data.numpages
        //console.log(pages)
        fs.appendFile(y, `pages: ${pages}`+'\n', function (err) {
          if (err) throw err;
          console.log('number of pages copied successfully');
        });
          //write page number to txt file (create txt file with username)
      })
  

};
  }
  
module.exports = p

//p(txt4)

