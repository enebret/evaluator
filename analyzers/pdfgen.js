const PDFDocument = require('pdfkit');
const fs = require('fs');
const txt = './HARRY AKHALUODE CV.txt'
const { textTransform } = require('text-transform');

let pdf = async function (x) {
    
    try {
        const data = fs.readFileSync(x, 'utf8');
        let split = data.split('\n');
        //let title = textTransform(split[0].slice(0, split[0].length-2), 'uppercase');
        let lt = split[1].length - 3
        let filename = textTransform(split[1].slice(0, lt), 'uppercase');
        let filesize = split[2].slice(10, split[0].length-2);
        let wordcount = split[6].slice(17, split[0].length-2);
        let pages = split[7].slice(17, split[0].length-2);
        //console.log(`${filename}`+'.pdf')
        let pdfDoc = new PDFDocument;
        pdfDoc.pipe(fs.createWriteStream(`${filename}`+'.pdf'));
        pdfDoc.font('Times-Bold').fontSize(16).text(`CV REVIEW FOR ${filename}`);
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
        if(filesize && filesize.slice(filesize.length-2, filesize.length)=='mB' && parseInt(filesize.slice(0, filesize.length-2))>2){
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
      } catch (err) {
        console.error(err);
      }


}

//pdf(txt)
module.exports = pdf
