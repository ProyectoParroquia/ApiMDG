const router = require('express').Router();

const Credenciales = require('../../database/models/credenciales');
const Usuarios = require('../../database/models/usuario');

const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('jwt-simple');


router.post('/login', async(req, res) => {
    const credencial = await Credenciales.findOne({ where: { username: req.body.username } });
    if (credencial) {
        const igual = bcrypt.compareSync(req.body.password, credencial.password);
        if (igual) {
            if (credencial.estado) {
                const usuario = await Usuarios.findOne({ where: { idUsuario: credencial.idUsuario_FK  } });
                
                res.status(201).json({ success: createToken(usuario) }); 
            } else {
                 res.json({error:"No Se Puede Acceder Al Sistema Usuario Inactivo"});
            }
        } else {
             res.json({error:"error en usuario o contraseña" });
        }
    } else {
         res.json({error:"error en usuario o contraseña" });
    }
});

const createToken = (usuario) => {
    const payload = {
        nombre: usuario.nombreUsuario,
        tipoUsuario: usuario.idTipoUsuario_FK,
        createAt: moment().unix(),
        expiredAt: moment().add(45,'minutes').unix()
    }
    return jwt.encode(payload, 'SACRIS');
}


module.exports = router;