# Markdown Links

## Índice

* [ ¿Qué es md-links?](#1-preámbulo)
* [ ¿Qué es markdown?](#2-resumen-del-proyecto)
* [ Resumen del proyecto](#3-objetivos-de-aprendizaje)
* [ Dependencias](#3-objetivos-de-aprendizaje)
* [ Diagrama de flujo](#3-objetivos-de-aprendizaje)





***

## 1. ¿Que es md-links?
Es una librería ejecutable **CLI** instalable para cualquier proyecto, con la finalidad de validar links dentro un archivo markdown mostrando una estadística si lo solicitan.  

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
   
  ![inicio de md-links](https://user-images.githubusercontent.com/108588943/226356561-7dc8503f-6edc-412c-9517-da9d19463340.png)

   
   Solo se retona los links encontrados en el archivo o directorio. 
   
  ![segundo paso en md-links ](https://user-images.githubusercontent.com/108588943/226356639-eb371a87-77fd-470c-9b22-83a9f19864f5.png)

   
   Luego para validar se debe agregar la opcion `--validate`
   
  ![tercer paso en md-links](https://user-images.githubusercontent.com/108588943/226356741-ddbe435b-0515-4888-a3b7-2bc6f169527b.png)

 
   De la misma forma  con la opcion `--stats` se podra saber cuál es el total de links y los únicos.
   
  ![5to paso md-links](https://user-images.githubusercontent.com/108588943/226356803-541907dc-8900-4067-81f0-c5644c4836f8.png)

   
   Ingresando ambas opciones `--validate` `--stats` retornará : total , únicos y rotos. 
   
  ![4to paso de md-links](https://user-images.githubusercontent.com/108588943/226356893-f41e3483-5f97-4a1d-aa30-fd52f77dac3e.png)


 
 ## 4. Dependecias utilizadas 
    - colors: ^1.4.0
    - fetch: ^1.1.0
    - node-fetch : ^2.6.9



  ## 5. Diagrama de flujo con Drawio
![Diagrama de flujo md-links drawio](https://user-images.githubusercontent.com/108588943/226357020-0be48f82-4812-4984-b272-b8e220f98563.png)

