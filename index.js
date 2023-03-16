
const { readFile, Stats, readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const { colors } = require('colors')
const path = require('node:path');
const readline = require('readline')
const { existsPath, absolutePath, getLinks, getLinksValidated, readDirectory, arrayMd, isaDirectory, isaFile, fileMd, readFileasync, validateStatResul } = require('./api.js');


// Funcion mdLinks
const mdLinks = (filePath, options = { validate: true, stats: true }) => {

  const isabsolutePath = absolutePath(filePath)
  return new Promise((resolve, reject) => {
    if (!existsPath(filePath) === null) {
      console.log(' por favor ingrese un ruta valida')
      // Verificando si la ruta existe
    } else {
      console.log(`la ruta ${isabsolutePath} existe y es absoluta`.bgRed)
      //  si es archivo 
      if (isaFile(isabsolutePath)) {

        const isFileMd = fileMd(isabsolutePath)
        console.log(isFileMd, 'son archivos md')

        // leer archivos y mostrar los links
        readFileasync(isabsolutePath).then((linksMd) => {

          console.log(linksMd, options.validate, 'opciones')

          if (linksMd.length >= 1 && options.validate === true) {

            console.log( getLinksValidated(linksMd),'¿Desea validar?')

            getLinksValidated(linksMd).then((resultado) => {
              console.log(resultado)
            })

          } else if (linksMd.length === 0) {
            reject(`No se encontraron links ${isabsolutePath}`)

          }
          // if (linksMd.length >= 1) {

          //   // const arraygetlinks = getLinks(isabsolutePath)
          //   // console.log(getLinks(isabsolutePath), 'se obtiene los links')

          //   if (arraygetlinks.length >= 1) {

          //     console.log(arraygetlinks)

          //   } else if (arraygetlinks.length === 0)
          //     console.log(new Error('No se encontraron links en el archivo'))
          //   // DIRECTORY 
          // }
        })




      }
      // else if (isaDirectory(isabsolutePath)) {
      //   const readDirec = readDirectory(isabsolutePath)
      //   if (readDirec.length >= 1) {
      //     resolve(arrayMd(isabsolutePath))
      //   }
      //   const linksmd = getLinks(isabsolutePath)


      // }
    }
    // mdLinks(filePath)
    // .then((resolve) => resolve).catch((err)=> err)
  })

}




mdLinks('./prueba/documentos/ex.md')








// then(resultado => console.log(resultado))
// .catch(error => console.log(error));

//C:\Users\Ronald Nicolas\DEV002-md-links


module.exports = {
  mdLinks
}

