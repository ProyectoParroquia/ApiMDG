const express=require('express');
const router=express.Router();
const Estado=require('../../database/models/EstadoModel');

//Rutas
//Metodo para Metodo de pago /api/MotodoDePago
router.get('/', async (req, res) => {
  const EstadoModel = await Estado.findAll()
  
  res.json(EstadoModel);
});

//crearrrrrrrrrrrrrrrrr
router.post('/', async (req, res) => {
     
   await Estado.create(  {
    nombreEstado: req.body.nombreEstado,
       
   }).catch(err=>{
       
        res.json({mensage:"error al crear el estado",err});
   });
   
   res.status(201).json({success:"Estado creado con exito"});
});

//READ -> /api/EstadoModel/:idEstado
//router.get('/:idEstado',(req,res)=>{
  //  EstadoModel.findByPk(req.params.idEstado)
    //                 .then( EstadoREAD=>{
     //                    res.json(EstadoREAD);
       //              });
//});
router.get('/:idEstado', async (req, res) => {
    const EstadoModel = await Estado.findByPk(req.params.idEstado);
    res.json(EstadoModel);
});

// UPDATE
router.put('/:idEstado', async(req, res) => {
    const  EstadoModel = await Estado.update({
        nombreEstado: req.body.nombreEstado,
        
    },{
        where: { idEstado: req.params.idEstado }
    });
    
    res.status(201).json({success:"Estado Actualizado con exito"});
});



//DELETE /api/MetodoDePago/:idMetodoPago
//router.delete('/:idEstado',(req,res)=>{
  //    where:{
    //        idEstado:req.params.idEstado
     //   }
    //}).then(EstadoDELETE =>{
      //  res.json(EstadoDELETE);
    //});
//});

router.delete('/:idEstado',(req,res)=>{
  Estado.destroy({
      where:{
        idEstado: req.params.idEstado
      }
  }).then(EstadoDELETE=>{
    res.status(201).json({succes: 'Estado eliminado con exito'});
  });
});
module.exports=router;