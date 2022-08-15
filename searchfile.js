const fs = require('fs')
const path = require('path')
const directory = __dirname;

   let rename = function ()  {
    fs.readdir(directory, (err, files) => {
        /*let op = path.resolve(files[2])
        let np = __dirname + '/analyzers/evaluator-be/' + files[2]
            fs.rename(op, np, function (err) {
        if (err) throw err
        console.log('Successfully renamed - AKA moved!')
      })*/
      files.forEach(file=>{
        if(path.extname(file)=='.pdf' || path.extname(file)=='.docx'){
            console.log(file)
            let op = path.resolve(file)
        let np = __dirname + '/analyzers/evaluator-be/' + file
            fs.rename(op, np, function (err) {
        if (err) throw err
        console.log('Successfully renamed - AKA moved!')
      })
        }
      })
      
    });
   } 

module.exports = rename