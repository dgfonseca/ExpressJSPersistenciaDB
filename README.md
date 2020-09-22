# ExpressJSPersistenciaDB

La aplicación está implementada usando Express.js usando sequalize como persistencia de los datos. Se implementó una base de datos en sqlite3 ubicada en el directorio de bases de datos llamado reto.db. La implementación de la persistencia en base de datos está en el archivo users.js con su respectiva implementación de post, get, delete, put. El directorio de la base de datos debe cambiarse por el directorio en el computador que se está ejecutando la applicación. Para la prueba de el api rest se usó Postman. Las URL correspondientes són:

/db/chat/api/messages

El archivo index.js no es el adecuado para testear, está implementado usando persistencia en archivos JSON, lo cual no es el proposito de este taller.
Los packetes deben ser instalados por el usuario. Sequelize, Express, nodemon entre los indicados para el taller.
