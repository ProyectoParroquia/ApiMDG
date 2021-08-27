const router = require('express').Router();
const TipoServicio= require('../../database/models/tipoServicio')


//Rutas
//Metodo para Metodo de pago /api/MotodoDePago
router.get('/', async (req, res) => {
    const tipoServicio = await TipoServicio.findAll();
    res.json(tipoServicio);
});

//crearrrrrrrrrrrrrrrrr
router.post('/', async (req, res) => {
     
   const tipoServicio = await TipoServicio.create(  {
    denominacionServicio: req.body.denominacionServicio,
       
   });
   
    res.json({  tipoServicio });
});

//READ -> /api/TipoCursoModel/:idTipoCurso
//router.get('/:idTipoCurso',(req,res)=>{
  //  TipoCursoModel.findByPk(req.params.idTipoCurso)
    //                 .then( tipocursoREAD=>{
     //                    res.json(tipocursoREAD);
       //              });
//});
router.get('/:idTiServicio', async (req, res) => {
    const TipoCursoModel = await TipoServicio.findByPk(req.params.idTiServicio);
    res.json(TipoCursoModel);
});

// UPDATE
router.put('/:idTiServicio', async(req, res) => {
    const  tipoServicio = await TipoServicio.update({
        denominacionServicio: req.body.denominacionServicio,
        
    },{
        where: { idTipoServicio: req.params.idTiServicio }
    });
    
     res.json({success:"Tipo Servicio Actualizado con exito"});
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

router.delete('/:idTipoServicio',(req,res)=>{
  TipoServicio.destroy({
      where:{
        idTipoServicio: req.params.idTipoServicio
      }
  }).then( TipoServicioDELETE=>{
      res.json({succes: 'Tipo Servicio eliminado con exito'});
  });
});
module.exports=router;
