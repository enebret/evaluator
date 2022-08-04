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
const testFile = 'c:/Users/LENOVO/Documents/gfsv_amf_agd.docx';
const fs = require('fs');
const path = require('path');
var textract = require('textract');
const pdf = require('pdf-parse');
const docxConverter = require('docx-pdf')
    
    /*fs.readdir(testFolder, (err, files) => {
      let r= files.map(file => {
        return file;
      });
      let p = r.findIndex(item => item==='HARRY AKHALUODE CV.docx')
      console.log(p)
      
    });*/
    
    
//textract.fromFileWithPath(docxFile, function( error, text ) {console.log(text)})


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
  //console.log('AG.docx'.slice(0, -5)+'.pdf')
  //console.log(path.extname('AG.docx'));
  //let pr = 'AG.docx'.split('.')
  //console.log(pr[0])
  /*var pdfPath = docxFile.slice(0,-5)+'.pdf';
  console.log(pdfPath)*/

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  async function pageNumber (x) {

       
       if(path.extname(x)=='.docx') {
          //var pdfPath = x.slice(0,-5)+'.pdf';
          function pdfC (x, y) {
            docxConverter(x, y,function(err,result){
                if(err){
                  console.log(err);
                }
                console.log('result'+result);
              })
        }
        var pdfD = './'+x.substring(x.lastIndexOf("/")+1, x.length-5)+'.pdf'
          pdfC(x, pdfD);
          //timeout 4secs or sleep function
        }  
      
            console.log('first run');
            return pdfD
      
    
    }

  let p = async function (x) {
    var r = await pageNumber(x);
    setTimeout(() => {
        let dataBuffer = fs.readFileSync(r);
        pdf(dataBuffer).then(function(data) {
            console.log(data.numpages);
        })
    }, 7000);
  };

  p(docxFile)

 
  /*let t = './'+docxFile2.substring(docxFile2.lastIndexOf("/")+1, docxFile2.length-5)+'.pdf';
    console.log (t);*/