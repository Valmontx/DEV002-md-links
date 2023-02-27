const path = require('path');
const fs = require('fs'); // El modulo fs me permite interactuar con el sistema de archivos
const fsp = require('fs/promises');
// const fetch = require('node-fetch')


// Comprobar siempre si la ruta existe 
const existsPath = (filePath) => {
    if (fs.existsSync(filePath) === undefined) {
        return undefined
    }
}

// Comprobar si la ruta es absoluta o relativa  
const verifyPath = (filePath) => {
    return (path.isAbsolute(filePath)) ? filePath : path.resolve(filePath)
}
// Combertir en absoluta      |  path.resolve --> recorrer el sistema de archivos
const convertPath = (filePath) => {
    return (path.resolve(filePath))
}

// Comprobar si la ruta es un archivo , directorio o una una ruta invalida
const isFileorDirectory = (filePath) => {
    if (fs.statSync(filePath).isFile()) {
        return 'file'
    } else if (fs.statSync(filePath).isDirectory()) {
        return 'directory'
    } else {
        return 'invalid path'
    }
}
// Leyendo directorio sincrono
const readDirectory = (directory) => {
    return (fs.readdirSync(directory, ['utf-8', true])) // codificacion: valor de cadena 
}

const readFile = (filePath) => {
    return (fs.readFile(filePath))
}

//Devuelve true si es un archivo con la extension .md

const marKdown = (filePath) => {
    if (path.extname(filePath) === '.md') {
        return true
    } else {
        console.log('Invalid file')
        return false === "invalid"
    }
}

const pathJoinDirectory = (directory, file) => path.join(directory, file);

//Obteniendo links  de archivos markdown
const getLinks = (markdown, filePath) => {
    const links = []
    const regExp = /\[([^\[]+)\](\(.*\))/gim
    /* El método exec() ejecuta una busqueda sobre las coincidencias de una expresión
    regular en una cadena especifica. 
    Devuelve el resultado como array, o null .*/
    let match = regExp.exec(markdown);
    for(let i = 0; i < marKdown.length; i++ ){
        if(match !== null){
             links.push({
                href: match[4],
                text: match[2],
                file: filePath,
             })
             match = regExp.exec(markdown);
        }
    }

    return links;
}

//Obteniendo links validos

const getLinksValidated = (markdown, filePath) => {
    const promises = [];
    const regex = /(\[(.*?)\])(\((.*?)\))/gim;
    let match = regex.exec(markdown);
    for (let i = 0; i < markdown.length; i++) {
        if (match !== null) {
            let theMatch = match;
            promises.push(fetch(match[4]).then((response) => {
                return {
                    href: theMatch[4],
                    text: theMatch[2],
                    file: filePath,
                    status: response.status,
                    ok: (response.ok) ? 'ok' : 'fail',
                }
            }))
            match = regex.exec(markdown);
        }
    }
    return Promise.all(promises);
}
const uniqueLinks = (data) => {
    const unique = new Set(data.map((link) => link.href)).size;
    return unique;
};
//links rotos 
const brokenLinks = (data) => {
    let brokenLinks = [];
    data.forEach(link => {
        if (link.ok === 'fail') {
            brokenLinks.push(link.href);
        }
    });
    return brokenLinks.length;
}

// total de links
const totalLinks = (links) => {
    return links.length;
}







module.exports = {
    existsPath,
    verifyPath,
    convertPath,
    isFileorDirectory,
    readDirectory,
    readFile,
    marKdown,
    getLinks,
    pathJoinDirectory,
    getLinksValidated,
    brokenLinks,
    totalLinks,
    uniqueLinks



};