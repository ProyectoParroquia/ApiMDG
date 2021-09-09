const router = require('express').Router();

const TipoDoc = require('../../database/models/tipoDoc');
const middelware = require('../middelwares');

//Consulta X id Para la Actualizacion
router.get('/id/:idTipoDoc', async (req, res) => {
    const tipoDoc = await TipoDoc.findByPk(req.params.idTipoDoc)
     res.json(tipoDoc);
})

//consultar todos los tipoDoc
router.get('/', async (req, res) => {
    const tipoDocumento = await TipoDoc.findAll().catch(err=>{
       
        res.json({mensage:"error al Consultar los Tipos de Documento",err});
   });;
     res.json(tipoDocumento);
});


// CREATE 
router.post('/',middelware.comprobarFeligres, async (req, res) => {
     
   const tipoDocumento = await TipoDoc.create(  {
       denominacionTipoDocumento: req.body.denominacionTipoDocumento,
       
   }).catch(err=>{
       
        res.json({mensage:"error al CREAR el tipo de Docuemnto",err});
   });;
   
    res.status(201).json({ success:"Tipo Documento agregado Correctamente" });
});

// UPDATE
router.put('/actualizar/:idTiDoc',middelware.comprobarFeligres, async(req, res) => {
    const tipoDocumento = await TipoDoc.update({
        denominacionTipoDocumento: req.body.denominacionTipoDocumento,
        
    },{
        where: { idTipoDocumento: req.params.idTiDoc }
    }).catch(err=>{
       
        res.json({mensage:"error al EDITAR el tipo de Documento",err});
   });
    
     res.status(201).json({success:"Tipo Documento Actualizado con exito"});
});

router.delete('/:idTiDoc',middelware.comprobarFeligres, async(req, res) => {
    await TipoDoc.destroy({
        where: { idTipoDocumento: req.params.idTiDoc}
    }).catch(err=>{
       
        res.json({mensage:"error al ELIMINAR el tipo de Documento",err});
   });
     res.status(201).json({success: 'Tipo Documento eliminado con exito'});
});
module.exports = router;