const router = require('express').Router();
const Usuarios = require('../../database/models/usuario');
const Anuncio = require('../../database/models/AnuncioModel');
const multer =require('multer');
const path =require('path');
const fs = require('fs');
const middelware = require('../middelwares');

const diskstorage = multer.diskStorage(
    {
        destination: path.join(__dirname,'../images'),
        filename:(req, file,cb)=>{
            cb(null,Date.now()+'sacris'+ file.originalname)

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
//consultar todos los usuarios
router.get('/', async(req, res) => {
    const anuncio = await Anuncio.findAll(
        {
            where: {estadoAnuncio:'Activo' },
        include: [{
            model: Usuarios,
            attributes: ['nombreUsuario']
            }],

        attributes: ['idAnuncio','tituloAnuncio','estadoAnuncio','mensajeAnuncio','fechaInicio','fechaFinal','imagenAnuncio']
    });
   
     res.json(anuncio);
});
//consultar los 6 primeros anuncios 
router.get('/solo-seis', async(req, res) => {
    const anuncio = await Anuncio.findAll(
        {
            where: {estadoAnuncio:'Activo' },
            include: [{
                model: Usuarios,
                attributes: ['nombreUsuario']
                }],
            order: ['fechaInicio','fechaFinal'],
            limit:6,
        attributes: ['idAnuncio','tituloAnuncio','estadoAnuncio','mensajeAnuncio','fechaInicio','fechaFinal','imagenAnuncio']
    });
   
     res.json(anuncio);
});


router.get('/id/:idAnuncio', async (req, res) => {
    const anuncio = await Anuncio.findByPk(req.params.idAnuncio, {
        include: {
            model: Usuarios,
            attributes: ['nombreUsuario']
            },
            attributes: ['idAnuncio','tituloAnuncio','estadoAnuncio','mensajeAnuncio','fechaInicio','fechaFinal','imagenAnuncio']
        }) 
     res.json(anuncio);
})
// CREATE 
router.post('/',middelware.checkToken,middelware.comprobarFeligres,fileUpload, async (req, res) => {
    console.log(req.file)
    const  imagenAnuncio=req.file.filename;
   
   const anuncio = await Anuncio.create(  {
    tituloAnuncio: req.body.tituloAnuncio,
    mensajeAnuncio: req.body.mensajeAnuncio,
    fechaFinal: req.body.fechaFinal,
    UsuarioFK: req.body.UsuarioFK,
    imagenAnuncio:imagenAnuncio,
   });
   res.status(201).json({ success:'Anuncio creado Con Exito' });
     
});

// UPDATE
router.put('/actualizar/:idAnuncio',middelware.checkToken,middelware.comprobarFeligres,fileUpload, async(req, res) => {
     Anuncio.update({
        estadoAnuncio: req.body.estadoAnuncio,
        tituloAnuncio: req.body.tituloAnuncio,
        mensajeAnuncio: req.body.mensajeAnuncio,
        fechaFinal: req.body.fechaFinal,
        imagenAnuncio: req.body.imagenAnuncio,

    },{
        where: { idAnuncio: req.params.idAnuncio }
    });
    const usuario = Usuarios.update({
    nombreUsuario: req.body.nombreUsuario
    }, {
       where: { UsuarioFK: req.params.idUsuario }
   });

     res.json({success:"Anuncio actualizado con exito"});
});

router.put('/Inhabilitar/:idAnuncio',middelware.checkToken,middelware.comprobarFeligres, async(req, res) => {
     Anuncio.update({
        estadoAnuncio : 'Inactivo'
    }, {
        where: { idAnuncio: req.params.idAnuncio }
    });

    res.status(201).json({success: 'La inscripcion ha sido inactivado'});
});
// Activar
router.put('/Activo/:idAnuncio',middelware.checkToken,middelware.comprobarFeligres, async(req, res) => {
     Anuncio.update({
        estadoAnuncio: 'Activo'
    }, {
        where: { idAnuncio: req.params.idAnuncio }
    });
    
    res.status(201).json({success: 'La inscripcion ha sido activado'});
});

router.get('/inactivos',middelware.checkToken,middelware.comprobarFeligres, async (req, res) => {
    const anuncio = await Anuncio.findAll(
        {
        where: {estadoAnuncio:'Inactivo' },
        include: [{
                model: Usuarios,
                attributes: ['nombreUsuario']
            },
            ],
    }).catch(err=>{
       
        res.json({mensage:"error al Consultar los Anuncios",err});
   });
   
     res.json(anuncio);
});

router.delete('/:idAnuncio',middelware.checkToken,middelware.comprobarFeligres, async(req, res) => {
    Anuncio.destroy({
        where: { idAnuncio: req.params.idAnuncio}
    });
     res.json({succes: 'Anuncio eliminado con exito'});
});

module.exports = router;