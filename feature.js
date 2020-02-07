const cleaner = require('./cleaner');
const utils = require('./utils');
const fs = require('fs');
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
              fs.readdir('./clean-dataset/' +element.replace(/\s/g,'_').toLowerCase(), function (err, files) {
                  //handling error
                  if (err) {
                  consola.error('Unable to scan directory')
                      return console.log('Unable to scan directory: ' + err);
                  } 
                  // listing all files using forEach
                
                  files.forEach((file)  => {
                
                      if(path.extname(file) == '.jpg'){
                          let img = []
                          let pattt = __dirname +'/clean-dataset/'+ element.replace(/\s/g,'_').toLowerCase() + '/'+ file;
                          if(fs.existsSync(pattt)){
                              j++;
                            getPixels(pattt, (err, pixels)  => {
                              if(err) {
                                
                              }
                              for (let y = 0; y < pixels.shape[1]; y++) {
                                   let xarr = []
                                for (let x = 0; x < pixels.shape[0]; x++) {
                                
                                  const r = pixels.get(x, y, 0);
                                  const g = pixels.get(x, y, 1);
                                  const b = pixels.get(x, y, 2);
                                  const rgba = (r + g + b)/ (3*255);
                                  xarr.push(rgba)
                                }
                                img.push(xarr);
                              } 
                              imagesInDirectoryImage.push(img);
                              imagesInDirectoryLabel.push(element.indexOf())

                      });
                      };
                      };
                  });
              });
          });
          console.log(imagesInDirectoryImage);

        });
        
      return { images: tf.tensor4d(imagesInDirectoryImage, [imagesInDirectoryImage.length, 150, 150, 1]),
        labels: tf.oneHot(tf.tensor1d(imagesInDirectoryLabel, 'int32'), imagesInDirectoryLabel.length).toFloat()
        };
    
    }
}
    

module.exports = new Feature();