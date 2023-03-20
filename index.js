
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
      console.log(`la ruta ${filePath} no existe`.bgRed)
      // Verificando si la ruta existe
    } else {
      console.log(`la ruta existe y está resuelta ${isabsolutePath}`.bgMagenta)
      //  si es archivo 
      if (fileMd(isabsolutePath)) {

        const isFileMd = fileMd(isabsolutePath)
        //  console.log(isFileMd, 'son archivos md')

        // leer archivos y mostrar los links
      
        readFileasync(isabsolutePath).then((linksMd) => {
                 resolve(linksMd)
            //  resolve(linksMd, 'solo dede mostrar el array de objeto')
          if (linksMd.length >= 1 && options.validate) {
            getLinksValidated(linksMd).then((resultado) => {
              // console.log( linksMd, 'Que muestra esto?')
                     
              if (linksMd.length >= 1 && options.validate == true){
                resolve( resultado,' resultado de los link  ')
              }         
            })
          }else {
            reject(`No se encontraron links ${isabsolutePath}`.bgMagenta)
          }

        })
      }  
           
    }
  })

}
// mdLinks('./prueba/documentos/ex.md')



module.exports = {
  mdLinks
}

