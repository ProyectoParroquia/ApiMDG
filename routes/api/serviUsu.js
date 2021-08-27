const router = require('express').Router();
const serviUsu=require('../../database/models/servicioUsu');
const servicio=require('../../database/Models/servicio');
const usuario=require('../../database/Models/usuario');


router.get('/',async(req,res)=>{
    const servicioUsu= await serviUsu.findAll(
        {
        include: [
            { model: servicio,
         attributes: ['estadoServicio']
            },
            { model: usuario,
                attributes: ['nombreUsuario']
            }
            ],
        attributes: ['idServicioUsuario','montoDonacion']
    });
    res.json(servicioUsu);
    });
    
    
    router.post('/', async (req, res) => {
         
        const  servicioUsu = await serviUsu.create(  {
            
            montoDonacion:req.body.montoDonacion,
            idServicio_FK:req.body.idServicio_FK,
            idUsuario_FK:req.body.idUsuario_FK
        });
        
             res.json(servicioUsu);
              
         });
        
     
    //READ -
    router.get('/:idServicioUsuario', (req, res) => {
        serviUsu.findByPk(req.params.idServicioUsuario, {
            include: [
                { 
                    model: servicio,
                    attributes: ['estadoServicio']
                },
                { 
                    model: usuario,
                    attributes: ['nombreUsuario']
                }
                ],
        }).then( serviUsuREAD => {
            res.json( serviUsuREAD);
        });
    });
    
    //UPDATE  /api/DonacionEconomica/:idDonacionEconomica
    router.put('/:idServicioUsuario',(req,res)=>{
        serviUsu.update({
            montoDonacion:req.body.montoDonacion,
            idServicios_FK:req.body.idServicios_FK,
            idUsuario_FK:req.body.idUsuario_FK
         
        },{
            where:{
                idServicioUsuario:req.params.idServicioUsuario
            }
        }).then(serviUsuPUT=>{
            res.json(serviUsuPUT);
        });
    });
    
    //DELETE /api/DonacionEconomica/:idDonacionEconomica
    router.delete('/:idServicioUsuario',(req,res)=>{
        serviUsu.destroy({
            where:{
                idServicioUsuario:req.params.idServicioUsuario
            }
        }).then(serviUsuDELETE=>{
            res.json(serviUsuDELETE);
        });
    });

module.exports = router;