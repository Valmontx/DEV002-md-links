const path = require('path');
const fs = require('fs'); // Modulo File System
const fsp = require('fs/promises');

const fetch = require('node-fetch');



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
        return filePath
    } else {
        console.log(`la ruta ${filePath} es relativa`.bgBlue)
        return path.resolve(filePath)
    }


}
// Comprobar si es archivo 

const isaFile = (filePath) => {
    const stats = fs.statSync(filePath)
    if (stats.isFile()) {
        return true
    } else {
        return false
    }
}
//se comprueba si es un archivo  .md

const fileMd = (filePath) => {
    if (path.extname(filePath) === '.md') {
        return true
    } else {
        console.log('El arhivo no tiene una extensión .md')
    }
}

// Comprobar si es directorio

const isaDirectory = (filePath) => {
    let stats = fs.statSync(filePath) // El método statSync se utiliza para devolver info sobre la ruta del archivo (de forma sincrona)
    if (stats.isDirectory()) {
        return true
    } else {
        return false
    }
}

// Leyendo contenido directorio sincrono y obtener archivos con extension .md
const readDirectory = (filePath) => {
    return fs.readdirSync(filePath)

}


// console.log(fileMd('api.js'));
// console.log(fileMd('README.md'))
// console.log(fileMd('file.md'))


// Funcion para guardar lo md. en un array de archivos.md - recursividad 

const arrayMd = (filePath) => {
    let newArray = []
    if (isaFile(filePath) && fileMd(filePath)) {
        newArray.push(filePath)
    } else if (isaDirectory(filePath)) {
        const arrayOfDir = readDirectory(filePath)
        arrayOfDir.map((arrayOfDir) => {
            newArray = newArray.concat(arrayMd(`${filePath}/${arrayOfDir}`))

        });
    }

    return newArray;
}
// console.log(arrayMd('/Users/Ronald Nicolas/DEV002-md-links/prueba/documentos/ex.md'))

// Leyendo archivos (asincrono)
const readFileasync = (filePath) => fsp.readFile(filePath)

    .then((data) => {
        // console.log(getLinks(data, filePath),'Este es la funcion readfile')
        return getLinks(data, filePath)
    })
    .catch((err) => console.log(err, 'No se ha encontrado ningun archivo'))



//  const pruebaArchivo = './prueba/documentos/ex.md'
// readFileasync(pruebaArchivo)

//     .then(data => console.log(getLinks(data, pruebaArchivo) , 'GET LINKS'))
//     .catch(err => console.log('Error: No se puede leer el archivo', err))


// Uniendo ruta con directorio
const pathJoinDirectory = (directory, filePath) => path.join(directory, filePath);

//   links - retorna un objeto con las siguientes propiedades href, text , file
const getLinks = (fileMd, filePath) => {
    const links = []
    const regex = /(\[(.*?)\])(\((.*?)\))/gim;
    const regexTxt = /\(([^)]+)\)/;
    let match = regex.exec(fileMd);  /* El método exec() ejecuta una busqueda sobre las coincidencias de una expresiónregular en una cadena especifica.    Devuelve el resultado como array, o null .*/

    for (let i = 0; i < fileMd.length; i++) {
        if (match !== null) {

            let link = regexTxt.exec(match[3])
            // console.log(link, 'verificando la expresion regular')
            // console.log('MATCH',match)
            links.push({

                href: link[1],
                text: match[2],
                file: filePath,
            })
            match = regex.exec(fileMd)
        }
    }
    return links;

};



//  Validar links -  el objeto con las misma propiedades pero agregandole el estado ok o fail

const getLinksValidated = (links) => {

    return Promise.all(links.map((link => {
        // console.log(link.href, 'debe mostrar href');
        return fetch(link.href)
            .then((res) => {
                // console.log(res.status, 'verificando respuesta exitosa')
                if (res.status >= 200 && res.status < 300) { // si la solicitud fue exitosa
                    const data = {


                        href: link.href,
                        text: link.text,
                        file: link.file,
                        ok: res.ok ? '200' : 'fail'


                    };
                    return data;
                }
            })
            .catch((err) => { // el código dentro del bloque `catch` no lanza una excepción, entonces la promesa siempre se resolverá con `undefined`. Por lo tanto, si desea propagar cualquier error al siguiente bloque `catch` o para manejarlo, debo de lanzar la excepción o devolver una nueva promesa rechazada en consecuencia.
                // console.log(err,'verificando si es un mensage de error')

                if (err.response >= 400) throw err;
                const dataErr = {

                    ...link,
                    status: err.response ? 404 : 'Error',
                    message: 'Fail'
                };
                return dataErr;



            })

    })))
}

// resultados del stats  links totales y unicos  opcion --stats
const validateStatResul = (links) => {
  

    const totalLinks = links.map((link) => link);

    const uniqueLinks = new Set(links.map((link) => link)).size; //---> Esto devolvera el numero de elementos únicos
    
    const brokenLinks = links.filter((link) =>link.ok=== 'fail').length
   

    return {
        Total: totalLinks.length,
        Unique: uniqueLinks,
        Broken: brokenLinks

    }

};

// resultado de los links totales , unicos y rotos opciones --validate --stats





module.exports = {
    existsPath,
    absolutePath,
    isaFile,
    isaDirectory,
    readDirectory,
    readFileasync,
    fileMd,
    getLinks,
    pathJoinDirectory,
    arrayMd,
    getLinksValidated,
    validateStatResul,
    
};
