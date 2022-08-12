const fs = require('fs');
const path = require('path');
var textract = require('textract');
const pdf = require('pdf-parse');
var filesize = require('file-size');
const testFile = 'c:/Users/LENOVO/Documents/E.I.O.pdf';
const docxFile = 'c:/Users/LENOVO/Downloads/HARRY AKHALUODE CV.docx';
const docxFile2 = 'c:/Users/a_cb/Documents/okwute.docx';
const docxFile4 = 'c:/Users/a_cb/Documents/E.I.O.pdf';
const docxFile5 = 'c:/Users/a_cb/Downloads/HARRY AKHALUODE CV.docx';

function linkF (x, y) {
    if (path.extname(x)=='.docx') {
        textract.fromFileWithPath(x, function( error, text ) {
            let rp = text.trim().replace(/[\r\n]/gm, '')
              if(rp.match(/(?:[-+() ]*\d){10,13}/g)==null && rp.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi) == null) {
                fs.appendFile(y, 'contact details::No' +'\n'+ 'No contact details registered on file', function (err) {
                    if (err) throw err;
                    console.log('No available contacts on file.');
                  });
                //console.log('No number or email registered on file')
              } else if (rp.match(/(?:[-+() ]*\d){10,13}/g)!==null && rp.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi) !== null){
                    var number = rp.match(/(?:[-+() ]*\d){10,13}/g)[0]
                    var email = rp.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)[0]
                    fs.appendFile(y, 'contact details::Yes'+'\n'+`Phone number: ${number}`+', '+`email: ${email}`+'\n', function (err) {
                        if (err) throw err;
                        console.log('contact details copied successfully.');
                      });
                //console.log (number, email)
              }
            
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
            //console.log(email, number)
            
        })
        
    }
};

module.exports = linkF
//linkF(docxFile5)