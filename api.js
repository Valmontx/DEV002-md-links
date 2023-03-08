const path = require('path');
const fs = require('fs'); // Modulo File System
const fsp = require('fs/promises');
const axios = require('axios');




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
        console.log(absolutePath) // Devuelve la ruta absoluta
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
// Leyendo directorio sincrono
const readDirectory = (filePath) => {
    return (fs.readdirSync(filePath))
}
// Leyendo archivos asincrona(promesa)
const readFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
            reject(err)

            }else {
                return resolve(data)
            }
           
        }
        );


    });
};
readFile('\DEV002-md-links\\ README.md')
.then(contenido => console.log(contenido))
.catch(err => console.log('Error: No se puede leer el archivo', err ))


//Devuelve true si es un archivo con la extension .md

const marKdown = (filePath) => {
    let extension = path.extname(filePath)
    if (extension === '.md') {
        console.log('El arhivo sí tiene una extension .md')
    } else {
        console.log('El arhivo no tiene una extensión .md')
    }
}
console.log(marKdown('api.js'));
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
            arrayMd = arrayMd.concat(arrayLinks(`${filePath}/${arrayFileAndDir}`))
        });
    }

    return arrayMd;
}
console.log(arrayLinks)

// Uniendo ruta con directorio
const pathJoinDirectory = (directory, filePath) => path.join(directory, filePath);

// Obtener links - retorna un objeto con las siguientes propiedades href, text , file
const getLinks = (marKdown , filePath) => {
    const links = []
    
    const regex = /\[(.+?)\]\((https?:\/\/[^\s]+)(?: "(.+)")?\)|(https?:\/\/[^\s]+)/ig;
           let match = regex.exec(marKdown);  /* El método exec() ejecuta una busqueda sobre las coincidencias de una expresión
           regular en una cadena especifica. 
           Devuelve el resultado como array, o null .*/
           
                for(let i = 0; i < marKdown.length; i++){
                    if(match !== null){
                        links.push({
                            
                            href: match[2],
                            text: match[3],
                            file: filePath,
                        })
                        match= regex.exec(markdown)
                    }
                }
                return links;
                
    };
          console.log(getLinks({marKdown}))

//  Validar links -  el objeto con las misma propiedades pero agregandole el estado ok o fail

const getLinksValidated = (links) => {
    const linkValidate = links.map((links) => {
        return axios.get(links.href)
            .then((res) => {
                if (res.status >= 200 && res.status <= 299) {
                    return {
                        href: links.href,
                        text: links.text,
                        file: links.file,
                        ok: (response.ok)
                    };


                }

            })
            .catch((err) => {
                (err.status >= 400 && err.status >= 499)
                return {

                    href: links.href,
                    text: links.text,
                    file: links.file,
                    status: res.response ? 404 : "ERROR",
                    OK: 'Fail',


                };
            })
    })
    return Promise.all(linkValidate);
};


const statLinks = (arrlink) => {
    const uniqueLinks = new Set(arrlink.map((link) => link.href)).size; //---> Esto devolvera el numero de elementos únicos
    return {
        Total: arrlink.length,
        Unique: uniqueLinks
    }

};
// resultados del stats 
const validateStatResul = (arrlink) => {
    const totalLinks = arrlink.map((links) => links.href)
    const uniqueLinks = new Set(arrlink.map((links) => links.href)).size;
    const brokenLinks = arrlink.filter((links) => links.ok === '404')

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
    statLinks



};