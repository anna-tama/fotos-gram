"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autenticacion_1 = require("../middlewares/autenticacion");
const post_model_1 = require("../models/post.model");
const postRoutes = (0, express_1.Router)();
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
exports.default = postRoutes;
