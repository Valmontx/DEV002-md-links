# Markdown Links

## Índice

* [1. ¿Qué es md-links?](#1-preámbulo)
* [2. ¿Qué es markdown?](#2-resumen-del-proyecto)
* [3. Resumen del proyecto](#3-objetivos-de-aprendizaje)
* [4. Dependencias](#3-objetivos-de-aprendizaje)
* [5. Diagrama de flujo](#3-objetivos-de-aprendizaje)





***

## 1. ¿Que es md-links?
Es una librería ejecutable [CLI], instalable para cualquier proyecto, con la finalidad de validar links dentro un archivo markdown mostrando una estadística si lo solicitan.  

## 2. ¿Que es markdown?
[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...) y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js], que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.


## 3. Resumen del proyecto:

Un breve ejemplo de su funcionalidad 

   Para iniciar escribir solo `md-links`
  ![bienvenida en la terminal](../Downloads/inicio%20de%20md-links.png)
   
   Solo se retona los links encontrados en el archivo o directorio. 
  ![Segundo paso](../Downloads/segundo%20paso%20en%20md-links%20.png)
   
   Luego para validar se debe agregar la opcion `--validate` 
  ![Alt text](../Downloads/tercer%20paso%20en%20md-links.png)
 
   De la misma forma  con la opcion `--stats` se podra saber cuál es el total de links y los únicos.
  ![Alt text](../Downloads/5to%20paso%20md-links.png)

   Ingresando ambas opciones `--validate` `--stats` retornará : total , únicos y rotos. 
  ![Alt text](../Downloads/4to%20paso%20de%20md-links.png)

  ## 4. Dependecias utilizadas 
    - colors: ^1.4.0
    - fetch: ^1.1.0
    - node-fetch : ^2.6.9



  ## 5. Diagrama de flujo con Drawio


![Diagrama de flujo](../Downloads/Diagrama%20de%20flujo%20md-links.drawio.png)