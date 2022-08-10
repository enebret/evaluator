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
        //console.log(filename)
        let pdfDoc = new PDFDocument;
        pdfDoc.pipe(fs.createWriteStream('SampleDocument.pdf'));
        pdfDoc.fontSize(16).text(`${title}`, 200, 200);
        pdfDoc.end();
        setTimeout(() => {
            fs.unlinkSync('./SampleDocument.pdf');
            console.log("File removed:", 'SampleDocument.pdf');
          }, 60000);
      } catch (err) {
        console.error(err);
      }


}

pdf(txt)
