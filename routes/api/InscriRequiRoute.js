const express=require('express');
const router=express.Router();
const Inscripcion=require('../../database/models/InscripcionModel');
const CursoRequisito=require('../../database/models/CursoRequisitoModel');
const Curso=require('../../database/models/CursoModel');
const Requisito=require('../../database/models/RequisitosModel');
const InscriRequi=require('../../database/models/InscriRequiModel');
const multer =require('multer');
const path =require('path');
const fs =require('fs');
const sequelize = require('../../database/db');
const middelware = require('../middelwares');
const diskstorage = multer.diskStorage(
    {
        destination: path.join(__dirname,'../requisitos'),
        filename:(req, file,cb)=>{
            cb(null,Date.now()+'_sacris_'+'requisitos_'+ file.originalname)

        }
    }
)
const fileUpload = multer({
    storage: diskstorage,
    fileFilter:(req,file,cb)=>{
        const filetypes= /pdf/;
        const mimetype= filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if(mimetype && extname){
            return cb(null, true);
        }
            console.log("error: solo se permiten archivos pdf ");
    }
}).single('file')


//Rutas

router.get('/',async(req,res)=>{
const InscriRequiModel= await InscriRequi.findAll(
    {
    include: [
        { model: Inscripcion,
     attributes: ['fechaInscripcion'],
        },
        { model: CursoRequisito,
            attributes: ['idRequisitosFK','idCursoFK'],
            include: [
                {   model: Curso,
                    attributes: ['estadoCurso','nombreCurso','fechaInicialCurso','fechaFinalCurso','costoCurso','imagenCurso']
                },
                {
                model: Requisito,
                attributes: ['nombreRequisitos']
                }
            ]
        },
        ],
    
    attributes: ['idInscriRequi','urlRequisito']
})
res.json(InscriRequiModel);
});

//hola Universo de las pdf
router.get('/requi',async(req,res)=>{
    const InscriRequiModel= await InscriRequi.findAll(
        {
            attributes: ['idInscriRequi']
        }).then (rows=>{
            rows.map(requi=>{
                fs.writeFileSync(path.join(__dirname, '../dbPdf/'+ requi.idInscriRequi+'_sacris.pdf'),requi.urlRequisito);
            
            })
            const requisitos = fs.readdirSync(path.join(__dirname, '../dbPdf/')) 
            res.json(requisitos);
            })
});
router.post('/',middelware.checkToken,middelware.comprobarFeligres,fileUpload,async (req, res) => {
    console.log(req.file)
    const urlRequisito= req.file.filename;
     
    const  InscriRequiModel = await InscriRequi.create(  {
        
        urlRequisito:urlRequisito,
        idInscripcionFK:req.body.idInscripcionFK,
        idCursoRequisitoFK:req.body.idCursoRequisitoFK
    });
    
    res.status(201).json({success:"Carga de requisitos con exito"});
          
     });
    
 
//READ -
router.get('/:idInscriRequi', (req, res) => {
    InscriRequi.findByPk(req.params.idInscriRequi, {
        include: [
            {
                model: Inscripcion,
                attributes: ['fechaInscripcion']
            },
            {
                model: CursoRequisito,
            attributes: ['idRequisitosFK','idCursoFK'],
            }
            ],
    }).then( InscriRequiREAD => {
        res.json( InscriRequiREAD);
    });
});


router.put('/:idInscriRequi',middelware.checkToken,middelware.comprobarFeligres,(req,res)=>{
    InscriRequi.update({
        urlRequisito:req.body.urlRequisito,
        idCursoRequisitoFK:req.body.idCursoRequisitoFK
     
    },{
        where:{
            idInscriRequi:req.params.idInscriRequi
        }
    }).then(InscriRequiPUT=>{
        res.status(201).json({success:"Carga de requisitos Actualizada con exito"});
    });
});

//DELETE /api/DonacionEconomica/:idDonacionEconomica
router.delete('/:idInscriRequi',middelware.checkToken,middelware.comprobarFeligres,(req,res)=>{
    InscriRequi.destroy({
        where:{
            idInscriRequi:req.params.idInscriRequi
        }
    }).then(InscriRequiDELETE=>{
        res.status(201).json({success:"Carga de requisitos eliminado con exito"});
    });
});

module.exports=router;