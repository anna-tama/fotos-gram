"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uniqid_1 = __importDefault(require("uniqid"));
class FileSystem {
    constructor() { }
    guardarImagenTemporal(file, userId) {
        return new Promise((resolve, reject) => {
            //Crear carpetas
            const path = this.crearCarpetaUsuario(userId);
            //Nombre archivo
            const nombreArchivo = this.generarNombreUnico(file.name);
            //Mover el archivo del Temp a nuestra carpeta
            file.mv(`${path}/${nombreArchivo}`, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    crearCarpetaUsuario(userId) {
        const pathUser = path_1.default.resolve(__dirname, '../uploads/', userId);
        const pathUserTemp = path_1.default.resolve(pathUser + '/temp');
        const existe = fs_1.default.existsSync(pathUser);
        if (!existe) {
            console.log('no existe');
            fs_1.default.mkdirSync(pathUser);
            fs_1.default.mkdirSync(pathUserTemp);
        }
        return pathUserTemp;
    }
    imagenesDeTempHaciaPost(userId) {
        const pathTemp = path_1.default.resolve(__dirname, '../uploads/', userId, 'temp');
        const pathPost = path_1.default.resolve(__dirname, '../uploads/', userId, 'posts');
        if (!fs_1.default.existsSync(pathTemp)) {
            console.log('no existe temp');
            return [];
        }
        if (!fs_1.default.existsSync(pathPost)) {
            console.log('no existe posts');
            fs_1.default.mkdirSync(pathPost);
        }
        const imagenesTemp = this.obtenerImagenesEnTemp(userId);
        imagenesTemp.forEach(imagen => {
            console.log('imagenesTemp imagen', imagen);
            fs_1.default.renameSync(`${pathTemp}/${imagen}`, `${pathPost}/${imagen}`);
            console.log('antes', `${pathTemp}/${imagen}`);
            console.log('despues', `${pathPost}/${imagen}`);
        });
        return imagenesTemp;
    }
    obtenerImagenesEnTemp(userId) {
        const pathTemp = path_1.default.resolve(__dirname, '../uploads/', userId, 'temp');
        console.log('obtenerImagenesEnTemp pathTemp', pathTemp);
        return fs_1.default.readdirSync(pathTemp) || [];
    }
    generarNombreUnico(nombreOriginal) {
        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[nombreArr.length - 1];
        const idUnico = (0, uniqid_1.default)();
        return `${idUnico}.${extension}`;
    }
    getFotoUrl(userId, img) {
        //path posts
        const pathFoto = path_1.default.resolve(__dirname, '../uploads/', userId, 'posts', img);
        //si la img existe
        const existe = fs_1.default.existsSync(pathFoto);
        if (!existe) {
            return path_1.default.resolve(__dirname, '../assets/400x250.jpg');
        }
        return pathFoto;
    }
}
exports.default = FileSystem;
