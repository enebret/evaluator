const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const port = 3000
const multer = require('multer');
const upload = multer({dest:'uploads/'}).single("demo_file");
var fileupload = require('fileupload').createFileUpload('/uploadDir').middleware
const fileUpload = require('express-fileupload');

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
    uploadPath = __dirname + '/up' + sampleFile.name;
  
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function(err) {
      if (err)
        return res.status(500).send(err);
  
      res.send('File uploaded!');
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
  console.log(`Example app listening on port at url http://localhost:${port}`)
})