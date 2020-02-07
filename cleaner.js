const consola = require('consola')
const fs = require('fs');
const sharp = require('sharp');
const utils = require('./utils');

class Cleaner {
    run(imageGeneration ){
        const data = utils.parser('/dataset/Data/ImageCLEFF2013PlantTaskMasterFileFinal.csv');
        data.then((el) => {
            consola.success(el.length + ' entires found in csv')
            // Remove first el ...
            el.shift()
            this.generateDirectory(el, imageGeneration);
        });
    }
    getClasses(entries){
        const classes = []
        entries.forEach(element => {
            if(classes.indexOf(element[1]) == -1){
                classes.push(element[1])
            }
        });
        return classes;
    }
    generateDirectory(entries,imageGeneration ){
        const classes =  this.getClasses(entries); 
        consola.success(classes.length + ' classes finded')
        consola.info('Generate finders ...')
        fs.mkdirSync('./clean-dataset', { recursive: true })
        consola.info('Copy and resize files for each classes (please wait ...)')
        if(imageGeneration){
        classes.forEach(el => {
            // create finded
            fs.mkdirSync('./clean-dataset/' + el.replace(/\s/g,'_').toLowerCase(), { recursive: true })
            // get related images
            let currentImages = entries.filter((element) => {
                return element[1] == el
            })
            currentImages.forEach((el) => {      
                    if (fs.existsSync('./dataset/Data/DetailledHtmlViewsOfDatasets/thumbs150/'+ el[0])) {
                        sharp('./dataset/Data/DetailledHtmlViewsOfDatasets/thumbs150/'+ el[0])
                        .resize(150, 150)
                        .toFormat('jpg')
                        .toFile('./clean-dataset/'+el[1].replace(/\s/g,'_') + '/' + el[0]);
                    }

            })
            currentImages.forEach((el) => { 
                if (fs.existsSync('./dataset/Data/DetailledHtmlViewsOfDatasets/thumbs150/'+ el[0])) {
                    sharp('./dataset/Data/DetailledHtmlViewsOfDatasets/thumbs150/'+ el[0])
                    .resize(150, 150)
                    .flip()
                    .toFormat('jpg')
                    .toFile('./clean-dataset/'+el[1].replace(/\s/g,'_') + '/' + 'flip_'+ el[0] );
                }
            })
            currentImages.forEach((el) => { 
                if (fs.existsSync('./dataset/Data/DetailledHtmlViewsOfDatasets/thumbs150/'+ el[0])) {
                    sharp('./dataset/Data/DetailledHtmlViewsOfDatasets/thumbs150/'+ el[0])
                    .resize(150, 150)
                    .rotate(90)
                    .toFormat('jpg')
                    .toFile('./clean-dataset/'+el[1].replace(/\s/g,'_') + '/' + 'rotate_'+ el[0] + '');
                }
            })
        });
        }
        consola.success('Finders generated');
        
    }
}

module.exports = new Cleaner();