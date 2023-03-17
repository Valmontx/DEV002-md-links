
const { readFile, Stats, readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const { colors } = require('colors')
const path = require('node:path');
const readline = require('readline')
const { existsPath, absolutePath, getLinksValidated, isaFile, fileMd, readFileasync, validateStatResul } = require('./api.js');


// Funcion mdLinks
const mdLinks = (filePath, options = { validate: true, stats: true }) => {

  const isabsolutePath = absolutePath(filePath)
  return new Promise((resolve, reject) => {
    if (!existsPath(filePath) === null) {
      reject(`la ruta ${filePath} no existe`.bgRed)
      // Verificando si la ruta existe
    } else {
      console.log(`la ruta ${isabsolutePath} existe y es absoluta`.bgRed)
      //  si es archivo 
      if (isaFile(isabsolutePath)) {

        const isFileMd = fileMd(isabsolutePath)
         console.log(isFileMd, 'son archivos md')

        // leer archivos y mostrar los links
        readFileasync(isabsolutePath).then((linksMd) => {

          // console.log( options.validate, 'opciones')

          if (linksMd.length >= 1 && options.validate == true) {
           getLinksValidated(linksMd).then((resultado) => {
             console.log('¿desea validar?', validateStatResul(resultado))
           })

           } else if (linksMd.length === 0) {
            reject(`No se encontraron links ${isabsolutePath}`)

          }

        })

      }
    
    }
  })

}
mdLinks('./prueba/documentos/links.md/file.md')



module.exports = {
  mdLinks
}

