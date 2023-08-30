import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const usuarioSchema: Schema<IUsuario> = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    avatar: {
        type: String,
        default: 'av-1.png'
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo electrónico es necesario']
    },
    password: {
        type: String,
        unique: true,
        required: [true, 'La contraseña es necesaria']
    }
});

usuarioSchema.method('compararPassword', function<Any>( password: string = ''):boolean{
    if(bcrypt.compareSync(password, this.password)){
        return true;
    }else{
        return false;
    } 
});

interface IUsuario extends Document {
    nombre: string;
    email: string;
    password: string;
    avatar: string;

    compararPassword(password: string): boolean;
}

const Usuario = model<IUsuario>('Usuario', usuarioSchema);

export { IUsuario, Usuario }
