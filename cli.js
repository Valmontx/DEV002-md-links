#!/usr/bin/env node
const { stat } = require('fs');
const { resolve } = require('path');
const process = require('process');
const {mdLinks} = require('./index.js');

// Grab provided args. 
const [, , ...args] = process.argv
// console.log(process.argv)

// Recibe argumentos de lina de comandos.
let filePath = process.argv[2];
let options = process.argv[3];
let options1 = process.argv[4]; // Read files and extract links


const validate = args.includes("--validate");
const stats = args.includes("--stats");

if (filePath) {
  console.log('----------------BIENVENIDO A MD-LINKS--------------'.bgBlue)
  console.log('Instrucciones:'.bgGreen)
  console.log('1. Enviar la ruta.'.bgGreen)
  console.log('2. Para poder validar tu ruta ingresada debes agregar la opcion "--validate"'.bgGreen)
  console.log('3. Para saber el total de los links debes agregar opcion"--stats"'.bgGreen)
  console.log('4. Para saber la cantidad de links rotos , agregar ambas opciones" --stats" "--validate" luego de tu ruta ingresada'.bgGreen)
}
if (options === null && options === undefined && options === "" || options1 === undefined) {
  mdLinks(filePath, { validate: false, stats: false })
    .then((res) => res);
} else if (options == validate && options1 == undefined) {
  mdLinks(filePath, { validate: false, stats: false })
    .then((res) => res);
} else if (options === stats && options1 == undefined) {
mdLinks(filePath, {validate: false , stats: false})
.then((res) => res);
} else if ((options === validate && options1 === stats) || options === stats && options1 === validate){
  mdLinks(filePath, {validate: true , stats: true})
  .then((res) => res);
} else {
  console.log('ERROR')
} 

      
          


//  else if(validate && stats) {
//   console.log(getLinksValidated(res))
// } else if (!validate && stats) {
//   console.log(uniqueLinks(res))
// } else if (validate && !stats) {
//   console.log(res)
// } else if (!validate && !stats) {
//   console.log(res)
// }



//'C:\\Users\\Ronald Nicolas\\DEV002-md-links\\src')

// chmod +x cli.js # Hacer que el archivo sea ejecutablea
/*process.argv es algo que puededes poner en el cli para leer los argumentos 
 que la persona escribe cuando corres tu scripts tu linea de comandos*/


// Como leer entradas de un usuario en terminal + node.js
// node index.js ./mypathAlArchiv
//node index.js ./PathALArchivo --stats

module.exports = {
  mdLinks
}