const fs = require('fs');
const path = require('path');
var textract = require('textract');
const pdf = require('pdf-parse');
const docxFile2 = 'c:/Users/a_cb/Documents/okwute.docx';
const docxFile4 = 'c:/Users/a_cb/Documents/E.I.O.pdf';

let wc = function (x) {
    if (path.extname(x)=='.docx') {
        textract.fromFileWithPath(x, function( error, text ) {
            console.log(text.split(" ").length)
            //margin of error should not be more than 10%
            //write total amount of words to txt file
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
            console.log(fg.length);
            //margin of error should not be more than 10%
            // write total amount of words to txt file
        })
        
    }
};

wc(docxFile2)