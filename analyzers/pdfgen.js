const PDFDocument = require('pdfkit');
const doc = new PDFDocument;
const fs = require('fs');
const moment = require('moment');
const path = require('path');
const dc = moment().format('MMMM Do YYYY, h:mm:ss a')
const txt = './SALAHU AHMED CV-3 (1).txt';
const docxFile = 'c:/Users/LENOVO/Downloads/HARRY AKHALUODE CV.docx';
const txt2 = './E.I.O.txt';

const { textTransform } = require('text-transform');

  
let pdf = function (x) {
        const data = fs.readFileSync(x, 'utf8');
        var split = data.split('\n');
        let title = textTransform(split[0].slice(0, split[0].length-2), 'uppercase');
        var lt = split[1].length - 3;
        var filename = path.basename(x, '.txt');
        //var filesize = split[2].slice(Number(split[2].indexOf(':'))+2, split[2].length)
        //var wordcount = split[7].slice(11, split[7].length)
        //var pages = split[6].slice(Number(split[6].indexOf(':'))+2, split[6].length);
        let [sp, pg, wc, lp, ...rest] = split.reverse();
        var pages;
        var wordcount;
        var filesize;
        var LinkedIn;
        [pg, wc, lp].forEach(x=>{
          if (x.indexOf('w')==0) {
            //console.log(x);
            wordcount = x;
          } else if (x.indexOf('p')==0) {
            //console.log(x)
            pages = x;
          } else if (x.indexOf('L')==0) {
            LinkedIn = x;
          }
        });
        [...rest].forEach(x=>{
          if(x.indexOf('s')==0){
            filesize = x;
          }
        })
        
        
         if(filename){
        
          //var printer = new PdfPrinter(fonts);
          var msg;
          var psg;
          var lgn;
          var lkn = (LinkedIn.slice(Number(LinkedIn.indexOf(':'))+2, LinkedIn.length))
          var sg = filesize.slice(filesize.length-2, filesize.length);
          var sgq = filesize.slice(Number(filesize.indexOf(':')+2, filesize.length));
          var sgn;
          let wcn = Number((wordcount.slice(Number(wordcount.indexOf(':'))+2, wordcount.length)));
          let pgn = Number(pages.slice(Number(pages.indexOf(':'))+2, pages.length));
          wcn < 400? (msg = 'The total word-count of your resume accessed falls below the recommended number. Try to elaborate more on achievements and past experience.') : wcn < 600? (msg = 'The total word-count accessed falls within the recommended range.') : (msg = 'The total word-count exceeds the recommended range. Try to summarize your experiences and achievements.')
          pgn === 1 ? (psg = 'The resume is 1 page long. This maybe too short. Try to make it 2 pages.') : pgn === 2 ? (psg = 'The resume is 2 pages long which is the recommended number of pages required in a standard resume.') : (psg = 'The resume exceeds the recommended number of pages required.Try to use each page more efficiently. You can use our CV services to achieve this in approx. 2 minutes. No registration required.')
          sg == 'kB'? (sgn = 'The resume falls within the recommended size estimate.') : (sgn = 'The file is too large. We recommend removing any custom background images or formatting elements as you did, or resolving it in a different format setting that will allow for file compression.')
          lkn == 'No LinkedIn link found.'? (lgn = 'The resume file has no LinkedIn link.') : (lgn = 'The file contains a LinkedIn link.')
          doc.font('Times-Bold').text('FILE NAME', {
            width: 410,
            align: 'left',
            fontSize: 18,
            bold: true
          }
          )
          var lorem = 'It is a good practice to have your first and last name in the file name of your resume. Email clients can mark generic file names as suspicious. Adding your name ensures your resume will be found easily and assigned to the right application.'
          doc.font('Times-Roman').text(`The file is named ${filename}. ${lorem}`, {
            width: 410,
            align: 'left',
            align: 'justify',
            fontSize: 18
          }
          )
          doc.moveDown();
          doc.font('Times-Bold').text('FILE SIZE', {
            width: 410,
            align: 'left',
            fontSize: 18,
            bold: true
          }
          )
          var vorem = `Recorded file size is ${sgq}.`
          doc.font('Times-Roman').text(` ${vorem} ${sgn}`, {
            width: 410,
            align: 'left',
            align: 'justify',
            fontSize: 18
          }
          )
          doc.moveDown();
          doc.font('Times-Bold').text('WORD COUNT', {
            width: 410,
            align: 'left',
            fontSize: 18,
            bold: true
          }
          )
          
          doc.font('Times-Roman').text(` The resume contains ${wcn} words (approx.). ${msg}`, {
            width: 410,
            align: 'left',
            align: 'justify',
            fontSize: 18
          }
          )

          doc.moveDown();
          doc.font('Times-Bold').text('PAGE COUNT', {
            width: 410,
            align: 'left',
            fontSize: 18,
            bold: true
          }
          )
          var porem ='It is important to nail the right resume length. More than 2 pages and the recruiter will not read through your resume, whereas, if it is too short, it will undersell you.'
          doc.font('Times-Roman').text(` ${psg}${porem}`, {
            width: 410,
            align: 'left',
            align: 'justify',
            fontSize: 18
          }
          )

          doc.moveDown();
          doc.font('Times-Bold').text('SOCIAL LINKS', {
            width: 410,
            align: 'left',
            fontSize: 18,
            bold: true
          }
          )
          var dorem ='Having a professional LinkedIn profile will signifcantly improve your chances of getting an interview.'
          doc.font('Times-Roman').text(` ${lgn} ${dorem}`, {
            width: 410,
            align: 'left',
            align: 'justify',
            fontSize: 18
          }
          )

          doc.moveDown();
          let ln = 'Date of review:'
           doc.font('Times-Roman').fillColor('red').text(`${ln} ${dc}`, {
            width: 410,
            align: 'left',
            align: 'justify',
            fontSize: 12
          }
          )
          doc.pipe(fs.createWriteStream(`${filename}.pdf`));
          doc.end();

         }

       
          
     
       
}

pdf(txt)
//module.exports = pdf
