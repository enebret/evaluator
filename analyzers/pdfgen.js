const PDFDocument = require('pdfkit');
const fs = require('fs');
const txt = './HARRY AKHALUODE CV.txt'
const { textTransform } = require('text-transform');

let pdf = async function (x) {
    
    try {
        const data = fs.readFileSync(x, 'utf8');
        let split = data.split('\n');
        let title = textTransform(split[0].slice(0, split[0].length-2), 'uppercase');
        let lt = split[1].length - 3
        let filename = textTransform(split[1].slice(0, lt), 'title');
        let filesize = split[2].slice(10, split[0].length-2);
        let wordcount = split[6].slice(17, split[0].length-2);
        let pages = split[7].slice(17, split[0].length-2);
        //console.log(parseInt(pages))
        let pdfDoc = new PDFDocument;
        pdfDoc.pipe(fs.createWriteStream('SampleDocument.pdf'));
        pdfDoc.fontSize(16).text(`${title}`).font('Courier-Bold');
        //check if filename equals fullname extracted from db/url param/form data
        if(filename){
          let text = `
           It is a good practice
           to have your first and last name 
           in the filename of your resume.
           Email clients can mark generic 
           filenames as suspicious. Adding
           your name ensures your resume 
           will be found easy and assigned 
           to the right application.
          `
          pdfDoc.fontSize(14).text('FILE NAME');
          pdfDoc.fontSize(13).text(`Your resume filename is ${filename}`);
          pdfDoc.fontSize(11).text(`${text}`);
        };
        if(filesize && filesize.slice(filesize.length-2, filesize.length)=='mB' && parseInt(filesize.slice(0, filesize.length-2))>2){
            let text1, text2, text3, text4;
            text1 = `File Size`;
            text2 = `Your resume file size is ${filesize}`;
            text3 = `This is not within the recommended file size and may cause problems`
            text4 = `The common file size limit for
            website uploads is under 2mB. If your 
            resume is too large, we recommend removing
            any custom background images or formatting 
            elements as you did, or resolving it in a different
            format setting that will allow for file compression.
            `
            let textarray = [text1, text2, text3, text4]
             textarray.forEach ((x)=>{
              pdfDoc.fontSize(14).text(`${x}`).moveDown(0.5)
              /*if(x[0]){
                pdfDoc.fontSize(14).text(`${x[0]}`).moveDown(0.5)
              }else if (x[1]) {
                pdfDoc.fontSize(13).text(`${x[1]}`).moveDown(0.5)
              } else if (x[2]) {
                pdfDoc.fontSize(14).text(`${x[2]}`).moveDown(0.5)
              } else if (x[3]) {
                pdfDoc.fontSize(12).text(`${x[3]}`).moveDown(0.5)
              }*/

            })
        } else {
          let text1, text2, text3, text4;
          text1 = `File Size`;
          text2 = `Your resume file size is ${filesize}`;
          text3 = `Great! This is within the recommended size and may avoid upload problems.`
          text4 = `The common file size limit for
          website uploads is under 2mB. If your 
          resume is too large, we recommend removing
          any custom background images or formatting 
          elements as you did, or resolving it in a different
          format setting that will allow for file compression.
          `
          let textarray = [text1, text2, text3, text4]
          textarray.forEach ((x)=>{
            pdfDoc.fontSize(14).text(`${x}`).moveDown(0.5)
            /*if (x[0]){
              pdfDoc.fontSize(14).text(`${x[0]}`).moveDown(0.5)
            }else if (x[1]) {
              pdfDoc.fontSize(13).text(`${x[1]}`).moveDown(0.5)
            } else if (x[2]) {
              pdfDoc.fontSize(14).text(`${x[2]}`).moveDown(0.5)
            } else if (x[3]) {
              pdfDoc.fontSize(12).text(`${x[3]}`).moveDown(0.5)
            }*/

          })
        };

        /*if(wordcount && parseInt(wordcount)< 400 || parseInt(wordcount)>800){
          let text1, text2, text3, text4;
          text1 = `Word Count`;
          text2 = `Your resume contains ${wordcount} words`;
          text3 = `Try to add more content and sections to make it better.`
          text4 = `This is the number of words we found in
          your resume. Try to keep it between 400 and 800 words.
          Generally, over 800 words is considered too long a resume.
          (more than 2 pages or too crammed), and less than 400 words
          is too short or empty.
          `
          let textarray = [text1, text2, text3, text4]
          textarray.forEach ((x)=>{
            if(x[0]){
              pdfDoc.fontSize(14).text(`${x[0]}`).moveDown(0.5)
            }else if (x[1]) {
              pdfDoc.fontSize(13).text(`${x[1]}`).moveDown(0.5)
            } else if (x[2]) {
              pdfDoc.fontSize(14).text(`${x[2]}`).moveDown(0.5)
            } else if (x[3]) {
              pdfDoc.fontSize(12).text(`${x[3]}`).moveDown(0.5)
            }

          });
        } else if (wordcount) {
          let text1, text2, text3, text4;
          text1 = `Word Count`;
          text2 = `Your resume contains ${wordcount} words`;
          //text3 = `Try to add more content and sections to make it better.`
          text3 = `This is the number of words we found in
          your resume. Try to always keep it between 400 and 800 words.
          Generally, over 800 words is considered too long a resume.
          (more than 2 pages or too crammed), and less than 400 words
          is too short or empty.
          `
          let textarray = [text1, text2, text3]
          textarray.forEach ((x)=>{
            if(x[0]){
              pdfDoc.fontSize(14).text(`${x[0]}`).moveDown(0.5)
            }else if (x[1]) {
              pdfDoc.fontSize(13).text(`${x[1]}`).moveDown(0.5)
            } else if (x[2]) {
              pdfDoc.fontSize(14).text(`${x[2]}`).moveDown(0.5)
            }

          });
        }

        if(pages && parseInt(pages)===1){
          let text1, text2, text3, text4;
          text1 = `Page Count`;
          text2 = `Your resume is one page long`;
          text3 = `Great! This is the recommended page count 
          for a resume of your years of experience.`
          text4 = `It is important to nail the right 
          resume length. More than two pages and the 
          recruiter won't read through your resume,
          whereas, if it is too short, it will 
          undersell you.
          `
          let textarray = [text1, text2, text3, text4]
          textarray.forEach ((x)=>{
            if(x[0]){
              pdfDoc.fontSize(14).text(`${x[0]}`).moveDown(0.5)
            }else if (x[1]) {
              pdfDoc.fontSize(13).text(`${x[1]}`).moveDown(0.5)
            } else if (x[2]) {
              pdfDoc.fontSize(14).text(`${x[2]}`).moveDown(0.5)
            } else if (x[3]) {
              pdfDoc.fontSize(12).text(`${x[3]}`).moveDown(0.5)
            }

          });
        }

        if(pages && parseInt(pages)===2){
          let text1, text2, text3, text4;
          text1 = `Page Count`;
          text2 = `Your resume is two pages long`;
          text3 = `Great! This is one page longer than the recommended page count 
          for a resume of your years of experience.`
          text4 = `It is important to nail the right 
          resume length. More than two pages and the 
          recruiter won't read through your resume,
          whereas, if it is too short, it will 
          undersell you.
          `
          let textarray = [text1, text2, text3, text4]
          textarray.forEach ((x)=>{
            if(x[0]){
              pdfDoc.fontSize(14).text(`${x[0]}`).moveDown(0.5)
            }else if (x[1]) {
              pdfDoc.fontSize(13).text(`${x[1]}`).moveDown(0.5)
            } else if (x[2]) {
              pdfDoc.fontSize(14).text(`${x[2]}`).moveDown(0.5)
            } else if (x[3]) {
              pdfDoc.fontSize(12).text(`${x[3]}`).moveDown(0.5)
            }

          });
        }

        if(pages && parseInt(pages)>2){
          let text1, text2, text3, text4;
          text1 = `Page Count`;
          text2 = `Your resume is ${pages} long`;
          text3 = `Great! This is longer than the recommended page count 
          for a resume of your years of experience.`
          text4 = `It is important to nail the right 
          resume length. More than two pages and the 
          recruiter won't read through your resume,
          whereas, if it is too short, it will 
          undersell you.
          `
          let textarray = [text1, text2, text3, text4]
          textarray.forEach ((x)=>{
            if(x[0]){
              pdfDoc.fontSize(14).text(`${x[0]}`).moveDown(0.5)
            }else if (x[1]) {
              pdfDoc.fontSize(13).text(`${x[1]}`).moveDown(0.5)
            } else if (x[2]) {
              pdfDoc.fontSize(14).text(`${x[2]}`).moveDown(0.5)
            } else if (x[3]) {
              pdfDoc.fontSize(12).text(`${x[3]}`).moveDown(0.5)
            }

          });
        }*/


        //+++++++++++9++console.log(filesize.slice(0, filesize.length-4))
        pdfDoc.end();
        /*setTimeout(() => {
            fs.unlinkSync('./SampleDocument.pdf');
            console.log("File removed:", 'SampleDocument.pdf');
          }, 60000);*/
      } catch (err) {
        console.error(err);
      }


}

pdf(txt)
