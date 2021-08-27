const express=require('express');
const RequisitosModel = require('../database/Models/RequisitosModel');
const router=express.Router();
const Requisito=require('../database/Models/RequisitosModel');

//Rutas

//router.get('/',(req,res)=>{
    //RequisitosModel.findAll()
     //                .then(requisitosFINDALL=>{
    //                     res.json(requisitosFINDALL);
  //                   });
//});
router.get('/', async (req, res) => {
    const RequisitosModel = await Requisito.findAll();
    res.json(RequisitosModel);
});

//CREATE

router.post('/', async (req, res) => {
     
    const RequisitosModel = await Requisito.create(  {
        nombreRequisitos:req.body.nombreRequisitos
        
    });
    
     res.json({ RequisitosModel });
 });


//READ -> /api/MetodoDePago/:idMetodoPago
//router.get('/:idRequisitos',(req,res)=>{
  //  RequisitosModel.findByPk(req.params.idRequisitos)
    //                 .then(requisitosREAD=>{
      //                   res.json(requisitosREAD);
        //             });
//});
router.get('/:idRequisitos', async (req, res) => {
    const Requisitos = await Requisito.findByPk(req.params.idRequisitos,{
        nombreRequisitos:req.body.nombreRequisitos
        
    });
    res.json(Requisitos);
});
//UPDATE /api/MetodoDePago/:idMetodoPago
router.put('/:idRequisitos', async(req, res) => {
    const RequisitosModel = await Requisito.update({
        nombreRequisitos:req.body.nombreRequisitos
        
    },{
        where: { idRequisitos: req.params.idRequisitos}
    });
    
     res.json({success:"Requisito Actualizado con exito"});
});


//DELETE /api/MetodoDePago/:idMetodoPago
/*router.delete('/:idRequisitos',(req,res)=>{
    RequisitosModel.destroy({
        where:{
            idRequisitos:req.params.idRequisitos
        }
    }).then(requisitosDELETE =>{
        res.json(requisitosDELETE);
    });
});
*/
router.delete('/:idRequisitos', async(req, res) => {
    await Requisito.destroy({
        where: { idRequisitos: req.params.idRequisitos}
    });
     res.json({succes: 'requisito eliminado con exito'});
});
module.exports=router;




