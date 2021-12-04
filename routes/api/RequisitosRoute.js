const express=require('express');
const router=express.Router();
const Requisito = require('../../database/models/RequisitosModel');
const middelware = require('../middelwares');
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

router.post('/',middelware.checkToken,middelware.comprobarFeligres, async (req, res) => {
     
    const RequisitosModel = await Requisito.create(  {
        nombreRequisitos:req.body.nombreRequisitos
        
    });
    
    res.status(201).json({success:"Requisito creado con exito"});
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
router.put('/:idRequisitos',middelware.checkToken,middelware.comprobarFeligres, async(req, res) => {
    const RequisitosModel = await Requisito.update({
        nombreRequisitos:req.body.nombreRequisitos
        
    },{
        where: { idRequisitos: req.params.idRequisitos}
    });
    
    res.status(201).json({success:"Requisito Actualizado con exito"});
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
router.delete('/:idRequisitos',middelware.checkToken,middelware.comprobarFeligres, async(req, res) => {
    await Requisito.destroy({
        where: { idRequisitos: req.params.idRequisitos}
    });
    res.status(201).json({succes: 'requisito eliminado con exito'});
});
module.exports=router;




