const express=require('express');
const router=express.Router();
const TipoCurso=require('../../database/models/TipoCursoModel');

//Rutas
//Metodo para Metodo de pago /api
router.get('/', async (req, res) => {
    const tipoCurso = await TipoCurso.findAll();
    res.json(tipoCurso);
});

//crearrrrrrrrrrrrrrrrr
router.post('/', async (req, res) => {
     
   const TipoCursoModel = await TipoCurso.create(  {
    nombreTipoCurso: req.body.nombreTipoCurso,
       
   });
   
   res.status(201).json({success:"Tipo Curso creado con exito"});
});

//READ -> /api/TipoCursoModel/:idTipoCurso
//router.get('/:idTipoCurso',(req,res)=>{
  //  TipoCursoModel.findByPk(req.params.idTipoCurso)
    //                 .then( tipocursoREAD=>{
     //                    res.json(tipocursoREAD);
       //              });
//});
router.get('/:idTipoCurso', async (req, res) => {
    const TipoCursoModel = await TipoCurso.findByPk(req.params.idTipoCurso);
    res.json(TipoCursoModel);
});

// UPDATE
router.put('/:idTipoCurso', async(req, res) => {
    const  TipoCursoModel = await TipoCurso.update({
        nombreTipoCurso: req.body.nombreTipoCurso,
        
    },{
        where: { idTipoCurso: req.params.idTipoCurso }
    });
    
    res.status(201).json({success:"Tipo Curso Actualizado con exito"});
});



//DELETE /api/MetodoDePago/:idMetodoPago
//router.delete('/:idTipoCurso',(req,res)=>{
  //    where:{
    //        idTipoCurso:req.params.idTipoCurso
     //   }
    //}).then(tipocursoDELETE =>{
      //  res.json(tipocursoDELETE);
    //});
//});

router.delete('/:idTipoCurso',(req,res)=>{
  TipoCurso.destroy({
      where:{
        idTipoCurso: req.params.idTipoCurso
      }
  }).then(TipoCursoDELETE=>{
    res.status(201).json({succes: 'Tipo CURSO eliminado con exito'});
  });
});
module.exports=router;