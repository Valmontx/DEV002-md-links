#!/usr/bin/env node
const { stat, readFileSync } = require('fs');
const { resolve } = require('path');
const { argv } = require('process');
const process = require('process');
const { validateStatResul, getLinksValidated } = require('./api.js');
const { mdLinks } = require('./index.js');




// Recibe argumentos de lina de comandos.
let filePath = process.argv[2];
let options = process.argv[3];// Read files and extract links
let options1 = process.argv[4];

const cli = (filePath, argv) => {
  // Grab provided args. 
  const [, , ...args] = process.argv
  const validate = argv.includes("--validate");
  const stats = argv.includes("--stats");


  if (filePath == undefined) {
    console.log(' 💗 Ｂｉｅｎｖｅｎｉｄｏ  ａ  ｍｄ－ｌｉｎｋｓ 💗')
    console.log(' 📝  Las siguientes instrucciones son :'.bgMagenta);
    console.log('  📌 Escribe md-links en la terminal, luego agregar una ruta valida.  ')
    console.log('  📌 Para poder ver:  (url,status,ruta y el mensaje) ingresar la opcion  (--validate) luego de su ruta valida.')
    console.log('  📌 Para poder ver:  (Los links únicos y el total de los links)  ingresar la opcion (--stats) despues de su ruta valida.');
    console.log('  📌 Para poder ver:  ( El total, los links únicos y los links rotos) ingresar las opciones (--validate -- stats) despues de su ruta valida.')

  } if
    (validate && stats) {
    mdLinks(filePath, { validate: true })
      .then((res) => {
        const validateStats = validateStatResul(res)
        console.log(`Total: ${validateStats.Total} Unique:${validateStats.Unique} Broken: ${validateStats.Broken}`.bgCyan)
      }).catch((err) => {
        console.log(err, 'debe ingresar un comando valido')
      })
    return
  
  
  }
  if (validate) {
    mdLinks(filePath, { validate: true })
      .then((resultado) => {
        resultado.forEach(element => {
          // console.log(getLinksValidated(element))
          console.log(`\nhref:  ${element.href}  \ntext: ${element.text}  \nfile: ${element.file}  \nmessage:${element.ok} \nstatus: ${element.status}`.bgMagenta)
        });
      }).catch((err) => {
        console.log(err)
      })
    return
  }

  if (stats) {
    mdLinks(filePath, { validate: false })
      .then((res) => {
        const validateOnlyStat = validateStatResul(res)
        console.log(`Total: ${validateOnlyStat.Total} Unique: ${validateOnlyStat.Unique} `.bgCyan)
      }).catch((err) => {
        console.log(err)
      })
  } 
  if (validate) {
    mdLinks(filePath, { validate: false })
    then((response) => {
      response.forEach(element => {
        console.log(`\nhref:  ${element.href}  \ntext: ${element.text}  \nfile: ${element.file}`.bgBlue)
      })
    }).catch((err) => {
      console.log(err)
    })
    return
  
 
}

}






cli(filePath, argv)










// mdLinks('./prueba/documentos/links.md/file.md')


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