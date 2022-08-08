const fs = require('fs');
const path = require('path');
//var textract = require('textract');
const pdf = require('pdf-parse');
var filesize = require('file-size');
const testFile = 'c:/Users/LENOVO/Documents/E.I.O.pdf';

function linkF (x, y) {
    if (path.extname(x)=='.docx') {
        textract.fromFileWithPath(x, function( error, text ) {
            console.log(text.split(" ").length)
            //margin of error should not be more than 10%
            //write total amount of words to txt file
        })
        
    } else if (path.extname(x)=='.pdf') {
        let dataBuffer = fs.readFileSync(x);
        pdf(dataBuffer).then(function(data) {
            let rp = data.text.trim().replace(/[\r\n]/gm, '')
            var number = rp.match(/(?:[-+() ]*\d){10,13}/g)[0]
            var email = rp.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)[0]
      
            fs.appendFile(y, 'contact details::'+'\n'+`Phone number: ${number}`+', '+`email: ${email}`+'\n', function (err) {
                if (err) throw err;
                console.log('contact details copied successfully.');
              });
            //console.log(email)
            
        })
        
    }
};

module.exports = linkF
//linkF(testFile)