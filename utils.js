var parse = require('csv-parse');
const fs = require('fs');

class Utils {
    parser(filepath){
        return new Promise(function(resolve, reject) {
            const results = [];
            fs.createReadStream( __dirname + filepath)
            .pipe(parse({delimiter: ';'}))
            .on('data', function(csvrow) {
               results.push([csvrow[10].replace(/\s/g,'') , csvrow[4]]);
            }).on('end', () => {
                resolve(results)
            })
          });
    }
}

module.exports = new Utils();