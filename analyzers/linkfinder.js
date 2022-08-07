const fs = require('fs');
const path = require('path');
//var textract = require('textract');
const pdf = require('pdf-parse');
var filesize = require('file-size');
const testFile = 'c:/Users/LENOVO/Documents/E.I.O.pdf';

function linknD (x, y) {
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
            //console.table(fg);
            //console.log(fg[22].slice(0,25))
            fg.forEach((x)=>{
                if(x.slice(0,25)=='https://www.linkedin.com/'){
                    fs.appendFile(y, x+'\n', function (err) {
                        if (err) throw err;
                        console.log('File name written successfully.');
                      });
                    console.log(x)
                    //write link to txt file
                } else {
                    //write to txt file no linkedin file
                }
            })
            
        })
        
    }
};

module.exports = linknD