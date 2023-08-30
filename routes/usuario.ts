import { Router, Request, Response } from "express";
import { IUsuario, Usuario } from "../models/usuario.model";
import bcrypt from 'bcrypt';
import Token from "../classes/token";
import { verificaToken } from "../middlewares/autenticacion";

const userRoutes = Router();

//Login
userRoutes.post('/login', async (req: Request, res: Response) => {

    try {
        const body = req.body;
        const userDB = await Usuario.findOne({ email: body.email }, 'password').exec();
        console.log(userDB);
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'Usuario/Contraseña no son correctos'
            });
        }

        console.log(userDB);

        if (bcrypt.compareSync(body.password, userDB.password)) {

            const tokenUser = Token.getJwtToken({
                _id: userDB.id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar
            });

            res.json({
                ok: true,
                token: tokenUser
            });

        } else {

            return res.json({
                ok: false,
                mensaje: 'Usuario/Contraseña no son correctoS ***'
            });
        }
    } catch (err) {
        throw err;
    }

});

//Crear usuarios
userRoutes.post('/create', (req: Request, res: Response) => {

    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        avatar: req.body.avatar,
    }

    Usuario.create(user).then(userDB => {

        const tokenUser = Token.getJwtToken({
            _id: userDB.id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
        });

        res.json({
            ok: true,
            token: tokenUser
        });

    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    })
})

//Actualizar usuarios
userRoutes.post('/update', verificaToken, (req: any, res: Response) => {
    res.json({
        ok: true,
        usuario: req.usuario
    })
})

export default userRoutes;