const PDFDocument = require('pdfkit');
const doc = new PDFDocument;
const fs = require('fs');

const path = require('path');
const dc = new Date().toLocaleDateString('en-GB', {timeZone: 'Africa/Lagos', weekday:"long", year:"numeric", month:"short", day:"numeric"})
const txt = './SALAHU AHMED CV-3 (1).txt';
const txt3 = './sulaman ubrahum cv ga.txt';
const txt2 = './E.I.O.txt';

const { textTransform } = require('text-transform');
const spelling = require('spelling');
//console.log(dc)
  
let pdf = function (x) {
        const data = fs.readFileSync(x, 'utf8');
        var split = data.split('\n');
        let title = textTransform(split[0].slice(0, split[0].length-2), 'uppercase');
        var lt = split[1].length - 3;
        var filename = path.basename(x, '.txt');
        //var filesize = split[2].slice(Number(split[2].indexOf(':'))+2, split[2].length)
        //var wordcount = split[7].slice(11, split[7].length)
        //var pages = split[6].slice(Number(split[6].indexOf(':'))+2, split[6].length);
        let [sp,  wc, lp, tq, at, ...rest] = split.reverse();
        //var pages;
        var wordcount;
        var filesize;
        var LinkedIn;
        var spellings;
        var ATS;
        var RS;
        //console.log(pg, wc, lp, tq)
        [ wc, lp, tq, at].forEach(x=>{
          if (x.indexOf('w')==0) {
            //console.log(x);
            wordcount = x;
          } else if (x.indexOf('r')==0) {
            RS = x;
            //console.log(x)
          } else if (x.indexOf('S')==0) {
            spellings = x;
            
          } else if (x.indexOf('a')==0) {
            //console.log(x)
            ATS = x;
            
          }
        });
        [...rest].forEach(x=>{
          if(x.indexOf('s')==0){
            filesize = x;
            console.log(x)
          } else if (x.indexOf('L')==0) {
            LinkedIn = x;
            //console.log(x)
          }
        })
        
       let r = RS.slice(Number(RS.indexOf(':')+2, RS.length))
       //console.log(r==='Incomplete required sections found')
         if(filename){
        
          //var printer = new PdfPrinter(fonts);
          var rpg;
          var msg;
          var psg;
          var lgn;
          var spl;
          var apg;
          var s = spellings.slice(Number(spellings.indexOf(':'))+2, spellings.length)
          var lkn = (LinkedIn.slice(Number(LinkedIn.indexOf(':'))+2, LinkedIn.length))
          var sg = filesize.slice(filesize.length-2, filesize.length);
          var sgq = filesize.slice(Number(filesize.indexOf(':')+2, filesize.length));
          var sgn;
          let wcn = Number((wordcount.slice(Number(wordcount.indexOf(':'))+2, wordcount.length)));
          //let pgn = Number(pages.slice(Number(pages.indexOf(':'))+2, pages.length));
          let a = Number(ATS.slice(Number(ATS.indexOf(':')+2, ATS.length)));
          let r = RS.slice(Number(RS.indexOf(':')+2, RS.length))
          let finalscore = a.toString();
          wcn < 400? (msg = 'The total word-count of your resume accessed falls below the recommended number. Try to elaborate more on achievements and past experience.') : wcn < 600? (msg = 'The total word-count accessed falls within the recommended range.') : (msg = 'The total word-count exceeds the recommended range. Try to summarize your experiences and achievements.')
          //pgn === 1 ? (psg = 'The resume is 1 page long. This maybe too short. Try to make it 2 pages.') : pgn === 2 ? (psg = 'The resume is 2 pages long which is the recommended number of pages required in a standard resume.') : (psg = 'The resume exceeds the recommended number of pages required.Try to use each page more efficiently. You can use our CV services to achieve this in approx. 2 minutes. No registration required.')
          sg == 'kB'? (sgn = 'The resume falls within the recommended size estimate.') : (sgn = 'The file is too large. We recommend removing any custom background images or formatting elements as you did, or resolving it in a different format setting that will allow for file compression.')
          s == 'wrong spellings'? (spl = 'The resume file failed some spelling tests.') : (spl = 'The resume file has no spelling errors.')
          lkn == 'No LinkedIn link found.'? (lgn = 'The resume file has no LinkedIn link.') : (lgn = 'The file contains a LinkedIn link.');
          a < 80 ? (apg = 'You scored below the mark that should move your file on to a human recruiter.') : (apg = 'You passed the cut-off.');
          r === 'Incomplete required sections found'? (rpg = 'The file contains missing/incomplete required sections.') : (rpg = 'The file contains the required sections.')
          
          //logo
          //heading
          doc.font('Times-Bold').text(`${dc}`, {
            width: 410,
            align: 'left',
            align: 'justify',
            fontSize: 3
        
          }
          )
          doc.moveDown(0.5);
          doc.font('Times-Roman').text('This free resume critique is intended to give you an honest, straightforward assessment, and some suggestions to help you in your job search.', {
            width: 410,
            align: 'left',
            align: 'justify',
            fontSize: 12,
            lineGap: 3
          }
          )
          doc.moveDown(0.5);
          var lorem = 'It is a good practice to have your first and last name in the file name of your resume. Email clients can mark generic file names as suspicious. Adding your name ensures your resume will be found easily and assigned to the right application.'
          doc.font('Times-Roman').text('FILE DATA: ', {
            continued: true,
            //align: 'left',
            //align: 'justify',
            fontSize: 12,
            //lineGap: 3
            //underline: true
          }
          ).font('Times-Roman').text(`File is named ${filename}. ${lorem}`, {
            width: 410,
            align: 'left',
            align: 'justify',
            fontSize: 12,
            lineGap: 3
          }
          )
          
          //doc
          doc.moveDown(0.5);
          var vorem = `Recorded file size is ${sgq}.`
          doc.font('Times-Roman').text('FILE SIZE: ', {
            continued: true,
            //align: 'left',
            //align: 'justify',
            fontSize: 12,
            //lineGap: 3
            //underline: true
          }
          ).font('Times-Roman').text(`${vorem}${sgn}`, {
            width: 410,
            align: 'left',
            align: 'justify',
            fontSize: 12,
            lineGap: 3
          }
          )
          
          //doc
          doc.moveDown(0.5);
          doc.font('Times-Roman').text('WORD COUNT: ', {
            continued: true,
            //align: 'left',
            //align: 'justify',
            fontSize: 12,
            //lineGap: 3
            //underline: true
          }
          ).font('Times-Roman').text(` The resume contains ${wcn} words (approx.). ${msg}`, {
            width: 410,
            align: 'left',
            align: 'justify',
            fontSize: 12,
            lineGap: 3
          }
          )
          
          //doc

         
       
          
          //doc

          doc.moveDown(0.5);
          var dorem ='Having a professional LinkedIn profile will signifcantly improve your chances of getting an interview.'
          doc.font('Times-Roman').text('SOCIAL LINKS: ', {
            continued: true,
            //align: 'left',
            //align: 'justify',
            fontSize: 12,
            //lineGap: 3
            //underline: true
          }
          ).font('Times-Roman').text(` ${lgn} ${dorem}`, {
            width: 410,
            align: 'left',
            align: 'justify',
            fontSize: 12,
            lineGap: 3
          }
          )
          
          //doc
          doc.moveDown(0.5);
          var S ='Using the right verbs, adjectives and adverbs will help boost the quality and grammatical makeup of sentences. Try to use British English when constructing words and always add the full meaning of abbreviations. Having a resume devoid of grammatical errors will prevent it from getting flagged by ATS.'
          doc.font('Times-Roman').text('GRAMMAR CHECK: ', {
            continued: true,
            //align: 'left',
            //align: 'justify',
            fontSize: 12,
            //lineGap: 3
            //underline: true
          }
          ).font('Times-Roman').text(` ${spl} ${S}`, {
            width: 410,
            align: 'left',
            align: 'justify',
            fontSize: 12,
            lineGap: 3
          }
          )
          
          //doc

          doc.moveDown(0.5);
          var rvp = 'A well-organized resume that includes the appropriate elements and information can get a hiring manager\'s attention and help you earn a job interview.'
          doc.font('Times-Roman').text('REQUIRED SECTIONS: ', {
            continued: true,
            //align: 'left',
            //align: 'justify',
            fontSize: 12,
            //lineGap: 3
            //underline: true
          }
          ).font('Times-Roman').text(` ${rpg} ${rvp}`, {
            width: 410,
            align: 'left',
            align: 'justify',
            fontSize: 12,
            lineGap: 3
          }
          )
           
          var avp =`Your ATS score is ${finalscore}%. A score of 80% or higher moves your file to the next stage in the recruitment process. ATS looks for, and awards percentage points to sepcific instances of a word and in specific amounts.`
          doc.moveDown(0.5);
          doc.font('Times-Bold').text('ATS: ', {
            continued: true,
            //align: 'left',
            //align: 'justify',
            fontSize: 12,
            //lineGap: 3
            //underline: true
          }
          ).font('Times-Roman').text(`${apg} ${avp}`, {
            width: 410,
            align: 'left',
            align: 'justify',
            fontSize: 12,
            lineGap: 3
          }
          )
           
          //doc.font('Times-Roman')

          
         
          doc.pipe(fs.createWriteStream(`${filename}.pdf`));
          doc.end();

         }

       
        //resume review report
        //resume reviewed under the underlisted parameters 
     
       
}

//pdf(txt3)
module.exports = pdf
