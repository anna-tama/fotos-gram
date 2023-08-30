import { Schema, model } from "mongoose";

const usuarioSchema = new Schema({
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

interface IUsuario extends Document {
    nombre: string;
    email: string;
    password: string;
    avatar: string;
}

export const Usuario = model<IUsuario>('Usuario', usuarioSchema);
