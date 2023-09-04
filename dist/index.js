"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const server_1 = __importDefault(require("./classes/server"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const posts_1 = __importDefault(require("./routes/posts"));
const server = new server_1.default();
//Body parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json()); //la informacion de los posteos pasa por un json
//FileUpload
server.app.use((0, express_fileupload_1.default)({ useTempFiles: true }));
//Rutas de mi app
server.app.use('/user', usuario_1.default);
server.app.use('/posts', posts_1.default);
//Conectar DB
mongoose_1.default.connect('mongodb://localhost:27017/fotosgram')
    .then(() => console.log('BD conectada'))
    .catch((error) => handleErrorConnection(error));
//Levantar express
server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.port}`);
});
function handleErrorConnection(error) {
    throw new Error("Error al conectar BD");
}
