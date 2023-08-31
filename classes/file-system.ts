import { FileUpload } from "../interfaces/file-upload";

import path from "path";
import fs from "fs";
import uniqid from "uniqid";


export default class FileSystem {

    constructor() { }

    guardarImagenTemporal(file: FileUpload, userId: string) {

        return new Promise<void>((resolve, reject) => {

            //Crear carpetas
            const path = this.crearCarpetaUsuario(userId);

            //Nombre archivo
            const nombreArchivo = this.generarNombreUnico(file.name);

            //Mover el archivo del Temp a nuestra carpeta
            file.mv(`${path}/${nombreArchivo}`, (err: any) => {

                if (err) {
                    reject(err)
                } else {
                    resolve();
                }
            })
        })
    }

    private crearCarpetaUsuario(userId: string) {
        const pathUser = path.resolve(__dirname, '../uploads/', userId);
        const pathUserTemp = path.resolve(pathUser + '/temp')


        const existe = fs.existsSync(pathUser);

        if (!existe) {
            console.log('no existe')
            fs.mkdirSync(pathUser);
            fs.mkdirSync(pathUserTemp);
        }
        return pathUserTemp;
    }

    imagenesDeTempHaciaPost(userId: string) {
        const pathTemp = path.resolve(__dirname, '../uploads/', userId, 'temp');
        const pathPost = path.resolve(__dirname, '../uploads/', userId, 'posts');

        if (!fs.existsSync(pathTemp)) {
            console.log('no existe temp')
            return []
        }

        if (!fs.existsSync(pathPost)) {
            console.log('no existe posts')
            fs.mkdirSync(pathPost);
        }

        const imagenesTemp = this.obtenerImagenesEnTemp(userId);
        imagenesTemp.forEach(imagen => {
            console.log('imagenesTemp imagen', imagen)
            fs.renameSync(`${pathTemp}/${imagen}`, `${pathPost}/${imagen}`)

            console.log('antes', `${pathTemp}/${imagen}`)
            console.log('despues', `${pathPost}/${imagen}`)

        })

        return imagenesTemp;

    }

    private obtenerImagenesEnTemp(userId: string) {
        const pathTemp = path.resolve(__dirname, '../uploads/', userId, 'temp');
        console.log('obtenerImagenesEnTemp pathTemp', pathTemp)
        return fs.readdirSync(pathTemp) || [];
    }

    private generarNombreUnico(nombreOriginal: string) {
        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[nombreArr.length - 1];

        const idUnico = uniqid();

        return `${idUnico}.${extension}`;
    }
}