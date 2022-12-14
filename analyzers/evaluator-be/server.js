  const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const port = 3005
var cors = require('cors')
const ld = require('../main.js');
let pc = path.resolve('searchfile.js');
let c = path.resolve('config/db');
const moveF = require(pc);
const connectDB = require(c);
const User = require('./models/user');
const fileUpload = require('express-fileupload');

const rateLimit = require('express-rate-limit');

connectDB();
const limits = rateLimit({
  //30 * 60 * 1000, // 30 minutes
  windowMs: 4 * 60 * 1000, // 30 minutes
  max: 1,
  delayMs: 240000, // disabled
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, 
});

app.use(fileUpload());
app.use(cors());
app.use('/upload', limits);

app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.post('/upload', function(req, res) {
  
let name = req.body.name;
let email = req.body.email;

  console.log(req.body.name)
  console.log(req.body.email)

  var myData = new User(req.body);
  myData.save()
  .then(item => {
  res.send("user data saved to database");
  })
  .catch(err => {
  res.status(400).send("unable to save to database");
  });
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
           }, 45000);
        }
      })
    
    })
      }, 10000);
    });
    lock = false;
  });

  app.get('/download', function(req, res){
    const yf = path.resolve(__dirname, '..', '..');
    fs.readdir(yf, (err, files) => {
    files.forEach(file=>{
    if(path.extname(file)=='.pdf'){
      let op = path.resolve(file)
        res.download(op, function(error){
        console.log("Error : ", error)
              })
              //res.send('sent file!')
          }
        })
      });
    })
    



app.listen(port, () => {
  //at url http://localhost:
  console.log(`app listening on port ${port}`)
})