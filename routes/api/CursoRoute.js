const express=require('express');
const router=express.Router();
const CursoModel=require('../../database/Models/CursoModel');
const TipoCursoModel=require('../../database/Models/TipoCursoModel');

//Rutas

router.get('/',async(req,res)=>{
const CursoModel= await Curso.findAll(
    {
    where: {estadoCurso:'Activo' },
    include: [
        {
            model: TipoCurso,
            attributes: ['nombreTipoCurso']
        }
        ],
    attributes: ['idCurso','estadoCurso','nombreCurso','fechaInicialCurso','fechaFinalCurso','costoCurso','imagenCurso']
});
res.json(CursoModel);
});


router.post('/', async (req, res) => {
     
    const  CursoModel = await Curso.create(  {
        
        estadoCurso:req.body.estadoCurso,
        nombreCurso:req.body.nombreCurso,
        fechaInicialCurso:req.body.fechaInicialCurso,
        fechaFinalCurso:req.body.fechaFinalCurso,
        costoCurso:req.body.costoCurso,
        imagenCurso:req.body.imagenCurso,
        idTipoCursoFK:req.body. idTipoCursoFK
    });
    
         res.json(CursoModel);
          
     });
    
 
//READ -
router.get('/:idCurso', (req, res) => {
    Curso.findByPk(req.params.idCurso, {
        include:
        {
            model: TipoCurso,
            attributes: ['nombreTipoCurso']
        }
    }).then(cursoREAD => {
        res.json(cursoREAD);
    });
});

//UPDATE  /api/DonacionEconomica/:idDonacionEconomica
router.put('/:idCurso',(req,res)=>{
    Curso.update({
        estadoCurso:req.body.estadoCurso,
        nombreCurso:req.body.nombreCurso,
        fechaInicialCurso:req.body.fechaInicialCurso,
        fechaFinalCurso:req.body.fechaFinalCurso,
        costoCurso:req.body.costoCurso,
        imagenCurso:req.body.imagenCurso,
        idTipoCursoFK:req.body. idTipoCursoFK
     
    },{
        where:{
            idCurso:req.params.idCurso
        }
    }).then(cursoPUT=>{
        res.json(cursoPUT);
    });
});

//DELETE /api/DonacionEconomica/:idDonacionEconomica
router.delete('/:idCurso',(req,res)=>{
    Curso.destroy({
        where:{
            idCurso:req.params.idCurso
        }
    }).then(cursoDELETE=>{
        res.json(cursoDELETE);
    });
});

module.exports=router;