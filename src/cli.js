#!/usr/bin/env node

const mdLinks = require('./index.js');

// Grab provided args. 
const [,,... args] = process.argv

// Recibe argumentos de lina de comandos.
// console.log(args[0], args[1]);
const validate = args.includes("--validate");
const stats = args.includes("--stats");

const process = require('process')

let path = process.argv[2];
let options = process.argv[3];
let opcions1 = process.argv[4];





// chmod +x cli.js # Hacer que el archivo sea ejecutablea
/*process.argv es algo que puededes poner en el cli para leer los argumentos 
 que la persona escribe cuando corres tu scripts tu linea de comandos*/
// cli linea de comandos con process.argv y de ahi llamando a tu funcion mdlinks (si hay el path , opciones)
//en el cli se define la funcion mdlinks

// Como leer entradas de un usuario en terminal + node.js
// node index.js ./mypathAlArchiv
//node index.js ./PathALArchivo --stats

module.exports = {
    mdLinks
}