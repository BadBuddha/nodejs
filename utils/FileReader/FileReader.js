var fs = require('fs');

var File = function() {
};

File.prototype.setFileName = function(filename){
    this.filename = filename;
};

File.prototype.getContents = function(req, res){
    fs.readFile(this.filename, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        res(data);
    });
};

exports.File = new File();
