const PDFDocument = require('pdfkit');
const fs = require('fs');
var PdfPrinter = require('pdfmake');
const path = require('path');
var filesize = require('file-size');


const txt = './HARRY AKHALUODE CV.txt';
const docxFile = 'c:/Users/LENOVO/Downloads/HARRY AKHALUODE CV.docx';
const txt2 = './E.I.O.txt';

const { textTransform } = require('text-transform');

//var g = {a: path.join(__dirname, 'fonts/roboto.regular.ttf'), b: path.join(__dirname, 'fonts/roboto.medium.ttf'), c: path.join(__dirname, 'fonts/roboto.italic.ttf'), d: path.join(__dirname, 'fonts/roboto.medium-italic.ttf')}
  
let pdf = function (x) {
        const data = fs.readFileSync(x, 'utf8');
        var split = data.split('\n');
        let title = textTransform(split[0].slice(0, split[0].length-2), 'uppercase');
        var lt = split[1].length - 3;
        var filename = path.basename(x, '.txt');
        //var filesize = split[2].slice(Number(split[2].indexOf(':'))+2, split[2].length)
        //var wordcount = split[7].slice(11, split[7].length)
        //var pages = split[6].slice(Number(split[6].indexOf(':'))+2, split[6].length);
        let [sp, pg, wc, ...rest] = split.reverse();
        var pages;
        var wordcount;
        var filesize;
        [pg, wc].forEach(x=>{
          if (x.indexOf('w')==0) {
            //console.log(x);
            wordcount = x;
          } else if (x.indexOf('p')==0) {
            //console.log(x)
            pages = x;
          }
        });
        [...rest].forEach(x=>{
          if(x.indexOf('s')==0){
            filesize = x;
          }
        })
      
         if(filename){
          var fonts = {
            Roboto: {
              normal: path.join(__dirname, 'fonts/roboto.regular.ttf'),
              bold: path.join(__dirname, 'fonts/roboto.medium.ttf'),
              italics: path.join(__dirname, 'fonts/roboto.italic.ttf'),
              bolditalics: path.join(__dirname, 'fonts/roboto.medium-italic.ttf')
            }
          };
          
         
          var printer = new PdfPrinter(fonts);
          var msg;
          var psg;
          var sg = filesize.slice(filesize.length-2, filesize.length);
          var sgn;
          let wcn = Number((wordcount.slice(Number(wordcount.indexOf(':'))+2, wordcount.length)));
          let pgn = Number(pages.slice(Number(pages.indexOf(':'))+2, pages.length));
          wcn < 400? (msg = 'Your wordcount is below the recommended number. Try to elaborate more on achievements and past experience.') : wcn < 600? (msg = 'Your wordcount falls within the recommended range.') : (msg = 'Your wordcount exceeds the recommended range. Try to summarize your experiences and achievements.')
          pgn === 1 ? (psg = 'Your resume is 1 page long. This maybe too short. Try to make it 2 pages.') : pgn === 2 ? (psg = 'Your resume is 2 pages long which is the recommended number of pages required in a standard resume.') : (psg = 'Your resume exceeds the recommended number of pages required.Try to use each page more efficiently. You can use our CV services to achieve this in approx. 2 minutes. No registration required.')
          sg == 'kB'? (sgn = 'Your resume falls within the recommended size estimate.') : (sgn = 'Your file is too large. We recommend removing any custom background images or formatting elements as you did, or resolving it in a different format setting that will allow for file compression.')
          var docDefinition = {
            content: [
              //maybe use ternaries here
              {text: 'File Name', style: 'header'},
              {text: `Your resume file is named ${filename}.`},
              {text: 'It is a good practice to have your first and last name in the file name of your resume. Email clients can mark generic file names as suspicious. Adding your name ensures your resume will be found easily and assigned to the right application.'},
              {text: 'File Size', style: 'header'},
              {text: `Your resume file size is ${filesize}.`},
              {text: `${sgn}`},
              {text: 'Word Count', style: 'header'},
              {text: `Your resume contains ${wcn} words (approx.)`},
              {text: `${msg}`},
              {text: 'Page Count', style: 'header'},
              {text: `${psg}`},
              {text: 'It is important to nail the right resume length. More than 2 pages and the recruiter will not read through your resume, whereas, if it is too short, it will undersell you.'}

            ],
            styles: {
              header: {
                fontSize: 16,
                bold: true
              }
            }
          };
          
          
          
          var pdfDoc = printer.createPdfKitDocument(docDefinition);
          pdfDoc.pipe(fs.createWriteStream(`${filename}.pdf`));
          pdfDoc.end();
  
         }

       
          
     
       
}

//pdf(txt)
module.exports = pdf
