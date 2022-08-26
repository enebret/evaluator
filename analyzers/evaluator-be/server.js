  const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const port = 3005
var cors = require('cors')
const ld = require('../main.js');
let pc = path.resolve('searchfile.js')
const moveF = require(pc);
const fileUpload = require('express-fileupload');
const testFile = 'c:/Users/LENOVO/Documents/E.I.O.pdf';





/*const yf = path.resolve(__dirname, '..', '..')+ '/searchfile.js';
console.log(path.resolve('searchfile.js') )*/

app.use(fileUpload());
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/upload', function(req, res) {
  console.log(req.body.name)
  console.log(req.body.email)
  //console.log(req.body)
  //res.send('file uploaded');
    let sampleFile;
    let uploadPath;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    
    sampleFile = req.files.file;
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

  app.get('/download', function(req, res){
    const yf = path.resolve(__dirname, 20, '..');
    fs.readdir(yf, (err, files) => {
    files.forEach(file=>{
    if(path.extname(file)=='.pdf'){
      let op = path.resolve(file)
        res.download(op, function(error){
        console.log("Error : ", error)
              })
          }
        })
      });
    })
    
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