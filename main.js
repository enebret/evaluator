/*function checkGrammar () {}
function checkWordCount () {}
function checkFileSize () {}
function checkFileType () {}
function checkFileName () {}
function checkPageCount () {}
function checkRequiredSection () {}
function checkPortFolioLink () {}*/

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