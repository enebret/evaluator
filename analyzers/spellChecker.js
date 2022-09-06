const fs = require('fs');
const path = require('path');
var textract = require('textract');
const pdf = require('pdf-parse');

const txt1 = 'c:/Users/LENOVO/Documents/E.I.O.pdf';
const txt2 = 'c:/Users/LENOVO/Downloads/SALAHU AHMED CV-3 (1).pdf';
const txt3 = 'c:/Users/LENOVO/Downloads/HARRY AKHALUODE CV.docx';
const txt4 = 'c:/Users/LENOVO/Downloads/sulaman ubrahum cv ga.docx'
var SpellChecker = require('simple-spellchecker');
 
function spellCheck (x, y) {
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
                if(/[a-zA-Z]/.test(x[0])){
                   lk.push(x)
                    
                } 
            });
            var spellings = []
            if (lk[0]) {
                lk.forEach(x=>{
                    let regex = /[.,):;\s]/g;
                    let result = x.replace(regex, '');
                    SpellChecker.getDictionary("en-GB", function(err, dictionary) {
                        if(!err) {
                        var misspelled = ! dictionary.spellCheck(result);
                        if(misspelled) {
                            //console.log(result)
                            spellings.push(result)
                            }
                        }
                    })
                   })
            }; if(spellings) {
                fs.appendFile(y, 'Spelling: wrong spellings'+'\n', function (err) {
                    if (err) throw err;
                    console.log('wrong spellings')
                  });
                //console.log('wrong spellings')
            } else if(!spellings) {
                fs.appendFile(y, 'Spelling: no wrong spellings'+'\n', function (err) {
                    if (err) throw err;
                    console.log('no wrong spellings')
                  });
                //console.log('no wrong spellings')
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
                    if(/[a-zA-Z]/.test(x[0])){
                        /*SpellChecker.getDictionary("en-US", function(err, dictionary) {
                            if(!err) {
                            var misspelled = ! dictionary.spellCheck(x);
                            if(misspelled) {
                                //console.log('misspelt!')
                                lk.push(x)
                                }
                            }
                        });*/lk.push(x)
                        }
                    })
                var spellings = []
                if (lk[0]) {
                   lk.forEach(x=>{
                    let regex = /[.,):;\s]/g;
                    let result = x.replace(regex, '');
                    SpellChecker.getDictionary("en-GB", function(err, dictionary) {
                        if(!err) {
                        var misspelled = ! dictionary.spellCheck(result);
                        if(misspelled) {
                            //console.log(result)
                            spellings.push(result)
                
                            }
                        }
                    })
                   })
                };
                if(spellings) {
                    fs.appendFile(y, 'Spelling: wrong spellings'+'\n', function (err) {
                        if (err) throw err;
                        console.log('wrong spellings')
                      });
                    //console.log('wrong spellings')
                } else if(!spellings) {
                    fs.appendFile(y, 'Spelling: no wrong spellings'+'\n', function (err) {
                        if (err) throw err;
                        console.log('no wrong spellings')
                      });
                    //console.log('no wrong spellings')
                }
            
        })
        
    }
};

//spellCheck(txt3)
module.exports = spellCheck