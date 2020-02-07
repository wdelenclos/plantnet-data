const cleaner = require('./cleaner');
const utils = require('./utils');
const fs = require('fs');
var jpeg          = require('jpeg-js')
var ndarray       = require('ndarray')
const path = require('path');
const getPixels = require('get-pixels');
const tf = require('@tensorflow/tfjs-node')

class Feature {
    getImages(){
        const imagesInDirectoryLabel = [];
        const imagesInDirectoryImage = [];
        const data = utils.parser('/dataset/Data/ImageCLEFF2013PlantTaskMasterFileFinal.csv');
        data.then((el) => {
            // Remove first el ...
            el.shift()
            consola.info('Generate matrix (please wait ...)')
            const classes = cleaner.getClasses(el);
            let j = 0
            classes.forEach(element => {
                // Generate images resized
                console.log(element);
                fs.readdirSync(__dirname+'/clean-dataset/' +element.replace(/\s/g,'_').toLowerCase()+'/').forEach(file => {
                    
                        if(path.extname(file) == '.jpg'){
                            let img = []
                            let pattt = __dirname +'/clean-dataset/'+ element.replace(/\s/g,'_').toLowerCase() + '/'+ file;
                            
                            var data = fs.readFileSync(pattt)
                              
                            var jpegData
                                try {
                                    jpegData = jpeg.decode(data)
                                }
                                catch(e) {
                                    console.log(e)
                                    return
                                }
                                if(!jpegData) {
                                    console.log(new Error("Error decoding jpeg"))
                                    return
                                }
                                var nshape = [ jpegData.height, jpegData.width, 4 ]
                                var result = ndarray(Uint8Array.from(jpegData.data), nshape)
                                
                                imagesInDirectoryImage.push(result.transpose(1,0));
                                imagesInDirectoryLabel.push(element.indexOf())
                        };
                 
                  });
        
              require('fs').writeFile(

                './my.json',
            
                JSON.stringify(imagesInDirectoryImage),
            
                function (err) {
                    if (err) {
                        console.error('Crap happens');
                    }
                }
            );
          });
          

        });
    
    }
}
    

module.exports = new Feature();