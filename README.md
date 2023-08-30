tsc -w         typescript compiler en modo observador
nodemon dist/

Instalación para el server
npm install express             Permite crear un srv web y montar un srv REST
npm install body-parser         Permite recibir la info de post y transformarlo en un obj js
npm install cors                Permite hacer peticiones cors domain
npm install mongoose            Permite trabajar con el modelado de datos por parte de node y hacer interacciones con la bd
npm install express-fileupload  Permite recibir recibir las peticiones de img que voy a recibir de ionic
npm install jsonwebtoken        Permite la autenticación de la app mediante web tocken
npm install bcrypt              Permite encriptar las pass de los usuarios

--Instalación en una sola línea
npm install express body-parser cors mongoose express-fileupload jsonwebtoken bcrypt

npm i --save-dev @types/express  Me saca las dependencias de desarrollo en prod

--Levantar bd
mongod
npm i @types/mongoose --save-dev