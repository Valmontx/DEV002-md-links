
const api = require('./src/api.js');
const path = require('path');

const { existsPath, convertPath, marKdown, isFileorDirectory }
  = require('./src/api.js')


// Funcion mdLinks || solo lee validate
const mdLinks = (filePath, options = [] ) => {
  console.log('funciona mdlinks?');
  
  const absolutePath = convertPath(filePath)
  const type = isFileorDirectory(absolutePath)
  return new Promise((resolve, reject) => {
    // Ver sí la ruta existe   y si es absoluta  
    if (!existsPath(absolutePath) === undefined) {
      return reject('invalid path') // si la ruta no existe, se rechaza

      //Comprobar si la ruta es un directorio, o  archivo y obtenga archivos .md, si no es: rechaza la promesa
    } else if (type !== 'file' && type !== 'directory') {
      return reject(`no es un archivo o un directorio`)
    }

    // si es un directorio filtrar los archivos .md
    if (!marKdown(filePath)) {
      return reject('The file is not an .md extension')
    } else {
      //Obtener links de un archivo 
     
      
    }
  })
}

mdLinks('C:\\Users\\Ronald Nicolas\\DEV002-md-links\\index.js').then((resultado) => {
  console.log(resultado)
}).catch(console.error())


module.exports = {
  mdLinks
}