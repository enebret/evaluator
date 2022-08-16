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
const docxFile3 = 'c:/Users/LENOVO/Documents/E.I.O.pdf';
const testFile = 'c:/Users/LENOVO/Documents/gfsv_amf_agd.docx';
const docxFile5 = 'c:/Users/a_cb/Downloads/HARRY AKHALUODE CV.docx';
const fs = require('fs');
const path = require('path');
var textract = require('textract');
const pdf = require('pdf-parse');
const docxConverter = require('docx-pdf');
const doc = path.resolve(__dirname+'/evaluator-be/HARRY AKHALUODE CV.docx');


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
  }, 10000);
  setTimeout(() => {
    fs.unlinkSync('./output.pdf');
        console.log("File removed:");
  }, 20000);
  } else {
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
  }, 5000);

};
  }
  
  module.exports = p

//p(doc)

/*main().catch(function (err) {
    console.log(`Error converting file: ${err}`);
});*/

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

  
  /*async function pageNumber (x) {

       
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

  let p = async function (x, y) {
    var r = await pageNumber(x);
    setTimeout(() => {
        let dataBuffer = fs.readFileSync(r);
        pdf(dataBuffer).then(function(data) {
          var pages = data.numpages
          console.log(pages)
          fs.appendFile(y, `pages: ${pages}`+'\n', function (err) {
            if (err) throw err;
            console.log('number of pages copied successfully');
          });
            //write page number to txt file (create txt file with username)
        })
    }, 20000);
    setTimeout(() => {
      fs.unlinkSync(r);
          console.log("File removed:", r);
    }, 20000);
  };

 

 
var tf = async function (x, y) {
    if (path.extname(x)=='.docx') {
        await p(x,y)
      }else if (path.extname(x)=='.pdf'){
        let dataBuffer = fs.readFileSync(x);
        pdf(dataBuffer).then(function(data) {
          var pages = data.numpages
          fs.appendFile(y, `pages: ${pages}`+'\n', function (err) {
            if (err) throw err;
            console.log('number of pages copied successfully');
          });
          //console.log(pages)
            
            //write page number to txt file (create txt file with username)
        })
      }else if (path.extname(x)!=='.pdf' || path.extname(x)!=='.pdf' ) {
        console.log ('wrong file type')
      }
}

tf(doc)
//module.exports = tf*/



