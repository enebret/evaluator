const PDFDocument = require('pdfkit');
const fs = require('fs');
var PdfPrinter = require('pdfmake');
const path = require('path');
var filesize = require('file-size');


const txt = './HARRY AKHALUODE CV.txt';
const docxFile = 'c:/Users/LENOVO/Downloads/HARRY AKHALUODE CV.docx';
const txt2 = './E.I.O.txt'
const { textTransform } = require('text-transform');
const doc = path.resolve(__dirname+'/evaluator-be/HARRY AKHALUODE CV.docx');
//var g = {a: path.join(__dirname, 'fonts/roboto.regular.ttf'), b: path.join(__dirname, 'fonts/roboto.medium.ttf'), c: path.join(__dirname, 'fonts/roboto.italic.ttf'), d: path.join(__dirname, 'fonts/roboto.medium-italic.ttf')}
  
let pdf = function (x) {
        const data = fs.readFileSync(x, 'utf8');
        var split = data.split('\n');
        let title = textTransform(split[0].slice(0, split[0].length-2), 'uppercase');
        var lt = split[1].length - 3;
        var filename = path.basename(x, '.txt');
        var filesize = split[2].slice(Number(split[2].indexOf(':'))+2, split[2].length)
        var wordcount = split[7].slice(11, split[7].length)
        var pages = split[8].slice(Number(split[8].indexOf(':'))+2, split[8].length);
      
       //console.log(filesize)
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
              {text: 'The common file size limit for website uploads is under 2 mB. If your resume is too large, we recommend removingany custom background images or formatting elements as you did, or resolving it in a different format setting that will allow for file compression.'},
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

       
          
     
        //console.log(`${filename}.pdf`)
        /*let pdfDoc = new PDFDocument;
        pdfDoc.pipe(fs.createWriteStream(`${filename}.pdf`));
        pdfDoc.text(`${filesize}`)
        //check if filename equals fullname extracted from db/url param/form data
        if(filename){
          let text1 = `File Name`;
          let text2 = `Your resume file is named ${filename}.`
          let text3 = 
          `It is a good practice to have your first and last name 
           in the file name of your resume. Email clients can mark generic 
           file names as suspicious. Adding your name ensures your resume 
           will be found easy and assigned to the right application.`
          pdfDoc.font('Times-Bold').fontSize(14).text(`${text1}`).moveDown(0.5);
          let textarray = [text2, text3]
          textarray.forEach ((x)=>{
           pdfDoc.font('Times-Roman').fontSize(14).text(`${x}`).moveDown(0.5)
        

         })
   
        };
        /*if(filesize && filesize.slice(filesize.length-2, filesize.length)=='mB' && parseInt(filesize.slice(0, filesize.length-2))>2){
            let text1, text2, text3, text4;
            text1 = `File Size`;
            text2 = `Your resume file size is ${filesize}.`;
            text3 = `This is not within the recommended file size and may cause problems`
            text4 = `The common file size limit for website uploads is 
                      under 2mB. If your resume is too large, we recommend removing
                      any custom background images or formatting elements as you did, 
                    or resolving it in a different format setting that will allow 
                      for file compression.
            `
            pdfDoc.font('Times-Bold').fontSize(14).text(`${text1}`).moveDown(0.5);
            let textarray = [text2, text3, text4]
             textarray.forEach ((x)=>{
              pdfDoc.font('Times-Roman').fontSize(14).text(`${x}`).moveDown(0.5)
             

            })
        } else {
          let text1, text2, text3, text4;
          text1 = `File Size`;
          text2 = `Your resume file size is ${filesize}.`;
          text3 = `Great! This is within the recommended size and may avoid upload problems.`
          text4 = `The common file size limit for website uploads is 
                    under 2mB. If your resume is too large, we recommend removing 
                    any custom background images or formatting elements as you did, 
                    or resolving it in a different format setting that will allow 
                    for file compression.
          `
          pdfDoc.font('Times-Bold').fontSize(14).text(`${text1}`).moveDown(0.5);
          let textarray = [text2, text3, text4]
          textarray.forEach ((x)=>{
            pdfDoc.font('Times-Roman').fontSize(14).text(`${x}`).moveDown(0.5)
           

          })
        };

        if(wordcount && parseInt(wordcount)< 400 || parseInt(wordcount)>800){
          let text1, text2, text3, text4;
          text1 = `Word Count`;
          text2 = `Your resume contains ${wordcount} words.`;
          text3 = `Try to add more content and sections to make it better.`
          text4 = `This is the number of words we found in
                  your resume. Try to keep it between 400 and 800 words.
                  Generally, over 800 words is considered too long a resume.
                  (more than 2 pages or too crammed), and less than 400 words
                  is too short or empty.
          `
          pdfDoc.font('Times-Bold').fontSize(14).text(`${text1}`).moveDown(0.5);
          let textarray = [text2, text3, text4]
          textarray.forEach ((x)=>{
            pdfDoc.font('Times-Roman').fontSize(14).text(`${x}`).moveDown(0.5)
          

          });
        } else if (wordcount) {
          let text1, text2, text3, text4;
          text1 = `Word Count`;
          text2 = `Your resume contains ${wordcount} words.`;
          //text3 = `Try to add more content and sections to make it better.`
          text3 = `This is the number of words we found in
                  your resume. Try to always keep it between 400 and 800 words.
                  Generally, over 800 words is considered too long a resume.
                  (more than 2 pages or too crammed), and less than 400 words
                  is too short or empty.
          `
          pdfDoc.font('Times-Bold').fontSize(14).text(`${text1}`).moveDown(0.5);
          let textarray = [text2, text3]
          textarray.forEach ((x)=>{
            pdfDoc.font('Times-Roman').fontSize(14).text(`${x}`).moveDown(0.5)
           

          });
        }

        if(pages && parseInt(pages)===1){
          let text1, text2, text3, text4;
          text1 = `Page Count`;
          text2 = `Your resume is one page long.`;
          text3 = `Great! This is the recommended page count for a 
          resume of your years of experience.`
          text4 = `It is important to nail the right resume length. 
                  More than two pages and the recruiter won't read through 
                  your resume, whereas, if it is too short, it will 
                  undersell you.
          `
          pdfDoc.font('Times-Bold').fontSize(14).text(`${text1}`).moveDown(0.5);
          let textarray = [text2, text3, text4]
          textarray.forEach ((x)=>{
            pdfDoc.font('Times-Roman').fontSize(14).text(`${x}`).moveDown(0.5)
          

          });
        }

        if(pages && parseInt(pages)===2){
          let text1, text2, text3, text4;
          text1 = `Page Count`;
          text2 = `Your resume is two pages long.`;
          text3 = `Great! This is one page longer than the recommended page count 
          for a resume of your years of experience.`
          text4 = `It is important to nail the right resume length. More 
                   than two pages and the recruiter won't read through your resume,
                   whereas, if it is too short, it will undersell you.
          `
          pdfDoc.font('Times-Bold').fontSize(14).text(`${text1}`).moveDown(0.5);
          let textarray = [text2, text3, text4]
          textarray.forEach ((x)=>{
            pdfDoc.font('Times-Roman').fontSize(14).text(`${x}`).moveDown(0.5)
           

          });
        }

        if(pages && parseInt(pages)>2){
          let text1, text2, text3, text4;
          text1 = `Page Count`;
          text2 = `Your resume is ${pages} pages long.`;
          text3 = `Great! This is longer than the recommended page count 
                   for a resume of your years of experience.`
          text4 = `It is important to nail the right resume length.
                   More than two pages and the recruiter won't read through 
                   your resume, whereas, if it is too short, it will 
                   undersell you.
          `
          pdfDoc.font('Times-Bold').fontSize(14).text(`${text1}`).moveDown(0.5);
          let textarray = [text2, text3, text4]
          textarray.forEach ((x)=>{
            pdfDoc.font('Times-Roman').fontSize(14).text(`${x}`).moveDown(0.5)
           
          });
        }
        
        pdfDoc.end();
        /*setTimeout(() => {
            fs.unlinkSync('./SampleDocument.pdf');
            console.log("File removed:", 'SampleDocument.pdf');
          }, 60000);*/
     


}

pdf(txt)
//module.exports = pdf
