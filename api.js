const path = require('path');
const fs = require('fs'); // Modulo File System
const fsp = require('fs/promises');
const axios = require('axios');
const fetch = require('node-fetch')



// Comprobar  si la ruta existe 
const existsPath = (filePath) => {
    if (fs.existsSync(filePath)) {
        return true
    } else {
        false
    }

}
//   Saber sí la ruta es relativa ó 'absoluta'  || resolve recorre el sistema de archivos.
const absolutePath = (filePath) => {
    if (path.isAbsolute(filePath)) {

     } else if (path.resolve(filePath)){
        console.log('ruta resulta')
     }
}

// Comprobar si la ruta es un archivo , directorio o una una ruta invalida
const checkFileOrDir = (filePath) => {
    const stats = fs.statSync(filePath)
    if (stats(filePath).isFile()) {
        marKdown(filePath)
    } else if (stats(filePath).isDirectory()) {
        return 'directory'
    } else {
        console.log('No es un archivo ni directorio - ruta inválida')
    }
}

// Leyendo contenido directorio sincrono
const readDirectory = (filePath) => {
    return (fs.readdirSync(filePath))
}

// funcion para almnacenar lectura del directorio 





// Leyendo archivos 
const readFileasync = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                reject(err)

            } else {
                return resolve(data)
            }

        }
        );


    });
};
const pruebaArchivo = './prueba/documentos/ex.md'
readFileasync(pruebaArchivo)
    .then(contenido => contenido)
    .then(contenido => console.log(getLinks(contenido, pruebaArchivo)))
    .catch(err => console.log('Error: No se puede leer el archivo', err))


//Devuelve true si es un archivo con la extension .md

const marKdown = (filePath) => {
    let extension = path.exstname(filePath)
    if (extension === '.md') {
        getLinks(filePath)
    } else {
        console.log('El arhivo no tiene una extensión .md')
    }
}
// console.log(marKdown('api.js'));
// console.log(marKdown('README.md'))
// console.log(marKdown('file.md'))

//Guardar lo md. en un array - recursividad 

const arrayMd = (filePath) => {
    let filesMd = []
    if (checkFileOrDir(filePath) && marKdown(filePath)) {
        filesMd.push(filePath)
    } else if (isDirectory(filePath)) {
        const arrayFileAndDir = readDirectory(filePath)
        arrayFileAndDir.map((arrayFileAndDir) => {
            filesMd = filesMd.concat(arrayMd(filePath, arrayFileAndDir))
        });
    }

    return filesMd;
}

// Uniendo ruta con directorio
const pathJoinDirectory = (directory, filePath) => path.join(directory, filePath);

//   links - retorna un objeto con las siguientes propiedades href, text , file
const getLinks = (markdown, filePath) => {
    const links = []
    const regex = /(\[(.*?)\])(\((.*?)\))/gim;
    //   console.log('funcion',marKdown)
    let match = regex.exec(markdown);  /* El método exec() ejecuta una busqueda sobre las coincidencias de una expresiónregular en una cadena especifica.    Devuelve el resultado como array, o null .*/

    for (let i = 0; i < markdown.length; i++) {
        if (match !== null) {
            // console.log('MATCH',match)
            links.push({

                href: match[3],
                text: match[2],
                file: filePath,
            })
            match = regex.exec(markdown)
        }
    }
    return links;

};



//  Validar links -  el objeto con las misma propiedades pero agregandole el estado ok o fail

const getLinksValidated = (links) => {
    Promise.all(links.map((data) => axios.get(data.href)
  .then((result) => {
    // console.log(result.status)
    const objetValidate = {
      ...data, // objeto de propagacion 
      status: result.status,
      ok: result.statusText ? 'ok' : 'fail',
    }
    return objetValidate
  })
  .catch((err) => {
    // console.log(err.status)
    let respuesta = err.response
    const objetcValidate = {
      ...data,
      status: err?.response?.status,
      ok: 'fail',
    }
    return objetcValidate
  })
));
}
    
    
    
    
    
    // return Promise.all(links.map((link => {
    //     return fetch(link.href)
    //         .then((res) => {
              
    //             if (res.status >= 200 && res.status < 300) { // si la solicitud fue exitosa
    //                 const data = {


    //                     href: link.href,
    //                     text: link.text,
    //                     file: link.file,
    //                     ok: (res.ok)

    //                 };
    //                 return data;
    //             }
//             })
//             .catch((err) => {
//                 (err.status >= 400)
//                const dataErr =  {

//                     href: link.href,
//                     text: link.text,
//                     file: link.file,
//                     status: res.response ? 404 : "ERROR",
//                     message: 'No status',
//                 };
//                 return dataErr;
//             })

//     })))


// }





// resultados del stats 
const validateStatResul = (arrlink) => {
    const totalLinks = arrlink.map((link) => link.href).size; //---> Esto devolvera el numero de elementos únicos
    const uniqueLinks = new Set(arrlink.map((link) => link.href)).size;
    const brokenLinks = arrlink.filter((link) => link.ok === '404')

    return {
        Total: totalLinks.length,
        Unique: uniqueLinks.size,
        Broken: brokenLinks.length
    }

};

module.exports = {
    existsPath,
    absolutePath,
    checkFileOrDir,
    readDirectory,
    readFileasync,
    marKdown,
    getLinks,
    pathJoinDirectory,
    arrayMd,
    getLinksValidated,
    validateStatResul,
};