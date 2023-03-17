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

if (options === null && options === undefined && options === "" || options1 === undefined)  {

  mdLinks(filePath, { validate: false, stats: false })
    .then((res) => res)
} else if (options == validate && options1 == undefined) {
  mdLinks(filePath, { validate: true, stats: false })
    .then((res) => console.log(res).catch((err)=> console.log(err)));
} else if (options === stats && options1 == undefined) {
mdLinks(filePath, {validate: true, stats: false})
.then((res) => res);
} else if ((options === validate && options1 === stats) || options === stats && options1 === validate){
  mdLinks(filePath, {validate: true , stats: true})
  .then((res) => console.log(res));
} else {
  console.log('por favor ingrese un comando valido')
} 
} else{
  console.log('por favor ingresar un ruta')
}

// mdLinks('./prueba/documentos/ex.md')


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