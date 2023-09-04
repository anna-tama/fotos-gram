import { Response, NextFunction } from 'express'
import Token from '../classes/token';

export const verificaToken = (req: any, res: Response, next: NextFunction) => {
    
    const userToken = req.get('x-token') || '';

    Token.comprobarToken(userToken)
        .then((decoded: any) => {
            req.usuario = decoded.usuario;
            next(); //le dice a la aplicacición que puede continuar con el siguiente paso
        })
        .catch(err => {
            res.json({
                ok: false,
                mensaje: 'Token no es correcto'
            })
        })
}