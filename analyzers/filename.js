const fs = require('fs');
const path = require('path');
const testFile = 'c:/Users/LENOVO/Downloads/HARRY AKHALUODE CV.docx';

function fileN (x) {
    if (path.extname(x)=='.docx') {
        var filename = path.basename(x, '.docx');
        console.log(filename)
        //write to txt file
    } else if (path.extname(x)=='.pdf') {
        var filename = path.basename(x, '.pdf');
        console.log(filename)
        //write to txt file
    }
};

fileN (testFile)