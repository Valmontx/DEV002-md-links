const path = require('path');
const fs = require('fs'); // Modulo File System
const fsp = require('fs/promises');
const { rejects } = require('assert');
//const fetch = require('node-fetch')



// Comprobar  si la ruta existe 
const existsPath = (filePath) => {
    if (fs.existsSync(filePath)) {
        console.log('La ruta existe')
    } else {
        console.log('La ruta no existe'.bgBlue)
    }
}

//   Saber sí la ruta es relativa ó 'absoluta'  || resolve recorre el sistema de archivos.
const absolutePath = (filePath) => {
    if (path.isAbsolute(filePath) ? filePath : path.resolve(filePath)) {
        console.log(absolutePath) // Devuelve la ruta absoluta
    }
}
// Comprobar si la ruta es un archivo , directorio o una una ruta invalida
const checkFileOrDir = (filePath) => {
    const stats = fs.statSync(path)
    if (stats(filePath).isFile()) {
       console.log('Es un archivo')
    } else if (stats(filePath).isDirectory()) {
        console.log('Es un directorio')
    } else {
        console.log('No es un archivo ni directorio - ruta inválida')
    }
}
// Leyendo directorio sincrono
const readDirectory = (directory) => {
    return (fs.readdirSync(directory)) 
}

const readFile = (filePath) => {
   return new promise ((resolve , reject)  => {
      fs.readFile(filePath,(err, data) => {
        if(err) reject(err);
        resolve(data);
      }
   );
});
};

//Devuelve true si es un archivo con la extension .md

const marKdown = (filePath) => {
    let extension = path.extname(filePath)
    if(extension === '.md'){
        console.log('El arhivo sí tiene una extension .md')
    }else{
        console.log('El arhivo no tiene una extensión .md')
    }
}
// Uniendo ruta con directorio
const pathJoinDirectory = (directory, file) => path.join(directory, file);

// Retorna un objeto con las siguientes propiedades href, text , file
const getLinks = (markdown, filePath) => {
    const links = []
    const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    /* El método exec() ejecuta una busqueda sobre las coincidencias de una expresión
    regular en una cadena especifica. 
    Devuelve el resultado como array, o null .*/
    let match = regex.exec(markdown);
    for (let i = 0; i < marKdown.length; i++) {
       
        if (match !== null) {
            links.push({
                href: match[3],
                text: match[2],
                file: filePath,
            })
            match = regex.exec(markdown);
        }
    }

    return links;
}

// Retorna  el objeto con las misma propiedades pero agregandole el estado ok o fail

const getLinksValidated = (markdown, filePath) => {
    const linksAddstatus= [];
    const regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    let match = regex.exec(markdown);
    for (let i = 0; i < markdown.length; i++) {
       
        if (match !== null) {
            let secondMatch = match;
            linksAddstatus.push(fetch(match[3]).then((response) => {
                return {
                    href: secondMatch[3],
                    text: secondMatch[2],
                    file: filePath,
                    status: response.status, // Código de estado de la respuesa HTTP || resultado de la solicitud realizada por el cliente.
                    ok: (response.ok) ? 'ok' : 'fail',
                }
            }))
            match = regex.exec(markdown);
        }
    }
    return Promise.all(linksAddstatus); //espera  que todas las promesas pasadas como argumentos se hayan completado antes de devolver un resultado.
}


const uniqueLinks = (data) => {
    const unique = new Set(data.map((link) => link.href)).size; //---> Esto devolvera el numero de elementos únicos
    return unique;
};
//links rotos 
const brokenLinks = (data) => {
    let brokenLinks = [];
    data.forEach(link => {
        if (link.ok === '404') {
         return  brokenLinks.push(link.href);
        }
    });
    return brokenLinks.length;
}

// total de links
const totalLinks = (links) => {
    return links.length;
}

console.log(totalLinks)





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
    brokenLinks,
    totalLinks,
    uniqueLinks



};