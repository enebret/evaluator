  const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const port = 3000
const ld = require('../main.js');
let pc = path.resolve('searchfile.js')
const moveF = require(pc);
const fileUpload = require('express-fileupload');
const testFile = 'c:/Users/LENOVO/Documents/E.I.O.pdf';

/*fs.readdir(__dirname, (err, files) => {

files.forEach(file=>{
  if(path.extname(file)=='.pdf' || path.extname(file)=='.docx'){
      ;
      console.log(path.resolve(__dirname+'/'+file))
 
  }
})

});*/

/*const yf = path.resolve(__dirname, '..', '..')+ '/searchfile.js';
console.log(path.resolve('searchfile.js') )*/

app.use(fileUpload());
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', function(req, res) {
    let sampleFile;
    let uploadPath;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.demo_file;
    uploadPath =  sampleFile.name
  ///sampleFile.name;
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function(err) {
      if (err)
        return res.status(500).send(err);
  
      res.send('File uploaded!');
      moveF();
      setTimeout(() => {
        fs.readdir(__dirname, (err, files) => {
          files.forEach(file=>{
          if(path.extname(file)=='.pdf' || path.extname(file)=='.docx'){
          let p = path.resolve(__dirname+'/'+file);
          ld(p);
           setTimeout(() => {
            fs.unlinkSync(p);
            console.log("file removed.");
           }, 50000);
        }
      })
    
    })
      }, 10000);
    });
  });

/*app.post("/", (req, res) => {
    upload(req, res, (err) => {
     if(err) {
       res.status(400).send("Something went wrong!");
     }
     res.send(req.file);
     const file  = req.file;
     fs.writeFileSync('some.pdf', req.file)
   });
 });*/


app.listen(port, () => {
  console.log(`app listening on port at url http://localhost:${port}`)
})