const express=require('express');
const router=express.Router();
const Inscripcion=require('../../database/models/InscripcionModel');
const Curso=require('../../database/models/CursoModel');
const Estado=require('../../database/models/EstadoModel');
//counts
router.get('/R',async(req,res)=>{
    const InscripcionModel= await Inscripcion.count(
  )
  res.json(InscripcionModel);
  });

  router.get('/PR',async(req,res)=>{
    const InscripcionModel= await Inscripcion.count(
        {
        where: {idEstadoFK: 1 }
        }
    )
    res.json(InscripcionModel);
});
//Rutas
router.get('/',async(req,res)=>{
    const InscripcionModel= await Inscripcion.findAll(
        {
        where: {idEstadoFK:1},
        include: [
            
               { model: Curso,
                attributes: ['nombreCurso'],
               },{
                model: Estado,
                attributes: ['nombreEstado']
               }
    
            ],
        attributes: ['idInscripcion','fechaInscripcion', 'idEstadoFK', 'idCursoFK'] });
    res.json(InscripcionModel);
    });
    //max
    router.get('/max',async(req,res)=>{
        const InscripcionModel= await Inscripcion.max(
                'idInscripcion');
        res.json(InscripcionModel);
        });
//cancelar
router.get('/cancelado',async(req,res)=>{
    const InscripcionModel= await Inscripcion.findAll(
        {
        where: {idEstadoFK:4},
        include: [
            { model: Curso,
                attributes: ['nombreCurso'],
               },{
                model: Estado,
                attributes: ['nombreEstado']
               }
            ],
        attributes: ['idInscripcion','fechaInscripcion','idEstadoFK'] });
    res.json(InscripcionModel);
    });
    //
    router.get('/Inscrito',async(req,res)=>{
        const InscripcionModel= await Inscripcion.findAll(
            {
            where: {idEstadoFK:2},
            include: [
                { model: Curso,
                    attributes: ['nombreCurso'],
                   },{
                    model: Estado,
                    attributes: ['nombreEstado']
                   }
                ],
            attributes: ['idInscripcion','fechaInscripcion','idEstadoFK'] });
        res.json(InscripcionModel);
        });
        //INCOMPLETO
        router.get('/Incompleto',async(req,res)=>{
            const InscripcionModel= await Inscripcion.findAll(
                {
                where: {idEstadoFK:3},
                include: [
                    { model: Curso,
                        attributes: ['nombreCurso'],
                       },{
                        model: Estado,
                        attributes: ['nombreEstado']
                       }
                    ],
                attributes: ['idInscripcion','fechaInscripcion','idEstadoFK'] });
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
        
       
        idCursoFK:req.body.idCursoFK,
        fechaInscripcion:req.body.fechaInscripcion
    });
    
    res.status(201).json({success:"Inscripción creada con exito"});
          
     });
    

//READ -> /api/MetodoDePago/:idMetodoPago
router.get('/:idInscripcion', (req, res) => {
    Inscripcion.findByPk(req.params.idInscripcion, {
        include:
        {
            model: Curso,
            attributes: ['nombreCurso']
            ,
                model: Estado,
                attributes: ['nombreEstado']
        }
    }).then(InscripcionREAD => {
        res.json(InscripcionREAD);
    });
});




// UPDATE
router.put('/:idInscripcion', async(req, res) => {
    const   InscripcionModel = await  Inscripcion.update({
        idEstadoFK:req.body.idEstadoFK
        
    },{
        where: { idInscripcion: req.params.idInscripcion }
    });
    
     res.status(201).json({success:"Inscripción Actualizada con exito"});
});
//DELETE /api/ InscripcionModel/:idInscripcion
router.delete('/:idInscripcion',(req,res)=>{
    Inscripcion.destroy({
        where:{
            idInscripcion:req.params.idInscripcion
        }
    }).then(InscripcionDELETE=>{
        res.status(201).json({success:"Inscripción eliminada con exito"});
    });
});



module.exports=router;