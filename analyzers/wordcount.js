const fs = require('fs');
const path = require('path');
var textract = require('textract');
const pdf = require('pdf-parse');

let wc = function (x) {
    if (path.extname(x)=='.docx') {
        //use textract here 
    } else if (path.extname(x)=='.docx') {
        // use pdf here
    }
}