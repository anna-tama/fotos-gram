# Fotosgram-server

En este proyecto se creó el backend para la red social "Fotosgram-app". Utiliza Express como marco de aplicación web Node.js que proporciona un conjunto sólido de funciones para aplicaciones web y móviles. En tanto al  modelado de datos e intreacciones con la bd se optó por mongodb. La aplicación en términos generales permite hacer peticiones cors domain, recibir las peticiones de imágenes, autenticar la app mediante JSON Web Token y utiliza bcrypt para encriptar la contraseña de los usuarios. Finalmente permite la carga de archivos con express-fileupload.

## Tecnologías
- Node
- Express
- Mongodb
- JSON Web Token 

## Comandos
### Iniciar servidor local
El siguiente comando iniciará la base de datos:
> mongod

Para iniciar la servidor Node, ejecute:
> tsc
> node dist/

