const path = require('path');
const fs = require('fs'); // Modulo File System
const fsp = require('fs/promises');
const axios = require('axios');
const fetch = require('node-fetch');
const { get } = require('http');



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
        return path.resolve(filePath)
    }


}
// Comprobar si es archivo 

const isaFile  = (filePath) => {
const  stats = fs.statSync(filePath)
if(stats.isFile()){
    return true
}else {
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
    if(stats.isDirectory()){
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
    let newArray= []
    if (isaFile(filePath) && fileMd(filePath)) {
        newArray.push(filePath)
    } else if(isaDirectory(filePath)){
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
   
    .then((data)=> {
        // console.log(getLinks(data, filePath),'Este es la funcion readfile')
    return getLinks(data, filePath)
   })
   .catch((err)=> console.log(err, 'No se ha encontrado ningun archivo'))
           


// const readFileasyncValidated = (filePath) => fsp.readFile(filePath)
//      .then((data) =>{
//         return getLinksValidated(filePath,data)
//     })
//     .catch((err) => {
//      console.log(err, 'No se ha encontrado un archivo')
//     })
    

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
    //   console.log('funcion',marKdown)
    let match = regex.exec(fileMd);  /* El método exec() ejecuta una busqueda sobre las coincidencias de una expresiónregular en una cadena especifica.    Devuelve el resultado como array, o null .*/

    for (let i = 0; i < fileMd.length; i++) {
        if (match !== null) {
            // console.log('MATCH',match)
            links.push({

                href: match[3],
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
  return Promise.all(links.map((data) => axios.get(data.href)
        .then((result) => {
            // console.log(result.status,' verificando estado')
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
    ))
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
