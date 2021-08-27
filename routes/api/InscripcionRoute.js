const express=require('express');
const router=express.Router();
const Inscripcion=require('../../database/Models/InscripcionModel');
const Usuarios = require('../../database/models/usuario');
const CursoModel=require('../../database/Models/CursoModel');

//Rutas
router.get('/',async(req,res)=>{
    const InscripcionModel= await Inscripcion.findAll(
        {
        where: {estadoInscripcion:'Activo' },
        include: [
            {
                model: CursoModel,
                attributes: ['nombreCurso']
            },
            {
                model: Usuarios,
                attributes: ['nombreUsuario']
            }
            ],
        attributes: ['idInscripcion','estadoInscripcion']
    });
    res.json(InscripcionModel);
    });
//CREATE
/*router.post('/', async (req, res) => {
     
    const  InscripcionModel = await Inscripcion.create(  {
        estadoInscripcion:req.body.estadoInscripcion,
        idCursoFK:req.body.idCursoFK
        
    });
    
     res.json({   InscripcionModel });
 });
*/

router.post('/', async (req, res) => {
     
    const  InscripcionModel = await Inscripcion.create(  {
        
        estadoInscripcion:req.body.estadoInscripcion,
        idCursoFK:req.body.idCursoFK,
        idUsuario:req.body.idUsuario
    });
    
         res.json(InscripcionModel);
          
     });
    

//READ -> /api/MetodoDePago/:idMetodoPago
router.get('/:idInscripcion', (req, res) => {
    Inscripcion.findByPk(req.params.idInscripcion, {
        include:
        {
            model: CursoModel,
            attributes: ['estadoCurso','nombreCurso','fechaInicialCurso','fechaFinalCurso','costoCurso','imagenCurso']
        }
    }).then(InscripcionREAD => {
        res.json(InscripcionREAD);
    });
});


// UPDATE
router.put('/:idInscripcion', async(req, res) => {
    const   InscripcionModel = await  Inscripcion.update({
        estadoInscripcion:req.body.estadoInscripcion,
    },{
        where: { idInscripcion: req.params.idInscripcion }
    });
    
     res.json({success:"requisitos Actualizado con exito"});
});
//DELETE /api/ InscripcionModel/:idInscripcion
router.delete('/:idInscripcion',(req,res)=>{
    Inscripcion.destroy({
        where:{
            idInscripcion:req.params.idInscripcion
        }
    }).then(InscripcionDELETE=>{
        res.json(InscripcionDELETE);
    });
});

module.exports=router;