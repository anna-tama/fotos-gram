import { Router, Response } from "express";
import { verificaToken } from "../middlewares/autenticacion";
import { Post } from "../models/post.model";
import { FileUpload } from "../interfaces/file-upload";
import FileSystem from "../classes/file-system";

const postRoutes = Router();
const fileSystem = new FileSystem();



//Obtener POST paginados
postRoutes.get('/', async (req: any, res: Response) => {

    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;

    const posts = await Post.find()
        .sort({ _id: -1 }) //ordenar de forma descendente
        .skip(skip)
        .limit(10) //retorna los último 10 registros
        .populate('usuario', '-password') //retorna sin pass
        .exec();

    res.json({
        ok: true,
        pagina,
        posts
    })

});

//Crear POST
postRoutes.post('/', [verificaToken], (req: any, res: Response) => {

    const body = req.body;
    body.usuario = req.usuario._id;

    Post.create(body).then(async postDB => {

        await postDB.populate('usuario', '-password'); //-password para no enviar la pass

        res.json({
            ok: true,
            post: postDB
        })
    })
        .catch(err => {
            res.json(err)
        })
})

//Servicio para subir archivos
postRoutes.post('/upload', [verificaToken], (req: any, res: Response) => {
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subió ningún archivo'
        })
    }

    const file: FileUpload = req.files.image;

    if (!file) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subió ningún archivo - image'
        })
    }

    if (!file.mimetype.includes('image')) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subió ningún archivo de tipo image'
        })
    }

    fileSystem.guardarImagenTemporal(file, req.usuario._id);


    res.json({
        ok: true,
        file: file.mimetype
    })

})

export default postRoutes;