"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autenticacion_1 = require("../middlewares/autenticacion");
const post_model_1 = require("../models/post.model");
const postRoutes = (0, express_1.Router)();
//Obtener POST paginados
postRoutes.get('/', async (req, res) => {
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;
    const posts = await post_model_1.Post.find()
        .sort({ _id: -1 }) //ordenar de forma descendente
        .skip(skip)
        .limit(10) //retorna los último 10 registros
        .populate('usuario', '-password') //retorna sin pass
        .exec();
    res.json({
        ok: true,
        pagina,
        posts
    });
});
//Crear POST
postRoutes.post('/', [autenticacion_1.verificaToken], (req, res) => {
    const body = req.body;
    body.usuario = req.usuario._id;
    post_model_1.Post.create(body).then(async (postDB) => {
        await postDB.populate('usuario', '-password'); //-password para no enviar la pass
        res.json({
            ok: true,
            post: postDB
        });
    })
        .catch(err => {
        res.json(err);
    });
});
//Servicio para subir archivos
postRoutes.post('/upload', [autenticacion_1.verificaToken], (req, res) => {
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subió ningún archivo'
        });
    }
    const file = req.files.image;
    if (!file) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subió ningún archivo - image'
        });
    }
    if (!file.mimetype.includes('image')) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subió ningún archivo de tipo image'
        });
    }
    res.json({
        ok: false,
        file: file.mimetype
    });
});
exports.default = postRoutes;
