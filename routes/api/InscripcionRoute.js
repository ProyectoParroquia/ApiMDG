const express=require('express');
const router=express.Router();
const Inscripcion=require('../../database/models/InscripcionModel');
const Curso=require('../../database/models/CursoModel');
const Estado=require('../../database/models/EstadoModel');
const Usuarios=require('../../database/models/usuario');
const helperEmail = require('../../helpers/SendEmailHelper')
const middelware = require('../middelwares');
//counts
router.get('/R',async(req,res)=>{
    const InscripcionModel= await Inscripcion.count(
  )
  res.json(InscripcionModel);
  });

  router.get('/PR',async(req,res)=>{
    const InscripcionModel= await Inscripcion.count(
        {
        where: {idEstadoFK: 1 }
        }
    )
    res.json(InscripcionModel);
});
//Rutas
router.get('/',async(req,res)=>{
    const InscripcionModel= await Inscripcion.findAll(
        {
        where: {idEstadoFK:1},
        include: [
        
               { model: Curso,
                attributes: ['nombreCurso'],
               },{
                model: Estado,
                attributes: ['nombreEstado']
               },
               {
                model: Usuarios,
                attributes: ['nombreUsuario','apellidoUsuario','correoUsuario','numeroContacto','numeroDocumentoUsuario',]
               }
            ],
        attributes: ['idInscripcion','fechaInscripcion', 'idEstadoFK', 'idCursoFK'] });
    res.json(InscripcionModel);
    });
    //max
    router.get('/max',async(req,res)=>{
        const InscripcionModel= await Inscripcion.max(
                'idInscripcion');
        res.json(InscripcionModel);
        });
//cancelar
router.get('/cancelado',async(req,res)=>{
    const InscripcionModel= await Inscripcion.findAll(
        {
        where: {idEstadoFK:4},
        include: [
            { model: Curso,
                attributes: ['nombreCurso'],
               },{
                model: Estado,
                attributes: ['nombreEstado']
               },
               {
                model: Usuarios,
                attributes: ['nombreUsuario','apellidoUsuario','correoUsuario','numeroContacto','numeroDocumentoUsuario',]
               }
            ],
        attributes: ['idInscripcion','fechaInscripcion','idEstadoFK'] });
    res.json(InscripcionModel);
    });
    //
    router.get('/Inscrito',async(req,res)=>{
        const InscripcionModel= await Inscripcion.findAll(
            {
            where: {idEstadoFK:2},
            include: [
              
                { model: Curso,
                    attributes: ['nombreCurso'],
                   },{
                    model: Estado,
                    attributes: ['nombreEstado']
                   },
                   {
                    model: Usuarios,
                    attributes: ['nombreUsuario','apellidoUsuario','correoUsuario','numeroContacto','numeroDocumentoUsuario',]
                   }
                ],
            attributes: ['idInscripcion','fechaInscripcion','idEstadoFK'] });
        res.json(InscripcionModel);
        });
        //INCOMPLETO
        router.get('/Incompleto',async(req,res)=>{
            const InscripcionModel= await Inscripcion.findAll(
                {
                where: {idEstadoFK:3},
                include: [
           
                    { model: Curso,
                        attributes: ['nombreCurso'],
                       },{
                        model: Estado,
                        attributes: ['nombreEstado']
                       },
                       {
                        model: Usuarios,
                        attributes: ['nombreUsuario','apellidoUsuario','correoUsuario','numeroContacto','numeroDocumentoUsuario',]
                       }
                    ],
                attributes: ['idInscripcion','fechaInscripcion','idEstadoFK'] });
            res.json(InscripcionModel);
            });
//CREATE
/*router.post('/', async (req, res) => {
     
    const  InscripcionModel = await Inscripcion.create(  {
        estadoInscripcion:req.body.estadoInscripcion,
        idCursoFK:req.body.idCursoFK
        
    });
    
     res.json({   InscripcionModel });
 });
*/

// crear inscripcion 
router.post('/',middelware.checkToken, async (req, res) => {
    const  usuario  = await Usuarios.create(  {
        nombreUsuario: req.body.nombreUsuario,
        apellidoUsuario: req.body.apellidoUsuario,
        numeroContacto: req.body.numeroContacto,
        correoUsuario: req.body.correoUsuario,
        numeroDocumentoUsuario: req.body.numeroDocumentoUsuario,
        fechaNacimientoUsuario: req.body.fechaNacimientoUsuario,
        idTipoDoc_FK: req.body.idTipoDoc_FK
    }).catch(err=>{
           res.json({mensage:"error al crear el Usuario",err});
    });
    const  Inscripcio = await Inscripcion.create(  {
        
        idCursoFK:req.body.idCursoFK,
        fechaInscripcion:req.body.fechaInscripcion,
        idUsuarioFK: usuario.idUsuario
    });
    let para = usuario.correoUsuario;
    let asunto = 'SACRIS: Confirmacion inscripción'
    let msj = `
        <div>
            <h2>Usted ${usuario.nombreUsuario},${usuario.apellidoUsuario} se ha inscrito a un curso</h2>
            <hr>
          
            <p><b>Gracias por usar el servicio sacris, recuerda asistir a 
            las charlas y llevar lo solicitado</p>
            <p>Recuerde que las charlas o actividades se hacen 
            en la parroquia Madre de la divina gracia</p>
            <hr>
            <p>Si desea consultar anuncios u otros cursos:</p>
            <a href="http://localhost:8080/">Ingresar a SACRIS aqui.</a>
        </div>
        `
    
    helperEmail.enviarCorreo(para,asunto,msj);
    res.status(201).json({success: 'Incripcion realizada Con Exito' });
    }),
    

//READ -> /api/MetodoDePago/:idMetodoPago
router.get('/:idInscripcion', (req, res) => {
    Inscripcion.findByPk(req.params.idInscripcion, {
        include:
        {
            model: Curso,
            attributes: ['nombreCurso']
            ,
                model: Estado,
                attributes: ['nombreEstado']
        }
    }).then(InscripcionREAD => {
        res.json(InscripcionREAD);
    });
});

// UPDATE
router.put('/:idInscripcion',middelware.checkToken,middelware.comprobarFeligres, async(req, res) => {
    const   InscripcionModel = await  Inscripcion.update({
        idEstadoFK:req.body.idEstadoFK,
        idUsuarioFK:req.body.idUsuarioFK
        
    },{
        where: { idInscripcion: req.params.idInscripcion }
    });
    const usuario = await Usuarios.update({
        nombreUsuario: req.body.nombreUsuario,
        apellidoUsuario: req.body.apellidoUsuario,
        numeroContacto: req.body.numeroContacto,
        correoUsuario: req.body.correoUsuario,
        numeroDocumentoUsuario: req.body.numeroDocumentoUsuario,
        fechaNacimientoUsuario: req.body.fechaNacimientoUsuario,
         idTipoDoc_FK: req.body.idTipoDoc_FK
    },{
        where: { idUsuario: req.params.idUsuario }
    }).catch(err=>{
        res.json({mensage:"error al actualizar el Usuario",err});
    });
    let para = usuario.correoUsuario;
    let asunto = 'SACRIS: Cambio de estado de inscripción'
    let msj = `
        <div>
            <h2>Usted ${usuario.nombreUsuario},${usuario.apellidoUsuario} ha solicitado la inscripcion a un curso</h2>
            <hr>
          
            <p><b>Este correo es para informarle que su inscripción se encuentra </p>
            <p>por favor couniquese con la parroquia para mas información</p>
            <hr>
            <p>Si desea consultar anuncios u otros cursos:</p>
            <a href="http://localhost:8080/">Ingresar a SACRIS aqui.</a>
        </div>
        `    
    helperEmail.enviarCorreo(para,asunto,msj);
     res.status(201).json({success:"Inscripción Actualizada con exito"});
});
//DELETE /api/ InscripcionModel/:idInscripcion
router.delete('/:idInscripcion',middelware.checkToken,middelware.comprobarFeligres,(req,res)=>{
    Inscripcion.destroy({
        where:{
            idInscripcion:req.params.idInscripcion
        }
    }).then(InscripcionDELETE=>{
        res.status(201).json({success:"Inscripción eliminada con exito"});
    });
});



module.exports=router;