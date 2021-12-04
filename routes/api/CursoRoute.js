const express=require('express');
const CursoModel = require('../../database/models/CursoModel');
const router=express.Router();
const Curso=require('../../database/models/CursoModel');
const TipoCurso=require('../../database/models/TipoCursoModel');
const multer =require('multer');
const path =require('path');
const middelware = require('../middelwares');

const diskstorage = multer.diskStorage(
    {
        destination: path.join(__dirname,'../images'),
        filename:(req, file,cb)=>{
            cb(null,Date.now()+'_sacris_'+ file.originalname)

        }
    }
)
const fileUpload = multer({
    storage: diskstorage,
    fileFilter:(req,file,cb)=>{
        const filetypes= /jpeg|jpg|png|gif|svg/;
        const mimetype= filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if(mimetype && extname){
            return cb(null, true);
        }
            console.log("error: solo se permiten archivos jpeg, jpg, png, gif y svg ");
    }
}).single('file')


//Rutas
router.get('/',async(req,res)=>{
    const CursoModel= await Curso.findAll(
  
      {
      where: {estadoCurso:'Activo'},
      include: [
          {
              model: TipoCurso,
              attributes: ['nombreTipoCurso']
          }
          ],
      attributes: ['idCurso','nombreCurso','fechaInicialCurso','fechaFinalCurso','costoCurso','imagenCurso','descriCurso', 'estadoCurso']
  
  })
  res.json(CursoModel);
  });
//sacramental
router.get('/sacramental',async(req,res)=>{
  const CursoModel= await Curso.findAll(

    {
    where: {estadoCurso:'Activo',idTipoCursoFK: 1 },
    include: [
        {
            model: TipoCurso,
            attributes: ['nombreTipoCurso']
        }
        ],
    attributes: ['idCurso','nombreCurso','fechaInicialCurso','fechaFinalCurso','costoCurso','imagenCurso','descriCurso']

})
res.json(CursoModel);
});
//recreativos
router.get('/recreativo',async(req,res)=>{
    const CursoModel= await Curso.findAll(
  
      {
      where: {estadoCurso:'Activo',idTipoCursoFK: 2 },
      include: [
          {
              model: TipoCurso,
              attributes: ['nombreTipoCurso']
          }
          ],
      attributes: ['idCurso','nombreCurso','fechaInicialCurso',
      'fechaFinalCurso','costoCurso','imagenCurso','descriCurso']
  
  })
  res.json(CursoModel);
  });
//hola Universo de las imageenes
router.get('/c',async(req,res)=>{
    const CursoModel= await Curso.count(
        {
        where: {estadoCurso:'Activo'}
        }
    )
  res.json(CursoModel);
});
router.get('/i',async(req,res)=>{
    const CursoModel= await Curso.count(
        {
        where: {estadoCurso:'Inactivo'}
        }
    )
  res.json(CursoModel);
});
router.get('/r',async(req,res)=>{
    const CursoModel= await Curso.count(
  
      {
      where: {estadoCurso:'Activo',idTipoCursoFK: 2 },
  
  })
  res.json(CursoModel);
  });
  router.get('/s',async(req,res)=>{
    const CursoModel= await Curso.count(
  
      {
      where: {estadoCurso:'Activo',idTipoCursoFK: 1 },
  
  })
  res.json(CursoModel);
  });
//consultar por inactivo (Sacramental)
router.get('/inactivos/sacramental',middelware.checkToken, middelware.comprobarFeligres, async (req, res) => {
    const CursoModel= await Curso.findAll(
        {
        where: {estadoCurso:'Inactivo', idTipoCursoFK: 1},
        include: [
            {
                model: TipoCurso,
                attributes: ['nombreTipoCurso']
            }
            ],
        attributes: ['idCurso','nombreCurso','fechaInicialCurso','fechaFinalCurso','costoCurso','imagenCurso','descriCurso']
    });
    res.json(CursoModel);
       });
       
//consultar por inactivo (Recreativo)
router.get('/inactivos/recreativo',middelware.checkToken,middelware.comprobarFeligres,async(req,res)=>{
    const CursoModel= await Curso.findAll(
        {
        where: {estadoCurso:'Inactivo', idTipoCursoFK: 2},
        include: [
            {
                model: TipoCurso,
                attributes: ['nombreTipoCurso']
            }
            ],
        attributes: ['idCurso','nombreCurso','fechaInicialCurso','fechaFinalCurso','costoCurso','imagenCurso','descriCurso']
    });
    res.json(CursoModel);
       });

router.post('/',fileUpload,middelware.checkToken,middelware.comprobarFeligres,async (req, res) => {
     console.log(req.file)
     const imagenCurso= req.file.filename;
  
      await   Curso.create({
        nombreCurso:req.body.nombreCurso,
        fechaInicialCurso:req.body.fechaInicialCurso,
        fechaFinalCurso:req.body.fechaFinalCurso,
        costoCurso:req.body.costoCurso,
        descriCurso:req.body.descriCurso,
        imagenCurso:imagenCurso,
        idTipoCursoFK:req.body.idTipoCursoFK
     
    })
         res.status(201).json({success:"curso creado con exito"});
   
   
    

    /* sequelize.query(
        'INSERT INTO curso ser ? '[{nombreCurso:'',costoCurso:'',fechaInicialCurso:'',fechaInicialCurso:'',
        imagenCurso:imagenCurso,idTipoCursoFK:''}],
        { type: sequelize.QueryTypes.INSERT }
    ).then(function (cursoInsertId) {
        console.log(cursoInsertId);
    });*/
  
     
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

//UPDATE  
router.put('/:idCurso',middelware.checkToken,middelware.comprobarFeligres,(req,res)=>{
    Curso.update({
        nombreCurso:req.body.nombreCurso,
        fechaInicialCurso:req.body.fechaInicialCurso,
        fechaFinalCurso:req.body.fechaFinalCurso,
        costoCurso:req.body.costoCurso,
        imagenCurso:req.body.imagenCurso,
        descriCurso:req.body.descriCurso,
        idTipoCursoFK:req.body. idTipoCursoFK
     
    },{
        where:{
            idCurso:req.params.idCurso
        }
    }).then(cursoPUT=>{
        res.status(201).json({success:"Curso Actualizado con exito"});
    });
});
//Activar e inactivar
// INHABILITAR
router.put('/inhabilitar/:idCurso',middelware.checkToken,middelware.comprobarFeligres, async(req, res) => {
    const CursoModel = await Curso.update({
        estadoCurso : 'Inactivo'
    }, {
        where: { idCurso: req.params.idCurso }
    });

    res.status(201).json({success: 'El curso a sido inactivado'});
});
// Activar
router.put('/activar/:idCurso',middelware.checkToken,middelware.comprobarFeligres, async(req, res) => {
    const CursoModel  = await Curso.update({
        estadoCurso : 'Activo'
    }, {
        where: { idCurso: req.params.idCurso }
    });
    
    res.status(201).json({success: 'El curso a sido activado'});
});
//DELETE
router.delete('/:idCurso',middelware.checkToken,middelware.comprobarFeligres,(req,res)=>{
    Curso.destroy({
        where:{
            idCurso:req.params.idCurso
        }
    }).then(CursoDELETE=>{
        res.status(201).json({success:"Curso eliminado con exito"});
    });
});

module.exports=router;