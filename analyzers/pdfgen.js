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
        var filesize = split[2].slice(Number(split[2].indexOf(':'))+2, split[2].length)
        var wordcount = split[7].slice(11, split[7].length)
        var pages = split[6].slice(Number(split[6].indexOf(':'))+2, split[6].length);
        console.log(wordcount)
    
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
        
          
          var docDefinition = {
            content: [
              //maybe use ternaries here
              {text: 'File Name', style: 'header'},
              {text: `Your resume file is named ${filename}.`},
              {text: 'It is a good practice to have your first and last name in the file name of your resume. Email clients can mark generic file names as suspicious. Adding your name ensures your resume will be found easy and assigned to the right application.'},
              {text: 'File Size', style: 'header'},
              {text: `Your resume file size is ${filesize}.`},
              {text: 'The common file size limit for website uploads is under 2 mB. If your resume is too large, we recommend removing any custom background images or formatting elements as you did, or resolving it in a different format setting that will allow for file compression.'},
              {text: 'Word Count', style: 'header'},
              {text: `Your resume contains ${wordcount} words.`},
              {text: 'This is the number of words we found in your resume. Try to always keep it between 400 and 800 words.Generally, over 800 words is considered too long a resume.(more than 2 pages or too crammed), and less than 400 words is too short or empty.'},
              {text: 'Page Count', style: 'header'},
              {text: `Your resume is ${pages} page/pages long.`},
              {text: 'It is important to nail the right resume length. More than two pages and the recruiter will not read through your resume, whereas, if it is too short, it will undersell you'}

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

//pdf(txt3)
module.exports = pdf
