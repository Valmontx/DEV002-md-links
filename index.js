
const api = require('./src/api.js');
const readline = require('readline')
const path = require('path');
// Funcion mdLinks || solo lee validate
const mdLinks = (path, options = []
 
) => {
  console.log('funciona mdlinks?')
  // Cambiar a ruta absoluta
  // Como leer entradas de un usuario en terminal + node.js
 // node index.js ./mypathAlArchiv
 //node index.js ./PathALArchivo --stats
 const rl = readline.createInterface(
  process.stdin, process.stdout);
 
  const absolutePath = api.existsPath(path)
  const type = isDirectory(absolutePath)
  return new Promise((resolve, reject) => {
    
  // Ver sí la ruta existe    
    if (fs.existsPath(path) === undefined ) {
  
      return reject(`${path} invalid path`)

      //Comprobar si la ruta es un directorio, lea el directorio o el archivo y obtenga archivos .md
    } else if (type !== 'file' && type !== 'directory') {
      return reject(`${absolutePath} no es un archivo o un directorio`)
    }

    // si es un directorio filtrar los archivos .md
  
  })
}


mdLinks("es una funcion").then((resultado)=>{
console.log(resultado)
})
mdLinks('segundo prueba').then(console.log)

module.exports = {
  mdLinks
}