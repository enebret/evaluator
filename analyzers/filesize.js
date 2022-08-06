const fs = require('fs');
const path = require('path');
var filesize = require('file-size');
const testFile = 'c:/Users/LENOVO/Documents/design.pdf';
function fileS (x) {
    var stats = fs.statSync(x);
    console.log(filesize(stats.size).human())
    //write file size to txt file
}

fileS(testFile)