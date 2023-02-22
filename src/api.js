const path = require('path');
const fs = require('fs'); // El modulo fs me permite interactuar con el sistema de archivos
const fsp = require('fs/promises');
// const fetch = require('node-fetch')


// Comprobar siempre si la ruta existe 
const existsPath = (path) => {
    if (fs.existsSync(path) === undefined) {
        return undefined
    }else if (path.absolutePath(path)){
    }
}

// Comprobar si la ruta es absoluta o relativa  
const verifyPath = (path) => {
    return (path.absolutePath)
    // ? path : path.resolve(path)
}
// Combertir en absoluta      |  path.resolve --> recorrer el sistema de archivos
const convertPath = (path) => {
    return (path.resolve("user", "readme.md"))
}

// Comprobar si la ruta es un archivo , directorio o una una ruta invalida
const isFileorDirectory = (path) => {
    console.log(isFileorDirectory)
    if (fs.statSync(path).isFile()) {
        return 'file'
    } else if (fs.statSync(path).isDirectory()) {
        return 'directory'
    } else {
        return 'invalid path'
    }
}
// Leyendo directorio sincrono
const readDirectory = (directory) => {
    return (fs.readdirSync(directory, ['utf-8', true])) // codificacion: valor de cadena 
}

const readFile = (path) => {
    return (fs.readFile(path))
}

//Devuelve true si es un archivo con la extension .md

const marKdown = (path) => {
    if (path.extname(path) === '.md') {
        return true
    } else {
        console.log('Invalid file')
        return false === "invalid"
    }
}
//Obteniendo links  de archivos markdown
const getLinks = (markdown, path) => {
    const links = []
    const regExp = /\[([^\[]+)\](\(.*\))/gm
    /* El método exec() ejecuta una busqueda sobre las coincidencias de una expresión
    regular en una cadena especifica. 
    Devuelve el resultado como array, o null .*/
    let linksTxt = regExp.exec(markdown)
    
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



};