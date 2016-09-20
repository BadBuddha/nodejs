var fs = require('fs');

// Constuctor
function FileReader(filename){
    this.filename = filename;
    console.log("file to read : " + this.filename);
    // always initialize all instance properties
    console.log("here in FileReader !");
}

// export the FileReader class
module.exports = FileReader;
