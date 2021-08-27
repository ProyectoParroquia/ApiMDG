
const router = require('express').Router();

const TipoUsu = require('../../database/models/tipoUsuario');
const Usuarios = require('../../database/models/usuario');
const bcrypt = require('bcryptjs')

//Consulta X id Para la Actualizacion
router.get('/id/:idTiUsuario', async (req, res) => {
    const tipoUsuario = await TipoUsu.findByPk(req.params.idTiUsuario) 
     res.json(tipoUsuario);
})

//consultar todos los tipoUsuario
router.get('/', async (req, res) => {
    const tipoUsuario = await TipoUsu.findAll().catch(err=>{
       
        res.json({mensage:"error al Consultar los Tipos de Usuarios",err});
   });
     res.json(tipoUsuario);
});


// CREATE 
router.post('/', async (req, res) => {
     
   const tipoUsuario = await TipoUsu.create(  {
       nombreTipoUsuario: req.body.nombreTipoUsuario,
       
   }).catch(err=>{
       
        res.json({mensage:"error al CREAR los Tipos de Usuarios",err});
   });
   
    res.status(201).json({success:"Tipo Usuario creado con exito"});
});

// UPDATE
router.put('/actualizar/:idTiUsuario', async(req, res) => {
    const tipoUsuario = await TipoUsu.update({
        nombreTipoUsuario: req.body.nombreTipoUsuario,
        
    },{
        where: { idTipoUsuario: req.params.idTiUsuario }
    }).catch(err=>{
       
        res.json({mensage:"error al EDITAR el tipo de Usuario",err});
   });
    
     res.status(201).json({success:"Tipo Usuario Actualizado con exito"});
});



router.delete('/:idTiUsuario', async(req, res) => {
    await TipoUsu.destroy({
        where: { idTipoUsuario: req.params.idTiUsuario}
    }).catch(err=>{
       
        res.json({mensage:"error al ELIMINAR el tipo de Usuario",err});
   });
     res.status(201).json({success: 'Tipo Usuario eliminado con exito'});
});
module.exports = router;