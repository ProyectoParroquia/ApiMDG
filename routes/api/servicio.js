const router = require('express').Router();
const Servicio= require('../../database/models/servicio');
const TipoServicio=require('../../database/Models/TipoServicio');

//CONSULTAR
router.get('/',async(req,res)=>{
    const servicio= await Servicio.findAll(
        {
                include: [
            {
                model: TipoServicio,
                attributes: ['denominacionServicio']
            }
            ],
        attributes: ['idServicio','estadoServicio','fechaServicio','PeticionServicio']
    });
    res.json(servicio);
    });
     
    //CREATE
    router.post('/', async (req, res) => {
         
        const  servicio = await Servicio.create(  {
            
            fechaServicio:req.body.fechaServicio,
            peticionServicio: req.body.peticionServicio,
            idTipoServicio_FK: req.body.idTipoServicio_FK
            
        });
        
             res.json(servicio);
              
         });
        
     
    //READ 
    router.get('/:idServicio', (req, res) => {
        Servicio.findByPk(req.params.idServicio, {
            include:
            {
                model: TipoServicio,
                attributes: ['denominacionServicio']
            }
        }).then(servicioREAD => {
            res.json(servicioREAD);
        });
    });
    
    //Update
    router.put('/:idServicio',(req,res)=>{
        Servicio.update({
            estadoServicio:req.body.estadoServicio,
            fechaServicio:req.body.fechaServicio,
            peticionServicio: req.body.peticionServicio,
             idTipoServicio_FK: req.body.idTipoServicio_FK
         
        },{
            where:{
                idServicio:req.params.idServicio
            }
        }).then(servicioPUT=>{
           res.json({success:"Servicio Actualizado con exito"});
        });
    });
    
    //delete
    router.delete('/:idServicio',(req,res)=>{
        Servicio.destroy({
            where:{
                idServicio:req.params.idServicio
            }
        }).then(servicioDELETE=>{
             res.json({succes: ' Servicio eliminado con exito'});
        });
    });
    

module.exports = router;