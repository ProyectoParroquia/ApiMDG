const router = require('express').Router();

const Credenciales = require('../../database/models/credenciales');
const Usuarios = require('../../database/models/usuario');
const helperEmail = require('../../helpers/SendEmailHelper')

const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('jwt-simple');
const middelwares = require('../middelwares');


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
             res.json({error:"Error en usuario o contraseña" });
        }
    } else {
         res.json({error:"Error en usuario o contraseña" });
    }
});

router.post('/solicitudContra', async(req, res) => {

    const usuario = await Usuarios.findOne(
        {
            where: {correoUsuario:req.body.correoSoli },
            include:{
                model: Credenciales,
                attributes: ['idUsuario']
            },
            attributes: [ 'nombreUsuario', 'correoUsuario']
        })
        
     if(!usuario){
          res.json({error:"Algo salio mal!!"});
     }   
    let tokenLinkContra = createTokenPass(usuario.credencial.idUsuario) 
    
    let para = usuario.correoUsuario;
    let asunto = 'SACRIS: Cambio de contraseña'
    let msj = `
            <div>
                <h2>¡¡ CAMBIA AQUI TU CONTRASEÑA, ${usuario.nombreUsuario} !!</h2>
                <hr>
                
                <p>Dar clic en el link para conpeltar el cambio de su contraseña</p>
                <a href="http://localhost:8080/pages/RestablecerContra?tokenpass=${tokenLinkContra}">Crear Nueva Contraseña.</a>
            </div>
            `
        
    helperEmail.enviarCorreo(para,asunto,msj); 
    res.json("Se ha enviado un correo para restablecer la contraseña");
});

router.put('/restablecercontra',middelwares.VTokenContra, async(req,res)=>{
   //desestructuracion de objeto body
    let { nuevaContraseña } = req.body
    nuevaContraseña = bcrypt.hashSync(nuevaContraseña, 10)

    await Credenciales.update({
        password: nuevaContraseña
    },{
        where:{ idUsuario: req.idCredencial}
    }).catch((e)=>{
         res.json({error:"Algo A Salido Mal"});
    })

    res.status(201).json({success:"Contraseña Cambiada Con Exito"});
})

router.put('/cambioContra', async (req, res) => {
    //desestructuracion de objeto body
    let {idUsu, contraseñaActual, nuevaContraseña } = req.body
    let credencial = await Credenciales.findOne({
        where: { idUsuario_FK: idUsu }
    })
    if(!bcrypt.compareSync(contraseñaActual, credencial.password)){
        res.json({error:"Error! esa no es tu contraseña actual. Intenta de nuevo"});
    }else{
        
    nuevaContraseña = bcrypt.hashSync(nuevaContraseña, 10)
        
    await Credenciales.update({
        password: nuevaContraseña
    },{
        where:{ idUsuario: credencial.idUsuario}
     }).catch((e) => {
        
         res.json({error:"Algo A Salido Mal"});
     })
        
    res.status(201).json({ success: "Contraseña Cambiada Con Exito" });

    }
}) 


const createTokenPass = (idCredencial) => {
    const payload = {
        idCredencial: idCredencial,
        createAt: moment().unix(),
        expiredAt: moment().add(24,'hours').unix()
    }

    return jwt.encode(payload, 'SACRIS');
}
const createToken = (usuario) => {
    const payload = {
        idUsu: usuario.idUsuario,
        nombre: usuario.nombreUsuario,
        tipoUsuario: usuario.idTipoUsuario_FK,
        createAt: moment().unix(),
        expiredAt: moment().add(45,'minutes').unix()
    }
    return jwt.encode(payload, 'SACRIS');
}


module.exports = router;