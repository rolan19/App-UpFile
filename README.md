# API DE SUBIDAS DE ARCHIVOS

| EndPoint       | HTTP       | COMENTARIO                                      | URL                                 |
| -------------- | ---------- | ----------------------------------------------- | ----------------------------------- |
| /api/upload    | GET        | Este es un html                                 | http://localhost:4000/api/upload    |
| /api/          | GET        | Ese te muestra todos los EndPoint               | http://localhost:4000/api           |
| /api/files/    | GET        | Este devuelve todo los usuarios con un archivo. | http://localhost:4000/api/files     |
| /api/files/:ID | GET/:ID    | Este devuelve un usuario en especifico.         | http://localhost:4000/api/files/:id |
| /api/files/    | POST       | Este crea un usuario con nombre y un archivo.   | http://localhost:4000/api/files     |
| /api/files/:ID | PUT/:ID    | Este actualiza un elemento.                     | http://localhost:4000/api/files/:id |
| /api/files/:ID | DELETE/:ID | Elimina un elemento.                            | http://localhost:4000/api/files/:id |

## Los campos que recibe para crear:

## FILES

> > image
>
> > title
