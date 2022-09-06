const fs = require('fs');
const path = require('path');
var textract = require('textract');
const pdf = require('pdf-parse');
var filesize = require('file-size');
const testFile = 'c:/Users/LENOVO/Documents/E.I.O.pdf';
const docxFile = 'c:/Users/LENOVO/Downloads/SALAHU AHMED CV-3 (1).pdf';
const testFile2 = 'c:/Users/LENOVO/Documents/gfsv_amf_agd.docx';
function linknD (x, y) {
    if (path.extname(x)=='.docx') {
        textract.fromFileWithPath(x, function( error, text ) {
            let rp = text.trim().replace(/[\r\n]/gm, '').split(" ");
            let fg = []
           rp.forEach((x)=>{
                if(x.length>1) {
                    fg.push(x)
                }
                
            })
            var lk = []
            fg.forEach((x)=>{
                if(x.slice(0,25)=='https://www.linkedin.com/'){
                   
                      lk.push('LinkndIn link found.')
                  
                    
                }
            })
            if (lk[0]) {
                fs.appendFile(y, `LinkdIn link: ${lk[0]}`+'\n', function (err) {
                    if (err) throw err;
                    console.log(lk[0]);
                  });
                
            } else {
                fs.appendFile(y, 'LinkdIn link: No LinkedIn link found.'+'\n', function (err) {
                    if (err) throw err;
                    console.log('No LinkedIn link found.')
                  });
                
            }
        })
        
    } else if (path.extname(x)=='.pdf') {
        let dataBuffer = fs.readFileSync(x);
        pdf(dataBuffer).then(function(data) {
            let rp = data.text.trim().replace(/[\r\n]/gm, '').split(" ");
            let fg = []
           rp.forEach((x)=>{
                if(x.length>1) {
                    fg.push(x)
                }
                
            })
            var lk = []
            fg.forEach((x)=>{
                if(x.slice(0,25)=='https://www.linkedin.com/'){
                    /*fs.appendFile(y, `LinkdIn link: ${x}`+'\n', function (err) {
                        if (err) throw err;
                        console.log('LinkedIn link copied successfully.');
                      });*/
                      lk.push('LinkndIn link found.')
                  
                    //write link to txt file
                }
            })
            if (lk[0]) {
                fs.appendFile(y, `LinkdIn link: ${lk[0]}`+'\n', function (err) {
                    if (err) throw err;
                    console.log(lk[0]);
                  });
                
            } else {
                fs.appendFile(y, 'LinkdIn link: No LinkedIn link found.'+'\n', function (err) {
                    if (err) throw err;
                    console.log('No LinkedIn link found.')
                  });
                
            }
            
            
        })
        
    }
};

module.exports = linknD
//linknD(docxFile)