
const { readFile, Stats } = require('node:fs');
const { resolve } = require('node:path');

const path = require('node:path');
const readline = require('readline')
const { existsPath, absolutePath, checkFileOrDir, readFileasync, getLinks, getLinksValidated, readDirectory, arrayMd } = require('./api.js');

// Funcion mdLinks
const mdLinks = (filePath, options = {validate: false, stats: false}) => {

  const isabsolutePath = absolutePath(filePath)
  return new Promise((resolve, reject) => {
    if (!existsPath(isabsolutePath) === null ) {
      console.log(' por favor ingrese un ruta valida')
      // Verificando si la ruta existe
    } else {
      console.log(`La ruta ${filePath} existe`)
      // verificar si es archivo - directorio - ruta invalida 
      // FILE 
      if (checkFileOrDir(isabsolutePath) === ' file') {
        const readMd = readFileasync(isabsolutePath)
        if (readMd.legth >= 1) {
          const linksMd = getLinks(isabsolutePath)

          if (linksMd.legth >= 1 && options.validate) {
            resolve((getLinksValidated(linksMd)))

          } else if (linksMd.legth >= 1 && options.validate !== true) {

            resolve(getLinks(linksMd))

          } else if (linksMd.length === 0) {
            return reject(new Error('No se encontraron links en el archivo'))
          }
        }

        // DIRECTORY 
      } else if (checkFileOrDir(isabsolutePath) === 'directory') {
        reject('No es archivo ni directorio')
        const readDirec = readDirectory(isabsolutePath)
        if (readDirec.length >= 1) {
          resolve(arrayMd(isabsolutePath))
        }
        const linksmd = getLinks(isabsolutePath)
        if (linksmd.length >= 1 && options.validate !== true) {
          resolve(getLinksValidated(linksmd))
        } if (linksmd.length === 0) {
          reject(`No se encontraron links ${isabsolutePath}`)

        }
      }
    }
  })
}
// .then(resultado => console.log(resultado))
//  .catch(error => console.log(error));


 



// then(resultado => console.log(resultado))
// .catch(error => console.log(error));

//C:\Users\Ronald Nicolas\DEV002-md-links


module.exports = {
  mdLinks
}