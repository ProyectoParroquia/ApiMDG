const express=require('express');
const router=express.Router();
const Curso=require('../../database/models/CursoModel');
const Requisito=require('../../database/models/RequisitosModel');
const CursoRequisito=require('../../database/models/CursoRequisitoModel');
const InscriRequi = require('../../database/models/InscriRequiModel');
const middelware = require('../middelwares');

//Rutas

router.get('/',async(req,res)=>{
const CursoRequisitoModel= await CursoRequisito.findAll(
    {
    include: [
        {      model: Curso,
            attributes: ['estadoCurso','nombreCurso','fechaInicialCurso','fechaFinalCurso','costoCurso','imagenCurso']
       
        },
        { model: Requisito,
            attributes: ['nombreRequisitos']
        },

        ],
    attributes: ['idCursoRequisito']
});
res.json(CursoRequisitoModel);
});


router.post('/', middelware.checkToken,middelware.comprobarFeligres, async (req, res) => {
     
 
    await CursoRequisito.create(  {
        
        idCursoFK:req.body.idCursoFK,
        idRequisitosFK:req.body.idRequisitosFK,
    });
    
    res.status(201).json({success:"Asignación de requisito con exito"});
          
     });
    
 
//READ -
router.get('/:idCursoRequisito', (req, res) => {
    CursoRequisito.findByPk(req.params.idCursoRequisito, {
        include: [
            {   model: Curso,
                attributes: ['estadoCurso','nombreCurso','fechaInicialCurso','fechaFinalCurso','costoCurso','imagenCurso']
            },
            {
                model: Requisito,
                attributes: ['nombreRequisitos']
            },
            { model: InscriRequi,
                attributes: ['urlRequisito']
            }
            ],
    }).then( CursoRequisitoREAD => {
        res.json(CursoRequisitoREAD);
    });
});

//UPDATE  
router.put('/:idCursoRequisito', middelware.checkToken,middelware.comprobarFeligres,(req,res)=>{
    CursoRequisito.update({
        idCursoFK:req.body.idCursoFK,
        idRequisitosFK:req.body.idRequisitosFK
     
    },{
        where:{
            idCursoRequisito:req.params.idCursoRequisito
        }
    }).then(CursoRequisitoPUT=>{
        res.json(CursoRequisitoPUT);
    });
});

//DELETE 
router.delete('/:idCursoRequisito',middelware.checkToken,middelware.comprobarFeligres,(req,res)=>{
    CursoRequisito.destroy({
        where:{
            idCursoRequisito:req.params.idCursoRequisito
        }
    }).then(CursoRequisitoDELETE=>{
        res.json(CursoRequisitoDELETE);
    });
});

module.exports=router;