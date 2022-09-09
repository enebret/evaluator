const fs = require('fs');
const path = require('path');
var textract = require('textract');
const pdf = require('pdf-parse');

const txt1 = 'c:/Users/a_cb/Downloads/SALAHU AHMED CV-3 (1).pdf';;
const txt2 = 'c:/Users/LENOVO/Downloads/SALAHU AHMED CV-3 (1).pdf';
const txt3 = 'c:/Users/LENOVO/Downloads/HARRY AKHALUODE CV.docx';
const txt4 = 'c:/Users/LENOVO/Downloads/sulaman ubrahum cv ga.docx';




function rsection (x, y) {
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
                    if(result==='objectives' || result==='Objectives' || result==='OBJECTIVE' || result==='OBJECTIVES'){
                        spellings.push(result)
                    };
                    if(result==='Experience' || result==='EXPERIENCE' ){
                        spellings.push(result)
                    };
                    if(result==='skills' || result==='SKILLS' ){
                        spellings.push(result)
                    };
                    if(result==='education' || result==='EDUCATION' ){
                        spellings.push(result)
                    };
                   })
            }; if(spellings) {
                let uniquespells = spellings.filter((x,y)=>spellings.indexOf(x)===y);
                if( uniquespells[0]==='Experience' || uniquespells[0]==='EXPERIENCE' && uniquespells[0]==='EDUCATION' || uniquespells[0]==='Education' && uniquespells[0]==='OBJECTIVE' || uniquespells[0]==='OBJECTIVES' || uniquespells[0]==='Objectives'){
                    fs.appendFile(y, 'rs: compulsory sections found'+'\n', function (err) {
                        if (err) throw err;
                        console.log('rs: compulsory sections found')
                        });
                } else if (uniquespells[0]=='objectives' || uniquespells[0]==='OBJECTIVE' || uniquespells[0]==='OBJECTIVES' && uniquespells[0]==='Experience'|| uniquespells[0]==='EXPERIENCE' ) {
                    fs.appendFile(y, 'rs: Incomplete required sections found'+'\n', function (err) {
                        if (err) throw err;
                        console.log('Incomplete required sections found')
                        });
                } else if (uniquespells[0]==='Experience' || uniquespells[0]==='EXPERIENCE' && 'education' || uniquespells[0]==='EDUCATION' || uniquespells[0]==='Education') {
                    fs.appendFile(y, 'rs: Incomplete required sections found'+'\n', function (err) {
                        if (err) throw err;
                        console.log('Incomplete required sections found')
                        });
                } else if (uniquespells[0]=='objectives' || uniquespells[0]==='OBJECTIVE' || uniquespells[0]==='OBJECTIVES' && 'education' || uniquespells[0]==='EDUCATION' || uniquespells[0]==='Education') {
                    fs.appendFile(y, 'rs: Incomplete required sections found'+'\n', function (err) {
                        if (err) throw err;
                        console.log('Incomplete required sections found')
                        });
                } else if (uniquespells[0]=='objectives' || uniquespells[0]==='OBJECTIVE' || uniquespells[0]==='OBJECTIVES' || uniquespells[0]==='Experience' || uniquespells[0]==='EXPERIENCE' || 'education' || uniquespells[0]==='EDUCATION' || uniquespells[0]==='Education') {
                    fs.appendFile(y, 'rs: Incomplete required sections found'+'\n', function (err) {
                        if (err) throw err;
                        console.log('Incomplete required sections found')
                        });
                }
                //console.log(uniquespells)
            } else if(!spellings) {
                /*fs.appendFile(y, 'Spelling: no wrong spellings'+'\n', function (err) {
                    if (err) throw err;
                    console.log('no wrong spellings')
                  });*/
                console.log('no required sections found')
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
                        lk.push(x)
                        }
                    })
                    //console.log(lk)
                var spellings = []
                if (lk[0]) {
                    lk.forEach(x=>{
                        let regex = /[.,):;\s]/g;
                        let result = x.replace(regex, '');
                        if(result==='objectives' || result==='Objectives' || result==='OBJECTIVE' || result==='OBJECTIVES'){
                            spellings.push(result)
                        };
                        if(result==='Experience' || result==='EXPERIENCE' ){
                            spellings.push(result)
                        };
                        if(result==='skills' || result==='SKILLS' || result==='Skills'){
                            spellings.push(result)
                        };
                        if(result==='education' || result==='EDUCATION' || result==='Education' ){
                            spellings.push(result)
                        };
                       })
                };
                //console.log(spellings)
                if(spellings) {
                    /*fs.appendFile(y, 'Spelling: wrong spellings'+'\n', function (err) {
                        if (err) throw err;
                        console.log('wrong spellings')
                      });*/
                      let uniquespells = spellings.filter((x,y)=>spellings.indexOf(x)===y);
                      if( uniquespells[0]==='Experience' || uniquespells[0]==='EXPERIENCE' && uniquespells[0]==='EDUCATION' || uniquespells[0]==='Education' && uniquespells[0]==='OBJECTIVE' || uniquespells[0]==='OBJECTIVES' || uniquespells[0]==='Objectives'){
                            
                            fs.appendFile(y, 'rs: compulsory sections found'+'\n', function (err) {
                            if (err) throw err;
                            console.log('rs: compulsory sections found')
                            });
                            
                      } else if (uniquespells[0]=='objectives' || uniquespells[0]==='OBJECTIVE' || uniquespells[0]==='OBJECTIVES' && uniquespells[0]==='Experience'|| uniquespells[0]==='EXPERIENCE' ) {
                            fs.appendFile(y, 'rs: Incomplete required sections found'+'\n', function (err) {
                            if (err) throw err;
                            console.log('Incomplete required sections found')
                            });
                            
                      } else if (uniquespells[0]==='Experience' || uniquespells[0]==='EXPERIENCE' && 'education' || uniquespells[0]==='EDUCATION' || uniquespells[0]==='Education') {
                            fs.appendFile(y, 'rs: Incomplete required sections found'+'\n', function (err) {
                            if (err) throw err;
                            console.log('rs: Incomplete required sections found')
                            });
                        
                      } else if (uniquespells[0]=='objectives' || uniquespells[0]==='OBJECTIVE' || uniquespells[0]==='OBJECTIVES' && 'education' || uniquespells[0]==='EDUCATION' || uniquespells[0]==='Education') {
                            fs.appendFile(y, 'rs: Incomplete required sections found'+'\n', function (err) {
                            if (err) throw err;
                            console.log('Incomplete required sections found')
                            });
                            
                      } else if (uniquespells[0]=='objectives' || uniquespells[0]==='OBJECTIVE' || uniquespells[0]==='OBJECTIVES' || uniquespells[0]==='Experience' || uniquespells[0]==='EXPERIENCE' || 'education' || uniquespells[0]==='EDUCATION' || uniquespells[0]==='Education') {
                            fs.appendFile(y, 'rs: Incomplete required sections found'+'\n', function (err) {
                            if (err) throw err;
                            console.log('Incomplete required sections found')
                            });
                            
                      }
                      //console.log(uniquespells)
                } else if(!spellings) {
                    fs.appendFile(y, 'rs: No required sections found'+'\n', function (err) {
                        if (err) throw err;
                        console.log('no wrong spellings')
                      });
                    
                }
            
        })
        
    }
};

//rsection(txt4)
module.exports = rsection