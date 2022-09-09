const fs = require('fs');
const path = require('path');
var textract = require('textract');
const pdf = require('pdf-parse');
const SpellChecker = require('simple-spellchecker');
const txt1 = 'c:/Users/a_cb/Downloads/SALAHU AHMED CV-3 (1).pdf';;
const txt2 = 'c:/Users/LENOVO/Downloads/SALAHU AHMED CV-3 (1).pdf';
const txt3 = 'c:/Users/LENOVO/Downloads/HARRY AKHALUODE CV.docx';
const txt4 = 'c:/Users/LENOVO/Downloads/sulaman ubrahum cv ga.docx';
const txt5 = 'c:/Users/a_cb/Downloads/sulaman ubrahum cv ga.docx';

var filetype = function (x) {
    var lp = [];
    if (path.extname(x)=='.docx') {
      lp.push(0)
    } else if (path.extname(x)=='.pdf') {
        lp.push(20)
    };
    return lp
  };

  //let rp = filetype(txt2);
  //console.log(rp.toString())
function atsScore (x, y) {
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
            var spellings = [];
            var score  = [];
            if (lk[0]) {
                lk.forEach(x=>{
                    let regex = /[.,):;\s]/g;
                    let result = x.replace(regex, '');
                    SpellChecker.getDictionary("en-GB", function(err, dictionary) {
                        if(!err) {
                        var misspelled = ! dictionary.spellCheck(result);
                        if(misspelled) {
                            //console.log(result)
                            score.push(0)
                
                            } else if (!misspelled) {
                                score.push(20)
                            }
                        }
                    });
                    if(result==='Objective' || result==='Objectives' || result==='OBJECTIVE' || result==='OBJECTIVES'  || result==='SUMMARY'   || result==='Summary'){
                        spellings.push(result)
                    };
                    if(result==='developed' || result==='built' || result==='managed'){
                        spellings.push(result)
                    };
                   })
            }; if(spellings) {
                let uniquespells = spellings.filter((x,y)=>spellings.indexOf(x)===y);
                if( uniquespells[0]==='Objective' || uniquespells[0]==='OBJECTIVES' || uniquespells[0]==='OBJECTIVE' || uniquespells[0]==='Objectives' || uniquespells[0]==='SUMMARY' || uniquespells[0]==='Summary'){
                    score.push(40)
                    //console.log ('ats: score 40%')
                    
                } else if (uniquespells[0]=='developed' || uniquespells[0]==='managed' || uniquespells[0]==='built' ) {
                    score.push(20)
                    //console.log('ats: score 20%')
                } 
                
            };  if (score) {
                let rp = filetype(x);
                score.push(Number(rp.toString()));
                let totalscore = score.reduce((partialSum, a) => partialSum + a, 0);
               
                  console.log (`ats total score = ${totalscore}%`);
            }
            
            else if(!score) {
                console.log('no ats score')
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
                var spellings = [];
                var score  = [];
                if (lk[0]) {
                    lk.forEach(x=>{
                        let regex = /[.,):;\s]/g;
                        let result = x.replace(regex, '');
                        SpellChecker.getDictionary("en-GB", function(err, dictionary) {
                            if(!err) {
                            var misspelled = ! dictionary.spellCheck(result);
                            if(misspelled) {
                                //console.log(result)
                                score.push(0)
                    
                                } else if (!misspelled) {
                                    score.push(20)
                                }
                            }
                        });
                        if(result==='Objective' || result==='Objectives' || result==='OBJECTIVE' || result==='OBJECTIVES'  || result==='SUMMARY'   || result==='Summary'){
                            spellings.push(result)
                        };
                        if(result==='developed' || result==='built' || result==='managed'){
                            spellings.push(result)
                        };
                       })
                }; if(spellings) {

                    let uniquespells = spellings.filter((x,y)=>spellings.indexOf(x)===y);
                    if( uniquespells[0]==='Objective' || uniquespells[0]==='OBJECTIVES' || uniquespells[0]==='OBJECTIVE' || uniquespells[0]==='Objectives' || uniquespells[0]==='SUMMARY' || uniquespells[0]==='Summary'){
                        score.push(40)
                        //console.log ('ats: score 40%')
                    } else if (uniquespells[0]=='developed' || uniquespells[0]==='managed' || uniquespells[0]==='built' ) {
                        score.push(20)
                        //console.log('ats: score 20%')
                      
                    } 
                    //console.log(uniquespells)
                }; if (score){
                    let rp = filetype(x);
                    score.push(Number(rp.toString()));
                    let totalscore = score.reduce((partialSum, a) => partialSum + a, 0);
                    fs.appendFile(y, `ats total score: ${totalscore}`+'\n', function (err) {
                        if (err) throw err;
                        console.log (`ats total score = ${totalscore}%`);
                      });
                    //console.log (`ats total score = ${totalscore}%`);
                    
                }
                
                else if(!score) {
                    console.log('no ats score')
                }
            
        })
        
    }
};

//atsScore(txt5)
module.exports = atsScore
