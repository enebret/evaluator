const fs = require('fs');
const path = require('path');
var textract = require('textract');
const pdf = require('pdf-parse');
const docxFile = 'c:/Users/LENOVO/Downloads/HARRY AKHALUODE CV.docx';
const docxFile4 = 'c:/Users/a_cb/Documents/E.I.O.pdf';
const docxFile3 = 'c:/Users/LENOVO/Documents/E.I.O.pdf';

let wc = function (x, y) {
    if (path.extname(x)=='.docx') {
    textract.fromFileWithPath(x, function( error, text ) {
        //console.log(text)
        let rp = text.trim().replace(/[\r\n]/gm, '').split(" ");
        let fg = []
       rp.forEach((x)=>{
            if(x.length>1) {
                fg.push(x)
            }
            
        })
        var lent = fg.length
        fs.appendFile(y, `total word count: ${lent}`+'\n', function (err) {
            if (err) throw err;
            console.log('word count copied successfully.');
          });
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
            var lent = fg.length
            console.log(lent)
            /*fs.appendFile(y, `total word count: ${lent}`+'\n', function (err) {
                if (err) throw err;
                console.log('word count copied successfully.');
              });*/
            
            //margin of error should not be more than 10%
            // write total amount of words to txt file
        })
        
    }
};

//module.exports = wc
wc(docxFile3)