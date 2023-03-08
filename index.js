
const color = require('colors');
const { readFile } = require('node:fs');
const path = require('node:path');
const readline = require('readline')
const { existsPath, absolutePath, marKdown, getLinks, checkFileOrDir } = require('./api.js');

// Funcion mdLinks
function mdLinks (filePath, options )  {

  return new Promise((resolve, reject) => {
    if (!existsPath(filePath)) {
      reject(`ERROR: Debe ingresar una ruta valida`.bgGreen)
    if(!absolutePath(filePath)){
      const convertAbsolute = (path.resolve(filePath))
       filePath = convertAbsolute
       
    } if (!checkFileOrDir(filePath)){
      (type !== 'File' && type !== 'directory')
      reject('No es archivo ni directorio')

    }if(!readFile(filePath)){
      reject('No se puede leer el archivo')
     
    }if (!marKdown !== '.md') {
      reject('No se encontraron extensiones .md ')
    }
      const linksFound = getLinks(absolutePath)
    if (linksFound.length >= 1 && options.validate) {
      resolve((api.getLinks(linksFound)))
    } else if (linksFound.length >= 1 && options.validate != true) {
      resolve((api.getLinks(absolutePath)))
    } else if (linksFound.length == 0) {
      reject(new Error('No se encontraon links.'))
    }


  }
})


}
// mdLinks(absolutePath ).then(console.log)

// then((resultado) => console.log(resultado))
// .catch((error) => console.log(error));




//C:\Users\Ronald Nicolas\DEV002-md-links\index.js C:\Users\Ronald Nicolas\DEV002-md-links
//Current directory: C:\Users\Ronald Nicolas\DEV002-md-links\src

module.exports = {
  mdLinks
}