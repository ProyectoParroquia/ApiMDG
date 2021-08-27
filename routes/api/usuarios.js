
const router = require('express').Router();

const moment = require('moment');
const Usuarios = require('../../database/models/usuario');
const Credenciales = require('../../database/models/credenciales');
const TipoUsu = require('../../database/models/tipoUsuario');
const bcrypt = require('bcryptjs');
const tipoDoc = require('../../database/models/tipoDoc');

//Consulta X id Para la Actualizacion
router.get('/id/:idUsuario', async (req, res) => {
    const usuario = await Usuarios.findByPk(req.params.idUsuario, {
        include: {
            model: Credenciales,
            attributes: ['username']
            },
        attributes: ['idUsuario','nombreUsuario','apellidoUsuario','correoUsuario','numeroDocumentoUsuario','fechaNacimientoUsuario', 'idTipoDoc_FK', 'estadoUsuario']
    }) 
     res.json(usuario);
})

//consultar todos los usuarios
router.get('/', async(req, res) => {
    const usuarios = await Usuarios.findAll(
        {
        where: {estadoUsuario:'Activo' },
        include: [{
            model: Credenciales,
            attributes: ['username']
            },
            {
                model: TipoUsu,
                attributes: ['nombreTipoUsuario']
            },
            {
                model: tipoDoc,
                attributes: ['denominacionTipoDocumento']    
            }
            ],
        attributes: ['idUsuario','nombreUsuario','apellidoUsuario','correoUsuario','numeroDocumentoUsuario','fechaNacimientoUsuario']
    }).catch(err=>{
       
        res.json({mensage:"error al Consultar los Usuarios",err});
   });
   
     res.json(usuarios);
});

router.get('/inactivos', async (req, res) => {
    const usuarios = await Usuarios.findAll(
        {
        where: {estadoUsuario:'Inactivo' },
        include: [{
            model: Credenciales,
            attributes: ['username']
            },
            {
                model: TipoUsu,
                attributes: ['nombreTipoUsuario']
            },
            {
                model: tipoDoc,
                attributes: ['denominacionTipoDocumento']    
            }
            ],
        attributes: ['idUsuario','nombreUsuario','apellidoUsuario','correoUsuario','numeroDocumentoUsuario','fechaNacimientoUsuario']
    }).catch(err=>{
       
        res.json({mensage:"error al Consultar los Usuarios",err});
   });
   
     res.json(usuarios);
});


// CREATE 
router.post('/', async (req, res) => {
   req.body.password = bcrypt.hashSync(req.body.password, 10);
   const ussernames = await Credenciales.findAll({where: {username:req.body.username }});
   
   console.log(ussernames)
    if(ussernames == false){
   const usuario = await Usuarios.create(  {
       nombreUsuario: req.body.nombreUsuario,
       apellidoUsuario: req.body.apellidoUsuario,
       correoUsuario: req.body.correoUsuario,
       numeroDocumentoUsuario: req.body.numeroDocumentoUsuario,
       fechaNacimientoUsuario: req.body.fechaNacimientoUsuario,
       idTipoDoc_FK: req.body.idTipoDoc_FK
   }).catch(err=>{
       
        res.json({mensage:"error al crear el Usuario",err});
   });
   const credencial = Credenciales.create({
       username: req.body.username,
       password: req.body.password,
       idUsuario_FK: usuario.idUsuario
   });
    
    res.status(201).json({ usuario, success:'Usuario Creado Con Exito' });
     }else{
         res.json({err:"El username ya existe"});
    }
    });


// UPDATE
router.put('/actualizar/:idUsuario', async (req, res) => {

    const usuario = await Usuarios.update({
        nombreUsuario: req.body.nombreUsuario,
        apellidoUsuario: req.body.apellidoUsuario,
        correoUsuario: req.body.correoUsuario,
        numeroDocumentoUsuario: req.body.numeroDocumentoUsuario,
        fechaNacimientoUsuario: req.body.fechaNacimientoUsuario,
         idTipoDoc_FK: req.body.idTipoDoc_FK
    },{
        where: { idUsuario: req.params.idUsuario }
    }).catch(err=>{
       
        res.json({mensage:"error al actualizar el Usuario",err});
   });
    const credencial = Credenciales.update({
        username: req.body.username
    }, {
        where: { idUsuario_FK: req.params.idUsuario }
    });

        res.status(201).json({ success: "Usuario Actualizado con exito" });

});

//CAMBIAR TIPO USU
router.put('/tipoUsu/:idUsuario', async(req, res) => {
    const usuario = await Usuarios.update({
        idTipoUsuario_FK: req.body.idTipoUsuario_FK
    }, {
        where: { idUsuario: req.params.idUsuario }
    }).catch(err=>{
       
        res.json({mensage:"error al Editar el tipo de usuario del Usuario",err});
   });
     res.status(201).json({success:'Tipo De Usuario Cambiado Con Exito'});
});




// INHABILITAR
router.put('/inhabilitar/:idUsuario', async(req, res) => {
    const usuario = await Usuarios.update({
        estadoUsuario : 'Inactivo'
    }, {
        where: { idUsuario: req.params.idUsuario }
    });
    const credencial = await Credenciales.update({
        estado : false
    }, {
        where: { idUsuario_FK: req.params.idUsuario}
    });

     res.status(201).json({success: 'El Usuario a sido inactivado'});
});
// Activar
router.put('/activar/:idUsuario', async(req, res) => {
    const usuario = await Usuarios.update({
        estadoUsuario : 'Activo'
    }, {
        where: { idUsuario: req.params.idUsuario }
    });
    const credencial = await Credenciales.update({
        estado : true
    }, {
        where: { idUsuario_FK: req.params.idUsuario}
    });

     res.status(201).json({success: 'El Usuario a sido activado'});
});

module.exports = router;