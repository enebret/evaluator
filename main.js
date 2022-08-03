//function checkGrammar () {}
//function checkWordCount () {}  //min 400 max 800
//function checkFileSize () {} //max 2mb
//function checkFileType () {} //docx, html
//function checkFileName () {} //should contain fullname
//function checkPageCount () {} //min 1 page, max 2pages
//function checkRequiredSection () {}
//function checkPortFolioLink () {} // contain linkedin link or personal url
//

const testFolder = 'c:/Users/LENOVO/Downloads';
const docxFile = 'c:/Users/LENOVO/Downloads/HARRY AKHALUODE CV.docx'
const testFile = 'c:/Users/LENOVO/Documents/gfsv_amf_agd.docx';
const fs = require('fs');
const path = require('path');
var textract = require('textract');
const pdf = require('pdf-parse');
    
    /*fs.readdir(testFolder, (err, files) => {
      let r= files.map(file => {
        return file;
      });
      let p = r.findIndex(item => item==='HARRY AKHALUODE CV.docx')
      console.log(p)
      
    });*/
    
    
textract.fromFileWithPath(docxFile, function( error, text ) {console.log(text)})


/*var docxConverter = require('docx-pdf');
docxConverter(docxFile,'./output.pdf',function(err,result){
  if(err){
    console.log(err);
  }
  console.log('result'+result);
});*/

/*let dataBuffer = fs.readFileSync('./output.pdf');
 
pdf(dataBuffer).then(function(data) {
 
    // number of pages
    console.log(data.numpages);
    
        
});*/

/*fs.readdir('C:/xjv/evaluator', (err, files) => {
    files.forEach(file => {
      console.log(file);
    });
    
    
  })*/