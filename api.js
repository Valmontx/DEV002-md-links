const path = require('path');
const fs = require('fs'); // Modulo File System
const fsp = require('fs/promises');
const axios = require('axios');
const md = require('markdown-it');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;



// Comprobar  si la ruta existe 
const existsPath = (filePath) => {
    if (fs.existsSync(filePath)) {
        console.log('La ruta existe')
    } else {
        console.log('La ruta no existe')
    }
}

//   Saber sí la ruta es relativa ó 'absoluta'  || resolve recorre el sistema de archivos.
const absolutePath = (filePath) => {
    if (path.isAbsolute(filePath) ? filePath : path.resolve(filePath)) {
        // Devuelve la ruta absoluta
    }
}

// Comprobar si la ruta es un archivo , directorio o una una ruta invalida
const checkFileOrDir = (filePath) => {
    const stats = fs.statSync(filePath)
    if (stats(filePath).isFile()) {
        console.log('Es un archivo')
    } else if (stats(filePath).isDirectory()) {
        console.log('Es un directorio')
    } else {
        console.log('No es un archivo ni directorio - ruta inválida')
    }
}

// Leyendo contenido directorio sincrono
const readDirectory = (filePath) => {
    return (fs.readdirSync(filePath))
}
// Leyendo archivos asincrona(promesa)
const readFile = (filePath) => {
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
const pruebaArchivo = './prueba/documentos/links.md/file.md'
readFile(pruebaArchivo)
    .then(contenido => console.log(getLinks(contenido, pruebaArchivo)))
    .catch(err => console.log('Error: No se puede leer el archivo', err))


//Devuelve true si es un archivo con la extension .md

const marKdown = (filePath) => {
    let extension = path.extname(filePath)
    if (extension === '.md') {
        console.log('El arhivo sí tiene una extension .md')
    } else {
        console.log('El arhivo no tiene una extensión .md')
    }
}
// console.log(marKdown('api.js'));
// console.log(marKdown('README.md'))
// console.log(marKdown('file.md'))

//Guardar los .md en un array de archivod md / recursividad 

const arrayLinks = (filePath) => {
    let arrayMd = []
    if (checkFileOrDir(filePath) && marKdown(filePath)) {
        arrayMd.push(filePath)
    } else if (isDirectory(filePath)) {
        const arrayFileAndDir = readDirectory(filePath)
        arrayFileAndDir.map((arrayFileAndDir) => {
            arrayMd = arrayMd.concat(arrayLinks(filePath, arrayFileAndDir))
        });
    }

    return arrayMd;
}

// Uniendo ruta con directorio
const pathJoinDirectory = (directory, filePath) => path.join(directory, filePath);

//  encontrar links - retorna un objeto con las siguientes propiedades href, text , file
const getLinks = (marKdown, filePath) => {
    const links = []
    const regex = /(\[(.*?)\])(\((.*?)\))/gim;
    //   console.log('funcion',marKdown)
    let match = regex.exec(marKdown);  /* El método exec() ejecuta una busqueda sobre las coincidencias de una expresiónregular en una cadena especifica.    Devuelve el resultado como array, o null .*/

    for (let i = 0; i < marKdown.length; i++) {
        if (match !== null) {
            // console.log('MATCH',match)
            links.push({

                href: match[3],
                text: match[2],
                file: filePath,
            })
            match = regex.exec(marKdown)
        }
    }
    return links;

};



//  Validar links -  el objeto con las misma propiedades pero agregandole el estado ok o fail

const getLinksValidated = (links) => {
    const promises = []
    promises = links.map((link) => axios.get(link.href)
        .then((res) => {
            if (res.ok) { // si la solicitud fue exitosa

                return {

                    href: link.href,

                    text: link.text,
                    file: link.file,
                    ok: (response.ok)
                };


            }

        })


        .catch((err) => {
            (err.status >= 400)
            return {

                href: link.href,
                text: link.text,
                file: link.file,
                status: res.response ? 404 : "ERROR",
                ok: 'Fail',


            };
        })
    )
    return Promise.all(promises);
};



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
    readFile,
    marKdown,
    getLinks,
    pathJoinDirectory,
    getLinksValidated,
    validateStatResul,
};