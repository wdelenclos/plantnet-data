// Plantenet2  -- By Wladimir Delenclos / Hetic






// Import des modules
const cleaner = require('./cleaner')
const feature = require('./feature')
const model = require('./trainer')

const imageGeneration = true;
const epochs = 15;
const batchSize = 32;
const validationSplit = 0.15;
async function run(){

    // Nettoyage du Dataset
    console.clear();
    consola.info('---------- Cleaning dataset ------------')
    cleaner.run(imageGeneration);
    consola.success('------------ OK --------------');
    

    // Extraction des entités
    consola.info('---------- Extract entries ------------')
    extract = feature.getImages();

    consola.success('------------ OK --------------');
    

    // Entrainement du réseau
    
    consola.info('---------- Train dataset ------------')
    model.summary();
    model.fit(extract.images, extract.labels, {
        epochs,
        batchSize,
        validationSplit
    });
    consola.success('------------ OK --------------');
}


run();