import bodyParser from "body-parser";
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';

import Server from "./classes/server";

import userRoutes from "./routes/usuario";
import postRoutes from "./routes/posts";

const server = new Server();

//Body parser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json()); //la informacion de los posteos pasa por un json

//FileUpload
server.app.use(fileUpload());

//Rutas de mi app
server.app.use('/user', userRoutes)
server.app.use('/posts', postRoutes)


//Conectar DB
mongoose.connect('mongodb://localhost:27017/fotosgram')
    .then(() => console.log('BD conectada'))
    .catch((error: any) => handleErrorConnection(error));

//Levantar express
server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.port}`);
});

function handleErrorConnection(error: any): any {
    throw new Error("Error al conectar BD");
}
